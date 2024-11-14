import { Checkbox, Label, Modal, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createFunnel,
  getConnectedProduct,
  getProductList,
} from "../../Reducer/FunnelSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateFunnelModaltwo = ({
  openFunnelModalTwo,
  setOpenFunnelModalTwo,
  product_id,
  funnelId,
}) => {
  const [isCheck, setIscheck] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { connectedProductList } = useSelector((state) => state?.funnels);
  const dispatch = useDispatch();
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setIscheck(1);
      setIsModalOpen(true);
      dispatch(getConnectedProduct({ product_id: product_id }));
      // console.log("connectedProductList", connectedProductList?.data);
    } else {
      setIscheck(0);
      setIsModalOpen(false);
    }
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const products = JSON.parse(data?.selectedProduct);
    // console.log("products id", products?.product_id);
    // console.log("Product type", products?.type);

    const payload = {
      product_id: product_id,
      allow_skip_main_product: isCheck,
      replace_product_id: isCheck === 1 ? products?.product_id : null,
      product_type: isCheck === 1 ? products?.type : null,
    };
    // console.log("selectedProductid", JSON.parse(data?.selectedProduct));
    // console.log("selectedProducttype", data?.selectedProduct?.type);

    dispatch(createFunnel(payload)).then((res) => {
      // console.log("Res", res);
      if (res?.payload?.status_code === 201) {
        setOpenFunnelModalTwo(false);
        toast.success(res?.payload?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(getProductList({ page: 1, limit: 10, id: product_id }));
        setTimeout(() => {
          navigate("/product");
        }, 3000);
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
      <Modal
        show={openFunnelModalTwo}
        onClose={() => setOpenFunnelModalTwo(false)}
        size="4xl"
        className="product_details_area"
      >
        <Modal.Header className="coose_product_bg pl-10"></Modal.Header>
        <Modal.Body className="p-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-10 px-10">
              <div className="mb-5">
                <div className="mb-2 block">
                  <Label
                    htmlFor="countries"
                    value=" Replace Fulfillment for a previous purchase in this funnel"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="product"
                    className="mr-2"
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="product" className="text-black font-bold">
                    Replace Fulfillment for a previous purchase
                  </Label>
                </div>
              </div>

              {isCheck === 1 && (
                <div className="mb-5">
                  <div className="mb-2 block">
                    <Label htmlFor="countries" value="Choose Item" />
                  </div>
                  <Select id="selectedProduct" {...register("selectedProduct")}>
                    <option>Select</option>
                    {connectedProductList?.data?.map((cProList) => {
                      return (
                        <>
                          <option
                            key={cProList.product_id}
                            value={JSON.stringify({
                              product_id: cProList.id,
                              type: cProList.type,
                            })}
                          >
                            {cProList?.product_name}( {cProList?.type})
                          </option>
                        </>
                      );
                    })}
                  </Select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 mt-0">
              <button
                onClick={() => setOpenFunnelModalTwo(false)}
                className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg"
              >
                Back
              </button>

              <button
                type="submit"
                className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg"
              >
                Add this upsell
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CreateFunnelModaltwo;
