import { useEffect, useState } from 'react';
import SuccessPageTemplateModal from './SuccessPageTemplateModal';
import { useNavigate } from 'react-router-dom';
import Success from './Success';
import WebBuilder from '../Checkout/Editor/WebBuilder';

const SuccessPage = ({
  // setShowCheckoutOptions,
  proid,
  setShow,
  templateId,
  setTemplateId,
}) => {
  const navigate = useNavigate();
  const [openChooseSuccessPageTemplate, setOpenChooseSuccessPageTemplate] =
    useState(false);

  const [activeSteps, setActiveSteps] = useState(['Success']);
  const [showSuccessOptions, setShowSuccessOptions] = useState({
    successPage: true,
    successEditor: false,
  });

  const successPageList = [
    {
      image: '',
      id: 4,
    },
  ];

  // Function to handle show editor
  const handleShowEditor = (templateId) => {
    console.log('templateId', templateId);
    setTemplateId(templateId);
  };

  const handleEditorSave = () => {
    setShowSuccessOptions({
      successPage: true,
      successEditor: false,
    });
    setTemplateId(null);
  };

  // Function to handle open choose success page template modal
  const handleOpenChooseSuccessPageTemplate = () => {
    setOpenChooseSuccessPageTemplate(true);
  };

  // Function to handle next page
  const handleNextPage = () => {
    navigate('/product');
  };

  useEffect(() => {
    setTemplateId('');
  }, []);

  return (
    <div>
      {/* Success Section start here */}
      {showSuccessOptions.successPage && (
        <Success
          handleOpenChooseSuccessPageTemplate={
            handleOpenChooseSuccessPageTemplate
          }
          handleNextPage={handleNextPage}
        />
      )}
      {/* Success Section ends here */}

      {/* Success Page Template Choosing Modal starts */}
      {openChooseSuccessPageTemplate && (
        <SuccessPageTemplateModal
          openChooseSuccessPageTemplate={openChooseSuccessPageTemplate}
          setOpenChooseSuccessPageTemplate={setOpenChooseSuccessPageTemplate}
          // setShowCheckoutOptions={setShowCheckoutOptions}
          setShow={setShow}
          successPageList={successPageList}
          handleShowEditor={handleShowEditor}
          templateId={templateId}
          setShowSuccessOptions={setShowSuccessOptions}
        />
      )}
      {/* Success Page Template Choosing Modal ends */}

      {/* Show Editor */}
      {showSuccessOptions.successEditor && templateId && (
        <WebBuilder
          // onComplete={() => handleStepChange('Success Page')}
          // onComplete={onComplete}
          templateId={templateId}
          // setShowCheckoutOptions={setShowCheckoutOptions}
          // setShow={setShow}
          handleEditorSave={handleEditorSave}
        />
      )}
    </div>
  );
};

export default SuccessPage;
