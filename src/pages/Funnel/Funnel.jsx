import { Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaPlus, FaPlusCircle } from "react-icons/fa";
import { PiArrowBendLeftUpBold } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation, useParams } from "react-router-dom";

import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "../../assets/css/styles/main.css";
import plugin from "grapesjs-typed";

import "grapesjs-preset-webpage";

import grapesjsBlocksBasic from "grapesjs-blocks-basic";
import "grapesjs-preset-webpage";
import grapesjsPluginForms from "grapesjs-plugin-forms";
import thePlugin from "grapesjs-plugin-export";
import tailwindComponent from "../tailwind";
import customCodePlugin from "grapesjs-custom-code";
import pluginTooltip from "grapesjs-tooltip";
import grapesjsTabs from "grapesjs-tabs";
import pluginCountdown from "grapesjs-component-countdown";
import tailwind from "grapesjs-tailwind";
import { useDispatch, useSelector } from "react-redux";
import { paypalIcon, shirt, stripeIcon } from "../../assets/images/images";
import axios from "axios";
import CreateFunnelModal from "./CreateFunnelModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProductList } from "../../Reducer/FunnelSlice";
import CreateFunnelModalDownSell from "./CreateFunnelModalDownSell";
import { saveHtmlCssJs } from "../../Reducer/EditorSlice";
import { saveUserEditor } from "../../Reducer/UserEditorSlice";

