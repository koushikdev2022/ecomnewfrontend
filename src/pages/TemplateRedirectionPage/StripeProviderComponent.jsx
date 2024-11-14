// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { useEffect, useState } from "react";
// import CheckoutForm from "./CheckoutForm";
// import { useDispatch } from "react-redux";
// import { getStripeSecrate } from "../../Reducer/PaymentSlice";
// import { useLocation } from "react-router-dom";
// import { Modal } from "flowbite-react";

// const StripeProviderComponent = ({ openStripeModal, setOpenStripeModal }) => {
//   const [stripePromise, setStripePromise] = useState(null);
//   const [options, setOptions] = useState(null);
//   // const location = useLocation();
//   // console.log("Location: ", location?.state);
//   // let stripeClientSecret = location?.state?.key;

//   const stripePublishableKey = localStorage.getItem("stripePublishableKey");
//   const stripeSecret = localStorage.getItem("stripeClientSecret");
//   const paid_amount = localStorage.getItem("paid_amount");
//   const dispatch = useDispatch();
//   const [stripes, setStripes] = useState();
//   useEffect(() => {
//     dispatch(
//       getStripeSecrate({
//         secretKey: stripeSecret,
//         amount: paid_amount,
//         currency: "usd",
//       })
//     ).then((res) => {
//       setStripes(res?.payload?.client_secret);
//     });
//   }, [dispatch]);
//   useEffect(() => {
//     if (stripes) {
//       const promise = loadStripe(stripePublishableKey);
//       setStripePromise(promise);

//       const stripe_options = {
//         clientSecret: stripes,
//       };
//       setOptions(stripe_options);
//     }
//   }, [stripes, stripePublishableKey]);
//   return (
//     <>
//       {/* <Modal
//         show={openStripeModal}
//         onClose={() => setOpenStripeModal(false)}
//         size="4xl"
//       >
//         <Modal.Header className="coose_product_bg">Payment</Modal.Header>

//         <Elements stripe={stripePromise} options={options}>
//           <CheckoutForm />
//         </Elements>
//       </Modal> */}
//     </>
//   );
// };

// export default StripeProviderComponent;
