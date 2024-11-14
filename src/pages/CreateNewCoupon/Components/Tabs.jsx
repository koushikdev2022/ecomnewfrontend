const Tabs = ({ active }) => {
  return (
    // <div className="mb-14 px-12">
    //   <div className="product_step_flow coupon_step">
    //     <div className="step_box active_step">
    //       <div className="default_round">&nbsp;</div>
    //       <p className="text-black text-xl font-medium">Coupon info</p>
    //     </div>
    //     <div className="step_box">
    //       <div className="default_round">&nbsp;</div>
    //       <p className="text-black text-xl font-medium">Usage</p>
    //     </div>
    //     <div className="step_box">
    //       <div className="default_round">&nbsp;</div>
    //       <p className="text-black text-xl font-medium">Products</p>
    //     </div>
    //   </div>
    // </div>

    <div className="mb-14 px-0 lg:px-12">
      <div className="product_step_flow coupon_step">
        <div className={`step_box ${active.couponInfo ? "active_step" : ""}`}>
          <div className="default_round">1</div>
          <p className="text-black text-base font-medium">Coupon info</p>
        </div>
        <div className={`step_box ${active.couponUsage ? "active_step" : ""}`}>
          <div className="default_round">2</div>
          <p className="text-black text-base font-medium">Usage</p>
        </div>
        <div
          className={`step_box ${active.couponProducts ? "active_step" : ""}`}
        >
          <div className="default_round">3</div>
          <p className="text-black text-base font-medium">Products</p>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
