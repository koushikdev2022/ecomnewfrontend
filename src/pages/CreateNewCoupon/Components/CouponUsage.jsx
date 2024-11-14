import { Label, TextInput, Select, Datepicker } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CouponInfo from "./CouponInfo";
import { convertToSubmitFormat } from "../../../utils/DateSubmitFormatter";

const CouponUsage = ({
  setShow,
  register,
  errors,
  watch,
  setValue,
  onComplete,
  onBack,
}) => {
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);
  const [chosenDate, setChosenDate] = useState(null);
  const [chosenEndDate, setChosenEndDate] = useState(null);
  const formValues = watch([
    "coupon_name",
    "coupon_code",
    "coupon_start_date",
    "coupon_end_date",
  ]);
  const redeemable = watch("redeem");
  const fixedUses = watch("fixedUse");
  const reedemUntillDate = watch("reedemUntill");

  useEffect(() => {
    const allFieldsFilled = formValues.every((value) => value);
    setIsAllFieldsFilled(allFieldsFilled);
  }, [formValues]);

  useEffect(() => {
    // console.log("errors", errors);
  }, [errors]);
  useEffect(() => {
    if (fixedUses === "No") {
      setValue("coupon_maximum_use", 0);
    }
  }, [fixedUses, setValue]);

  useEffect(() => {
    if (redeemable === "immediately") {
      const today = new Date().toISOString().split("T")[0];
      setValue("coupon_start_date", today);
    }
  }, [redeemable]);
  const handleDateChange = (date) => {
    // console.log("Start Date", date);
    // if (redeemable === "immediately") {
    //   const today = new Date().toISOString().split("T")[0];
    //   setValue("coupon_start_date", today);
    // } else {
    setChosenDate(date);
    setValue("coupon_start_date", convertToSubmitFormat(date));
    // }
  };

  const handleEndDateChange = (date) => {
    // console.log("DateEnd", date);
    setChosenEndDate(date);
    setValue("coupon_end_date", convertToSubmitFormat(date));
  };
  const handleNextPage = () => {
    setShow({ couponUsage: false, couponProducts: true, CouponInfo: false });
    onComplete();
  };

  const handlePreviousPage = () => {
    setShow({ couponUsage: false, couponProducts: false, CouponInfo: true });
    onBack();
  };
  return (
    <div className="bg-white shadow-xl pt-12 rounded-lg mb-16">
      <div className="px-12">
        <div className="grid grid-cols-2 gap-8">
          <div className="mb-6">
            <div className="mb-2 block">
              <Label htmlFor="base" value="This coupon is redeemable" />
            </div>
            <Select {...register("redeem")}>
              <option>Select</option>
              <option value="immediately">Immediately</option>
              <option value="fromAsetDate">From A Set Date</option>
            </Select>
          </div>
          <div className="mb-6">
            {redeemable === "fromAsetDate" && (
              <>
                <div className="mb-2 inline-flex items-center">
                  <Label htmlFor="base" value="Select date :" />
                </div>

                <div className="calendar_wrap">
                  <Datepicker
                    onSelectedDateChanged={handleDateChange}
                    // disabled={redeemable === "immediately"}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="mb-6">
            <div className="mb-2 block">
              <Label htmlFor="base" value="This coupon is redeemable until" />
            </div>
            <Select {...register("reedemUntill")}>
              <option>Select</option>
              <option value="disableIt">I disable it</option>
              <option value="setDate">Set A Date</option>
            </Select>
          </div>
          <div className="mb-6">
            {reedemUntillDate === "setDate" && (
              <>
                <div className="mb-2 inline-flex items-center">
                  <Label htmlFor="base" value="Select date :" />
                </div>

                <div className="calendar_wrap">
                  <Datepicker
                    onSelectedDateChanged={handleEndDateChange}
                    // disabled={reedemUntillDate === "disableIt"}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="mb-6">
            <div className="mb-2 block">
              <Label
                htmlFor="base"
                value="This coupon will auto-apply an affiliate:"
              />
            </div>
            <Select>
              <option>Select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </Select>
          </div>
          <div className="mb-6">
            <div className="mb-2 inline-flex items-center">
              <Label
                htmlFor="base"
                value="Select the affiliate ID to apply to this sale :"
              />
            </div>
            <TextInput
              type="text"
              sizing="md"
              placeholder="Enter affiliate ID"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="mb-6">
            <div className="mb-2 block">
              <Label
                htmlFor="base"
                value="Disable after a fixed number of uses :"
              />
            </div>
            <Select {...register("fixedUse")}>
              <option>Select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </Select>
          </div>
          <div className="mb-6">
            {fixedUses === "Yes" && (
              <>
                <div className="mb-2 inline-flex items-center">
                  <Label htmlFor="base" value="Disable this coupon after :" />
                </div>
                <div className="flex">
                  <TextInput
                    type="text"
                    sizing="md"
                    placeholder="0"
                    className="w-[150px] mr-4"
                    {...register("coupon_maximum_use")}
                  />
                  <p className="text-[#535353] font-medium text-base py-3">
                    total uses
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-8">
        <button
          type="button"
          onClick={() => {
            handlePreviousPage();
          }}
          className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg"
        >
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
export default CouponUsage;
