import { Label, Modal, Select } from "flowbite-react";
import { useState } from "react";
import CreateFunnelModaltwo from "./CreateFunnelModaltwo";

const CreateFunnelModalOne = ({
  openFunnelModalOne,
  setopenFunnelModalOne,
  product_id,
  funnelId,
}) => {
  const [openFunnelModalTwo, setOpenFunnelModalTwo] = useState(false);
  const handleModalChange = () => {
    setopenFunnelModalOne(false);
    setOpenFunnelModalTwo(true);
  };
  return (
    <>
      <Modal
        show={openFunnelModalOne}
        onClose={() => setopenFunnelModalOne(false)}
        size="4xl"
        className="product_details_area"
      >
        <Modal.Header className="coose_product_bg pl-10"></Modal.Header>
        <Modal.Body className="p-0">
          <form>
            <div className="py-10 px-10">
              <div className="mb-5">
                <div className="mb-2 block">
                  <Label
                    htmlFor="countries"
                    value=" How do you want to display your upsell"
                  />
                </div>
                <Select required>
                  <option>Select</option>

                  <option>Design a page with ThriveCart(recommended)</option>
                  <option>Use my own custom page</option>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-0">
              <button
                onClick={() => setopenFunnelModalOne(false)}
                className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg"
              >
                Back
              </button>

              <button
                type="submit"
                onClick={() => handleModalChange()}
                className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg"
              >
                Next
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <CreateFunnelModaltwo
        openFunnelModalTwo={openFunnelModalTwo}
        setOpenFunnelModalTwo={setOpenFunnelModalTwo}
        product_id={product_id}
        funnelId={funnelId}
      />
    </>
  );
};
export default CreateFunnelModalOne;