const Funnel = () => {
  const dispatch = useDispatch();
  //   const userTokenData = JSON.parse(localStorage.getItem("ecomToken"));
  //   let token = userTokenData && userTokenData.token ? userTokenData.token : null;

  //   const { loading } = useSelector((state) => state?.usereditors);
  //   const [editor, setEditor] = useState(null);
  //   // const location = useLocation();
  //   // const productList = location?.state?.productType;

  //   // console.log("Product list: ", productList);

  //   const params = useParams();
  //   const id = params.id;
  //   const pid = params.productid;
  //   // useEffect(() => {
  //   //   const stripeElement = document.getElementById("stripe-radio");
  //   //   console.log("stripeElement", stripeElement);
  //   // }, [dispatch, productList]);
  //   // console.log(
  //   //   "productList",
  //   //   productList?.data?.[0].paymentProviders?.[0]?.provider_type
  //   // );

  //   useEffect(() => {
  //     const editor = grapesjs.init({
  //       container: "#gjs",
  //       plugins: [
  //         grapesjsBlocksBasic,
  //         grapesjsPluginForms,
  //         thePlugin,
  //         tailwindComponent,
  //         customCodePlugin,
  //         plugin,
  //         pluginTooltip,
  //         grapesjsTabs,
  //         pluginCountdown,
  //         tailwind,
  //       ],
  //       pluginsOpts: {
  //         grapesjsBlocksBasic: {
  //           blocks: ["button", "image", "text", "form"],
  //         },
  //         grapesjsPluginForms: {},
  //         thePlugin: {},
  //         tailwindComponent: {},
  //         customCodePlugin: {},
  //         [plugin]: {},
  //         [pluginTooltip]: {},
  //         grapesjsTabs: {
  //           // Add plugin-specific options here
  //         },
  //         [pluginCountdown]: {},
  //         tailwind: {},
  //       },
  //     });
  //     const blockManager = editor.BlockManager;
  //     //coupon blockManager
  //     blockManager.add("Coupons", {
  //       label: "Coupons",
  //       content: `
  //       <div id="couponDiv" class="container mx-auto">
  //             <div id="couponList" class="bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-center py-10 px-20 rounded-lg shadow-md relative">
  //                 <div id="couponLoop" class="flex items-center space-x-2 mb-6">
  //                     <span id="cpnCode" class="couponCode border-dashed border text-white px-4 py-2 rounded-l">STEALDEAL20</span>
  //                     <span id="cpnBtn" class="couponBtn border border-white bg-white text-purple-600 px-4 py-2 rounded-r cursor-pointer">Copy Code</span>
  //                 </div>

  //             </div>
  //             <input id="cName" class="couName w-80 px-4 py-2 rounded-lg border-2 bg-white text-purple-600 border-purple-600 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300" type="text" placeholder="Enter Your Coupon">

  //         </div>
  //       `,
  //     });
  //     //pricing option blockManager
  //     blockManager.add("pricing", {
  //       label: "Pricing",
  //       content: `
  //  <div class="container mx-auto py-2 px-3" id="myContainer">
  //   <h2 class="text-xl font-semibold text-left mb-4">Choose a pricing option</h2>
  //   <div id="pricingBoth" class="grid grid-cols-2 gap-4">
  //     <!-- Pricing Option 1 -->
  //     <div class="text-center lg:text-left border lg:border-none rounded-lg lg:rounded-none shadow-md lg:shadow-none pb-2 lg:pb-0" id="oneTimeHide">
  //       <label class="lg:border-2 lg:rounded-lg lg:shadow-md p-2 lg:p-4 lg:bg-white lg:hover:shadow-xl transition duration-300 ease-in-out cursor-pointer lg:flex justify-between items-center lg:min-h-[85px]">
  //         <div class="pb-1 lg:pb-0">
  //           <h3 id="annual_text" class="text-xs lg:text-lg font-medium lg:pr-2 pb-1 lg:pb-0">Annual - </h3>
  //           <div id="annual_price" class="text-xs lg:text-2xl font-bold text-black">$200.00</div>
  //         </div>
  //         <input id="annual_opt" type="radio" name="pricingOption" value="annual" class="mr-0 mb-1 lg:mb-0 lg:mr-4 lg:h-5 lg:w-5 text-[#f56f46] focus:ring-[#f56f46] border-gray-300">
  //       </label>
  //     </div>
  //     <!-- Pricing Option 2 -->
  //     <div id="subscriptionHide" class="text-center lg:text-left border lg:border-none rounded-lg lg:rounded-none shadow-md lg:shadow-none pb-2 lg:pb-0">
  //       <label class="lg:border-2 lg:rounded-lg lg:shadow-md p-2 lg:p-4 lg:bg-white lg:hover:shadow-xl transition duration-300 ease-in-out cursor-pointer lg:flex justify-between items-center lg:min-h-[85px]">
  //          <div class="pb-1 lg:pb-0">
  //           <h3 id="monthly_text" class="text-xs lg:text-lg font-medium lg:pr-2 pb-1 lg:pb-0">Monthly - </h3>
  //           <div id="monthly_price" class="text-xs lg:text-2xl font-bold text-black">$130.00</div>
  //         </div>
  //         <input id="monthly_opt" type="radio" name="pricingOption" value="monthly" class="mr-0 mb-1 lg:mb-0 lg:mr-4 lg:h-5 lg:w-5 text-[#f56f46] focus:ring-[#f56f46] border-gray-300">
  //       </label>
  //     </div>
  //   </div>
  // </div>

  //   `,
  //     });
  //     // blockManager.add("paymentMethods", {
  //     //   label: "Payment Methods",
  //     //   content: `
  //     //     <div class="payment-methods-container bg-white p-6 rounded-lg shadow-md">
  //     //       <h2 class="text-xl font-bold mb-4 text-gray-800">Choose Your Payment Method</h2>

  //     //       <!-- Payment Methods Flex Container -->
  //     //       <div class="flex flex-col md:flex-row gap-0 justify-between items-start">

  //     //         <!-- PayPal Section -->
  //     //         <div id="paypalSection" class="payment-method-paypal w-6/12">
  //     //           <label class="flex items-center justify-center cursor-pointer py-4">
  //     //             <input type="radio" name="payment" id="paypal-radio" value="paypal" class="mr-2 h-5 w-5 text-white focus:ring-white" onclick="togglePaymentMethod('paypal')">
  //     //             <span class="text-[#454f59] font-medium">PayPal</span>
  //     //           </label>
  //     //         </div>

  //     //         <!-- Stripe Section -->
  //     //         <div id="stripeScetion" class="payment-method-stripe w-6/12">
  //     //           <label class="flex items-center justify-center cursor-pointer py-4">
  //     //             <input type="radio" name="payment" id="stripe-radio" value="stripe" class="mr-2 h-5 w-5 text-white focus:ring-white" onclick="togglePaymentMethod('stripe')">
  //     //             <span class="text-[#454f59] font-medium">Stripe</span>
  //     //           </label>
  //     //         </div>
  //     //       </div>

  //     //       <!-- Card Element for Stripe -->
  //     //       <div id="card-element-new" class="mt-0 bg-[#f5f7fa] px-6 py-8">
  //     //       </div>
  //     //       <div id="card-element-stripe" class="mt-0 bg-[#f5f7fa] px-6 py-8">

  //     //       </div>

  //     //     </div>
  //     //   `,
  //     //   category: "Payments",
  //     // });

  //     blockManager.add("paymentMethods", {
  //       label: "Payment Methods",
  //       content: `
  //         <div class="payment-methods-container">

  //           <!-- Payment Methods Flex Container -->
  //           <div class="flex gap-0 justify-between items-start">

  //             <!-- PayPal Section -->
  //             <div id="paypalSection" class="payment-method-paypal w-6/12">
  //               <label class="flex items-center justify-center cursor-pointer py-4">
  //                 <input type="radio" name="payment" id="paypal-radio" value="paypal" class="mr-2 h-5 w-5 text-white focus:ring-white" onclick="togglePaymentMethod('paypal')">
  //                 <span class="text-[#505963] text-base font-medium">PayPal</span>
  //                  <img src="https://ecom.bestworks.cloud/img/paypal.png" alt="Paypal" class="ml-2 hidden md:block">
  //               </label>
  //             </div>

  //             <!-- Stripe Section -->
  //             <div id="stripeScetion" class="payment-method-stripe w-6/12">
  //               <label class="flex items-center justify-center cursor-pointer py-4">
  //                 <input type="radio" name="payment" id="stripe-radio" value="stripe" class="mr-2 h-5 w-5 text-white focus:ring-white" onclick="togglePaymentMethod('stripe')">
  //                 <span class="text-[#505963] text-base font-medium">Credit Card</span>
  //                   <img src="https://ecom.bestworks.cloud/img/cards.svg" alt="Powered by Stripe" class="ml-2 hidden md:block">
  //               </label>
  //             </div>
  //           </div>
  //           <div class="bg-gray-100 rounded-xl">
  //           <!-- Card Element for Stripe -->
  //           <div id="card-element-new" class="mt-0 bg-gray-100 px-6 py-8">
  //           </div>
  //           <div id="card-element-stripe" class="mt-0 px-6 pt-8 bg-gray-100 relative top-[-60px]">
  //           </div>

  //           <!-- Order Total Section -->

  //           <div class="order-total-section border-b border-[#d0d3d8] mt-0 flex justify-between items-center bg-gray-100 mx-[28px] py-[15px] relative top-[-50px]">
  //             <span id="proName" class="text-[#454f59] text-[18px] font-normal">WP Rocket - Multi 10</span>
  //             <span id="orderAmount" class="text-gray-900 text-[18px] font-normal">$199</span>
  //           </div>

  //           <div class="order-total-section mt-0 flex justify-between items-center bg-gray-100 mx-[28px] py-[15px] relative top-[-50px]">
  //             <span class="text-[#454f59] text-[18px] font-bold">Order Total</span>
  //             <span id="orderAmount" class="text-gray-900 text-[18px] font-bold">$299</span>
  //           </div>

  //          <div id="coupon" class="coupon-section bg-gray-100 px-[20px] pt-[20px] flex items-center justify-center rounded-b-lg relative top-[-50px]">
  //             <input id="coupon_code" type="text" placeholder="Coupon code" class="text-base w-full px-4 h-[50px] border text-sm border-gray-300 focus:outline-none rounded-full text-gray-700">
  //             <a href="javascript:void(0)" id="applyCoupon" class="px-[40px] h-[50px] leading-[46px] text-base bg-[#1E2A78] text-white font-semibold rounded-full flex items-center justify-center absolute right-[20px]">
  //             Apply
  //               <span class="ml-2">→</span>
  //             </a>
  //           </div>
  //           <div class="text-[#454f59] font-bold text-base text-center pt-0 pb-4 flex items-center justify-center">
  //              <img src="https://ecom.bestworks.cloud/img/doller_n_icon.png" alt="Powered by Stripe" class="mr-1">
  //              Payment is in USD.
  //           </div>

  //         </div>
  //         <div class="text-sm lg:text-base text-[#454f59] pt-4 pl-2" id="cpnLink">
  //             Got a coupon? <a href="javascript:void(0)" id="couponOpen" class="text-[#454f59] font-bold underline cursor-pointer hover:text-[#f56f46]">Click here to enter your code</a>
  //           </div>
  //         </div>
  //       `,
  //       category: "Payments",
  //     });

  //     blockManager.add("paymentMethods2", {
  //       label: "Payment Methods2",
  //       content: `
  //         <div class="payment-methods-container p-3 bg-white">

  //         <div class="flex justify-between items-center">
  //           <h2 class="text-xl font-bold mb-4 text-gray-800">Total:</h2>
  //           <div id="orderAmount" class="text-2xl font-bold text-right mb-4">$1,599.99</div>
  //         </div>

  //           <!-- Payment Methods Section -->
  //           <div class="flex flex-col gap-4">

  //             <!-- Credit or Debit Card Section -->
  //             <div class="bg-[#f9f9f9] rounded-lg">
  //               <div id="stripeScetion" class="payment-method-stripe p-6 rounded-b-lg cursor-pointer">
  //                 <label class="flex items-center gap-4">
  //                   <input type="radio" name="payment" id="stripe-radio" value="stripe" class="h-5 w-5 text-gray-800" onclick="togglePaymentMethod('stripe')">
  //                   <span class="text-gray-800 font-medium">Pay with credit or debit card</span>
  //                   <img src="https://ecom.bestworks.cloud/img/cards.svg" alt="Powered by Stripe" class="ml-auto">
  //                 </label>
  //                 <p class="text-sm text-gray-500 mt-2">This is a secure 128-bit SSL encrypted payment</p>

  //               </div>
  //               <div id="card-element-stripe" class="mt-8 px-6 py-8 relative top-[-30px]">
  //               </div>
  //             </div>

  //             <!-- Pay with PayPal Section -->
  //             <div class="bg-[#f9f9f9] rounded-lg">
  //               <div id="paypalSection" class="payment-method-paypal p-6 rounded-b-lg cursor-pointer">
  //                 <label class="flex items-center gap-4">
  //                   <input type="radio" name="payment" id="paypal-radio" value="paypal" class="h-5 w-5 text-gray-800" onclick="togglePaymentMethod('paypal')">
  //                   <span class="text-gray-800 font-medium">Pay with PayPal</span>
  //                     <img src="https://ecom.bestworks.cloud/img/paypal.png" alt="Paypal" class="ml-auto">
  //                 </label>
  //                 <p class="text-sm text-gray-500 mt-2">Secure and easy transactions with PayPal</p>
  //               </div>
  //               <div id="card-element-new" class="mt-0 px-6 py-8">
  //               </div>
  //               </div>
  //             </div>

  //           <!-- Order Total Section -->

  //         </div>
  //       `,
  //       category: "Payments",
  //     });

  //     blockManager.add("cartOption", {
  //       label: "Cart Option",
  //       content: `

  // <div class="py-10" id="cart_wrap">
  //             <div class="w-full lg:6/12" id="cart_wrap_main">
  //               <div
  //                 class="rounded-lg shadow-lg px-4 pt-6 pb-2"
  //                 id="cart_wrap_main_area"
  //               >
  //                 <h2 class="text-xl text-[#313131] font-bold pb-4">Cart</h2>
  //                 <div class="pt-4" id="cart_wrap_main_cont">
  //                   <div
  //                     class="bg-[#f9f9f9] rounded-b-lg py-2 px-3 flex justify-between items-center"
  //                     id="cart_wrap_price_bar"
  //                   >
  //                     <div
  //                       class="w-9/12 text-sm text-[#bab8b8] font-medium"
  //                       id="cart_wrap_price_bar_name"
  //                     >
  //                       Product name
  //                     </div>
  //                     <div
  //                       class="w-3/12 text-sm text-[#bab8b8] font-medium"
  //                       id="cart_wrap_price_bar_price"
  //                     >
  //                       Price
  //                     </div>
  //                   </div>
  //                   <div class="pt-5" id="cart_wrap_name_list">
  //                     <div
  //                       class="pb-4 px-3 flex justify-between items-center"
  //                       id="cart_wrap_name_list_left"
  //                     >
  //                       <div
  //                         class="w-9/12 text-sm text-[#313131] font-medium"
  //                         id="cart_wrap_name_list_left_name"
  //                       >
  //                         Amazon Seller's Bundle
  //                       </div>
  //                       <div
  //                         class="w-3/12 text-sm text-[#313131] font-medium"
  //                         id="cart_wrap_name_list_left_price"
  //                       >
  //                         $ 1,599.99
  //                       </div>
  //                     </div>
  //                   </div>
  //                   <div
  //                     class="pb-4 px-3 border-t-4 border-[#efefef] pt-2.5"
  //                     id="cart_wrap_price_list_total"
  //                   >
  //                     <div
  //                       class="flex justify-between items-center"
  //                       id="cart_wrap_price_list_total_wrap"
  //                     >
  //                       <div
  //                         class="w-9/12 text-base text-[#313131] font-extrabold"
  //                         id="cart_wrap_price_list_total_wrap_price_name"
  //                       >
  //                         Total:
  //                       </div>
  //                       <div
  //                         class="w-3/12 text-base text-[#313131] font-bold"
  //                         id="cart_wrap_price_list_total_wrap_price_price"
  //                       >
  //                         $ 1,599.99
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //       `,
  //       category: "Cart",
  //     });

  //     const saveBtn = document.getElementById("save-button");
  //     saveBtn.addEventListener("click", () => {
  //       const html = editor?.getHtml();
  //       const css = editor?.getCss();
  //       const js = editor?.getJs();
  //       const payload = {
  //         product_id: Number(pid),
  //         html: {
  //           content: html,
  //         },
  //         css: {
  //           styles: css,
  //         },
  //         javascript: {
  //           scripts: js,
  //         },
  //       };
  //       dispatch(saveHtmlCssJs(payload)).then((res) => {
  //         console.log("save Response: ", res);
  //       });
  //     });
  //     setEditor(editor);
  //   }, []);

  //   let parseData;
  //   useEffect(() => {
  //     parseData = localStorage.getItem("gjsProject");
  //   }, []);

  //   const handleSubmit1 = () => {
  //     parseData = localStorage.getItem("gjsProject");
  //     dispatch(saveUserEditor({ data: parseData, id: id, pid: pid })).then(
  //       (res) => {
  //         console.log("Res", res);
  //         if (res?.payload?.status_code === 200) {
  //           toast.success(res?.payload?.message, {
  //             position: "top-right",
  //             autoClose: 5000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             progress: undefined,
  //             theme: "light",
  //           });
  //         }
  //       }
  //     );
  //   };

  const [openFunnelModal, setOpenFunnelModal] = useState(false);
  const [opneDownSellModal, setOpenDownSellModal] = useState(false);
  const { singleProduct } = useSelector((state) => state?.funnels);
  const location = useLocation();
  let product_id;
  if (location?.state?.id) {
    product_id = location.state.id;
    console.log("Product_id: ", product_id);
  }
  useEffect(() => {
    dispatch(getProductList({ page: 1, limit: 10, id: product_id }));
  }, [dispatch, product_id]);
  console.log(
    "Single Product: ",
    singleProduct?.data[0]?.upsellProductsList?.length > 0
  );

  return (
    <>
      <ToastContainer />
      <div className="flex justify-end mb-5">
        <div className="add_funnel_item_section">
          <Dropdown dismissOnClick={false} label="Cart Page">
            <Dropdown.Item>Cart Page</Dropdown.Item>
            {singleProduct?.data[0]?.upsellProductsList?.map((upSell) => {
              return (
                <>
                  <Dropdown.Item>
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center">
                        <PiArrowBendLeftUpBold className="mr-2" />{" "}
                        {upSell?.sells_product_name}(
                        {upSell?.sells_product_type})
                      </div>
                      <div className="flex">
                        <botton className="bg-white px-3 py-1 text-sm hover:bg-[#E2F6FF] mr-2">
                          Edit
                        </botton>
                        <button className="bg-white px-1.5 py-1 text-sm mr-0">
                          <RxCross2 />
                        </button>
                      </div>
                    </div>
                  </Dropdown.Item>
                </>
              );
            })}

            <Dropdown.Item>Success Page</Dropdown.Item>
            <Dropdown.Item>
              {/* <button onClick={() => setOpenFunnelModal(true)}>
                <FaPlusCircle className="mr-2" /> Add funnel item
              </button> */}

              <button
                onClick={() => {
                  if (singleProduct?.data[0]?.upsellProductsList?.length > 0) {
                    setOpenDownSellModal(true);
                  } else {
                    setOpenFunnelModal(true);
                  }
                }}
              >
                <FaPlusCircle className="mr-2" /> Add funnel item
              </button>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <div className="checkout_editor_area">
        <div className="flex justify-end">
          <button
            id="save-button"
            // onClick={handleSubmit1}
            className="bg-[#024e70] hover:bg-[#00b1ff] px-5 py-1.5 mb-2 text-white text-sm font-medium flex justify-center items-center rounded-md"
          >
            Save
          </button>
        </div>
        <div id="gjs"></div>
      </div>

      {setOpenFunnelModal && (
        <CreateFunnelModal
          openFunnelModal={openFunnelModal}
          setOpenFunnelModal={setOpenFunnelModal}
          product_id={product_id}
        />
      )}
      {setOpenDownSellModal && (
        <CreateFunnelModalDownSell
          opneDownSellModal={opneDownSellModal}
          setOpenDownSellModal={setOpenDownSellModal}
        />
      )}
    </>
  );
};
export default Funnel;
