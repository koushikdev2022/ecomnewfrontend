import {
  Label,
  TextInput,
  Textarea,
  Select,
  Checkbox,
  Modal,
  Datepicker,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { MdPreview } from "react-icons/md";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Tabs from "./Components/Tabs";
import CouponInfo from "./Components/CouponInfo";
import CouponUsage from "./Components/CouponUsage";
import CouponProducts from "./Components/CouponProducts";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createCoupon } from "../../Reducer/CouponSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateNewCoupon = () => {
  const [active, setActive] = useState({
    couponInfo: true,
    couponUsage: false,
    couponProducts: false,
  });
  const [show, setShow] = useState({
    CouponInfo: true,
    couponUsage: false,
    couponProducts: false,
  });
  // Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  // On Invalid form
  const onInvalid = (errors) => {
    // console.log("errors", errors);
  };
  const handleCouponInfoComplete = () => {
    setActive((prevState) => ({
      ...prevState,
      couponInfo: true,
      couponUsage: true,
    }));
  };

  const handleCouponInfoBack = () => {
    setActive((prevState) => ({
      ...prevState,
      couponInfo: true,
      couponUsage: false,
    }));
  };

  const handleCouponUsageComplete = () => {
    setActive((prevState) => ({
      ...prevState,
      couponUsage: true,
      couponProducts: true,
    }));
  };
  const handleCouponUsageBack = () => {
    setActive((prevState) => ({
      ...prevState,
      couponUsage: true,
      couponProducts: false,
    }));
  };
  const dispatch = useDispatch();
  const nevigate = useNavigate();

  const couponCreation = (data) => {
    // console.log("data", data);
    dispatch(createCoupon(data)).then((res) => {
      // console.log("res", res);
      if (res?.payload?.status_code === 201) {
        nevigate("/coupons");
      } else if (res?.payload?.status_code === 400) {
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
    <div>
      <ToastContainer />
      <div className="product_details_area px-0 py-4">
        <Tabs active={active} />
        <form onSubmit={handleSubmit(couponCreation, onInvalid)}>
          {/* Coupon info Section start here */}
          {show.CouponInfo && (
            <CouponInfo
              onComplete={() => handleCouponInfoComplete()}
              setShow={setShow}
              register={register}
              errors={errors}
              watch={watch}
            />
          )}
          {/* Coupon info Section ends here */}

          {/* Usage Section start here */}
          {show.couponUsage && (
            <CouponUsage
              onComplete={() => handleCouponUsageComplete()}
              onBack={() => handleCouponInfoBack()}
              setShow={setShow}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
          )}
          {/* Usage Section ends here */}

          {/* Products Section start here */}
          {show.couponProducts && (
            <CouponProducts
              onBack={() => handleCouponUsageBack()}
              setShow={setShow}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
          )}
          {/* Products Section ends here */}
        </form>
      </div>
    </div>
  );
};

export default CreateNewCoupon;
