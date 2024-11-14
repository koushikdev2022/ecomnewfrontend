import { Label, Select, TextInput } from "flowbite-react";
import { Base64 } from "js-base64";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { createDownsellProduct } from "../../Reducer/DownSellSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DownSellOption = ({ setShow, setProId, onComplete }) => {
  const dispatch = useDispatch();
  let product_type;
  let product_name;
  const location = useLocation();
  if (location?.state?.id && location?.state?.categoryName) {
    product_type = location?.state?.id;
    product_name = location?.state?.categoryName;
  }

  //get User_id
  const jsonObject = localStorage.getItem("userId");
  const userIdDeocoded = Base64.decode(jsonObject);
  const useridjson = JSON.parse(userIdDeocoded);
  const userid = useridjson.user_id;
  // console.log("userIdDeocoded", userid);

  //Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  //slug generating
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/ /g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, ""); // Remove all non-word chars
  };
  const sellsProductName = watch("sells_product_name");
  useEffect(() => {
    if (sellsProductName) {
      const slug = generateSlug(sellsProductName);
      //   checkSlugUniqueness(slug);
      setValue("slug", slug);
    }
  }, [sellsProductName, setValue]);
  const onSubmit = (data) => {
    dispatch(
      createDownsellProduct({ ...data, user_id: userid, slug: data?.slug })
    ).then((res) => {
      if (res?.payload?.status_code === 201) {
        setProId(res?.payload?.data?.id);
        setShow({
          DownSellOption: false,
          DownSellPricing: true,
        });
        onComplete();
      } else {
        toast.error(res?.payload?.message, {
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
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white shadow-xl pt-12 rounded-lg mb-16">
          <div className="px-4 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">
              <div className="mb-6">
                <div className="mb-2 inline-flex items-center">
                  <Label htmlFor="base" value="Downsells name" />
                  <p className="text-xs pl-4">Will appear on the invoice</p>
                </div>
                <TextInput
                  type="text"
                  sizing="md"
                  placeholder="Downsell Product Name"
                  {...register("sells_product_name", { required: true })}
                />
                {errors.sells_product_name && (
                  <p className="text-red-500">
                    {errors.sells_product_name.message}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <div className="mb-2 inline-flex items-center">
                  <Label htmlFor="base" value="Label" />
                  <p className="text-xs pl-4">
                    Used to identify this Downsells just to you
                  </p>
                </div>
                <TextInput
                  type="text"
                  sizing="md"
                  placeholder="Product Label"
                  {...register("sells_product_label", { required: true })}
                />
                {errors.sells_product_label && (
                  <p className="text-red-500">
                    {errors.sells_product_label.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">
              <div className="mb-6">
                <div className="mb-2 block">
                  <Label htmlFor="base" value=" Downsells type" />
                </div>
                <TextInput
                  type="text"
                  sizing="md"
                  placeholder="Downsells Type"
                  defaultValue={`${product_name} Product`}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-8">
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
        </div>
      </form>
    </>
  );
};
export default DownSellOption;
