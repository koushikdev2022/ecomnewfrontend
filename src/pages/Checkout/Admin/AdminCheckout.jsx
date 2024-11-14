import React, { useEffect, useState } from "react";
import AdminCheckoutEditor from "./AdminCheckoutEditor";
import AdminCheckoutModal from "./AdminCheckoutModal";
import AdminEditor from "../Editor/AdminEditor";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemplateList } from "../../../Reducer/EditorSlice";

const AdminCheckout = () => {
  const dispatch = useDispatch();
  const { templateList } = useSelector((state) => state.editor);
  const [isTemplateSelected, setIsTemplateSelected] = useState(null);
  const [templateId, setTemplateId] = useState(null);
  const [openChooseCheckoutTemplateModal, setOpenChooseCheckoutTemplateModal] =
    useState(false);
  const [activeSteps, setActiveSteps] = useState(["Checkout"]);
  const [showCheckoutOptions, setShowCheckoutOptions] = useState({
    checkout: true,
    checkoutEditor: false,
  });
  // Function to handle next page
  const handleNextPage = () => {
    setShowCheckoutOptions({
      checkout: true,
      checkoutEditor: false,
    });
  };
  // Function to handle previous page
  const handlePreviousePage = () => {};

  // Function to handle show editor
  const handleShowEditor = (templateId) => {
    setIsTemplateSelected(true);
    console.log("templateId", templateId);
    setTemplateId(templateId);
  };

  const handleEditorSave = () => {
    setShowCheckoutOptions({
      checkout: false,
      checkoutEditor: false,
    });
    setTemplateId(null);
    // onComplete();
  };

  useEffect(() => {
    console.log("showCheckoutOptions", showCheckoutOptions);
  }, [showCheckoutOptions]);

  useEffect(() => {
    dispatch(fetchTemplateList());
  }, []);

  return (
    <div>
      <div className="product_details_area px-0 py-4">
        {!showCheckoutOptions.checkoutEditor && (
          <div className="mb-14 px-4 lg:px-12">
            <div className="product_step_flow coupon_step">
              {["Checkout", "Success Page"].map((step) => (
                <div
                  key={step}
                  className={`step_box ${
                    activeSteps.includes(step) ? "active_step" : ""
                  }`}
                >
                  <div className="default_round">&nbsp;</div>
                  <p className="text-black text-base font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Checkout Section  */}
        {showCheckoutOptions.checkout && (
          <AdminCheckoutEditor
            activeSteps={activeSteps}
            setOpenChooseCheckoutTemplateModal={
              setOpenChooseCheckoutTemplateModal
            }
            // handleNextPage={handleNextPage}
          />
        )}

        {/* SuccessPage Section start here */}
        {/* {show.SuccessPage && (
      <SuccessPage
        setShowCheckoutOptions={setShowCheckoutOptions}
        handleShowEditor={handleShowEditor}
        templateId={templateId}
        setTemplateId={setTemplateId}
      />
    )} */}
        {/* SuccessPage Section ends here */}
      </div>

      {/* Add Checkout modal start here */}
      {openChooseCheckoutTemplateModal && (
        <AdminCheckoutModal
          openChooseCheckoutTemplateModal={openChooseCheckoutTemplateModal}
          setOpenChooseCheckoutTemplateModal={
            setOpenChooseCheckoutTemplateModal
          }
          handleShowEditor={handleShowEditor}
          templateList={templateList}
          setShowCheckoutOptions={setShowCheckoutOptions}
        />
      )}
      {/* Show Editor */}
      {showCheckoutOptions.checkoutEditor && templateId && (
        <AdminEditor
          // proid={proid}
          // onComplete={onComplete}
          templateId={templateId}
          // setShowCheckoutOptions={setShowCheckoutOptions}
          // setShow={setShow}
          handleEditorSave={handleEditorSave}
          firstTime={true}
        />
      )}

      {/* Add Checkout modal ends here */}
    </div>
  );
};

export default AdminCheckout;
