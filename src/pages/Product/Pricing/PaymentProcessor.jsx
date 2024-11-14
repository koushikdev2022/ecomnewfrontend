import { Checkbox, Label, Modal, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { BiSolidCreditCard } from "react-icons/bi";
import { Link } from "react-router-dom";
import { paypalIcon, stripeIcon } from "../../../assets/images/images";
import { useDispatch, useSelector } from "react-redux";
import {
  createPaymentProvider,
  getPaymentProvider,
  paymentKeySetupPaypal,
  paymentKeySetupStripe,
} from "../../../Reducer/PaymentProcessorSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const PaymentProcessor = ({ setShow, onComplete, onBack, proid }) => {
  const [openPaymentProcessorsModal, setOpenPaymentProcessorsModal] =
    useState(false);
  const { provider, paymentKeysStripe, paymentKeysPaypal } = useSelector(
    (state) => state?.paymentPro
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPaymentProvider());
    dispatch(paymentKeySetupStripe());
    dispatch(paymentKeySetupPaypal());
  }, [dispatch]);
  // console.log("Provider: ", provider);
  // console.log("paymentKeysStripe", paymentKeysStripe);
  // console.log("Payment key paypal: ", paymentKeysPaypal);

  const { register, handleSubmit, watch } = useForm();

  const onSubmit = (data) => {
    console.log("data: ", data);
    alert(JSON.stringify(data));
    let newKey;
    if (
      data?.payment_key_setup_id == "1" &&
      !data?.payment_key_setup_id_new === "select"
    ) {
      newKey = data?.payment_key_setup_id;
    } else if (
      data?.payment_key_setup_id === "select" &&
      data?.payment_key_setup_id_new === "2"
    ) {
      newKey = data?.payment_key_setup_id_new;
    } else if (
      data?.payment_key_setup_id &&
      data?.payment_key_setup_id_new === "select"
    ) {
      newKey = data?.payment_key_setup_id;
    } else {
      newKey = data?.payment_key_setup_id_new;
    }
    const payload = {
      payment_provider_id: data?.payment_provider_id,
      product_id: proid,
      payment_key_setup_id: newKey,
    };
    dispatch(createPaymentProvider(payload)).then((res) => {
      console.log("Res: ", res);
      if (res?.payload?.status_code === 201) {
        toast.success(res?.payload?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
        setOpenPaymentProcessorsModal(false);
      } else {
        toast.error(res?.payload?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      }
    });
  };
  const handleNextPage = () => {
    setShow({
      AddProduct: false,
      PricingProduct: false,
      Customer_Invoice: false,
      BumpProduct: false,
      PaymentProcessor: false,
      PaymentProcessorTwo: true,
      AffilietsProduct: false,
    });
    onComplete();
  };

  const handlePreviousePage = () => {
    setShow({
      AddProduct: false,
      PricingProduct: false,
      Customer_Invoice: false,
      BumpProduct: true,
      PaymentProcessor: false,
      PaymentProcessorTwo: false,
      AffilietsProduct: false,
    });
    onBack();
  };

  const provider_id = watch("payment_provider_id");

  return (
    <>
      <div className="bg-white shadow-xl pt-12 rounded-lg mb-16">
        <div className="flex gap-8 px-12">
          <div className="w-full">
            <div className="mb-6 flex items-center">
              <BiSolidCreditCard className="text-[#E37B5C] text-4xl mr-2" />
              <h2 className="text-black font-bold text-[28px]">
                Payment processors for your product
              </h2>
            </div>
            <div className="border border-[#48C7FF] p-8 text-center mb-4">
              <p className="text-black text-[22px] font-semibold pb-6">
                Choose your payment processors
              </p>
              <p className="text-[#616161] text-[18px] font-medium pb-4">
                Set up how you ‘ll accept from your customers
              </p>
              <div className="text-center my-3">
                <button
                  onClick={() => setOpenPaymentProcessorsModal(true)}
                  className="bg-[#D2F1FF] text-[#2AA9E1] hover:text-white text-2xl font-bold hover:bg-[#373737] px-16 py-4 rounded-lg inline-flex justify-center items-center"
                >
                  <BiSolidCreditCard className="mr-2" />
                  Set up payment processors
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-8">
          <button
            type="button"
            onClick={() => {
              handlePreviousePage();
            }}
            className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => handleNextPage()}
            className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg"
          >
            Next
          </button>
        </div>
      </div>

      <Modal
        show={openPaymentProcessorsModal}
        onClose={() => setOpenPaymentProcessorsModal(false)}
        size="4xl"
        className="product_details_area"
      >
        <Modal.Header className="coose_product_bg payment_pop pl-10">
          Set up your pricing option
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="p-0">
            <div className="py-10 px-10">
              <div className="mb-10">
                <p className="text-[#535353] text-xl font-medium">
                  Select the processors and accounts used to sell this product.
                </p>
              </div>
              <div className="mb-5">
                {/* Paypal details */}
                <div className="flex items-center gap-2 mb-8">
                  <Checkbox
                    className="mr-2"
                    value={provider?.payload?.paymentProviderTypes?.[1]?.id}
                    {...register("payment_provider_id")}
                  />
                  <Label htmlFor="product" className="text-black font-bold">
                    <img
                      src={provider?.payload?.paymentProviderTypes?.[1]?.image}
                      alt="paypalIcon"
                      className="w-20 mr-4"
                    />
                  </Label>
                  <Select
                    className="w-80"
                    {...register("payment_key_setup_id")}
                  >
                    <option>Select</option>
                    {paymentKeysPaypal?.data?.map((pkey) => {
                      return (
                        <>
                          {console.log("pkey?.id", pkey?.id)}
                          <option key={pkey?.id} value={pkey?.id}>
                            {pkey?.paypal_account_name}
                          </option>
                        </>
                      );
                    })}
                  </Select>
                </div>

                {/* Stripe Details */}
                <div className="flex items-center gap-2 mb-8">
                  <Checkbox
                    className="mr-2"
                    value={provider?.payload?.paymentProviderTypes?.[0]?.id}
                    {...register("payment_provider_id")}
                  />
                  {console.log(
                    "provider?.payload?.paymentProviderTypes?.[0]?.id",
                    provider?.payload?.paymentProviderTypes?.[0]?.id
                  )}
                  <Label htmlFor="product" className="text-black font-bold">
                    <img
                      src={provider?.payload?.paymentProviderTypes?.[0]?.image}
                      alt="stripeIcon"
                      className="w-20 mr-4"
                    />
                  </Label>

                  <Select
                    className="w-80"
                    {...register("payment_key_setup_id_new")}
                  >
                    <option value="select">Select</option>
                    {paymentKeysStripe?.data?.map((skey) => {
                      return (
                        <>
                          <option value={skey?.id}>
                            {skey?.stripe_account_name}
                          </option>
                        </>
                      );
                    })}
                  </Select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-0">
              <Link className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg">
                Back
              </Link>
              <button
                type="submit"
                className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg"
              >
                Next
              </button>
            </div>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
};
export default PaymentProcessor;
