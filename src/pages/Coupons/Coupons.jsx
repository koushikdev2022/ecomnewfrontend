import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Label, Select, Modal } from "flowbite-react";
import { Coupon01, Coupon02, prodctListImg } from "../../assets/images/images";
import { BiSolidCopyAlt } from "react-icons/bi";
import CreateCoupon from "./Components/CreateCoupon";
import CouponList from "./Components/CouponList";

const Coupons = () => {
  const [selectedCoupon, setSelectedCoupon] = useState("");
  return (
    <div className="product_details_area mt-0">
      <div className="bg-white shadow-xl p-4 lg:p-12 rounded-lg mb-16">
        <CreateCoupon
          selectedCoupon={selectedCoupon}
          setSelectedCoupon={setSelectedCoupon}
        />
        {/* coupon Listing area start here */}
        <CouponList selectedCoupon={selectedCoupon} />
        {/* coupon Listing area ends here */}
      </div>
    </div>
  );
};

export default Coupons;
