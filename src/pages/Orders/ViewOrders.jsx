import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCount, getOrderList } from "../../Reducer/OrderSlice";
import { Modal, Pagination } from "flowbite-react";
import { BiCalendar, BiCheckDouble, BiWallet } from "react-icons/bi";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const ViewOrders = () => {
  const { orderList, count } = useSelector((state) => state?.order);
  const [openModal, setOpenModal] = useState(false);
  const [orderJson, setOrderJson] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const handleOpenModal = (order_json) => {
    setOpenModal(true);
    setOrderJson(order_json);
  };
  console.log("orderJson: ", orderJson);
  const headers = orderJson.length > 0 ? Object.keys(orderJson[0]) : [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getOrderList({
        page: currentPage,
        limit: 10,
      })
    );
    dispatch(getCount());
  }, [dispatch, currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    // dispatch(getProductList({ user_id: userid, page: currentPage, limit: 5 }));
  };
  console.log("OrderList: ", orderList?.data);
  console.log("Count: ", count?.count);

  return (
    <>
      <div className="product_details_area px-0 py-4">
        <div className="mb-4 bg-white rounded-md shadow-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            <div className="px-6 lg:border-r lg:border-[#D9D9D9] mb-4 lg:mb-0">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#555454] text-2xl font-medium">
                    {count?.count?.pending}
                  </h3>
                  <p className="text-[#787878] text-sm font-medium">
                    Pending Payment
                  </p>
                </div>
                <div className="bg-[#FFEAEE] rounded-md p-1.5">
                  <BiCalendar className="text-[#FF6683] text-2xl" />
                </div>
              </div>
            </div>
            <div className="px-6 lg:border-r lg:border-[#D9D9D9] mb-4 lg:mb-0">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#555454] text-2xl font-medium">
                    {count?.count?.completed}
                  </h3>
                  <p className="text-[#787878] text-sm font-medium">
                    Completed
                  </p>
                </div>
                <div className="bg-[#F4ECFF] rounded-md p-1.5">
                  <BiCheckDouble className="text-[#6252AB] text-2xl" />
                </div>
              </div>
            </div>
            <div className="px-6 lg:border-r lg:border-[#D9D9D9] mb-4 lg:mb-0">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#555454] text-2xl font-medium">
                    {" "}
                    {count?.count?.refunded}
                  </h3>
                  <p className="text-[#787878] text-sm font-medium">Refunded</p>
                </div>
                <div className="bg-[#E4F3FF] rounded-md p-1.5">
                  <BiWallet className="text-[#2AA9E1] text-2xl" />
                </div>
              </div>
            </div>
            <div className="px-6 mb-4 lg:mb-0">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#555454] text-2xl font-medium">
                    {count?.count?.cancelled}
                  </h3>
                  <p className="text-[#787878] text-sm font-medium">
                    Cancelled
                  </p>
                </div>
                <div className="bg-[#FFF1D9] rounded-md p-1.5">
                  <AiOutlineExclamationCircle className="text-[#FFB52E] text-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="w-4/12 px-6 py-3 bg-[#E3F7FF] text-sm text-[#565656] font-semibold rounded-tl-lg"
                >
                  Order date
                </th>
                <th
                  scope="col"
                  className="w-4/12 px-6 py-3 bg-[#E3F7FF] text-sm text-[#565656] font-semibold rounded-tl-lg"
                >
                  Product name
                </th>
                <th
                  scope="col"
                  className="w-3/12 px-6 py-3 bg-[#E3F7FF] text-sm text-[#565656] font-semibold"
                >
                  Coupon
                </th>
                <th
                  scope="col"
                  className="w-2/12 px-6 py-3 bg-[#E3F7FF] text-sm text-[#565656] font-semibold"
                >
                  Product Price
                </th>
                <th
                  scope="col"
                  className="w-3/12 px-6 py-3 bg-[#E3F7FF] text-sm text-[#565656] font-semibold rounded-tr-lg"
                >
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {orderList?.data?.map((order) => {
                return (
                  <>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {order?.orderDate}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {order?.productDetail?.product_name}
                      </th>
                      <td className="px-6 py-3">
                        {order?.couponDetail?.coupon_name}
                      </td>
                      {order?.productPriceDetail?.one_type_payment_price ===
                      null ? (
                        <td className="px-6 py-3">
                          {order?.productPriceDetail?.subscription_base_price}
                        </td>
                      ) : (
                        <td className="px-6 py-3">
                          {order?.productPriceDetail?.one_type_payment_price}
                        </td>
                      )}
                      <td className="px-6 py-3">
                        <button
                          onClick={() => handleOpenModal(order?.order_json)}
                          type="button"
                          className="text-white bg-[#4abef1] hover:bg-black focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Customer Details
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          <div className="flex overflow-x-auto sm:justify-center mt-10 items-center justify-center">
            <Pagination
              layout="table"
              currentPage={currentPage}
              totalPages={1000}
              onPageChange={onPageChange}
              disabled
            />
          </div>
        </div>
      </div>
      {openModal && (
        <Modal
          show={openModal}
          onClose={() => setOpenModal(false)}
          size="4xl"
          className="product_details_area"
        >
          <Modal.Header className="coose_product_bg pl-10">
            Customer Details
          </Modal.Header>
          <Modal.Body className="p-0">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {headers.map((header) => (
                      <th scope="col" className="px-6 py-3" key={header}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orderJson.map((order, index) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={index}
                    >
                      {headers.map((header) => (
                        <td className="px-6 py-4" key={header}>
                          {order[header]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
export default ViewOrders;
