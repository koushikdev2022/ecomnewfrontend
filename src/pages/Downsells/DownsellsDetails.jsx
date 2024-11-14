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
import DownSellOption from "./DownSellOption";
import DownSellPricing from "./DownSellPricing";

const DownsellsDetails = () => {
  const [show, setShow] = useState({
    DownSellOption: true,
    DownSellPricing: false,
  });
  const [active, setActive] = useState({
    DownSellOption: true,
    DownSellPricing: false,
  });
  const handleDownSellOptionComplete = () => {
    setActive((prevState) => ({
      ...prevState,
      DownSellOption: true,
      DownSellPricing: true,
    }));
  };
  const handleDownSellOptionBack = () => {
    setActive((prevState) => ({
      ...prevState,
      DownSellOption: true,
      DownSellPricing: false,
    }));
  };
  const [proId, setProId] = useState(null);
  // console.log("Pro Id: ", proId);
  return (
    <div>
      <div className="product_details_area px-0 py-4">
        <div className="mb-14 px-0 lg:px-12">
          <div className="product_step_flow coupon_step">
            <div
              className={`step_box ${
                active?.DownSellOption ? "active_step" : " "
              }`}
            >
              <div className="default_round">1</div>
              <p className="text-black text-base font-medium">Options</p>
            </div>
            <div
              className={`step_box ${
                active?.DownSellPricing ? "active_step" : " "
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

        {show.DownSellOption && (
          <DownSellOption
            setShow={setShow}
            setProId={setProId}
            onComplete={() => handleDownSellOptionComplete()}
          />
        )}
        {/* Coupon info Section ends here */}

        {/* Products Section start here */}

        {show.DownSellPricing && proId && (
          <DownSellPricing
            setShow={setShow}
            proId={proId}
            onBack={() => handleDownSellOptionBack()}
          />
        )}
        {/* Products Section ends here */}
      </div>
    </div>
  );
};

export default DownsellsDetails;
