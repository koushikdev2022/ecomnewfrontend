import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import parse from 'html-react-parser';
import { TextInput } from 'flowbite-react';
import { set } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { couponCheck } from '../../../Reducer/EditorSlice';

import 'react-toastify/dist/ReactToastify.css';
import { showToast } from '../../../utils/Toaster';

const DemoPage = () => {
  const location = useLocation();
  const { html, css, js } = location.state;
  const parsedHtml = parse(html);
  const dispatch = useDispatch();

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
  // const [couponCheckStyle, setCouponCheckStyle] = useState('none');
  // const [couponCheckMsg, setCouponCheckMsg] = useState(null);
  const [couponData, setCouponData] = useState(null);
  const [isBlur, setIsBlur] = useState(false);

  const orderDetails = {
    total_shipping: 100,
    total_price: 100,
  };

  // function to handle the form submission
  const handleSubmit = () => {
    console.log('selectedCountry in handleSubmit->', selectedCountry);
    console.log('selectedState in handleSubmit->', selectedState);
    console.log('selectedCity in handleSubmit->', selectedCity);
    console.log('fName in handleSubmit->', fName);
    console.log('lName in handleSubmit->', lName);
    console.log('paymentType in handleSubmit->', paymentType);
    console.log('address in handleSubmit->', address);
    console.log('link in handleSubmit->', link);
    console.log('email in handleSubmit->', email);
    console.log('value in handleSubmit->', value);
  };
  // Function to handle the coupon validation
  const handleCouponCheck = () => {
    setIsBlur(true);
  };

  const handleSetCouponData = (data) => {
    // setIsBlur(true);
    console.log('Coupon data in handleSetCoupon-->>', data);
    setCouponData(data);
  };

  useEffect(() => {
    console.log('useeffect couponData ->', couponData);
    if (couponData) {
      console.log('couponData in useEffect', couponData);
      dispatch(couponCheck({ coupon_code: couponData })).then((res) => {
        console.log('res->>', res);
        if (res?.payload?.status_code === 200) {
          if (res?.payload?.data) {
            showToast(res?.payload?.message, 'success');
          } else {
            showToast(res?.payload?.message, 'error');
          }
          setIsBlur(false);
        }
      });
    }
  }, [couponData]);
  // useEffect(() => {
  //   console.log('useeffect isBlur ->', isBlur);
  //   if (isBlur) {
  //     console.log('couponData in blur', couponData);
  //     dispatch(couponCheck({ coupon_code: couponData })).then((res) => {
  //       console.log('res->>', res);
  //       if (res?.payload?.status_code === 200) {
  //         if (res?.payload?.data) {
  //           showToast(res?.payload?.message, 'success');
  //         } else {
  //           showToast(res?.payload?.message, 'error');
  //         }
  //         setIsBlur(false);
  //       }
  //     });
  //   }
  // }, [isBlur]);

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

  useEffect(() => {
    console.log('selectedCountry in demopage->', selectedCountry);
  }, [selectedCountry]);

  useEffect(() => {
    console.log('selectedState in demopage->', selectedState);
  }, [selectedState]);

  useEffect(() => {
    console.log('selectedCity in demopage->', selectedCity);
  }, [selectedCity]);
  useEffect(() => {
    console.log('email in demopage->', email);
  }, [email]);

  useEffect(() => {
    console.log('inputValue in demopage->', inputValue);
    console.log('nameAttribute in demopage', nameAttribute);
    if (inputValue !== null) {
      if (nameAttribute === 'email') {
        setEmail(inputValue);
      }
    }
    if (nameAttribute === 'totalShipping') {
      setValue(orderDetails.total_shipping);
    }
    if (nameAttribute === 'totalPrice') {
      setValue(orderDetails.total_price);
    }
    if (nameAttribute === 'couponCheck' && inputValue) {
      console.log('coupon inputValue-->>', inputValue);
      console.log('nameAttribute -->>>', nameAttribute);
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
    console.log('Coupon in demopage->', couponData);
  }, [couponData]);

  useEffect(() => {
    // Inject CSS
    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);

    // Inject and execute JS
    const script = document.createElement('script');
    script.innerHTML = js;
    document.body.appendChild(script);

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(style);
      document.body.removeChild(script);
    };
  }, [css, js]);

  return <div className='w-full overflow-auto'>{parsedHtml}</div>;
};

export default DemoPage;
