import { Button, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CouponInfo = ({ setShow, register, errors, watch, onComplete }) => {
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);
  const formValues = watch(["coupon_name", "coupon_code"]);

  useEffect(() => {
    const allFieldsFilled = formValues.every((value) => value);
    setIsAllFieldsFilled(allFieldsFilled);
  }, [formValues]);

  useEffect(() => {
    // console.log("errors", errors);
  }, [errors]);
  const handleNextPage = () => {
    setShow({ couponInfo: false, couponUsage: true, couponProducts: false });
    onComplete();
  };
  return (
    <div className="bg-white shadow-xl pt-12 rounded-lg mb-16">
      <div className="px-12">
        <div className="grid grid-cols-2 gap-8">
          <div className="mb-6">
            <div className="mb-2 block">
              <Label htmlFor="base" value="Coupon name" />
            </div>
            <TextInput
              type="text"
              sizing="md"
              placeholder="Coupon Name"
              {...register("coupon_name", {
                required: "Coupon name is required",
              })}
            />
            {errors?.coupon_name && (
              <p className="text-red-600 text-sm">
                {errors?.coupon_name?.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <div className="mb-2 inline-flex items-center">
              <Label htmlFor="base" value="Coupon code" />
              <p className="text-xs pl-4">At least 6 characters</p>
            </div>
            <TextInput
              type="text"
              sizing="md"
              placeholder="Coupon code"
              {...register("coupon_code", {
                required: "Coupon code is required",
                rules: {
                  minLength: {
                    value: 6,
                    message: "Coupon code must be at least 6 characters",
                  },
                },
              })}
            />
            {errors?.coupon_code && (
              <p className="text-red-600 text-sm">
                {errors?.coupon_code?.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <div className="mb-6">
            <div className="mb-2 block">
              <Label htmlFor="base" value="Coupon status" />
            </div>
            <Select
              {...register("status", {
                required: "Coupon status is required",
              })}
            >
              <option value="">Coupon status</option>
              <option value={1}>Enabled</option>
              <option value={0}>Disabled</option>
            </Select>
            {errors?.coupon_status && (
              <p className="text-red-600 text-sm">
                {errors?.coupon_status?.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <div className="mb-2 block">
              <Label htmlFor="base" value="Discount type" />
            </div>
            <Select
              {...register("coupon_entity", {
                required: "Discount type is required",
              })}
            >
              <option value="">Discount type</option>
              <option value="percentage">Percentage</option>
              <option value="flat">Flat</option>
            </Select>
          </div>
          <div className="mb-6">
            <div className="mb-2 inline-flex items-center">
              <Label htmlFor="base" value="Discount price" />
            </div>
            <TextInput
              type="text"
              sizing="md"
              placeholder="$"
              {...register("amount", {
                required: "Discount Price is required",
              })}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-8">
        <button className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg">
          Back
        </button>
        <button
          type="submit"
          onClick={() => {
            handleNextPage();
          }}
          className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CouponInfo;
