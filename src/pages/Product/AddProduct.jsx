import {
  Checkbox,
  Label,
  Select,
  Textarea,
  TextInput,
  Modal,
} from "flowbite-react";
import { useForm } from "react-hook-form";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdPreview } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  addProduct,
  checkOutUrl,
  getProductMode,
} from "../../Reducer/ProductSlice";
import { useCallback, useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { FaHandshakeSimple } from "react-icons/fa6";
import { CiDiscount1 } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { SlPlus } from "react-icons/sl";
import { HiDocumentText } from "react-icons/hi2";

const AddProduct = ({ setProId, setShow }) => {
  let product_type;
  let product_name;
  const location = useLocation();
  const dispatch = useDispatch();
  if (location?.state?.id && location?.state?.categoryName) {
    product_type = location?.state?.id;
    product_name = location?.state?.categoryName;
  }
  const { productMode } = useSelector((state) => state?.product);
  const id = useParams();
  // console.log("id", id);
  useEffect(() => {
    dispatch(getProductMode());
  }, [dispatch]);
  // console.log("Modes: ", productMode?.productModes);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [activeStatus, setActiveStatus] = useState(2);
  //   const [activeId, setActiveId] = useState("");
  const [slugError, setSlugError] = useState("");
  const handleStatusClick = (status, id) => {
    // console.log("Status: ", status);
    // console.log("Id: ", id);
    // setActiveId(id)
    setActiveStatus(id);
    setValue("product_mode", id); // set the value in the form
  };
  const onSubmit = (data) => {
    dispatch(addProduct(data)).then((res) => {
      // console.log("Response: ", res);
      if (res?.payload?.status_code === 201) {
        toast.success(res?.payload?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
        setProId(res?.payload?.product?.id);
        setShow({
          AddProduct: false,
          PricingProduct: true,
          Customer_Invoice: false,
          BumpProduct: false,
          PaymentProcessor: false,
          PaymentProcessorTwo: false,
          AffilietsProduct: false,
        });
      } else {
        toast.error(res?.payload?.response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      }
    });
  };
  const checkSlugUniqueness = useCallback(
    (slug) => {
      dispatch(checkOutUrl({ check_out_url: slug })).then((res) => {
        // console.log("res", res);
        if (res?.payload?.existCheckOutUrl === true) {
          setSlugError("Chek out URL exist");
        } else {
          setSlugError("");
        }
      });
    },
    [dispatch]
  );
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/ /g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, ""); // Remove all non-word chars
  };
  const productName = watch("product_name");

  useEffect(() => {
    if (productName) {
      const slug = generateSlug(productName);
      checkSlugUniqueness(slug);
      setValue("slug", slug);
    }
  }, [productName, checkSlugUniqueness, setValue]);

  // const [openSetupCommissionsModal, setOpenSetupCommissionsModal] =
  //   useState(false);
  // const [openSetupOptionsModal, setOpenSetupOptionsModal] = useState(false);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder="Product Name"
                  {...register("product_name", { required: true })}
                />
              </div>
              <div className="mb-6">
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Label" />
                </div>
                <Textarea
                  placeholder="Product Label"
                  required
                  rows={5}
                  {...register("product_label", { required: true })}
                />
              </div>
            </div>
            <div className="w-6/12">
              <div className="mb-6">
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Checkout page URL" />
                </div>
                <div className="flex rounded-lg overflow-hidden">
                  {/* <div className="bg-[#BEEBFF] w-8 text-base leading-[47px] text-center">
                    /
                  </div> */}
                  <TextInput
                    type="text"
                    sizing="md"
                    placeholder="Checkout URL"
                    className="w-full"
                    {...register("slug", { required: true })}
                  />
                  {slugError && <p className="text-red-500">{slugError}</p>}
                </div>
              </div>
              <div className="mb-6">
                <div className="mb-2 block">
                  <Label htmlFor="base" value="Product type" />
                </div>
                <TextInput
                  type="text"
                  sizing="md"
                  placeholder="Product type"
                  defaultValue={`${product_name} Product`}
                  //   {...register("product_type", { required: true })}
                  readOnly
                />
                <input
                  type="hidden"
                  {...register("product_type", { required: true })}
                  defaultValue={product_type}
                />
              </div>

              <div className="mb-6">
                <div className="mb-2 flex">
                  <Label htmlFor="base" value="Product Status" />
                  <BsFillInfoCircleFill className="text-[#E37B5C] ml-2" />
                </div>
                <div className="product_status_section grid grid-cols-3">
                  {productMode?.productModes?.map((mode, index) => (
                    <button
                      type="button"
                      key={index}
                      className={activeStatus === mode?.id ? "active_mode" : ""}
                      onClick={() => handleStatusClick(mode?.status, mode?.id)}
                    >
                      {mode.name}
                    </button>
                  ))}
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
            <Link
              to="/product"
              className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg"
            >
              Back
            </Link>
            <button
              type="submit"
              className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default AddProduct;
