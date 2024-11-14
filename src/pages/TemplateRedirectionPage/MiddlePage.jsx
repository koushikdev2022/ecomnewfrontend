import { useEffect, useState } from "react";
import { getStripeSecrate } from "../../Reducer/PaymentSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productOrder } from "../../Reducer/PaymentProcessorSlice";

const MiddlePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [stripeClientSecret, setStripeClientSecret] = useState();
  // useEffect(() => {
  //   dispatch(
  //     getStripeSecrate({
  //       secretKey:
  //         "sk_test_51M6qSuKkenLncuTqoxkdQxV0h85EKqzpvOGLAMRJo6HotutAlv09kZnS1XODTTyRTgWwt1U2588guXRtPrfcJ3dp006Kcgf6wQ",
  //       amount: 30,
  //       currency: "usd",
  //     })
  //   ).then((res) => {
  //     console.log("Res: ", res);
  //     setStripeClientSecret(res?.payload?.client_secret);
  //     console.log("");

  //     navigate("/payment", {
  //       state: { key: res?.payload?.client_secret },
  //     });
  //   });
  // }, []);
  // console.log("stripeClientSecret", stripeClientSecret);

  const formData = JSON.parse(localStorage.getItem("formData"));
  const paid_amount = localStorage.getItem("paid_amount");
  const user_id = localStorage.getItem("user_id");
  const product_id = localStorage.getItem("product_id");
  const product_price_id = localStorage.getItem("product_price_id");
  useEffect(() => {
    if (formData) {
      const payload = {
        paid_amount: paid_amount,
        user_id: parseInt(user_id),
        product_id: product_id,
        product_price_id: product_price_id,
        order_json: [formData],
      };
      dispatch(productOrder(payload)).then((res) => {
        console.log("Response: ", res);
        if (res?.payload?.status_code === 200) {
          localStorage.removeItem("paid_amount");
          localStorage.removeItem("product_id");
          localStorage.removeItem("product_price_id");
          localStorage.removeItem("stripePublishableKey");
          localStorage.removeItem("stripeClientSecret");
          localStorage.removeItem("formData");
          navigate("/payment-redirect");
        }
      });
    }
    // navigate("/payment-redirect");
  }, []);
  return (
    <>
      <h1>Loading....</h1>
    </>
  );
};
export default MiddlePage;
