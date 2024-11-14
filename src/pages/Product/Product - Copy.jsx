import React, { useEffect } from "react";
import {
  DigitalProductIcon,
  PhysicalProductIcon,
} from "../../assets/images/images";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <div>
      <div className="py-36 px-56">
        <div className="grid grid-cols-2 gap-12">
          <div className="bg-white shadow-xl p-14 rounded-lg flex justify-center items-center">
            <Link to="/product-details">
              <div className="text-center">
                <img
                  src={DigitalProductIcon}
                  alt="DigitalProductIcon"
                  className="mb-10 inline-block"
                />
                <h3 className="text-[#4B4C4D] text-[32px] font-semibold">
                  Digital Product
                </h3>
              </div>
            </Link>
          </div>
          <div className="bg-white shadow-xl p-14 rounded-lg flex justify-center items-center">
            <Link to="/product-details">
              <div className="text-center">
                <img
                  src={PhysicalProductIcon}
                  alt="PhysicalProductIcon"
                  className="mb-10 inline-block"
                />
                <h3 className="text-[#4B4C4D] text-[32px] font-semibold">
                  Physical Product
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
