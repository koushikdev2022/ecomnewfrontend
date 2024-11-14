import { Button } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { productOrder } from "../../Reducer/PaymentProcessorSlice";
import { useNavigate } from "react-router-dom";

const PaymentRedirect = () => {
  // const formData = JSON.parse(localStorage.getItem("formData"));
  // const paid_amount = localStorage.getItem("paid_amount");
  // const user_id = localStorage.getItem("user_id");
  // const product_id = localStorage.getItem("product_id");
  // const product_price_id = localStorage.getItem("product_price_id");
  // const dispatch = useDispatch();
  // const nevigate = useNavigate();
  // useEffect(() => {
  //   if (formData) {
  //     const payload = {
  //       paid_amount: paid_amount,
  //       user_id: parseInt(user_id),
  //       product_id: product_id,
  //       product_price_id: product_price_id,
  //       order_json: [formData],
  //     };
  //     dispatch(productOrder(payload)).then((res) => {
  //       console.log("Response: ", res);
  //       if (res?.payload?.status_code === 200) {
  //         localStorage.removeItem("paid_amount");
  //         localStorage.removeItem("product_id");
  //         localStorage.removeItem("product_price_id");
  //         localStorage.removeItem("stripePublishableKey");
  //         localStorage.removeItem("stripeClientSecret");
  //         localStorage.removeItem("formData");
  //         nevigate("/payment-redirect");
  //       }
  //     });
  //   }
  // }, []);
  return (
    <>
      <div className="h-96 flex justify-center items-center">
        <div className="container mx-auto mt-3">
          {/* <p className="text-center">Please do not refresh the page</p> */}

          <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
            role="alert"
          >
            <p className="font-bold">Success! </p>
          </div>

          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
            role="alert"
          >
            <Button className="m-2 p-2 rounded-md" color="gray">
              Back
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default PaymentRedirect;
