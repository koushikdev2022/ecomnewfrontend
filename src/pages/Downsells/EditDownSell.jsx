import { Label, Select, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSingleDownSell, updateDownSell } from "../../Reducer/DownSellSlice";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditDownSell = () => {
  const { singleDownSell } = useSelector((state) => state?.downSellProduct);
  const down_sell_id = useParams();
  // console.log("down_sell_id: ", down_sell_id?.down_sell_id);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getSingleDownSell(down_sell_id?.down_sell_id)).then((res) => {
      // console.log("getSingleDownSell", res);
      const downsells = res?.payload?.data;
      setValue("sells_product_name", downsells?.sells_product_name);
      setValue("sells_product_label", downsells?.sells_product_label);
    });
  }, []);
  const onSubmit = (data) => {
    dispatch(
      updateDownSell({ ...data, sell_id: down_sell_id?.down_sell_id })
    ).then((res) => {
      // console.log("updateres: ", res);
      if (res?.payload?.status_code === 200) {
        toast.success(res?.payload?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/downsells");
        }, 2000);
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
  // console.log("singleDownSell: ", singleDownSell);

  return (
    <>
      <ToastContainer />
      <div className="product_details_area px-0 py-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white shadow-xl pt-12 rounded-lg mb-16">
            <div className="px-12">
              <div className="grid grid-cols-2 gap-8">
                <div className="mb-6">
                  <div className="mb-2 block">
                    <Label htmlFor="base" value="Product Name" />
                  </div>
                  <TextInput
                    type="text"
                    sizing="md"
                    placeholder="Sells Product Name"
                    {...register("sells_product_name")}
                  />
                </div>
                <div className="mb-6">
                  <div className="mb-2 inline-flex items-center">
                    <Label htmlFor="base" value="Product Label" />
                  </div>
                  <TextInput
                    type="text"
                    sizing="md"
                    placeholder="Product Label"
                    {...register("sells_product_label")}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-8">
              <Link
                to="/downsells"
                className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg"
              >
                Back
              </Link>
              <button
                type="submit"
                className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default EditDownSell;
