import { Checkbox, Label, Modal, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiDocumentText } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductCategory } from "../../Reducer/ProductSlice";
import { createBumpProduct } from "../../Reducer/BumpProductSlice";
import {
  DigitalProductIcon,
  PhysicalProductIcon,
} from "../../assets/images/images";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BumpProduct = ({ proid, setShow, currencyId, onComplete, onBack }) => {
  const { productCategory } = useSelector((state) => state?.product);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bumpModal, setBumpModal] = useState(false);
  const [productTypeId, setProductTypeId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductCategory());
  }, [dispatch]);
  const handleCheckboxChange = (e) => {
    setIsModalOpen(e.target.checked);
  };
  const handleProductTypeChange = (typeId) => {
    setProductTypeId(typeId);
    setIsModalOpen(false);
    setBumpModal(true);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(
      createBumpProduct({
        ...data,
        currency_id: currencyId,
        product_id: proid,
        product_type_id: productTypeId,
        bump_slug: data?.bump_slug,
      })
    ).then((res) => {
      // console.log("Res: ", res);
      if (res.payload?.status_code === 201) {
        setBumpModal(false);
        toast.success(res?.payload?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };
  const handleNextPage = () => {
    setShow({
      AddProduct: false,
      PricingProduct: false,
      Customer_Invoice: false,
      BumpProduct: false,
      PaymentProcessor: true,
      PaymentProcessorTwo: false,
      AffilietsProduct: false,
    });
    onComplete();
  };
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/ /g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, ""); // Remove all non-word chars
  };
  const bumpProductName = watch("bump_product_name");
  useEffect(() => {
    if (bumpProductName) {
      const slug = generateSlug(bumpProductName);
      //   checkSlugUniqueness(slug);
      setValue("bump_slug", slug);
    }
  }, [bumpProductName, setValue]);
  const handlePreviousePage = () => {
    setShow({
      AddProduct: false,
      PricingProduct: true,
      Customer_Invoice: false,
      BumpProduct: false,
      PaymentProcessor: false,
      PaymentProcessorTwo: false,
      AffilietsProduct: false,
    });
    onBack();
  };
  return (
    <>
      <div className="bg-white shadow-xl pt-12 rounded-lg mb-16">
        <div className="p-8 mb-24">
          <div className="flex items-center">
            <HiDocumentText className="mr-4 text-[#E37B5C] text-2xl" />
            <div className="flex items-center gap-2">
              <Checkbox
                id="product"
                className="mr-2"
                onChange={handleCheckboxChange}
              />
              <Label htmlFor="product" className="text-black font-bold">
                Do you want to set up a bump offer on this product?
              </Label>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-8">
          <button
            type="button"
            onClick={() => {
              handlePreviousePage();
            }}
            className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg"
          >
            Back
          </button>
          <button
            onClick={() => {
              handleNextPage();
            }}
            type="button"
            className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg"
          >
            Next
          </button>
        </div>
      </div>
      {productTypeId && bumpModal && (
        <Modal
          show={bumpModal}
          onClose={() => setBumpModal(false)}
          size="4xl"
          className="product_details_area"
        >
          <Modal.Header className="coose_product_bg pl-10">
            Set up your Bump Product
          </Modal.Header>
          <Modal.Body className="p-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="py-10 px-10">
                <div className="mb-5">
                  <div className="flex gap-8">
                    <div className="mb-0 w-6/12">
                      <div className="mb-2 block">
                        <Label htmlFor="countries" value="Bump Product Name" />
                      </div>
                      <TextInput
                        type="text"
                        required
                        placeholder="Bump Product Name"
                        {...register("bump_product_name", { required: true })}
                      />
                    </div>
                    <div className="mb-0 w-6/12">
                      <div className="mb-2 block">
                        <Label htmlFor="countries" value="Bump Product Price" />
                      </div>
                      <TextInput
                        type="text"
                        required
                        placeholder="Bump Product Price"
                        {...register("bump_price", { required: true })}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="flex gap-8">
                    <div className="mb-0 w-6/12">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="countries"
                          value="Should Bump be Pre-Selected by default?"
                        />
                      </div>
                      <Select
                        required
                        {...register("pre_selected", { required: true })}
                      >
                        <option>Select</option>
                        <option value={1}>
                          Yes(Customer Must click to remove from order)
                        </option>
                        <option value={0}>
                          No(Customer Must click to add to offer)
                        </option>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 mt-0">
                <Link className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg">
                  Back
                </Link>

                <button
                  type="submit"
                  className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg"
                >
                  Next
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}

      {isModalOpen && (
        <Modal
          show={isModalOpen}
          onClose={() => setIsModalOpen(false)}
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
                      handleProductTypeChange(
                        productCategory?.productTypes[1].id
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
                      handleProductTypeChange(
                        productCategory?.productTypes[0].id
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
      )}
    </>
  );
};
export default BumpProduct;
