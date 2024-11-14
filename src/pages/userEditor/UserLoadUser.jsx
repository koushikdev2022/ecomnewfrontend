import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadEditor } from "../../Reducer/EditorSlice";
import { getListPerProductTemplate } from "../../Reducer/UserEditorSlice";
import { getProductList } from "../../Reducer/ProductSlice";

const UserLoadUser = () => {
  const { data } = useSelector((state) => state?.usereditors);
  const { productList } = useSelector((state) => state?.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const pid = params.productid;
  console.log("id: ", id);
  console.log("pid", pid);
  const [productType, setProductType] = useState("");
  useEffect(() => {
    console.log("Hello");
    dispatch(getProductList({ page: 1, limit: 10, id: pid })).then((res) => {
      const productLists =
        res?.payload?.data?.[0]?.paymentProviders?.[0]?.provider_type;
      console.log("provider Type: ", productLists);
      setProductType(productLists);
      console.log("Product Type");

      dispatch(getListPerProductTemplate({ id: id, pid: pid })).then((res) => {
        console.log("Tempres: ", res?.payload?.data?.[0]?.data);

        localStorage.setItem("gjsProject", res?.payload?.data?.[0]?.data);
        navigate(`/user-editor-page/${id}/${pid}`, {
          state: { productType: productType },
        });
        console.log("Product type state", productType);
      });
    });
  }, [productType, dispatch, id, pid]);
  console.log("data", data);

  return (
    <>
      <h1>loading....</h1>
    </>
  );
};

export default UserLoadUser;
