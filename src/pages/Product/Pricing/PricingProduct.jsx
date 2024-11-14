import { Checkbox, Label, Modal, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaFileInvoiceDollar, FaPlus } from "react-icons/fa";
import { FaHandshakeSimple } from "react-icons/fa6";
import { MdPriceChange } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addPricing,
  addProductQuantity,
  getCurrency,
  getPaymentType,
} from "../../../Reducer/PricingSlice";
import { useForm } from "react-hook-form";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import SubscriptionForm from "../SubscriptionForm";
import { getProductList } from "../../../Reducer/ProductSlice";

const PricingProduct = ({
  proid,
  setShow,
  setCurrencyId,
  onComplete,
  onBack,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const { productList } = useSelector((state) => state?.product);
  const [openPricingOptionModal, setOpenPricingOptionModal] = useState(false);
  const [isCurrencySelected, setIsCurrencySelected] = useState(false);
  const [priceId, setPriceId] = useState("");
  const [paymentTypePrice, setpaymentTypePrice] = useState("");
  const [payment_Type, setPayment_Type] = useState("");
  const [openPricingOptionTwoModal, setOpenPricingOptionTwoModal] =
    useState(false);
  const handleCurrencyChange = (event) => {
    // setSelectedCurrency(event.target.value);
    const selected = event.target.value;
    setSelectedCurrency(selected);
    setIsCurrencySelected(selected !== "Select");
  };
  const dispatch = useDispatch();
  const { currency, paymentType } = useSelector((state) => state?.pricing);

  const handlenextPage = () => {
    setShow({
      AddProduct: false,
      PricingProduct: false,
      Customer_Invoice: false,
      BumpProduct: true,
      PaymentProcessor: false,
      PaymentProcessorTwo: false,
      AffilietsProduct: false,
    });
    onComplete();
  };

  const handlepreviousPage = () => {
    setShow({
      AddProduct: true,
      PricingProduct: false,
      Customer_Invoice: false,
      BumpProduct: false,
      PaymentProcessor: false,
      PaymentProcessorTwo: false,
      AffilietsProduct: false,
    });
    onBack();
  };
  useEffect(() => {
    dispatch(getCurrency());
    dispatch(getPaymentType());
  }, [dispatch]);
  // console.log("Currency: ", currency?.data);
  // console.log("Payment Provider: ", paymentType);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    setValue: setValue1,
    watch: watch1,
  } = useForm();
  let getPaymentTypes = watch("payment_type");
  let limit_of_Quantity = watch("quantity");
  let getPrice = watch("price");
  const onSubmit = (data) => {
    const payload = {
      product_id: proid,
      one_time_type: getPaymentTypes === "One time fee" ? true : false,
      quantity: data?.quantity,
      one_time_data: {
        currency: selectedCurrency,
        payment_type: data?.payment_type,
        price: data?.price,
        one_type_quantity: parseInt(data?.one_type_quantity),
      },
      subscription_type: getPaymentTypes === "Subscription" ? true : false,
      subscription_type_data: {
        currency: selectedCurrency,
        payment_type: data?.payment_type,
        subscription_type_quantity: parseInt(data?.subscription_type_quantity),
        subscription_type_billing_frequency:
          data?.subscription_type_billing_frequency,
        subscription_base_price: data?.subscription_base_price,
        subscription_today_base_price: data?.subscription_today_base_price,
        subscription_trail_priod:
          Date.now() + data?.subscription_trail_priod * data?.dayOrMonth,
        subscription_rebills: data?.subscription_rebills,
      },
    };

    dispatch(addPricing(payload)).then((res) => {
      // console.log("resPrice: ", res);
      if (res?.payload?.status_code === 201) {
        setPriceId(res?.payload?.data?.id);
        setpaymentTypePrice(
          res?.payload?.data?.one_type_payment_price ||
            res?.payload?.data?.subscription_base_price
        );

        setPayment_Type(res?.payload?.data?.PaymentType?.payment_type_name);
        setCurrencyId(res?.payload?.data?.currency_id);
        setOpenPricingOptionModal(false);
        setOpenPricingOptionTwoModal(true);
      } else if (res?.payload?.response?.data?.status_code === 400) {
        toast.error(res?.payload?.response?.data?.message, {
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

  const onSubmit1 = (data) => {
    const payload = {
      price_id: priceId,
      quentity_allow_to_parchase: data?.quentity_allow_to_parchase,
    };
    dispatch(addProductQuantity(payload)).then((res) => {
      // console.log("res: ", res);
      if (res?.payload?.status_code === 201) {
        toast.success(res?.payload?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
        setOpenPricingOptionTwoModal(false);
        // setShow({
        //   AddProduct: false,
        //   PricingProduct: false,
        //   Customer_Invoice: false,
        //   BumpProduct: true,
        //   PaymentProcessor: false,
        //   PaymentProcessorTwo: false,
        //   AffilietsProduct: false,
        // });
        dispatch(getProductList({ page: 1, limit: 10, id: proid }));
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
  console.log(
    "Single Product List: ",
    productList?.data?.[0]?.productPriceData
  );
  return (
    <>
      <div className="bg-white shadow-xl pt-12 rounded-lg mb-16">
        <div className="flex gap-8 px-12">
          <div className="w-6/12">
            <div className="mb-6 flex items-center">
              <MdPriceChange className="text-[#E37B5C] text-4xl mr-2" />
              <h2 className="text-black font-bold text-[28px]">
                Set Price Prices
              </h2>
            </div>
            <p className="text-[#535353] text-xl font-medium">
              Choose the currency in which you want to sell
            </p>
            <div className="mt-20">
              {productList?.data?.[0]?.productPriceData?.map((paymentName) => {
                return (
                  <>
                    {paymentName?.paymentType.map((types) => {
                      return (
                        <>
                          <p className="text-black text-2xl font-normal pb-2">
                            {/* One -time Payment ($000.00) */}
                            {types?.payment_type_name}
                          </p>
                        </>
                      );
                    })}
                  </>
                );
              })}

              <span className="text-[#626262] text-[22px] font-medium">
                {/* $000.00 */}
              </span>
            </div>
          </div>
          <div className="w-6/12">
            <div className="mb-8">
              <Select required onChange={handleCurrencyChange}>
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
            <div className="flex justify-end">
              <div className="flex items-center">
                <Link className="bg-[#2AA9E1] hover:bg-[#C2ECFF] text-white hover:text-black text-base px-3 py-1 mr-2">
                  Edit
                </Link>
                <Link className="bg-[#C2ECFF] hover:bg-[#2AA9E1] text-black hover:text-white text-base px-3 py-1">
                  Remove
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center my-12">
          <button
            onClick={() => setOpenPricingOptionModal(true)}
            // className="bg-[#D2F1FF] text-[#2AA9E1] hover:text-white text-2xl font-bold hover:bg-[#373737] px-16 py-4 rounded-lg inline-flex justify-center items-center"

            className={`${
              isCurrencySelected
                ? "bg-[#D2F1FF] text-[#2AA9E1] hover:text-white text-2xl  hover:bg-[#373737] px-16 py-4 rounded-lg inline-flex justify-center items-center"
                : "bg-[#D2F1FF] text-[#2AA9E1] cursor-not-allowed text-2xl px-16 py-4 rounded-lg inline-flex justify-center items-center"
            } `}
            disabled={!isCurrencySelected}
          >
            <FaPlus className="mr-2" />
            Add product price
          </button>
        </div>
        <div className="grid grid-cols-2 mt-8">
          <button
            type="button"
            onClick={() => {
              handlepreviousPage();
            }}
            className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => {
              handlenextPage();
            }}
            className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg"
          >
            Next
          </button>
        </div>
      </div>
      <Modal
        show={openPricingOptionModal}
        onClose={() => setOpenPricingOptionModal(false)}
        size="4xl"
        className="product_details_area"
      >
        <Modal.Header className="coose_product_bg pl-10">
          Set up your pricing option
        </Modal.Header>
        <Modal.Body className="p-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-10 px-10">
              <div className="mb-5">
                <div className="mb-2 block">
                  <Label htmlFor="countries" value="Payment Type" />
                </div>
                <Select
                  required
                  {...register("payment_type", { required: true })}
                >
                  <option>Payment Type</option>
                  {paymentType?.data?.map((payType) => {
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
              {getPaymentTypes === "One time fee" && (
                <>
                  <div className="mb-5">
                    <div className="flex gap-8">
                      <div className="mb-0 w-6/12">
                        <div className="mb-2 block">
                          <Label htmlFor="countries" value="Price" />
                        </div>
                        <TextInput
                          type="text"
                          required
                          placeholder={selectedCurrency}
                          {...register("price", { required: true })}
                        />
                      </div>
                      <div className="mb-0 w-6/12">
                        <div className="mb-2 block">
                          <Label htmlFor="countries" value="Trail Period" />
                        </div>
                        <Select required>
                          <option>None</option>
                          <option>None 01</option>
                          <option>None 02</option>
                          <option>None 03</option>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="notify_section border border-[#48C7FF] p-8">
                      <p className="text-black">
                        Your customer will be charged {getPrice || `000.00`}
                        {selectedCurrency}immediately
                      </p>
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="mb-2 block">
                      <Label htmlFor="countries" value="Limit of Quantity" />
                    </div>
                    <Select
                      // onChange={handleLimitOfQuantityChange}
                      defaultValue={0}
                      {...register("quantity", { required: true })}
                    >
                      <option>Select Limit of Quantity</option>
                      <option value={0}>Unlimited</option>
                      <option value={1}>Limited</option>
                    </Select>
                  </div>

                  <div className="mb-5">
                    {limit_of_Quantity === "1" && (
                      <>
                        <div className="mb-2 block">
                          <Label htmlFor="countries" value="Quantity" />
                        </div>
                        <TextInput
                          type="text"
                          placeholder="Quantity"
                          {...register("one_type_quantity")}
                        />
                      </>
                    )}
                  </div>
                </>
              )}

              {getPaymentTypes === "Subscription" && (
                <SubscriptionForm
                  limit_of_Quantity={limit_of_Quantity}
                  register={register}
                  selectedCurrency={selectedCurrency}
                  watch={watch}
                  errors={errors}
                />
              )}
            </div>
            <div className="grid grid-cols-2 mt-0">
              <Link className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg">
                Back
              </Link>

              <button
                type="submit"
                // onClick={pricingOption}
                className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg"
              >
                Next
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* pricing modal two start here */}

      <Modal
        show={openPricingOptionTwoModal}
        onClose={() => setOpenPricingOptionTwoModal(false)}
        size="4xl"
        className="product_details_area"
      >
        <Modal.Header className="coose_product_bg pl-10">
          Set up your pricing option
        </Modal.Header>
        <Modal.Body className="p-0">
          <form onSubmit={handleSubmit1(onSubmit1)}>
            <div className="py-10 px-10">
              <div className="mb-5">
                <div className="mb-2 block">
                  <Label
                    htmlFor="countries"
                    value="Name this pricing option"
                    className="pb-2 block"
                  />
                  <p className="text-[#878787] text-sm font-normal pb-1">
                    This will appear on your cart if you have multiple pricing
                    options
                  </p>
                </div>
                <TextInput
                  type="text"
                  value={`${payment_Type}(${paymentTypePrice})`}
                />
              </div>
              <div className="mb-5">
                <div className="mb-2 block">
                  <Label htmlFor="countries" value="I want to..." />
                </div>
                <Select
                  {...register1("quentity_allow_to_parchase", {
                    required: true,
                  })}
                >
                  <option value={0}>Only allow one purchase at a time </option>
                  <option value={1}>Allow multiple purchases at once</option>
                </Select>
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
          </form>
        </Modal.Body>
      </Modal>

      {/* pricing modal two end here */}
    </>
  );
};
export default PricingProduct;
