import { Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdPriceChange } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCurrency, getPaymentType } from "../../Reducer/PricingSlice";
import { createDownSellPricing } from "../../Reducer/DownSellSlice";
import DownSellSubscription from "./DownSellSubscription";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DownSellPricing = ({ setShow, proId, onBack }) => {
  const { currency, paymentType } = useSelector((state) => state?.pricing);
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState("");
  //form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const limitOfQuantity = watch("quantity");
  const getPaymentTypes = watch("payment_type");
  const selectCurrency = watch("currency");

  //useEffect for currency and payment
  useEffect(() => {
    dispatch(getCurrency());
    dispatch(getPaymentType());
  }, [dispatch]);

  //select currency
  const handleCurrencyChange = (event) => {
    const currency = event.target.value;
    // console.log("handleCurrencyChange called with:", currency);
    setSelectedCurrency(currency);
    // console.log("selectedCurrency updated to:", currency);
  };

  //onsubmit

  const onSubmit = (data) => {
    const payload = {
      sells_product_id: proId,
      sold_out: data?.sold_out,
      quantity: parseInt(data?.quantity),
      quantity_allow_to_purchase: parseInt(data?.quantity_allow_to_purchase),
      one_time_type: getPaymentTypes === "One time fee" ? true : false,
      one_time_data: {
        currency: data?.currency,
        payment_type: data?.payment_type,
        price: data?.price,
        one_time_quantity: parseInt(data?.one_time_quantity),
      },
      subscription_type: getPaymentTypes === "Subscription" ? true : false,
      subscription_type_data: {
        currency: data?.currency,
        payment_type: data?.payment_type,
        subscription_type_billing_frequency:
          data?.subscription_type_billing_frequency,
        subscription_base_price: data?.subscription_base_price,
        subscription_today_base_price: data?.subscription_today_base_price,
        subscription_trial_period:
          Date.now() + data?.subscription_trial_period * data?.dayOrMonth,
        subscription_rebills: data?.subscription_rebills,
      },
    };

    dispatch(createDownSellPricing(payload)).then((res) => {
      // console.log("Pricing: ", res);
      if (res.payload?.status_code === 201) {
        nevigate("/downsells");
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
  const handlePreviousPage = () => {
    setShow({ DownSellOption: true, DownSellPricing: false });
    onBack();
  };
  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white shadow-xl pt-12 rounded-lg mb-16">
          <div className="px-12">
            <div className="mb-6 flex items-center">
              <MdPriceChange className="text-[#E37B5C] text-4xl mr-2" />
              <h2 className="text-black font-bold text-[28px]">
                Pricing options for your downsell
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8">
              <div className="mb-6">
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Currency" />
                </div>
                <Select
                  required
                  onChange={() => {
                    handleCurrencyChange();
                  }}
                  {...register("currency", { required: true })}
                >
                  <option>Select</option>
                  {currency?.data?.map((cur) => {
                    return (
                      <>
                        <option
                          key={cur?.currency_name}
                          value={cur?.currency_name}
                        >
                          {cur?.currency_name}
                        </option>
                      </>
                    );
                  })}
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8">
              <div className="mb-6">
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Product type" />
                </div>
                <Select required {...register("payment_type")}>
                  <option>Select Payment Type</option>
                  {paymentType.data?.map((payType) => {
                    return (
                      <>
                        <option value={payType?.payment_type_name}>
                          {payType?.payment_type_name}
                        </option>
                      </>
                    );
                  })}
                </Select>
              </div>
            </div>
            {getPaymentTypes === "One time fee" && (
              <>
                <div className="grid grid-cols-1 gap-8">
                  <div className="mb-6">
                    <div className="mb-2 block">
                      <Label htmlFor="base" value="Limit of Quantity" />
                    </div>
                    <Select
                      required
                      {...register("quantity", { required: true })}
                    >
                      <option>Select</option>
                      <option value={0}>Unlimited</option>
                      <option value={1}>Limited</option>
                    </Select>
                  </div>
                </div>
                {limitOfQuantity === "1" && (
                  <div className="mb-5">
                    <>
                      <div className="mb-2 block">
                        <Label htmlFor="countries" value="Quantity" />
                      </div>
                      <TextInput
                        type="text"
                        placeholder="Quantity"
                        {...register("one_time_quantity")}
                      />
                    </>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-8">
                  <div className="mb-6">
                    <div className="mb-2 block">
                      <Label htmlFor="base" value="I want to..." />
                    </div>
                    <Select
                      required
                      {...register("quantity_allow_to_purchase", {
                        required: true,
                      })}
                    >
                      <option>Select</option>
                      <option value={0}>
                        Only allow one purchase at a time
                      </option>
                      <option value={1}>
                        Allow multiple purchases at once
                      </option>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="mb-6">
                    <div className="mb-2 inline-flex items-center">
                      <Label htmlFor="base" value="Price" />
                    </div>
                    <TextInput
                      type="text"
                      sizing="md"
                      placeholder={selectCurrency}
                      {...register("price", { required: true })}
                    />
                  </div>
                  <div className="mb-6">
                    <div className="mb-2 block">
                      <Label htmlFor="base" value="Trail period" />
                    </div>
                    <Select required>
                      <option>None</option>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-8">
                  <div className="mb-6">
                    <div className="mb-2 block">
                      <Label htmlFor="base" value="When All Copies are sold" />
                    </div>
                    <Select
                      required
                      {...register("sold_out", { required: true })}
                    >
                      <option>Select</option>
                      <option value={0}>Skip this Downsell</option>
                      <option value={1}>Reset the Countdown</option>
                    </Select>
                  </div>
                </div>
              </>
            )}
            {getPaymentTypes === "Subscription" && (
              <DownSellSubscription
                limit_of_Quantity={limitOfQuantity}
                register={register}
                selectCurrency={selectCurrency}
                watch={watch}
                errors={errors}
              />
            )}

            <div className="mb-5">
              <div className="notify_section border border-[#48C7FF] p-8">
                <p className="text-black">
                  This is a free product and your customer will not be charged.
                  The currency used will be that of the product tha this
                  downsell is attached to.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-8">
            <button
              onClick={handlePreviousPage}
              type="button"
              className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default DownSellPricing;
