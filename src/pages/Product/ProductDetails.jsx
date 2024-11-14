import { useEffect } from "react";
import { useState } from "react";
import AddProduct from "./AddProduct";
import BumpProduct from "./BumpProduct";
import AffilietsProduct from "./AffilietsProduct";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PricingProduct from "./Pricing/PricingProduct";
import PaymentProcessor from "./Pricing/PaymentProcessor";
import PaymentProcessorTwo from "./Pricing/PaymentProcessorTwo";
import Customer_Invoice from "./Pricing/Customer_Invoice";
import Checkout from "../Checkout/Checkout";
import SuccessPage from "../SuccessPage/SuccessPage";
import WebBuilder from "../Checkout/Editor/WebBuilder";

const ProductDetails = () => {
  const [activeSteps, setActiveSteps] = useState(["Options"]);
  const [show, setShow] = useState({
    AddProduct: true, // AddProduct is the first step
    PricingProduct: false,
    Customer_Invoice: false,
    BumpProduct: false,
    PaymentProcessor: false,
    PaymentProcessorTwo: false,
    AffilietsProduct: false,
    Checkout: false,
    SuccessPage: false,
  });
  const [proid, setProId] = useState("");
  const [currencyId, setCurrencyId] = useState("");
  const [templateId, setTemplateId] = useState(null);

  const handleStepChange = (step) => {
    setActiveSteps((prevSteps) => {
      const newSteps = [...prevSteps, step];
      return [...new Set(newSteps)]; // Ensure no duplicate steps
    });

    setShow((prevShow) => ({
      ...prevShow,
      AddProduct: prevShow.AddProduct || step === "Options",
      PricingProduct: step === "Pricing",
      Customer_Invoice: step === "CustomerInvoice",
      BumpProduct: step === "Bump",
      PaymentProcessor: step === "Processors",
      PaymentProcessorTwo: step === "ProcessorsTwo",
      AffilietsProduct: step === "Affiliets",
      Checkout: step === "Checkout",
      SuccessPage: step === "Success Page",
    }));
  };
  const handleBack = () => {
    // setActiveSteps((prevSteps) => {
    //   const newSteps = [...prevSteps, step];
    //   return [...new Set(newSteps)];
    // });
    activeSteps.pop();
    // setActiveSteps(activeSteps);
  };
  useEffect(() => {
    // console.log("Show", show);
    console.log("Active Steps: ", activeSteps);
  }, [activeSteps]);
  // const handleStepChange = (step, isBack = false) => {
  //   setActiveSteps((prevSteps) => {
  //     let newSteps = [...prevSteps];

  //     if (isBack) {
  //       newSteps = newSteps.filter((s) => s !== step);
  //     } else {
  //       newSteps.push(step);
  //     }

  //     return [...new Set(newSteps)];
  //   });

  //   setShow((prevShow) => ({
  //     ...prevShow,
  //     AddProduct: prevShow.AddProduct || step === "Options",
  //     PricingProduct: step === "Pricing" && !isBack,
  //     Customer_Invoice: step === "CustomerInvoice" && !isBack,
  //     BumpProduct: step === "Bump" && !isBack,
  //     PaymentProcessor: step === "Processors" && !isBack,
  //     PaymentProcessorTwo: step === "ProcessorsTwo" && !isBack,
  //     AffilietsProduct: step === "Affiliets" && !isBack,
  //   }));
  // };
  console.log("Product Id: ", proid);

  // const [openPaymentProcessorsModal, setOpenPaymentProcessorsModal] =
  //   useState(false);

  console.log("limit_of_Quantity", typeof limit_of_Quantity);

  useEffect(() => {
    console.log("show", show);
  }, [show]);

  return (
    <>
      <ToastContainer />
      <div className="product_details_area px-0 py-4">
        {/* <div className="mb-14 px-12">
          <div className="product_step_flow">
            <div className="step_box ">
              <div className="default_round">&nbsp;</div>
              <p className="text-black text-xl font-medium">Options</p>
            </div>
            <div className="step_box">
              <div className="default_round">&nbsp;</div>
              <p className="text-black text-xl font-medium">Pricing</p>
            </div>
            <div className="step_box">
              <div className="default_round">&nbsp;</div>
              <p className="text-black text-xl font-medium">Bump</p>
            </div>
            <div className="step_box">
              <div className="default_round">&nbsp;</div>
              <p className="text-black text-xl font-medium">Processors</p>
            </div>
            <div className="step_box">
              <div className="default_round">&nbsp;</div>
              <p className="text-black text-xl font-medium">Affiliets</p>
            </div>
          </div>
        </div> */}

        <div className="mb-14 px-0 lg:px-12">
          <div className="product_step_flow">
            {[
              "Options",
              "Pricing",
              "Bump",
              "Processors",
              "Affiliets",
              "Checkout",
              "Success Page",
            ].map((step, index) => (
              <div
                key={step}
                className={`step_box ${
                  activeSteps.includes(step) ? "active_step" : ""
                }`}
              >
                <div className="default_round">{index + 1}</div>
                <p className="text-black text-base font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Option Section start here */}
        {show.AddProduct && (
          <AddProduct
            //  setProId={setProId}
            setProId={(id) => {
              setProId(id);
              handleStepChange("Pricing");
            }}
            setShow={setShow}
          />
        )}
        {/* Option Section ends here */}

        {/* Price Section start here */}

        {show.PricingProduct && proid && (
          <PricingProduct
            proid={proid}
            setShow={setShow}
            setCurrencyId={setCurrencyId}
            // setCurrencyId={(id) => {
            //   setCurrencyId(id);
            //   handleStepChange("Bump");
            // }}
            onComplete={() => handleStepChange("Bump")}
            onBack={() => handleBack()}
          />
        )}

        {show.Customer_Invoice && <Customer_Invoice setShow={setShow} />}

        {/* Price Section ends here */}

        {/* Bump Section start here */}

        {show.BumpProduct && proid && currencyId && (
          <BumpProduct
            proid={proid}
            setShow={setShow}
            currencyId={currencyId}
            onComplete={() => handleStepChange("Processors")}
            onBack={() => handleBack()}
          />
        )}
        {/* Bump Section ends here */}

        {/* Processors Section start here */}

        {show.PaymentProcessor && (
          <PaymentProcessor
            proid={proid}
            setShow={setShow}
            onComplete={() => handleStepChange("ProcessorsTwo")}
            // onBack={() => handleStepChange("Bump", true)}
            onBack={() => handleBack()}
          />
        )}
        {/* Processors Section ends here */}

        {/* Processors Section part 2 start here */}

        {show.PaymentProcessorTwo && (
          <PaymentProcessorTwo
            setShow={setShow}
            onComplete={() => handleStepChange("Affiliets")}
            // onBack={() => handleStepChange("Processors", true)}
            onBack={() => handleBack()}
          />
        )}
        {/* Processors Section part 2 ends here */}

        {/* Affiliets Section start here */}
        {show.AffilietsProduct && proid && (
          <AffilietsProduct
            proid={proid}
            setShow={setShow}
            // onBack={() => handleStepChange("Processors", true)}
            onComplete={() => handleStepChange("Checkout")}
            onBack={() => handleBack()}
          />
        )}
        {/* Affiliets Section ends here */}

        {/* Checkout Section start here */}
        {show.Checkout && (
          <Checkout
            proid={proid}
            show={show}
            setShow={setShow}
            onComplete={() => handleStepChange("Success Page")}
            onBack={() => handleBack()}
            // templateId={templateId}
            // setTemplateId={setTemplateId}
          />
        )}
        {/* Success Page Section ends here */}
        {show.SuccessPage && (
          <SuccessPage
            proid={proid}
            show={show}
            setShow={setShow}
            onBack={() => handleBack()}
            templateId={templateId}
            setTemplateId={setTemplateId}
          />
        )}
        {/* Success Page Section ends here */}
      </div>

      {/* Add payment processors modal start here */}
      {/* <Modal
        show={openPaymentProcessorsModal}
        onClose={() => setOpenPaymentProcessorsModal(false)}
        size="4xl"
        className="product_details_area"
      >
        <Modal.Header className="coose_product_bg payment_pop pl-10">
          Set up your pricing option sdsdsd
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="py-10 px-10">
            <div className="mb-10">
              <p className="text-[#535353] text-xl font-medium">
                Select the processors and accounts used to sell this product.
              </p>
            </div>
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-8">
                <Checkbox className="mr-2" />
                <Label htmlFor="product" className="text-black font-bold">
                  <img
                    src={paypalIcon}
                    alt="paypalIcon"
                    className="w-20 mr-4"
                  />
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox className="mr-2" />
                <Label htmlFor="product" className="text-black font-bold">
                  <img
                    src={stripeIcon}
                    alt="stripeIcon"
                    className="w-20 mr-4"
                  />
                </Label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-0">
            <Link className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg">
              Back
            </Link>
            <Link className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg">
              Next
            </Link>
          </div>
        </Modal.Body>
      </Modal> */}
      {/* Add payment processors modal ends here */}
    </>
  );
};

export default ProductDetails;
