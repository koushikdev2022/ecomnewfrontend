import { Link, useNavigate } from "react-router-dom";
import { Coupon01, Coupon02 } from "../../../assets/images/images";
import { BiSolidCopyAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  couponActiveDeactive,
  getCouponList,
} from "../../../Reducer/CouponSlice";
import { Pagination } from "flowbite-react";

const CouponList = ({ selectedCoupon }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { couponList } = useSelector((state) => state.coupon);
  const [copiedIndexes, setCopiedIndexes] = useState([]);
  const handleCopyClick = (code, index) => {
    const decodedCode = code
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"');
    navigator.clipboard
      .writeText(decodedCode)
      .then(() => {
        setCopiedIndexes((prev) => [...prev, index]);
        setTimeout(
          () => setCopiedIndexes((prev) => prev.filter((i) => i !== index)),
          500
        ); // Clear copied index after 0.5 seconds
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  useEffect(() => {
    dispatch(
      getCouponList({
        page: currentPage,
        limit: 2,
      })
    );
  }, [dispatch, currentPage]);

  const filteredCoupons = selectedCoupon
    ? couponList.data?.filter(
        (coupon) => coupon.id.toString() === selectedCoupon
      )
    : couponList?.data;

  const navigate = useNavigate();
  const handleEditCoupon = (id) => {
    navigate("/edit-coupon", {
      state: { id: id },
    });
  };
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const handleToggleStatus = (couponId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1; // Toggle status
    dispatch(couponActiveDeactive({ coupon_id: couponId, status: newStatus }))
      .then(() => {
        dispatch(
          getCouponList({
            page: currentPage,
            limit: 2,
          })
        );
      })
      .catch((error) => {
        // Handle error (e.g., show a notification)
        console.error("Error updating status:", error);
      });
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {Array.isArray(filteredCoupons) &&
          filteredCoupons?.length > 0 &&
          filteredCoupons?.map((coupon, couponIndex) => (
            <div
              className="p-5 flex bg-white shadow-lg rounded-lg"
              key={couponIndex}
            >
              <div className="w-4/12">
                <div className="bg-[#f5f8f9] h-[150px] w-[150px] rounded-lg flex justify-center items-center border-dashed border-2 border-gray-300">
                  {/* <img src={Coupon01} alt="Coupon01" /> */}
                  <h3 className="text-3xl font-bold text-center">
                    <span className="pr-2"> {coupon?.coupon_amount}</span>
                    {coupon?.coupon_type === "percentage" ? "%" : "Flat"}

                    <span className="block text-base font-normal uppercase">
                      off
                    </span>
                  </h3>
                </div>
              </div>
              <div className="w-8/12 pl-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-[#2aa9e1] text-sm font-normal uppercase">
                    {coupon?.coupon_name}
                  </h3>

                  <button
                    onClick={() =>
                      handleToggleStatus(coupon?.id, coupon?.status)
                    }
                    className={` border ${
                      coupon?.status === 1
                        ? "bg-[#E2FFFD] border-[#21BAA5] text-[#21BAA5]"
                        : "bg-[#FFD3C6] border-[#E37B5C] text-[#E37B5C]"
                    } text-sm leading-[20px] font-normal px-6 py-[4px] rounded-3xl`}
                  >
                    {coupon?.status === 1 ? "Enabled" : "Disabled"}
                  </button>
                </div>
                <p className="text-2xl font-semibold pb-4">
                  Enjoy Up To{" "}
                  <span className="pr-2"> {coupon?.coupon_amount}</span>
                  {coupon?.coupon_type === "percentage" ? "%" : "Flat"} Off on{" "}
                  {coupon?.coupon_name}
                </p>
                <div className="flex">
                  <div className="relative">
                    {/* "Copied" message above the button */}
                    {copiedIndexes.includes(couponIndex) && (
                      <span
                        className={`absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-normal text-black bg-gray-100 px-2 py-1 rounded transition-opacity duration-500 ease-in-out ${
                          copiedIndexes.includes(couponIndex)
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        Copied
                      </span>
                    )}

                    {/* Copy Code button */}
                    <button
                      onClick={() =>
                        handleCopyClick(coupon?.coupon_code, couponIndex)
                      }
                      className="text-[#2AA9E1] text-xs bg-[#C2ECFF] hover:bg-[#2AA9E1] hover:text-white px-3.5 py-1.5 font-medium mb-2 inline-flex items-center mr-3 rounded-full"
                    >
                      <BiSolidCopyAlt className="mr-2" />
                      Copy code
                    </button>
                  </div>

                  <button
                    onClick={() => handleEditCoupon(coupon?.id)}
                    type="button"
                    className="text-white text-xs bg-[#2AA9E1] hover:bg-[#C2ECFF] hover:text-[#2AA9E1] px-3.5 py-1.5 font-medium mb-2 inline-block rounded-full"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex overflow-x-auto sm:justify-center items-center justify-center mt-10">
        {/* <Pagination
          layout="navigation"
          currentPage={currentPage}
          totalPages={Math.floor(filteredCoupons?.total_data / 5) || "0"}
          onPageChange={onPageChange}
          disabled={currentPage === filteredCoupons?.totalPages}
        /> */}

        <Pagination
          layout="navigation"
          currentPage={currentPage}
          totalPages={parseInt(couponList?.pageCount)} // Calculate total pages correctly
          onPageChange={onPageChange}
          disabled={currentPage === parseInt(couponList?.pageCount)} // Disable "Next" button if on the last page
        />
      </div>
    </div>
  );
};

export default CouponList;
