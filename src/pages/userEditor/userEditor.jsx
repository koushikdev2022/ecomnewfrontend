import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "../../assets/css/styles/main.css";
import plugin from "grapesjs-typed";
import React, { useEffect, useState } from "react";
import grapesjsBlocksBasic from "grapesjs-blocks-basic";
import grapesjsPluginForms from "grapesjs-plugin-forms";
import thePlugin from "grapesjs-plugin-export";
import tailwindComponent from "../tailwind";
import customCodePlugin from "grapesjs-custom-code";
import pluginTooltip from "grapesjs-tooltip";
import grapesjsTabs from "grapesjs-tabs";
import pluginCountdown from "grapesjs-component-countdown";
import tailwind from "grapesjs-tailwind";
import axios from "axios";
import api from "../../store/Api";
import { get } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loadEditor, saveEditor } from "../../Reducer/EditorSlice";
import { useParams } from "react-router-dom";
import { saveUserEditor } from "../../Reducer/UserEditorSlice";

const UserEditor = () => {
  const [editor, setEditor] = useState(null);
  const params = useParams();
  const id = params.id;
  const pid = params.productid;
  console.log("editorid: ", id);
  console.log("editorpid", pid);
  const userTokenData = JSON.parse(localStorage.getItem("ecomToken"));
  let token = userTokenData && userTokenData.token ? userTokenData.token : null;
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
      },
    });

    setEditor(editor);
  }, []);

  const dispatch = useDispatch();
  let parseData;
  useEffect(() => {
    parseData = localStorage.getItem("gjsProject");
    // console.log("parseData", parseData);
  }, []);
  //   const handleUserSubmit = () => {
  //     parseData = localStorage.getItem("gjsProject");
  //     dispatch(saveUserEditor({ data: parseData, id: id, pid: pid }));
  //   };
  return (
    <>
      {/* <div className="checkout_editor_area">
        <div className="flex justify-end">
          <h1>Hi</h1>
          <button
            onClick={handleUserSubmit}
            className="bg-[#024e70] hover:bg-[#00b1ff] px-5 py-1.5 mb-2 text-white text-sm font-medium flex justify-center items-center rounded-md"
          >
            Save
          </button>
        </div>
        <div id="gjs1"></div>
      </div> */}
    </>
  );
};
export default UserEditor;
