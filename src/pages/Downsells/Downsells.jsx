import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Label, Select, Modal, TextInput } from "flowbite-react";
import {
  DigitalProductIcon,
  PhysicalProductIcon,
  prodctListImg,
} from "../../assets/images/images";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDownsellProduct } from "../../Reducer/DownSellSlice";
import DownSellProTypeModal from "./DownSellProTypeModal";
import { getProductCategory } from "../../Reducer/ProductSlice";
import { SlPlus } from "react-icons/sl";

const Downsells = () => {
  const [openCreateUpsellsModal, setOpenCreateUpsellsModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const { downSellList } = useSelector((state) => state?.downSellProduct);
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductCategory());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getDownsellProduct());
  }, [dispatch]);
  // const downsellsDetails = () => {
  //   nevigate("/downsells-details");
  // };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleProductSelect = (e) => {
    const selectedProductId = e.target.value;
    setSelectedProductId(selectedProductId); // Update the selected product state
    // console.log("Selected Product Id: ", selectedProductId);
  };

  // Filter the product list based on selected product
  const filteredProducts = selectedProductId
    ? downSellList?.down_sells?.filter(
        (product) => product.id.toString() === selectedProductId
      )
    : downSellList?.down_sells;
  // console.log("filtered List: ", filteredProducts);
  return (
    <div className="product_details_area mt-0">
      <div className="bg-white shadow-xl p-4 lg:p-12 rounded-lg mb-16">
        <div className="lg:flex mb-12">
          <div className="w-full lg:w-9/12 mr-4">
            <div className="mb-0 w-6/12">
              <div className="mb-2 block">
                <Label htmlFor="countries" value="Select Downsells" />
              </div>
              <Select onChange={handleProductSelect} value={selectedProductId}>
                <option value="">Select Downsells</option>
                {downSellList?.down_sells?.map((downList) => {
                  return (
                    <>
                      <option value={downList?.id}>
                        {downList?.sells_product_name}
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
                onClick={() => setOpenCreateUpsellsModal(true)}
                className="bg-[#2AA9E1] hover:bg-black px-6 py-2 text-white text-base font-semibold flex justify-center items-center rounded-md"
              >
                <SlPlus className="text-xl mr-2" />
                Create Downsells
              </Link>
            </div>
          </div>
        </div>
        {/* coupon Listing area start here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts?.map((downSell) => {
            return (
              <>
                <div className="p-5 flex bg-white shadow-lg rounded-lg">
                  <div className="w-4/12">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-[100px] max-w-28 rounded-lg flex justify-center items-center">
                      &nbsp;
                    </div>
                  </div>
                  <div className="w-8/12 pl-4">
                    <div className="mb-4">
                      <h3 className="text-black text-[15px] font-semibold pb-2">
                        {downSell?.sells_product_name} Downsells
                      </h3>
                      <p className="text-[#848484] text-sm font-normal">
                        {formatDate(downSell?.created_at)}
                      </p>
                    </div>
                    <div className="flex">
                      <Link
                        to={`/edit-downsell/${downSell?.id}`}
                        className="text-white text-xs bg-[#2AA9E1] hover:bg-[#C2ECFF] hover:text-[#2AA9E1] px-3.5 py-1.5 font-medium mb-2 inline-block rounded-full"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        {/* coupon Listing area ends here */}
      </div>
      {/* Add Pricing Option modal start here */}
      {/* <Modal
        show={openCreateUpsellsModal}
        onClose={() => setOpenCreateUpsellsModal(false)}
        size="4xl"
      >
        <Modal.Header className="coose_product_bg">
          Create a new Downsells
        </Modal.Header>
        <Modal.Body>
          <div className="py-5 px-5">
            <div className="grid grid-cols-2 gap-12">
              <div className="bg-white shadow-xl p-14 rounded-3xl flex justify-center items-center">
                <button onClick={downsellsDetails}>
                  <div className="text-center">
                    <img
                      src={DigitalProductIcon}
                      alt="DigitalProductIcon"
                      className="mb-10 inline-block"
                    />
                    <h3 className="text-[#4B4C4D] text-2xl font-semibold">
                      Digital Product
                    </h3>
                  </div>
                </button>
              </div>
              <div className="bg-white shadow-xl p-14 rounded-3xl flex justify-center items-center">
                <button>
                  <div className="text-center">
                    <img
                      src={PhysicalProductIcon}
                      alt="PhysicalProductIcon"
                      className="mb-10 inline-block"
                    />
                    <h3 className="text-[#4B4C4D] text-2xl font-semibold">
                      Physical Product
                    </h3>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal> */}
      {openCreateUpsellsModal && (
        <DownSellProTypeModal
          openCreateUpsellsModal={openCreateUpsellsModal}
          setOpenCreateUpsellsModal={setOpenCreateUpsellsModal}
        />
      )}
      {/* Add Pricing Option modal ends here */}
    </div>
  );
};

export default Downsells;
