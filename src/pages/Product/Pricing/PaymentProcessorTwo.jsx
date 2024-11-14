import { BiSolidCreditCard } from "react-icons/bi";
import { Link } from "react-router-dom";
import { paypalIcon, stripeIcon } from "../../../assets/images/images";

const PaymentProcessorTwo = ({ setShow, onComplete, onBack }) => {
  const handleNextPage = () => {
    setShow({
      AddProduct: false,
      PricingProduct: false,
      Customer_Invoice: false,
      BumpProduct: false,
      PaymentProcessor: false,
      PaymentProcessorTwo: false,
      AffilietsProduct: true,
    });
    onComplete();
  };
  const handlePreviousePage = () => {
    setShow({
      AddProduct: false,
      PricingProduct: false,
      Customer_Invoice: false,
      BumpProduct: false,
      PaymentProcessor: true,
      PaymentProcessorTwo: false,
      AffilietsProduct: false,
    });
    onBack();
  };
  return (
    <>
      <div className="bg-white shadow-xl pt-12 rounded-lg mb-16">
        <div className="flex gap-8 px-12">
          <div className="w-full">
            <div className="mb-16 flex items-center">
              <BiSolidCreditCard className="text-[#E37B5C] text-4xl mr-2" />
              <h2 className="text-black font-bold text-[28px]">
                Payment processors for your product
              </h2>
            </div>
            <div className="pl-12 mb-8">
              <div className="flex justify-start items-center mb-8">
                <p className="text-[#717171] pr-4">Accepting payments via </p>
                <img src={paypalIcon} alt="paypalIcon" className="w-20 mr-4" />
                <p>into LoremIpsum@.net</p>
              </div>
              <div className="flex justify-start items-center mb-8">
                <p className="text-[#717171] pr-4">Accepting payments via </p>
                <img src={stripeIcon} alt="stripeIcon" className="w-20 mr-4" />
                <p>into LoremIPsum.net</p>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <div className="text-center my-3">
                <button className="bg-[#2AA9E1] text-white hover:text-white text-xl font-medium hover:bg-[#373737] px-8 py-3 rounded-lg inline-flex justify-center items-center">
                  <BiSolidCreditCard className="mr-2" />
                  Edit Processors
                </button>
              </div>
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
            type="button"
            onClick={() => {
              handleNextPage();
            }}
            className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
export default PaymentProcessorTwo;
