import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "../../assets/css/styles/main.css";
import plugin from "grapesjs-typed";
import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { saveUserEditor } from "../../Reducer/UserEditorSlice";
import { useLocation, useParams } from "react-router-dom";
import { saveHtmlCssJs } from "../../Reducer/EditorSlice";
const NewUserEditor = () => {
  const [editor1, setEditor1] = useState(null);
  const location = useLocation();
  const productList = location?.state?.productType;
  const dispatch = useDispatch();
  console.log("Product list: ", productList);

  const params = useParams();
  const id = params.id;
  const pid = params.productid;
  useEffect(() => {
    const stripeElement = document.getElementById("stripe-radio");
    console.log("stripeElement", stripeElement);
  }, [dispatch, productList]);
  // console.log(
  //   "productList",
  //   productList?.data?.[0].paymentProviders?.[0]?.provider_type
  // );

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#gjs1",
      plugins: [
        grapesjsBlocksBasic,
        grapesjsPluginForms,
        thePlugin,
        tailwindComponent,
        customCodePlugin,
        plugin,
        pluginTooltip,
        grapesjsTabs,
        pluginCountdown,
        tailwind,
        "gjs-preset-webpage",
      ],
      pluginsOpts: {
        grapesjsBlocksBasic: {
          blocks: ["button", "image", "text", "form"],
        },
        grapesjsPluginForms: {},
        thePlugin: {},
        tailwindComponent: {},
        customCodePlugin: {},
        [plugin]: {},
        [pluginTooltip]: {},
        grapesjsTabs: {
          // Add plugin-specific options here
        },
        [pluginCountdown]: {},
        tailwind: {},
        "gjs-preset-webpage": {},
      },
    });

    const blockManager = editor.BlockManager;

    

    blockManager.add("paypal", {
      label: "Payment Via Paypal",
      content: `
        <div class="payment-methods-paypal">
          <label>
            <input className="paypal" type="radio" name="payment" id="paypal-radio" value="paypal" onclick="togglePaymentMethod('paypal')">
            PayPal
          </label>

          <div id="paypal-form" style="display:none;">
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
              <input type="hidden" name="cmd" value="_s-xclick">
              <input type="hidden" name="hosted_button_id" value="YOUR_BUTTON_ID">
              <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynow_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
              <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
            </form>
          </div>
        </div>
      `,
      category: "Payments",
    });


    blockManager.add("stripe", {
      label: "Payment Via Stripe",
      content: `
        <div class="payment-methods-stripe">
          <label>
            <input type="radio" name="payment" id="stripe-radio" value="stripe">
            Stripe
          </label>
        </div>
      `,
      category: "Payments",
    });
    const saveBtn = document.getElementById("save-button");
    saveBtn.addEventListener("click", () => {
      const html = editor.getHtml();
      const css = editor.getCss();
      const js = editor.getJs();
      const payload = {
        product_id: Number(pid),
        html: {
          content: html,
        },
        css: {
          styles: css,
        },
        javascript: {
          scripts: js,
        },
      };
      dispatch(saveHtmlCssJs(payload)).then((res) => {
        console.log("save Response: ", res);
      });
    });
    setEditor1(editor);
  }, []);

  let parseData;
  useEffect(() => {
    parseData = localStorage.getItem("gjsProject");
  }, []);

  const handleSubmit1 = () => {
    parseData = localStorage.getItem("gjsProject");
    dispatch(saveUserEditor({ data: parseData, id: id, pid: pid }));
  };
  return (
    <>
      <div className="checkout_editor_area">
        <div className="flex justify-end">
          <button
            id="save-button"
            onClick={handleSubmit1}
            className="bg-[#024e70] hover:bg-[#00b1ff] px-5 py-1.5 mb-2 text-white text-sm font-medium flex justify-center items-center rounded-md"
          >
            Save
          </button>
        </div>
        <div id="gjs1"></div>
      </div>
    </>
  );
};
export default NewUserEditor;
