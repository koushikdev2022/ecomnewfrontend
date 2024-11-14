import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadEditor } from "../../Reducer/EditorSlice";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

const LoadEditor = () => {
  const { htmlData } = useSelector((state) => state?.editor);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadEditor()).then((res) => {
      console.log("res: ", res?.payload?.data?.[0]?.data);
      localStorage.setItem("gjsProject", res?.payload?.data?.[0]?.data);
      navigate("/editor");
    });
  }, []);
  console.log("htmlData: ", htmlData);

  return (
    <div className="flex items-center justify-center h-[700px]">
      <div className="text-center">
        <Spinner aria-label="" size="xl" />
      </div>
    </div>
  );
};
export default LoadEditor;
