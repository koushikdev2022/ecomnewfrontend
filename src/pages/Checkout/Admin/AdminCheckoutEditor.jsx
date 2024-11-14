const AdminCheckoutEditor = ({
  setOpenChooseCheckoutTemplateModal,
  handleNextPage,
}) => {
  return (
    <div>
      {/* Coupon info Section start here */}
      <div className="bg-white shadow-xl pt-12 rounded-lg mb-16">
        <div className="px-6 lg:px-12">
          <div className="bg-[#F0FAFF] p-16 rounded-lg border-dashed border-2 border-[#2AA9E1] flex justify-center items-center">
            <div className="text-center">
              <h3 className="text-[#A49595] text-base lg:text-2xl font-normal pb-12">
                Select template for your <br></br> checkout page
              </h3>
              <button
                onClick={() => setOpenChooseCheckoutTemplateModal(true)}
                className="bg-[#55CBFF] hover:bg-[#373737] text-white text-base lg:text-xl font-bold px-6 lg:px-12 py-2.5 rounded-lg"
              >
                Browse Template
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-8">
          <button
            type="button"
            // onClick={handlePreviousePage}
            className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg"
          >
            Back
          </button>
          <button
            onClick={handleNextPage}
            type="button"
            className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg"
          >
            Next
          </button>
        </div>
      </div>
      {/* Coupon info Section ends here */}
    </div>
  );
};

export default AdminCheckoutEditor;
