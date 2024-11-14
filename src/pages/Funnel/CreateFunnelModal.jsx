import { Label, Modal, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUpSell } from "../../Reducer/UpSellSlice";
import { createFunnelProduct } from "../../Reducer/FunnelSlice";
import { useForm } from "react-hook-form";
import CreateFunnelModalOne from "./CreateFunnelModalOne";

const CreateFunnelModal = ({
  openFunnelModal,
  setOpenFunnelModal,
  product_id,
}) => {
  const { upSellList } = useSelector((state) => state?.upSellProduct);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUpSell());
  }, [dispatch]);

  //   console.log("upSellList: ", upSellList?.up_sells);
  //   console.log("Modal product id: ", product_id);
  const [openFunnelModalOne, setopenFunnelModalOne] = useState(false);
  const [funnelId, setFunnelId] = useState();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(
      createFunnelProduct({ ...data, product_id: product_id, downsell_id: 0 })
    ).then((res) => {
      // console.log("Res: ", res);
      if (res?.payload?.status_code === 201) {
        setFunnelId(res?.payload?.data?.id);
        setOpenFunnelModal(false);
        setopenFunnelModalOne(true);
      }
    });
  };

  return (
    <>
      <Modal
        show={openFunnelModal}
        onClose={() => setOpenFunnelModal(false)}
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
                    value=" Add an upsell to your funnel from the list below"
                  />
                </div>
                <Select required {...register("upsell_id", { required: true })}>
                  <option>Select</option>
                  {upSellList?.up_sells?.map((upsellPro) => {
                    return (
                      <>
                        <option value={upsellPro?.id}>
                          {upsellPro?.sells_product_name}
                        </option>
                      </>
                    );
                  })}
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-0">
              <button
                onClick={() => setOpenFunnelModal(false)}
                className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg"
              >
                Back
              </button>

              <button
                type="submit"
                // onClick={pricingOption}
                className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg"
              >
                Next
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <CreateFunnelModalOne
        openFunnelModalOne={openFunnelModalOne}
        setopenFunnelModalOne={setopenFunnelModalOne}
        product_id={product_id}
        funnelId={funnelId}
      />
    </>
  );
};
export default CreateFunnelModal;
