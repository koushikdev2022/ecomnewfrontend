import { useEffect } from "react";
import { listImg, prodctListImg } from "../../assets/images/images";
import { Link, useNavigate } from "react-router-dom";
import { SlPlus } from "react-icons/sl";

import {
  Label,
  Select,
  FileInput,
  Pagination,
  Table,
  ToggleSwitch,
} from "flowbite-react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activeDeactiveProduct,
  addProductImage,
  getProductCategory,
  getProductList,
} from "../../Reducer/ProductSlice";
import ProductTypeModal from "./ProductTypeModal";
import { Base64 } from "js-base64";
import copy from "copy-to-clipboard";
import { CgShoppingBag } from "react-icons/cg";
import { BiDesktop, BiEdit } from "react-icons/bi";

const Product = () => {
  const [openAddNewProjectModal, setOpenAddNewProjectModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { productCategory, productList, active_deactive } = useSelector(
    (state) => state?.product
  );
  const domain = window.location.origin;
  console.log("Domain: ", domain);
  const [currentPage, setCurrentPage] = useState(1);
  const jsonObject = localStorage.getItem("userId");
  const userIdDeocoded = Base64.decode(jsonObject);
  const useridjson = JSON.parse(userIdDeocoded);
  const userid = useridjson.user_id;
  // console.log("userIdDeocoded", userid);
  const storedSubDomainName = localStorage.getItem("sub_domain_name");
  const subDomainName = storedSubDomainName
    ? JSON.parse(Base64.decode(storedSubDomainName))?.sub_domain_name
    : null;
  console.log("subDomainName", subDomainName);
  const [copyMessage, setCopyMessage] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductCategory());
  }, [dispatch]);
  // console.log("productCategory", productCategory?.productTypes);
  useEffect(() => {
    dispatch(
      getProductList({
        user_id: userid,
        page: currentPage,
        limit: 6,
        checkout_url: null,
      })
    );
  }, [dispatch, currentPage]);
  // console.log("ProductList: ", productList?.data);

  const handleFileChange = (e, productId) => {
    const file = e.target.files[0];
    // console.log("file: ", file);

    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("image", file);
    // console.log("Formdata", formData);
    dispatch(addProductImage(formData));
  };

  const handleProductSelect = (e) => {
    // const selectedProductId = e.target.value;
    // console.log("Selected", selectedProductId);
    // const selectedProduct = productList?.data?.find(
    //   (product) => product.id.toString() === selectedProductId
    // );
    setSelectedProduct(e.target.value);
    // console.log("Selected Product: ", selectedProduct);
  };
  const filteredProduct = selectedProduct
    ? productList.data?.filter(
        (product) => product.id.toString() === selectedProduct
      )
    : productList?.data;

  console.log("filteredProduct: ", filteredProduct);

  const onPageChange = (page) => {
    setCurrentPage(page);
    // dispatch(getProductList({ user_id: userid, page: currentPage, limit: 5 }));
  };
  const navigate = useNavigate();
  const handleFunnelPage = (id) => {
    // console.log("Product id: ", id);
    navigate("/funnel", {
      state: { id: id },
    });
  };

  // Function to copy URL to clipboard
  const handleCopyURL = (product) => {
    console.log("payel product", product);
    // const url = `https://${subDomainName}.ecom.bestworks.cloud/checkout-url/${product?.id}/${product?.slug}`;

    // const url = `http://localhost:5173/checkout-url/${product?.id}/${product?.slug}`;

    const url = `https://ecom.bestworks.cloud/checkout-url/${product?.id}/${product?.slug}`;
    console.log("payel url", url);
    copy(url);
    setCopyMessage("Copied!");
    setTimeout(() => setCopyMessage(null), 2000); // Hide message after 2 seconds
  };

  const [productStatus, setProductStatus] = useState(
    productList?.data?.reduce((acc, product) => {
      acc[product.id] = product.is_active === 1; // Initialize based on product's is_active status
      return acc;
    }, {})
  );

  const handleStatus = (isActive, id) => {
    // Assuming proList has the product ID

    // Toggle the status and dispatch the action
    const newStatus = !isActive;

    dispatch(activeDeactiveProduct({ product_id: id }))
      .unwrap()
      .then((res) => {
        // If the response is successful, toggle the local state
        console.log("pro res: ", res);

        if (res.status_code === 200) {
          setProductStatus((prevStatus) => ({
            ...prevStatus,
            [id]: newStatus,
          })); // Update the local switch state
          dispatch(
            getProductList({
              user_id: userid,
              page: currentPage,
              limit: 6,
              checkout_url: null,
            })
          );
        }
      })
      .catch((err) => {
        console.error("Error toggling product status:", err);
        // Handle the error (e.g., show a toast notification or alert)
      });
  };
  console.log("active_deactive: ", active_deactive?.data);

  return (
    <div>
      <div className="product_details_area py-0 px-0">
        {/* Product Listing container start here */}
        <div className="bg-white shadow-xl p-4 lg:p-8 rounded-lg mb-16">
          <div className="lg:flex justify-between items-center mb-8">
            <div className="mb-4 lg:mb-0 lg:w-4/12">
              <div className="mb-2 block">
                <Label htmlFor="countries" value="Select products" />
              </div>
              <Select
                required
                onChange={(e) => {
                  handleProductSelect(e);
                }}
              >
                <option>Select products</option>
                {productList?.data?.map((names) => {
                  return (
                    <>
                      <option value={names?.id}>{names?.product_name}</option>
                    </>
                  );
                })}
              </Select>
            </div>
            <div className="mb-0 flex justify-end">
              <button
                onClick={() => setOpenAddNewProjectModal(true)}
                className="bg-[#2AA9E1] hover:bg-black px-6 py-2 text-white text-base font-semibold flex justify-center items-center rounded-md"
              >
                <SlPlus className="text-xl mr-2" />
                Add new product
              </button>
            </div>
          </div>
          {/* Product Listing area start here */}

          {/* New Listing section start here */}

          <div className="mb-10">
            <div className="overflow-x-auto">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell className="bg-[#E3F7FF] text-sm text-[#565656] font-semibold">
                    PRODUCT
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-[#E3F7FF] text-sm text-[#565656] font-semibold">
                    PRODUCT TYPE
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-[#E3F7FF] text-sm text-[#565656] font-semibold">
                    STATUS
                  </Table.HeadCell>
                  <Table.HeadCell className="bg-[#E3F7FF] text-sm text-[#565656] font-semibold">
                    Actions
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {Array.isArray(filteredProduct) &&
                    filteredProduct?.length > 0 &&
                    filteredProduct?.map((proList) => {
                      return (
                        <>
                          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="w-4/12">
                              <div className="lg:flex items-center">
                                <div className="mr-4">
                                  <img
                                    className="w-10 rounded-md"
                                    src={listImg}
                                    alt="listImg"
                                  />
                                </div>
                                <div>
                                  <h3 className="text-black text-base font-semibold">
                                    {proList.product_name}
                                  </h3>
                                  <p className="text-xs">{proList?.label}</p>
                                </div>
                              </div>
                            </Table.Cell>
                            <Table.Cell className="w-2/12">
                              <div className="flex items-center">
                                <div className="bg-[#F6EFFF] w-9 h-9 rounded-full flex justify-center items-center mr-3">
                                  <CgShoppingBag className="text-[#9747FF] text-[18px]" />
                                </div>
                                <p>
                                  {Array.isArray(proList?.prductTypeData) &&
                                    proList?.prductTypeData?.[0]?.name}
                                </p>
                              </div>
                            </Table.Cell>
                            <Table.Cell className="w-2/12">
                              <div className="flex items-center">
                                <div className="toggle_section mr-3">
                                  <ToggleSwitch
                                    // checked={productStatus?.[proList?.id]}
                                    checked={proList?.is_active === 1}
                                    label=""
                                    onClick={() =>
                                      handleStatus(
                                        productStatus?.[proList?.id],
                                        proList?.id
                                      )
                                    }
                                  />
                                </div>
                                {proList?.is_active === 1 ? (
                                  <>
                                    <div className="border border-[#21BAA5] bg-[#E2FFFD] text-[#1AB49E] text-sm px-3 py-1 rounded-2xl">
                                      Enable
                                    </div>
                                  </>
                                ) : (
                                  <div className="border border-[#f20a0a] bg-[#d1a7a7] text-[#ef2828] text-sm px-3 py-1 rounded-2xl">
                                    Disable
                                  </div>
                                )}
                              </div>
                            </Table.Cell>
                            <Table.Cell className="w-4/12">
                              <div className="flex items-center">
                                <button
                                  onClick={() => handleFunnelPage(proList?.id)}
                                  className="bg-[#2AA9E1] text-[13px] rounded-2xl px-3 py-1.5 text-white hover:bg-black mr-3"
                                >
                                  Create Funnel
                                </button>
                                {copyMessage && (
                                  <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md">
                                    {copyMessage}
                                  </div>
                                )}

                                <button
                                  onClick={() => handleCopyURL(proList)}
                                  className="bg-[#C2ECFF] text-[13px] rounded-2xl px-3 py-1.5 text-black font-medium hover:bg-black hover:text-white mr-6"
                                >
                                  Get URL
                                </button>
                                <button className="text-[#2AA9E1] text-2xl hover:text-black">
                                  <BiEdit />
                                </button>
                              </div>
                            </Table.Cell>
                          </Table.Row>
                        </>
                      );
                    })}

                  {/* searching */}

                  {/* {selectedProduct && (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="w-5/12">
                        <div className="flex items-center">
                          <div className="mr-4">
                            <img
                              className="w-10 rounded-md"
                              src={listImg}
                              alt="listImg"
                            />
                          </div>
                          <div>
                            <h3 className="text-black text-base font-semibold">
                              {selectedProduct.product_name}
                            </h3>
                            <p className="text-xs">{selectedProduct?.label}</p>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="w-2/12">
                        <div className="flex items-center">
                          <div className="bg-[#F6EFFF] w-9 h-9 rounded-full flex justify-center items-center mr-3">
                            <CgShoppingBag className="text-[#9747FF] text-[18px]" />
                          </div>
                          <p>
                            {Array.isArray(selectedProduct?.prductTypeData) &&
                              selectedProduct?.prductTypeData?.[0]?.name}
                          </p>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="w-2/12">
                        <div className="flex items-center">
                          <div className="toggle_section mr-3">
                            <ToggleSwitch
                              checked={productStatus?.[selectedProduct.id]}
                              label=""
                              onClick={() =>
                                handleStatus(
                                  productStatus?.[selectedProduct.id],
                                  selectedProduct?.id
                                )
                              }
                            />
                          </div>
                          {selectedProduct?.is_active === 1 ? (
                            <>
                              <div className="border border-[#21BAA5] bg-[#E2FFFD] text-[#1AB49E] text-sm px-3 py-1 rounded-2xl">
                                Enable
                              </div>
                            </>
                          ) : (
                            <div className="border border-[#f20a0a] bg-[#d1a7a7] text-[#ef2828] text-sm px-3 py-1 rounded-2xl">
                              Disable
                            </div>
                          )}
                        </div>
                      </Table.Cell>
                      <Table.Cell className="w-3/12">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              handleFunnelPage(selectedProduct?.id)
                            }
                            className="bg-[#2AA9E1] text-sm rounded-2xl px-3 py-1.5 text-white hover:bg-black mr-3"
                          >
                            Create Funnel
                          </button>
                          <button
                            onClick={() => handleCopyURL(selectedProduct)}
                            className="bg-[#C2ECFF] text-sm rounded-2xl px-3 py-1.5 text-black font-medium hover:bg-black hover:text-white mr-6"
                          >
                            Get URL
                          </button>
                          <button className="text-[#2AA9E1] text-2xl hover:text-black">
                            <BiEdit />
                          </button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  )} */}
                </Table.Body>
              </Table>
            </div>
          </div>

          {/* New Listing section ends here */}
          {/* Product Listing area ends here */}
          <div className="flex overflow-x-auto sm:justify-center mt-10 items-center justify-center">
            <Pagination
              layout="table"
              currentPage={currentPage}
              totalPages={parseInt(productList?.pageCount)}
              onPageChange={onPageChange}
              disabled={currentPage === parseInt(productList?.pageCount)}
            />
            {console.log("Current Page: ", currentPage)}
            {console.log("Total Page1: ", productList?.totalPages / 5)}
            {console.log("Total Page: ", parseInt(productList?.pageCount))}
          </div>
        </div>
        {/* Product Listing container ends here */}
      </div>
      {/* Add new project modal start here */}

      {openAddNewProjectModal && (
        <ProductTypeModal
          openAddNewProjectModal={openAddNewProjectModal}
          setOpenAddNewProjectModal={setOpenAddNewProjectModal}
        />
      )}
      {/* Add new project modal ends here */}
    </div>
  );
};

export default Product;
