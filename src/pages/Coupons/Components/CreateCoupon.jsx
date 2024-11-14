import { Label, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCouponList } from "../../../Reducer/CouponSlice";
import { SlPlus } from "react-icons/sl";

const CreateCoupon = ({ selectedCoupon, setSelectedCoupon }) => {
  const dispatch = useDispatch();
  const { couponList } = useSelector((state) => state.coupon);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(
      getCouponList({
        page: currentPage,
        limit: 2,
      })
    );
  }, [dispatch, currentPage]);
  const handleSelectChange = (e) => {
    setSelectedCoupon(e.target.value);
    // console.log("coupon", e.target.value);
  };
  return (
    <div className="lg:flex mb-12">
      <div className="w-full lg:w-9/12 mr-4">
        <div className="mb-0 w-6/12">
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Select Coupons" />
          </div>
          <Select required value={selectedCoupon} onChange={handleSelectChange}>
            <option value="">Select Coupons</option>
            {couponList?.data?.map((cou) => {
              return (
                <>
                  <option key={cou?.id} value={cou?.id.toString()}>
                    {cou?.coupon_name}
                  </option>
                </>
              );
            })}
          </Select>
        </div>
      </div>
      <div className="w-full lg:w-3/12">
        <div className="mb-0 pt-8 flex justify-end">
          <Link
            to="/create-new-coupon"
            className="bg-[#2AA9E1] hover:bg-black px-6 py-2 text-white text-base font-semibold flex justify-center items-center rounded-md"
          >
            <SlPlus className="text-xl mr-2" />
            Create new coupon
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
