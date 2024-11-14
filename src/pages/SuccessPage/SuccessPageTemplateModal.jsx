import { Modal } from "flowbite-react";

const SuccessPageTemplateModal = ({
  openChooseSuccessPageTemplate,
  setOpenChooseSuccessPageTemplate,
  // setShowCheckoutOptions,
  successPageList,
  handleShowEditor,
  templateId,
  setShowSuccessOptions,
}) => {
  // Function to handle previous page
  const handlePreviousePage = () => {
    setOpenChooseSuccessPageTemplate(false);
  };

  // Function to handle next page
  const handleNextPage = () => {
    setOpenChooseSuccessPageTemplate(false);
    setShowSuccessOptions({
      successPage: false,
      successEditor: true,
    });
  };
  return (
    <div>
      <Modal
        show={openChooseSuccessPageTemplate}
        onClose={() => setOpenChooseSuccessPageTemplate(false)}
        size="4xl"
        className="choose_checkout_template"
      >
        <Modal.Header className="pl-10 bg-[#F0FAFF] text-center">
          Choose checkout template
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="py-10 px-10">
            <div className="grid grid-cols-2 gap-10 mt-0">
              {successPageList?.map((template, templateIndex) => (
                <div key={templateIndex}>
                  <button onClick={() => handleShowEditor(template?.id)}>
                    <img
                      src={template?.image}
                      alt={`checkout_templete_${template.id}`}
                      className="w-80 h-80 hover:shadow-lg hover:shadow-gray-600"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 mt-0">
            <button
              onClick={handlePreviousePage}
              type="button"
              className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg"
            >
              Back
            </button>
            <button
              onClick={handleNextPage}
              type="button"
              className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg"
              disabled={!templateId}
            >
              Next
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SuccessPageTemplateModal;
