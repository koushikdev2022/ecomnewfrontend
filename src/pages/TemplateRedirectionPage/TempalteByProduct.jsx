import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { getListPerProductTemplate } from "../../Reducer/UserEditorSlice";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { fetchHtmlCssJs } from "../../Reducer/EditorSlice";
import { getProductList } from "../../Reducer/ProductSlice";
import { productOrder } from "../../Reducer/PaymentProcessorSlice";
import { loadStripe } from "@stripe/stripe-js";

import { getStripeSecrate } from "../../Reducer/PaymentSlice";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { couponValidate } from "../../Reducer/CouponSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TemplateByProduct = () => {
  const { data } = useSelector((state) => state?.usereditors);
  const productId = useParams();
  console.log("productId", productId?.id);
  const slug = useParams();
  console.log("Slug", slug?.slug);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [html, setHtml] = useState(null);
  const [css, setCss] = useState(null);
  const [js, setJs] = useState(null);
  const [isStripeCheck, SetIsStripeCheck] = useState(false);
  const [stripes, setStripes] = useState();
  const [reload, setReload] = useState(false);
  const [availablePaymentProviders, setAvailablePaymentProviders] = useState(
    []
  );
  const [priceId, setPriceId] = useState();
  const [paid_amount, setPaymentAmount] = useState();
  const [userId, setUserId] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showStripeForm, setShowStripeForm] = useState(false);
  const [openStripeModal, setOpenStripeModal] = useState(false);
  const [stripeKey, setStripeKey] = useState();
  const [secrateKey, setSecrateKey] = useState();
  const [subscription, setSubscription] = useState();
  const [stripe, setStripe] = useState(null);
  const [paypal, setPaypal] = useState(null);
  const [oneTime, setOnetime] = useState(null);
  const [stripejs, setStripejs] = useState(null);
  const [cardElement, setCardElement] = useState(null);
  const [clientSecret, setClientSecrate] = useState(null);
  const [paypalKey, setPaypalKey] = useState(null);
  const [paypalSecrate, setPaypalSecrate] = useState(null);
  const [paymentSubmitState, setPaymentSubmitState] = useState(null);
  const [stripePromise, setStripePromise] = useState(null);
  const [options, setOptions] = useState(null);
  const [paymentElements, setPaymentElements] = useState(null);
  const [isPaymentElementMounted, setIsPaymentElementMounted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productName, setProductName] = useState(null);

  const [couponCode, setCouponCode] = useState(null);
  const [calculatedPrice, setCalculatedPrice] = useState();
  const [isCouponApply, setIsCouponApply] = useState(false);
  // let stripejs;
  // let cardElement;
  useEffect(() => {
    if (couponCode !== null && priceId !== null) {
      // alert(couponCode);
      // alert(priceId);
      dispatch(
        couponValidate({
          coupon_code: couponCode,
          product_id: productId?.id,
          price_id: priceId,
        })
      ).then((res) => {
        console.log("Coupon", res);
        if (res?.payload?.status_code === 400) {
          toast.error(res?.payload?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (res?.payload?.status_code === 200) {
          toast.success(res?.payload?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "light",
          });
          console.log("oneTime", oneTime);
          setCalculatedPrice(res?.payload?.calculatedPrice);
          setIsCouponApply(true);
        }
      });
    }
  }, [couponCode, priceId]);
  useEffect(() => {}, [html, stripeKey]);
  useEffect(() => {
    dispatch(getProductList({ id: productId?.id, page: 1, limit: 10 })).then(
      (res) => {
        console.log("Product res: ", res);
        setUserId(res?.payload?.data?.[0]?.user_id);
        setPaypal(res?.payload?.data?.[0]?.paypal);
        setStripe(res?.payload?.data?.[0]?.stripe);
        if (isCouponApply) {
          setPaymentAmount(calculatedPrice);
        } else {
          setPaymentAmount(
            res?.payload?.data?.[0]?.productPriceData?.[0]
              ?.one_type_payment_price
          );
        }
        setAvailablePaymentProviders(
          res?.payload?.data?.[0]?.paymentProviders?.[0]?.provider_type
        );
        setPriceId(res?.payload?.data?.[0]?.productPriceData?.[0]?.id);
        setStripeKey(res?.payload?.data?.[0]?.stripe?.[0]?.stripe_key);
        setProductName(res?.payload?.data?.[0]?.product_name);
        setSecrateKey(res?.payload?.data?.[0]?.stripe?.[0]?.stripe_secret);
        setPaypalKey(res?.payload?.data?.[0]?.paypal?.[0]?.paypal_key);
        setPaypalSecrate(res?.payload?.data?.[0]?.stripe?.[0]?.paypal_secret);
        const priceData = res?.payload?.data?.[0]?.productPriceData;
        console.log("Payment Data: ", data);
        priceData?.forEach((product) => {
          if (product.one_type_payment_price === null) {
            setSubscription(product);
          } else {
            setOnetime(product);
          }
        });

        dispatch(getListPerProductTemplate({ pid: productId?.id })).then(
          (res) => {
            console.log("Res: ", res);
          }
        );
        dispatch(fetchHtmlCssJs(productId?.id)).then((res) => {
          console.log("Render Page: ", res);
          if (res?.payload?.status_code === 200) {
            const parsedHtml = parse(
              res.payload.data[0].html?.content != undefined
                ? res.payload.data[0].html?.content
                : res.payload.data[0].html
            );
            // const parsedHtml = res.payload.data[0].html;
            console.log("parsedHtml: ", parsedHtml);
            console.log("Css: ", res.payload.data[0].css);

            console.log("doc", res.payload.data[0].html?.content);

            setHtml(parsedHtml);
            setCss(
              res?.payload?.data[0]?.css?.styles != undefined
                ? res?.payload?.data[0]?.css?.styles
                : res?.payload?.data[0]?.css
            );
            setJs(res.payload.data[0].javascript);
            dispatch(
              getProductList({
                user_id: null,
                page: 1,
                limit: 1,
                checkout_url: slug?.slug,
              })
            );
          }
        });
      }
    );
  }, [dispatch, isCouponApply]);
  console.log("Data: ", data?.data?.[0]?.data);
  const coupons = [
    { code: "STEALDEAL20" },
    { code: "DISCOUNT15" },
    { code: "SAVE10" },
  ];

  useEffect(() => {
    if (css) {
      // Inject CSS
      const style = document.createElement("style");
      style.innerHTML = css;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, [css, js]);

  useEffect(() => {
    const paymentMethodsContainer = document.querySelector(
      ".payment-methods-stripe"
    );
    if (paymentMethodsContainer) {
      console.log("paymentMethodsContainer", paymentMethodsContainer);

      const htmlContent = paymentMethodsContainer.innerHTML;
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
      const paypalRadio = doc.querySelector("#paypal-radio");
      const stripeRadio = doc.querySelector("#stripe-radio");
      const paypalId = paypalRadio ? paypalRadio.id : null;
      const stripeId = stripeRadio ? stripeRadio.id : null;
      const paypalLabel = paypalRadio ? paypalRadio.closest("label") : null;
      const stripeLabel = stripeRadio ? stripeRadio.closest("label") : null;
      console.log("availablePaymentProviders: ", availablePaymentProviders);
      console.log("paypalRadio: ", paypalLabel);
    }
  }, [html, availablePaymentProviders]);

  const stripeRadio = document.getElementById("stripe-radio");
  const stripeForm = document.getElementById("stripe-form");

  // Add a click event listener
  stripeRadio?.addEventListener("click", function () {
    console.log("Stripe");
    setShowStripeForm(true);
  });

  useEffect(() => {
    const initializeStripe = async () => {
      if (!stripejs) {
        const stripeInstance = await loadStripe(stripeKey);
        setStripejs(stripeInstance);
      }
    };

    initializeStripe();

    if (stripes && stripejs && !cardElement) {
      const elements = stripejs.elements();

      // Customize the card element style
      const style = {
        base: {
          backgroundColor: "#ffffff", // White background
          fontSize: "16px",
          padding: "12px 16px", // Thicker padding for a more substantial form appearance
          fontWeight: "bold", // Bold text for added thickness
          border: "2px solid #000", // Border to define the form outline
          borderRadius: "8px", // Rounded corners for a smoother look
          "::placeholder": {
            color: "#aab7c4",
          },
        },
      };
      const card = elements.create("card", { style });
      const cardElementDiv = document.getElementById("card-element");

      if (cardElementDiv) {
        card.mount("#card-element");
        setCardElement(card); // Set the card element in the state

        // Handle card input changes and display errors if present
        card.on("change", (event) => {
          if (event.error) {
            console.error(event.error.message);
          }
        });
      } else {
        console.error("Card element div not found");
      }
    }
  }, [stripeKey, stripejs, stripes, cardElement, clientSecret]); // Only run when stripeKey, stripejs, or stripes change

  // Handle pricing and UI logic once when the component is first loaded

  const loadPayPalScript = () => {
    if (!document.getElementById("paypal-sdk")) {
      const script = document.createElement("script");
      script.id = "paypal-sdk";
      script.src = `https://www.paypal.com/sdk/js?client-id=${paypalKey}&currency=USD`;
      document.body.appendChild(script);
    }
  };

  useEffect(() => {
    if (html !== null) {
      let coupon = document.getElementById("coupon");
      if (coupon) {
        coupon.style.display = "none";
      }
      if (document.getElementById("couponOpen")) {
        document.getElementById("couponOpen").onclick = function () {
          coupon.style.display = "";
          let couponOpen = document.getElementById("cpnLink");
          if (couponOpen) {
            couponOpen.style.display = "none";
          }
        };
      }

      let applyCoupon = document.getElementById("applyCoupon");
      if (applyCoupon) {
        applyCoupon.onclick = function () {
          let coupon_code = document.getElementById("coupon_code");
          if (coupon_code) {
            let newValue = coupon_code.value;
            setCouponCode(newValue);
          }
          // dispatch(couponValidate({ product_id: productId?.id }));
        };
      }
      let pricingElement = document.getElementById("pricingBoth");
      let couponElement = document.getElementById("couponList");

      let pricing = pricingElement ? pricingElement.innerHTML : "";
      let couponHtml = couponElement ? couponElement.innerHTML : "";
      let cardContainer = document.getElementById("card-element-new");
      document
        .getElementById("oneTimeHide")
        .addEventListener("click", function () {
          this.classList.add("active_new_type");
          document
            .getElementById("subscriptionHide")
            .classList.remove("active_new_type");
        });

      document
        .getElementById("subscriptionHide")
        .addEventListener("click", function () {
          this.classList.add("active_new_type");
          const oneTimeElement = document.getElementById("oneTimeHide");
          oneTimeElement.classList.remove("active_new_type");
          // Check if the class is removed
        });

      document.getElementById("paypal-radio").onclick = function () {
        // const cardContainer = document.getElementById("card-element");
        // const cardElement = document.getElementById("card-element");
        // if (cardElement) {
        //   cardElement.classList.remove("stripe_design");
        // }

        document.getElementById("card-element-stripe").style.display = "none";
        document.getElementById("card-element-new").style.display = "block";
        document
          .querySelector(".payment-method-paypal > label")
          .classList.add("active_payment_type");
        document
          .querySelector(".payment-method-stripe > label")
          .classList.remove("active_payment_type");

        setPaymentSubmitState("paypal");
        const submitButtons = document.querySelectorAll(
          'button[type="submit"]'
        );
        submitButtons.forEach((button) => {
          button.style.display = "none"; // or use button.style.visibility = 'hidden';
        });
        const containerremove = document.getElementById("card-element-stripe");
        const root = ReactDOM.createRoot(containerremove);
        root.unmount();
        setStripes(null);
        if (cardContainer) {
          cardContainer.innerHTML = ""; // Clears the Stripe form

          // Load PayPal SDK if not already loaded
          // loadPayPalScript();

          // Wait until PayPal SDK is loaded

          if (window.paypal && paypalKey) {
            // Render the PayPal button
            window.paypal
              .Buttons({
                createOrder: function (data, actions) {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: paid_amount.toString(), // set amount dynamically
                        },
                      },
                    ],
                  });
                },
                onApprove: function (data, actions) {
                  return actions.order.capture().then(function (details) {
                    const submitButtons = document.querySelectorAll(
                      'button[type="submit"]'
                    );
                    submitButtons.forEach((button) => {
                      button.style.display = "inline-block"; // Shows the button again (use 'block' if needed)
                    });
                    if (submitButtons.length > 0) {
                      const lastSubmitButton =
                        submitButtons[submitButtons.length - 1];

                      // Add an event listener for the last button's click event
                      // Programmatically click the last submit button
                      lastSubmitButton.click();
                    }
                  });
                },
                onError: function (err) {
                  console.error("PayPal transaction failed", err);
                },
              })
              .render("#card-element-new"); // Render the PayPal button in the card element container
          } else {
            console.error("PayPal SDK not loaded");
          }
        }
      };

      document.getElementById("stripe-radio").onclick = function () {
        setTimeout(() => {
          const cardTab = document.querySelector(".p-PaymentMethodSelector");
          if (cardTab) cardTab.style.display = "none";
        }, 10000);
        // Clear PayPal button
        document.getElementById("card-element-stripe").style.display = "block";
        // document.getElementById("card-element-new").style.display = "none";
        const containerremove = document.getElementById("card-element-new");
        const root = ReactDOM.createRoot(containerremove);
        root.unmount();
        // document.getElementsById("card-tab").style.display = "none";
        // document.getElementsById("cashapp-tab").style.display = "none";

        document
          .querySelector(".payment-method-stripe > label")
          .classList.add("active_payment_type");
        document
          .querySelector(".payment-method-paypal > label")
          .classList.remove("active_payment_type");
        setPaymentSubmitState("stripe");
        const submitButtons = document.querySelectorAll(
          'button[type="submit"]'
        );

        submitButtons.forEach((button) => {
          button.style.display = "inline-block"; // Shows the button again (use 'block' if needed)
        });
        const paypalButtonContainer = document.getElementById(
          "paypal-button-container"
        );
        if (paypalButtonContainer) {
          paypalButtonContainer.innerHTML = ""; // Clears the PayPal buttons
        }

        // Initialize or mount Stripe card element
        if (cardElement) {
          cardElement.clear(); // Clears the Stripe form
        } else {
          dispatch(
            getStripeSecrate({
              secretKey: secrateKey,
              amount: paid_amount,
              currency: "usd",
            })
          ).then((res) => {
            setStripes(res?.payload?.client_secret);

            if (res?.payload?.client_secret) {
              // Assuming you have a `loadStripeForm` function to render the form
              setCardElement(null);
              setClientSecrate(res?.payload?.client_secret);
              let stripe = Stripe(stripeKey);
              let elements = stripe.elements();
              let cardElement = elements.create("card");
              cardElement.mount("#card-element-stripe");
            }
          });
        }
      };

      document.getElementById(
        "annual_price"
      ).innerHTML = `$${oneTime?.one_type_payment_price}`;
      document.getElementById(
        "monthly_price"
      ).innerHTML = `$${subscription?.subscription_base_price}`;

      if (!subscription?.subscription_base_price) {
        document.getElementById("subscriptionHide").style.display = "none";
        document.querySelector('input[id="annual_opt"]:checked');

        if (document.getElementById("orderAmount")) {
          // alert("onetime", oneTime?.one_type_payment_price);
          // alert("calculated", calculatedPrice);
          console.log("isCouponApply", isCouponApply);

          document.getElementById("orderAmount").innerHTML = `$${
            isCouponApply ? calculatedPrice : oneTime?.one_type_payment_price
          }`;
          const leftPrice = document.getElementById(
            "cart_wrap_name_list_left_price"
          );
          if (leftPrice) {
            leftPrice.innerHTML = `$${oneTime?.one_type_payment_price}`;
          }

          const wrapPrice = document.getElementById(
            "cart_wrap_price_list_total_wrap_price_price"
          );
          if (wrapPrice) {
            wrapPrice.innerHTML = `$${oneTime?.one_type_payment_price}`;
          }
        }

        if (document.getElementById("orderAmount-2")) {
          document.getElementById("orderAmount-2").innerHTML = `$${
            isCouponApply ? calculatedPrice : oneTime?.one_type_payment_price
          }`;
          const leftPrice = document.getElementById(
            "cart_wrap_name_list_left_price"
          );
          if (leftPrice) {
            leftPrice.innerHTML = `$${oneTime?.one_type_payment_price}`;
          }

          const wrapPrice = document.getElementById(
            "cart_wrap_price_list_total_wrap_price_price"
          );
          if (wrapPrice) {
            wrapPrice.innerHTML = `$${oneTime?.one_type_payment_price}`;
          }
        }
        if (document.getElementById("proName")) {
          document.getElementById("proName").innerHTML = `${productName}`;
        }
      }
      if (!oneTime?.one_type_payment_price) {
        document.getElementById("oneTimeHide").style.display = "none";
        document.querySelector('input[id="monthly_opt"]:checked');
        document.getElementById("myContainer").style.paddingTop = "5rem";
        document.getElementById("myContainer").style.paddingBottom = "5rem";
      }
      if (
        subscription?.subscription_base_price &&
        oneTime?.one_type_payment_price
      ) {
        document.querySelector('input[id="annual_opt"]:checked');
      }
      console.log("!stripe?.length", stripe?.length);

      if (!stripe?.length) {
        document.getElementById("stripeScetion").style.display = "none";
        document.querySelector('input[id="paypal-radio"]:checked');
      }
      console.log("!paypal?.length", paypal?.length);
      if (!paypal?.length) {
        document.getElementById("paypalSection").style.display = "none";
        document.querySelector('input[id="stripe-radio"]:checked');
      }

      document.getElementById("annual_text").innerHTML = "One Time payment";
      document.getElementById("monthly_text").innerHTML = "Subscription";
      const annu = document.getElementById("annual_offer");
      if (annu) {
        annu.innerHTML = `Special one-time offer, only $${oneTime?.one_type_payment_price}`;
      }

      const mnt = document.getElementById("monthly_offer");
      if (mnt) {
        mnt.innerHTML = `Special offer, only $${subscription?.subscription_base_price}`;
      }

      const elementCart = document.getElementById(
        "cart_wrap_name_list_left_name"
      );
      if (elementCart) {
        elementCart.innerHTML = `${productName}`;
      }
      // document.getElementById("iiuf8").innerHTML = `${productName}`;
      const element = document.getElementById("iiuf8");

      if (element) {
        element.innerHTML = `${productName}`;
      } else {
        console.log("Element or productName is null or undefined.");
      }
    }
    localStorage.setItem("paid_amount", paid_amount);
    localStorage.setItem("user_id", userId);
    localStorage.setItem("product_id", productId?.id);
    localStorage.setItem("product_price_id", priceId);
    localStorage.setItem("stripePublishableKey", stripeKey);
    localStorage.setItem("stripeClientSecret", secrateKey);

    console.log("Effect triggered");

    // Ref to track if click has been triggered

    if (html && stripeKey && !paypal?.length) {
      console.log("Both html and stripeKey are available");

      const stripeRadio = document.getElementById("stripe-radio");
      if (stripeRadio) {
        stripeRadio.click(); // First click
      } else {
        console.log("stripe-radio element not found");
      }
    } else if (html && paypalKey && !stripe?.length) {
      console.log("Both html and stripeKey are available");

      const paypalRadio = document.getElementById("paypal-radio");
      if (paypalRadio) {
        paypalRadio.click(); // First click
      } else {
        console.log("paypal-radio element not found");
      }
    } else if (html && paypalKey) {
      console.log("Both html and stripeKey are available");

      const paypalRadio = document.getElementById("paypal-radio");
      if (paypalRadio) {
        paypalRadio.click(); // First click
      } else {
        console.log("paypal-radio element not found");
      }
    }
  }, [
    html,
    oneTime,
    subscription,
    stripe,
    paypal,
    stripeKey,
    paypalKey,
    isCouponApply,
  ]); // Add dependencies only for relevant data, not for stripejs
  useEffect(() => {
    if (stripeKey) {
      // Initialize stripePromise only once when stripeKey is available
      const stripeLoadPromise = loadStripe(stripeKey);
      setStripePromise(stripeLoadPromise);
      setTimeout(() => {
        const cardTab = document.querySelector(".p-PaymentMethodSelector");
        if (cardTab) cardTab.style.display = "none";
      }, 100);
    }
  }, [stripeKey]);

  useEffect(() => {
    if (stripePromise && clientSecret) {
      const stripeOptions = {
        clientSecret: clientSecret,
      };
      setOptions(stripeOptions);
      setPaymentSubmitState("stripe");
      setTimeout(() => {
        const cardTab = document.querySelector(".p-PaymentMethodSelector");
        if (cardTab) cardTab.style.display = "none";
      }, 100);
    }
  }, [stripePromise, clientSecret]);

  useEffect(() => {
    const mountPaymentElement = async () => {
      if (!stripePromise || !options) return;
      setPaymentSubmitState("stripe");
      const stripejs = await stripePromise;
      const elements = stripejs.elements(options);
      setPaymentSubmitState("stripe");
      // Create the Payment Element
      const paymentElement = elements.create("payment");

      const container = document.getElementById("card-element-stripe");

      if (container) {
        container.innerHTML = ""; // Clear the container
        paymentElement.mount("#card-element-stripe");

        setIsPaymentElementMounted(true);
        setPaymentElements(paymentElement);
        setPaymentSubmitState("stripe");
        setTimeout(() => {
          const cardTab = document.querySelector(".p-PaymentMethodSelector");
          if (cardTab) cardTab.style.display = "none";
        }, 100);
      }
    };

    if (stripePromise && options) {
      mountPaymentElement();
      setPaymentSubmitState("stripe");
      // document.getElementsById("card-tab").style.display = "none";
      // document.getElementsById("cashapp-tab").style.display = "none";

      setTimeout(() => {
        const cardTab = document.querySelector(".p-PaymentMethodSelector");
        if (cardTab) cardTab.style.display = "none";
      }, 100);
    }
  }, [stripePromise, options]);
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault(); // Prevent form reload

      const formElements = event.target.elements;
      const formData = {};

      // Loop through form elements to collect their key and value
      for (let element of formElements) {
        if (element.id && element.value) {
          let key;

          // Priority 1: Use className if it exists
          console.log(element.name, "element");
          if (element.name) {
            key = element.name;
          }
          // Priority 2: Use placeholder if it exists
          else if (element.placeholder) {
            key = element.placeholder;
          }
          // Priority 3: Use the associated label's innerText as key
          else {
            const label = document.querySelector(`label[for="${element.id}"]`);
            key = label ? label.innerText : element.id; // Fallback to id if no label is found
          }

          // Only include elements with a key and value
          formData[key] = element.value;
        }
      }
      console.log(formData, "formDataformDataformData");
      localStorage.setItem("formData", JSON.stringify(formData));
      // if (paymentSubmitState === "stripe") {
      if (isSubmitting) return; // Prevent multiple submissions
      setIsSubmitting(true); // Set submitting state to true

      // Ensure stripejs and paymentElements are available
      const stripejs = await stripePromise;
      if (!stripejs || !paymentElements) {
        setIsSubmitting(false); // Reset the state if there's an issue
        return;
      }

      // Attempt to confirm the payment
      const { error, paymentIntent } = await stripejs.confirmPayment({
        elements: paymentElements, // Pass the Elements group containing the card element
        confirmParams: {
          return_url: window.location.href, // URL to redirect after successful payment
        },
      });

      if (error) {
        // Handle payment failure
        console.error("Payment failed:", error.message);
        alert(error.message); // You can display a custom error message here
        setIsSubmitting(false); // Reset submitting state on failure
      } else if (paymentIntent.status === "succeeded") {
        // Payment succeeded
        console.log("Payment successful!");
        alert("Payment successful!"); // Show a success message to the user

        // Optionally, navigate to a success page or redirect
        // e.g., navigate('/payment-success');
      } else {
        // Handle other payment statuses if necessary
        console.log("Payment status:", paymentIntent.status);
        setIsSubmitting(false); // Reset submitting state
      }
      // } else {
      navigate("/key-load");
      // }
    },
    [stripejs, cardElement, paid_amount]
  );

  const storePaymentDetails = async (paymentResult) => {
    // Send the payment result to your backend for storage
    await fetch("/api/store-payment-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentResult),
    });
  };

  useEffect(() => {
    const form = document.getElementById("myForm");
    if (form) {
      form.addEventListener("submit", handleSubmit);
    }

    return () => {
      if (form) {
        form.removeEventListener("submit", handleSubmit);
      }
    };
  }, [handleSubmit]);
  return (
    <>
      <div className="w-full">
        <form id="myForm">{html}</form>
      </div>
    </>
  );
};
export default TemplateByProduct;
