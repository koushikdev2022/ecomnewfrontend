import React from "react";

import {
  Label,
  TextInput,
  Textarea,
  Select,
  Checkbox,
  Modal,
} from "flowbite-react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdPreview, MdPriceChange } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaFileInvoiceDollar, FaPlus } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi2";
import { BiSolidCreditCard } from "react-icons/bi";
import { paypalIco, paypalIcon, stripeIcon } from "../../assets/images/images";
import { FaHandshakeSimple } from "react-icons/fa6";

import { useState } from "react";

const ProductDetails = () => {
  const [openPricingOptionModal, setOpenPricingOptionModal] = useState(false);
  const [openPricingOptionTwoModal, setOpenPricingOptionTwoModal] =
    useState(false);

  const [openPaymentProcessorsModal, setOpenPaymentProcessorsModal] =
    useState(false);

  const pricingOption = () => {
    setOpenPricingOptionModal(false);
    setOpenPricingOptionTwoModal(true);
  };

  return (
    <div>
      <div className="product_details_area px-16 py-4">
        <div className="mb-14 px-12">
          <div className="product_step_flow">
            <div className="step_box">
              <div className="default_round">&nbsp;</div>
              <p className="text-black text-xl font-medium">Options</p>
            </div>
            <div className="step_box">
              <div className="default_round">&nbsp;</div>
              <p className="text-black text-xl font-medium">Pricing</p>
            </div>
            <div className="step_box">
              <div className="default_round">&nbsp;</div>
              <p className="text-black text-xl font-medium">Bump</p>
            </div>
            <div className="step_box">
              <div className="default_round">&nbsp;</div>
              <p className="text-black text-xl font-medium">Processors</p>
            </div>
            <div className="step_box">
              <div className="default_round">&nbsp;</div>
              <p className="text-black text-xl font-medium">Affiliets</p>
            </div>
          </div>
        </div>

        {/* Option Section start here */}
        <div className="bg-white shadow-xl pt-12 rounded-lg mb-16">
          <div className="flex gap-8 px-12">
            <div className="w-6/12">
              <div className="mb-6">
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Product Name" />
                </div>
                <TextInput
                  type="text"
                  sizing="md"
                  placeholder="Untitled Product"
                />
              </div>
              <div className="mb-6">
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Label" />
                </div>
                <Textarea placeholder="Untitled Product" required rows={5} />
              </div>
            </div>
            <div className="w-6/12">
              <div className="mb-6">
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Checkout page URL" />
                </div>
                <div className="flex">
                  <div className="bg-[#BEEBFF] w-8 text-base leading-[47px] text-center">
                    /
                  </div>
                  <TextInput
                    type="text"
                    sizing="md"
                    placeholder="Untitled Product"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="mb-6">
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Change product type" />
                </div>
                <TextInput
                  type="text"
                  sizing="md"
                  placeholder="Digital Product"
                />
              </div>
              <div className="mb-6">
                <div className="mb-2 flex">
                  <Label htmlFor="base" value="Product Status" />
                  <BsFillInfoCircleFill className="text-[#E37B5C] ml-2" />
                </div>
                <div className="product_status_section grid grid-cols-3">
                  <button>Disabled</button>
                  <button className="active_mode">Test Mode</button>
                  <button>Live Mode</button>
                </div>
              </div>
              <div className="flex justify-end">
                <Link className="flex items-center text-[#EB738A] hover:text-[#48C7FF] text-sm font-normal">
                  <MdPreview className="text-[#4ABCEF] mr-1" />
                  <p>Preview</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-8">
            <Link className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg">
              Back
            </Link>
            <Link className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg">
              Next
            </Link>
          </div>
        </div>

        {/* Option Section ends here */}

        {/* Price Section start here */}
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
                <p className="text-black text-2xl font-normal pb-2">
                  One -time Payment ($000.00)
                </p>
                <span className="text-[#626262] text-[22px] font-medium">
                  $000.00
                </span>
              </div>
            </div>
            <div className="w-6/12">
              <div className="mb-8">
                <Select required>
                  <option>USD($)</option>
                  <option>$100</option>
                  <option>$200</option>
                  <option>$300</option>
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
              className="bg-[#D2F1FF] text-[#2AA9E1] hover:text-white text-2xl font-bold hover:bg-[#373737] px-16 py-4 rounded-lg inline-flex justify-center items-center"
            >
              <FaPlus className="mr-2" />
              Add product price
            </button>
          </div>
          <div className="grid grid-cols-2 mt-8">
            <Link className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg">
              Back
            </Link>
            <Link className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg">
              Next
            </Link>
          </div>
        </div>
        <div className="bg-white shadow-xl px-12 py-8 rounded-3xl mb-16">
          <div className="flex items-center">
            <FaFileInvoiceDollar className="mr-4 text-[#E37B5C] text-2xl" />
            <div className="flex items-center gap-2">
              <Checkbox id="invoice" className="mr-2" />
              <Label htmlFor="invoice" className="text-black font-bold">
                Do you want to customize your customer’s invoice?{" "}
              </Label>
            </div>
          </div>
        </div>
        {/* Price Section ends here */}

        {/* Bump Section start here */}
        <div className="bg-white shadow-xl pt-12 rounded-lg mb-16">
          <div className="p-8 mb-24">
            <div className="flex items-center">
              <HiDocumentText className="mr-4 text-[#E37B5C] text-2xl" />
              <div className="flex items-center gap-2">
                <Checkbox id="product" className="mr-2" />
                <Label htmlFor="product" className="text-black font-bold">
                  Do you want to set up a bump offer on this product?
                </Label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-8">
            <Link className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg">
              Back
            </Link>
            <Link className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg">
              Next
            </Link>
          </div>
        </div>
        {/* Bump Section ends here */}

        {/* Processors Section start here */}
        <div className="bg-white shadow-xl pt-12 rounded-lg mb-16">
          <div className="flex gap-8 px-12">
            <div className="w-full">
              <div className="mb-6 flex items-center">
                <BiSolidCreditCard className="text-[#E37B5C] text-4xl mr-2" />
                <h2 className="text-black font-bold text-[28px]">
                  Payment processors for your product
                </h2>
              </div>
              <div className="border border-[#48C7FF] p-8 text-center mb-4">
                <p className="text-black text-[22px] font-semibold pb-6">
                  Choose your payment processors
                </p>
                <p className="text-[#616161] text-[18px] font-medium pb-4">
                  Set up how you ‘ll accept from your customers
                </p>
                <div className="text-center my-3">
                  <button
                    onClick={() => setOpenPaymentProcessorsModal(true)}
                    className="bg-[#D2F1FF] text-[#2AA9E1] hover:text-white text-2xl font-bold hover:bg-[#373737] px-16 py-4 rounded-lg inline-flex justify-center items-center"
                  >
                    <BiSolidCreditCard className="mr-2" />
                    Set up payment processors
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 mt-8">
            <Link className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg">
              Back
            </Link>
            <Link className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg">
              Next
            </Link>
          </div>
        </div>
        {/* Processors Section ends here */}

        {/* Processors Section part 2 start here */}
        <div className="bg-white shadow-xl pt-12 rounded-lg mb-16">
          <div className="flex gap-8 px-12">
            <div className="w-full">
              <div className="mb-16 flex items-center">
                <BiSolidCreditCard className="text-[#E37B5C] text-4xl mr-2" />
                <h2 className="text-black font-bold text-[28px]">
                  Payment processors for your product
                </h2>
              </div>
              <div className="pl-12 mb-8">
                <div className="flex justify-start items-center mb-8">
                  <p className="text-[#717171] pr-4">Accepting payments via </p>
                  <img
                    src={paypalIcon}
                    alt="paypalIcon"
                    className="w-20 mr-4"
                  />
                  <p>into LoremIpsum@.net</p>
                </div>
                <div className="flex justify-start items-center mb-8">
                  <p className="text-[#717171] pr-4">Accepting payments via </p>
                  <img
                    src={stripeIcon}
                    alt="stripeIcon"
                    className="w-20 mr-4"
                  />
                  <p>into LoremIPsum.net</p>
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <div className="text-center my-3">
                  <button className="bg-[#2AA9E1] text-white hover:text-white text-xl font-medium hover:bg-[#373737] px-8 py-3 rounded-lg inline-flex justify-center items-center">
                    <BiSolidCreditCard className="mr-2" />
                    Edit Processors
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 mt-8">
            <Link className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg">
              Back
            </Link>
            <Link className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg">
              Next
            </Link>
          </div>
        </div>
        {/* Processors Section part 2 ends here */}

        {/* Affiliets Section start here */}
        <div className="bg-white shadow-xl pt-12 rounded-lg mb-16">
          <div className="p-8 mb-24">
            <div className="flex items-center">
              <FaHandshakeSimple className="mr-4 text-[#E37B5C] text-2xl" />
              <div className="flex items-center gap-2">
                <Checkbox id="product" className="mr-2" />
                <Label htmlFor="product" className="text-black font-bold">
                  Do you want affiliates to promote this product?
                </Label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-8">
            <Link className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg">
              Back
            </Link>
            <Link className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg">
              Next
            </Link>
          </div>
        </div>
        {/* Affiliets Section ends here */}
      </div>
      {/* Add Pricing Option modal start here */}
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
          <div className="py-10 px-10">
            <div className="mb-5">
              <div className="mb-2 block">
                <Label htmlFor="countries" value="Payment Type" />
              </div>
              <Select required>
                <option>Payment Type</option>
                <option>Type 01</option>
                <option>Type 02</option>
                <option>Type 03</option>
              </Select>
            </div>
            <div className="mb-5">
              <div className="flex gap-8">
                <div className="mb-0 w-6/12">
                  <div className="mb-2 block">
                    <Label htmlFor="countries" value="Price" />
                  </div>
                  <TextInput type="text" required placeholder="$" />
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
                  Your customer will be charged $000.00 USD immediately
                </p>
              </div>
            </div>
            <div className="mb-5">
              <div className="mb-2 block">
                <Label htmlFor="countries" value="Quantity" />
              </div>
              <Select required>
                <option>Unlimited</option>
                <option>Unlimited 01</option>
                <option>Unlimited 02</option>
                <option>Unlimited 03</option>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-0">
            <Link className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg">
              Back
            </Link>
            <Link
              onClick={pricingOption}
              className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg"
            >
              Next
            </Link>
          </div>
        </Modal.Body>
      </Modal>
      {/* Add Pricing Option modal ends here */}

      {/* Add Pricing Option modal two start here */}
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
              <Select required>
                <option>Lorem Ipsum</option>
                <option>Ipsum 01</option>
                <option>Ipsum 02</option>
                <option>Ipsum 03</option>
              </Select>
            </div>
            <div className="mb-5">
              <div className="mb-2 block">
                <Label htmlFor="countries" value="I want to..." />
              </div>
              <Select required>
                <option>Only allow one purchase at a time </option>
                <option>01</option>
                <option>02</option>
                <option>03</option>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-0">
            <Link className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg">
              Back
            </Link>
            <Link className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg">
              Next
            </Link>
          </div>
        </Modal.Body>
      </Modal>
      {/* Add Pricing Option modal two ends here */}

      {/* Add payment processors modal start here */}
      <Modal
        show={openPaymentProcessorsModal}
        onClose={() => setOpenPaymentProcessorsModal(false)}
        size="4xl"
        className="product_details_area"
      >
        <Modal.Header className="coose_product_bg payment_pop pl-10">
          Set up your pricing option sdsdsd
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="py-10 px-10">
            <div className="mb-10">
              <p className="text-[#535353] text-xl font-medium">
                Select the processors and accounts used to sell this product.
              </p>
            </div>
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-8">
                <Checkbox className="mr-2" />
                <Label htmlFor="product" className="text-black font-bold">
                  <img
                    src={paypalIcon}
                    alt="paypalIcon"
                    className="w-20 mr-4"
                  />
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox className="mr-2" />
                <Label htmlFor="product" className="text-black font-bold">
                  <img
                    src={stripeIcon}
                    alt="stripeIcon"
                    className="w-20 mr-4"
                  />
                </Label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-0">
            <Link className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg">
              Back
            </Link>
            <Link className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg">
              Next
            </Link>
          </div>
        </Modal.Body>
      </Modal>
      {/* Add payment processors modal ends here */}
    </div>
  );
};

export default ProductDetails;
