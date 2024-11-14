import { Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DigitalProductIcon,
  PhysicalProductIcon,
} from "../../assets/images/images";
import { useEffect } from "react";
import { getProductCategory } from "../../Reducer/ProductSlice";

const UpsellProTypeModal = ({
  openCreateUpsellsModal,
  setOpenCreateUpsellsModal,
}) => {
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const { productCategory } = useSelector((state) => state?.product);

  useEffect(() => {
    dispatch(getProductCategory());
  }, [dispatch]);
  // console.log("productCategory", productCategory?.productTypes);
  const productDetails = (id, categoryName) => {
    // console.log("id: ", id);
    // console.log("category name", categoryName);
    nevigate("/upsell-details", {
      state: { id: id, categoryName: categoryName },
    });
  };

  return (
    <>
      <Modal
        show={openCreateUpsellsModal}
        onClose={() => setOpenCreateUpsellsModal(false)}
        size="4xl"
      >
        <Modal.Header className="coose_product_bg">
          Create a new upsell
        </Modal.Header>
        <Modal.Body>
          <div className="py-0 lg:py-5 px-0 lg:px-5">
            <div className="grid grid-cols-2 gap-4 lg:gap-12">
              <div className="bg-white shadow-xl p-3 lg:p-14 rounded-lg flex justify-center items-center">
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
                      className="mb-5 lg:mb-10 inline-block"
                    />
                    <h3 className="text-[#4B4C4D] text-base lg:text-2xl font-semibold">
                      {productCategory?.productTypes[1]?.name} Product
                    </h3>
                  </div>
                </button>
              </div>
              <div className="bg-white shadow-xl p-3 lg:p-14 rounded-lg flex justify-center items-center">
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
                      className="mb-5 lg:mb-10 inline-block"
                    />
                    <h3 className="text-[#4B4C4D] text-base lg:text-2xl font-semibold">
                      {productCategory?.productTypes[0]?.name} Product
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
export default UpsellProTypeModal;
