import { Label, Modal, Select } from "flowbite-react";
import {
  DigitalProductIcon,
  PhysicalProductIcon,
} from "../../assets/images/images";
import { PiArrowBendLeftDownBold, PiArrowBendLeftUpBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUpSell } from "../../Reducer/UpSellSlice";
import { getDownsellProduct } from "../../Reducer/DownSellSlice";

const CreateFunnelModalDownSell = ({
  opneDownSellModal,
  setOpenDownSellModal,
}) => {
  const [selectUpsell, setSelectUpSell] = useState(true);
  const [selectDownsell, setSelectDownSell] = useState(false);
  const { upSellList } = useSelector((state) => state?.upSellProduct);
  const { downSellList } = useSelector((state) => state?.downSellProduct);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUpSell());
    dispatch(getDownsellProduct());
  }, [dispatch]);
  const handleUpsellChange = () => {
    setSelectUpSell(true);
    setSelectDownSell(false);
  };
  const handleDownSellChange = () => {
    // console.log("Hello");

    setSelectDownSell(true);
    setSelectUpSell(false);
  };

  return (
    <>
      <Modal
        show={opneDownSellModal}
        onClose={() => setOpenDownSellModal(false)}
        size="4xl"
      >
        <Modal.Header className="coose_product_bg"></Modal.Header>
        <Modal.Body>
          <div className="py-5 px-5">
            <div className="grid grid-cols-2 gap-12">
              <div className="bg-white shadow-xl p-14 rounded-lg flex justify-center items-center">
                <button onClick={() => handleUpsellChange()}>
                  <div className="text-center">
                    <PiArrowBendLeftUpBold className="mr-2" />
                    <h3 className="text-[#4B4C4D] text-2xl font-semibold">
                      Upsell
                    </h3>
                  </div>
                </button>
              </div>
              <div className="bg-white shadow-xl p-14 rounded-lg flex justify-center items-center">
                <button onClick={() => handleDownSellChange()}>
                  <div className="text-center">
                    <PiArrowBendLeftDownBold className="mr-2" />
                    <h3 className="text-[#4B4C4D] text-2xl font-semibold">
                      Downsell
                    </h3>
                  </div>
                </button>
              </div>
            </div>
          </div>
          {selectUpsell && (
            <form>
              <div className="py-10 px-10">
                <div className="mb-5">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="countries"
                      value=" Add an upsell to your funnel from the list below"
                    />
                  </div>
                  <Select required>
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
                <button className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg">
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
          )}

          {selectDownsell && (
            <form>
              <div className="py-10 px-10">
                <div className="mb-5">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="countries"
                      value=" Add an downsell to your funnel from the list below"
                    />
                  </div>
                  <Select required>
                    <option>Select</option>
                    {downSellList?.down_sells?.map((downsellPro) => {
                      return (
                        <>
                          <option>{downsellPro?.sells_product_name}</option>
                        </>
                      );
                    })}
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 mt-0">
                <button className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg">
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
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CreateFunnelModalDownSell;
