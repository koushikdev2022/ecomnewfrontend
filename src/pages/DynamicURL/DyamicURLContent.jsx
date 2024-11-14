import { useEffect, useState } from "react";
import {
  couponCheck,
  createOrder,
  fetchHtmlCssJs,
} from "../../Reducer/EditorSlice";
import { showToast } from "../../utils/Toaster";
import { useLocation, useParams } from "react-router-dom";
// import { parse } from 'postcss';
import parse from "html-react-parser";
import { useDispatch } from "react-redux";
import { getProductList } from "../../Reducer/ProductSlice";
import { useForm } from "react-hook-form";

const DynamicURLContent = () => {
  //   const location = useLocation();
  //   const { html, css, js } = location.state;
  //   const parsedHtml = parse(html);
  const dispatch = useDispatch();

  const { "*": path } = useParams(); // Extract the dynamic part of the URL
  const proId = path.split("/")[0]; // Split the string by '/' and take the first part

  const [html, setHtml] = useState(null);
  const [css, setCss] = useState(null);
  const [js, setJs] = useState(null);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const [fName, setFName] = useState(null);
  const [lName, setLName] = useState(null);
  const [paymentType, setPaymentType] = useState(null);
  const [address, setAddress] = useState(null);
  const [link, setLink] = useState(null);
  const [nameAttribute, setNameAttribute] = useState(null);
  const [email, setEmail] = useState(null);
  const [value, setValue] = useState(null);
  const [couponid, setCouponId] = useState("");
  const [product_price_id, setProduct_price_id] = useState("");

  const [isStripeCheck, setIsStripeCheck] = useState(false);

  // const [couponCheckStyle, setCouponCheckStyle] = useState('none');
  // const [couponCheckMsg, setCouponCheckMsg] = useState(null);
  const [couponData, setCouponData] = useState(null);
  const [isBlur, setIsBlur] = useState(false);

  const orderDetails = {
    total_shipping: 100,
    total_price: 100,
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // function to handle the form submission
  const onSubmit = () => {
    alert("Form submitted");
    const payload = {
      product_id: 18,
      coupon_id: 2,
      product_price_id: 18,
      order_json: [
        {
          billing_email: "xyz@yopmail.com",
          name: "xyz",
          phone: "89745621",
          country: "India",
          state: "Kerala",
          city: "Hyderabad",
          postalcode: "70014",
          deliveryAddress: "ABC",
          paymentType: "1",
        },
      ],
    };
    dispatch(createOrder(payload)).then((res) => {
      console.log("Res order: ", res);
    });
  };
  // Function to handle the coupon validation
  const handleCouponCheck = () => {
    setIsBlur(true);
  };

  const handleSetCouponData = (data) => {
    // setIsBlur(true);
    console.log("Coupon data in handleSetCoupon-->>", data);
    setCouponData(data);
  };

  useEffect(() => {
    console.log("useeffect couponData ->", couponData);
    if (couponData) {
      console.log("couponData in useEffect", couponData);
      dispatch(couponCheck({ coupon_code: couponData })).then((res) => {
        console.log("res->>", res);
        if (res?.payload?.status_code === 200) {
          if (res?.payload?.data) {
            showToast(res?.payload?.message, "success");
          } else {
            showToast(res?.payload?.message, "error");
          }
          setIsBlur(false);
        }
      });
    }
  }, [couponData]);

  useEffect(() => {
    dispatch(fetchHtmlCssJs(proId)).then((res) => {
      console.log("Response fetchHtml: ", res);

      if (res.payload.status_code === 200) {
        console.log(res?.payload?.data[0]?.html, "res?.payload?.data[0]?.html");
        const parsedHtml = parse(res?.payload?.data[0]?.html);
        console.log("parsedHtml: ", parsedHtml);

        setHtml(parsedHtml);
        setCss(res?.payload?.data[0]?.css);
        setJs(res?.payload?.data[0]?.javascript);
        console.log("Calling getProductList with ID:", proId);
        const productId = parseInt(proId);
        dispatch(getProductList({ page: 1, limit: 10, id: productId })).then(
          (res) => {
            console.log("resPonse Single Product: ", res);
            if (res?.payload?.status_code === 200) {
              setCouponId(res?.payload?.data?.[0]?.coupon?.[0]);
              setProduct_price_id(
                res?.payload?.data?.[0]?.productPriceData?.[0]?.id
              );
            }
          }
        );
      }
    });
  }, [proId]);

  // Expose React state setters to the global scope
  useEffect(() => {
    window.setSelectedCountry = setSelectedCountry;
    window.setSelectedState = setSelectedState;
    window.setSelectedCity = setSelectedCity;
    window.setInputValue = setInputValue;
    window.setFname = setFName;
    window.setLname = setLName;
    window.setPaymentType = setPaymentType;
    window.setAddress = setAddress;
    window.setLink = setLink;
    window.setNameAttribute = setNameAttribute;
    window.handleSubmit = handleSubmit;
    window.handleCouponCheck = handleCouponCheck;
    window.handleSetCouponData = setCouponData;

    return () => {
      delete window.setSelectedCountry;
      delete window.setSelectedState;
      delete window.setSelectedCity;
      // delete window.setInputValue;
      delete window.setFname;
      delete window.setLname;
      delete window.setPaymentType;
      delete window.setAddress;
      delete window.setLink;
      delete window.setNameAttribute;
      delete window.handleSubmit;
      delete window.handleCouponCheck;
    };
  }, []);

  // useEffect(() => {
  //   console.log('selectedCountry in demopage->', selectedCountry);
  // }, [selectedCountry]);

  // useEffect(() => {
  //   console.log('selectedState in demopage->', selectedState);
  // }, [selectedState]);

  // useEffect(() => {
  //   console.log('selectedCity in demopage->', selectedCity);
  // }, [selectedCity]);
  useEffect(() => {
    console.log("email in demopage->", email);
  }, [email]);

  useEffect(() => {
    console.log("inputValue in demopage->", inputValue);
    console.log("nameAttribute in demopage", nameAttribute);
    if (inputValue !== null) {
      if (nameAttribute === "email") {
        setEmail(inputValue);
      }
    }
    if (nameAttribute === "totalShipping") {
      setValue(orderDetails.total_shipping);
    }
    if (nameAttribute === "totalPrice") {
      setValue(orderDetails.total_price);
    }
    if (nameAttribute === "couponCheck" && inputValue) {
      console.log("coupon inputValue-->>", inputValue);
      console.log("nameAttribute -->>>", nameAttribute);
      setCouponData(inputValue);
    }
  }, [inputValue, nameAttribute]);
  // useEffect(() => {
  //   console.log('fName in demopage->', fName);
  // }, [fName]);
  // useEffect(() => {
  //   console.log('lName in demopage->', lName);
  // }, [lName]);
  // useEffect(() => {
  //   console.log('paymentType in demopage->', paymentType);
  // }, [paymentType]);
  // useEffect(() => {
  //   console.log('address in demopage->', address);
  // }, [address]);
  // useEffect(() => {
  //   console.log('link in demopage->', link);
  // }, [link]);
  useEffect(() => {
    console.log("Coupon in demopage->", couponData);
  }, [couponData]);

  useEffect(() => {
    if (css && js) {
      // Inject CSS
      const style = document.createElement("style");
      style.innerHTML = css;
      document.head.appendChild(style);

      // Inject and execute JS
      const script = document.createElement("script");
      script.innerHTML = js;
      document.body.appendChild(script);

      // Cleanup on component unmount
      return () => {
        document.head.removeChild(style);
        document.body.removeChild(script);
      };
    }
  }, [css, js]);

  useEffect(() => {
    console.log("js", js);
  }, [js]);
  useEffect(() => {
    console.log("html", html);
  }, [html]);
  useEffect(() => {
    console.log("css", css);
  }, [css]);

  return (
    <div className="w-full overflow-auto">
      <form onSubmit={() => handleSubmit(onSubmit)}>{html}</form>
    </div>
  );
};

export default DynamicURLContent;
