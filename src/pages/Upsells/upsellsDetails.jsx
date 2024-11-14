import React, { useState } from "react";

import {
  Label,
  TextInput,
  Textarea,
  Select,
  Checkbox,
  Modal,
  Datepicker,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { MdPreview, MdPriceChange } from "react-icons/md";
import { BsFillInfoCircleFill } from "react-icons/bs";
import UpSellOption from "./UpSellOption";
import UpSellPricing from "./UpSellPricing";

const UpsellsDetails = () => {
  const [show, setShow] = useState({
    UpSellOption: true,
    UpSellPricing: false,
  });
  const [active, setActive] = useState({
    UpSellOption: true,
    UpSellPricing: false,
  });

  const handleUpSellOptionComplete = () => {
    setActive((prevState) => ({
      ...prevState,
      UpSellOption: true,
      UpSellPricing: true,
    }));
  };

  const handleUpSellOptionBack = () => {
    setActive((prevState) => ({
      ...prevState,
      UpSellOption: true,
      UpSellPricing: false,
    }));
  };
  // const handleUpSellPricingComplete = () => {
  //   setActive((prevState) => ({
  //     ...prevState,

  //   }))
  // }
  const [proId, setProId] = useState(null);
  // console.log("Pro Id: ", proId);

  return (
    <div>
      <div className="product_details_area px-0 py-4">
        <div className="mb-14 px-0 lg:px-12">
          <div className="product_step_flow coupon_step">
            <div
              className={`step_box ${
                active?.UpSellOption ? "active_step" : " "
              }`}
            >
              <div className="default_round">1</div>
              <p className="text-black text-base font-medium">Options</p>
            </div>
            <div
              className={`step_box ${
                active?.UpSellPricing ? "active_step" : " "
              }`}
            >
              <div className="default_round">2</div>
              <p className="text-black text-base font-medium">Pricing</p>
            </div>
            <div className="step_box">
              <div className="default_round">3</div>
              <p className="text-black text-base font-medium">Tracking</p>
            </div>
          </div>
        </div>
        {/* Coupon info Section start here */}

        {show.UpSellOption && (
          <UpSellOption
            setShow={setShow}
            setProId={setProId}
            onComplete={() => {
              handleUpSellOptionComplete();
            }}
          />
        )}

        {/* Coupon info Section ends here */}

        {/* Products Section start here */}
        {show.UpSellPricing && proId && (
          <UpSellPricing
            setShow={setShow}
            proId={proId}
            onBack={() => handleUpSellOptionBack()}
          />
        )}

        {/* Products Section ends here */}
      </div>
    </div>
  );
};

export default UpsellsDetails;
