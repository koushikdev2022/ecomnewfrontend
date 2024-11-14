import { Label, Select, Textarea, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdPreview } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPaymentProvider } from "../../Reducer/PaymentProcessorSlice";
import { paymentSetUpkey } from "../../Reducer/PaymentSetupSlice";
import { Base64 } from "js-base64";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const { provider } = useSelector((state) => state?.paymentPro);
  const dispatch = useDispatch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const jsonObject = localStorage.getItem("userId");
  const userIdDeocoded = Base64.decode(jsonObject);
  const useridjson = JSON.parse(userIdDeocoded);
  const userid = useridjson.user_id;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    dispatch(getPaymentProvider());
  }, []);
  console.log("Payment Provider: ", provider?.payload?.paymentProviderTypes);
  const title = watch("title");
  useEffect(() => {
    // Enable button only if a payment method is selected
    if (title && title !== "Select Payment Method") {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [title]);
  const onSubmit = (data) => {
    console.log("Data: ", data);
    const payload = {
      title: data?.title,
      stripe_key: data?.stripe_key,
      stripe_secret: data?.stripe_secret,
      paypal_key: data?.paypal_key,
      paypal_secret: data?.paypal_secret,
      stripe_account_name: data?.stripe_account_name,
      stripe_email: data?.stripe_email,
      paypal_account_name: data?.paypal_account_name,
      paypal_email: data?.paypal_email,
      user_id: userid,
    };
    dispatch(paymentSetUpkey(payload)).then((res) => {
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
  return (
    <div className="wrapper_area max-w-7xl my-0 mx-auto px-0">
      <div className="bg-white mb-4 md:mb-0 py-6 px-6 shadow-md rounded-xl w-full h-screen">
        <h1 className="text-2xl font-medium text-teal-400 mb-4">Settings</h1>
        <ToastContainer />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white shadow-xl pt-12 rounded-lg mb-16">
            <div className="flex gap-8 px-12">
              <div className="w-6/12">
                <div className="mb-8">
                  <Select required {...register("title")}>
                    <option>Select Payment Method</option>
                    {provider?.payload?.paymentProviderTypes?.map((p_type) => {
                      return (
                        <>
                          <option value={p_type?.provider_type}>
                            {p_type?.provider_type}
                          </option>
                        </>
                      );
                    })}
                  </Select>
                </div>
                {title === "stripe" && (
                  <>
                    <div className="mb-6">
                      <div className="mb-2 block">
                        <Label htmlFor="base" value="Enter Your Stripe Key" />
                      </div>
                      <TextInput
                        type="text"
                        sizing="md"
                        placeholder="Stripe Key"
                        {...register("stripe_key", { required: true })}
                      />
                    </div>

                    <div className="mb-6">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="base"
                          value="Enter Your Stripe Secret"
                        />
                      </div>
                      <TextInput
                        type="text"
                        sizing="md"
                        placeholder="Stripe Secret"
                        {...register("stripe_secret", { required: true })}
                      />
                    </div>
                    <div className="mb-6">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="base"
                          value="Enter  Stripe Account Holder Name"
                        />
                      </div>
                      <TextInput
                        type="text"
                        sizing="md"
                        placeholder="Stripe Account Holder Name"
                        {...register("stripe_account_name", { required: true })}
                      />
                    </div>

                    <div className="mb-6">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="base"
                          value="Enter Stripe Account Holder Email"
                        />
                      </div>
                      <TextInput
                        type="text"
                        sizing="md"
                        placeholder="Stripe Account Holder Email"
                        {...register("stripe_email", { required: true })}
                      />
                    </div>
                  </>
                )}

                {title === "paypal" && (
                  <>
                    <div className="mb-6">
                      <div className="mb-2 block">
                        <Label htmlFor="base" value="Enter Your Paypal Key" />
                      </div>
                      <TextInput
                        type="text"
                        sizing="md"
                        placeholder="Paypal Key"
                        {...register("paypal_key", { required: true })}
                      />
                    </div>

                    <div className="mb-6">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="base"
                          value="Enter Your Paypal Secret"
                        />
                      </div>
                      <TextInput
                        type="text"
                        sizing="md"
                        placeholder="Paypal Secret"
                        {...register("paypal_secret", { required: true })}
                      />
                    </div>
                    <div className="mb-6">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="base"
                          value="Enter  Paypal Account Holder Name"
                        />
                      </div>
                      <TextInput
                        type="text"
                        sizing="md"
                        placeholder="Paypal Account Holder Name"
                        {...register("paypal_account_name", { required: true })}
                      />
                    </div>

                    <div className="mb-6">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="base"
                          value="Enter Paypal Account Holder Email"
                        />
                      </div>
                      <TextInput
                        type="text"
                        sizing="md"
                        placeholder="Paypal Account Holder Email"
                        {...register("paypal_email", { required: true })}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 mt-8">
              <Link
                to="/product"
                className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg"
              >
                Back
              </Link>
              <button
                type="submit"
                // className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-3xl"
                // disabled={!title}
                disabled={isButtonDisabled}
                className={`${
                  isButtonDisabled
                    ? "bg-gray-400"
                    : "bg-[#4ABCEF] hover:bg-[#373737]"
                } text-white text-xl leading-[54px] font-semibold text-center rounded-br-3xl`}
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
