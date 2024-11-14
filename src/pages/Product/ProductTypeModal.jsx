import { useDispatch, useSelector } from "react-redux";
import {
  DigitalProductIcon,
  PhysicalProductIcon,
  prodctListImg,
} from "../../assets/images/images";
import { useEffect, useState } from "react";
import { getProductCategory } from "../../Reducer/ProductSlice";
import { Modal } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
const ProductTypeModal = ({
  openAddNewProjectModal,
  setOpenAddNewProjectModal,
}) => {
  const { productCategory } = useSelector((state) => state?.product);
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  useEffect(() => {
    dispatch(getProductCategory());
  }, [dispatch]);
  // console.log("productCategory", productCategory?.productTypes);
  const productDetails = (id, categoryName) => {
    // console.log("id: ", id);
    // console.log("category name", categoryName);
    nevigate("/product-details", {
      state: { id: id, categoryName: categoryName },
    });
  };
  return (
    <>
      <Modal
        show={openAddNewProjectModal}
        onClose={() => setOpenAddNewProjectModal(false)}
        size="4xl"
      >
        <Modal.Header className="coose_product_bg">
          Choose product type
        </Modal.Header>
        <Modal.Body>
          <div className="py-5 px-5">
            <div className="grid grid-cols-2 gap-12">
              <div className="bg-white shadow-xl p-14 rounded-lg flex justify-center items-center">
                <button
                  onClick={() => {
                    productDetails(
                      productCategory?.productTypes[1].id,
                      productCategory?.productTypes[1].name
                    );
                  }}
                >
                  <div className="text-center">
                    <img
                      src={DigitalProductIcon}
                      alt="DigitalProductIcon"
                      className="mb-10 inline-block"
                    />
                    <h3 className="text-[#4B4C4D] text-2xl font-semibold">
                      {/* Digital Product */}
                      {productCategory?.productTypes[1].name} Product
                    </h3>
                  </div>
                </button>
              </div>
              <div className="bg-white shadow-xl p-14 rounded-lg flex justify-center items-center">
                <button
                  onClick={() => {
                    productDetails(
                      productCategory?.productTypes[0].id,
                      productCategory?.productTypes[0].name
                    );
                  }}
                >
                  <div className="text-center">
                    <img
                      src={PhysicalProductIcon}
                      alt="PhysicalProductIcon"
                      className="mb-10 inline-block"
                    />
                    <h3 className="text-[#4B4C4D] text-2xl font-semibold">
                      {/* Physical Product */}
                      {productCategory?.productTypes[0].name} Product
                    </h3>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ProductTypeModal;
