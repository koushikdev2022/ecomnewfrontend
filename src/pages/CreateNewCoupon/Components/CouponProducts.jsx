import { Label, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductList } from "../../../Reducer/ProductSlice";
import { Base64 } from "js-base64";
import { getAllCouponProduct } from "../../../Reducer/CouponSlice";

const CouponProducts = ({
  setShow,
  register,
  errors,
  watch,
  setValue,
  onBack,
}) => {
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [selectedProductId, setSelectedProductId] = useState("");

  const formValues = watch(["coupon_name", "coupon_code"]);
  const { productDropDownList } = useSelector((state) => state?.coupon);
  useEffect(() => {
    const allFieldsFilled = formValues.every((value) => value);
    setIsAllFieldsFilled(allFieldsFilled);
  }, [formValues]);
  const jsonObject = localStorage.getItem("userId");
  const userIdDeocoded = Base64.decode(jsonObject);
  const useridjson = JSON.parse(userIdDeocoded);
  const userid = useridjson.user_id;

  const dispatch = useDispatch();
  useEffect(() => {}, [errors]);
  useEffect(() => {
    dispatch(getAllCouponProduct({ user_id: userid }));
  }, [dispatch]);

  const productsCate = watch("pros");

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelectedProducts) => {
      const newSelectedProducts = { ...prevSelectedProducts };
      if (newSelectedProducts[productId]) {
        delete newSelectedProducts[productId];
      } else {
        newSelectedProducts[productId] = null; // No payment type selected yet
      }

      return newSelectedProducts;
    });
  };

  // const handlePaymentTypeChange = (productId, paymentTypeId) => {
  //   setSelectedProducts((prevSelectedProducts) => ({
  //     ...prevSelectedProducts,
  //     [productId]: paymentTypeId,
  //   }));
  // };

  // const handlePaymentTypeChange = (productId, paymentTypeId, checked) => {
  //   setSelectedProducts((prevSelectedProducts) => {
  //     const updatedPaymentTypes = checked
  //       ? [...prevSelectedProducts[productId], paymentTypeId]
  //       : prevSelectedProducts[productId].filter((id) => id !== paymentTypeId);

  //     return {
  //       ...prevSelectedProducts,
  //       [productId]: updatedPaymentTypes,
  //     };
  //   });
  // };

  const handlePaymentTypeChange = (productId, paymentTypeId, isChecked) => {
    setSelectedProducts((prevSelectedProducts) => {
      // Ensure prevSelectedProducts[productId] is an array
      const existingPaymentTypes = prevSelectedProducts[productId] || [];

      if (isChecked) {
        // Add the payment type if it's not already present
        return {
          ...prevSelectedProducts,
          [productId]: [...existingPaymentTypes, paymentTypeId],
        };
      } else {
        // Remove the payment type if it exists
        return {
          ...prevSelectedProducts,
          [productId]: existingPaymentTypes.filter(
            (id) => id !== paymentTypeId
          ),
        };
      }
    });
  };

  useEffect(() => {
    const couponSpecificPayment = Object.keys(selectedProducts).map(
      (productId) => {
        let paymentTypes = selectedProducts[productId];

        if (!Array.isArray(paymentTypes)) {
          paymentTypes = paymentTypes ? [paymentTypes] : [];
        }

        return {
          product: parseInt(productId, 10),
          payment_type: paymentTypes.map(Number),
        };
      }
    );

    setValue(
      "coupon_specific_product",
      Object.keys(selectedProducts).map(Number)
    );
    setValue("coupon_specific_payment", couponSpecificPayment);

    // console.log("coupon_specific_payment:", couponSpecificPayment);
  }, [selectedProducts, setValue]);

  const handlePreviousPage = () => {
    setShow({ couponUsage: true, couponProducts: false, CouponInfo: false });
    onBack();
  };

  const handleProductSelect = (e) => {
    const selectedProductId = e.target.value;
    setSelectedProductId(selectedProductId); // Update the selected product state
    // console.log("Selected Product Id: ", selectedProductId);
  };

  // Filter the product list based on selected product
  const filteredProducts = selectedProductId
    ? productDropDownList?.data?.filter(
        (product) => product.id.toString() === selectedProductId
      )
    : productDropDownList?.data;
  // console.log("filtered List: ", filteredProducts);

  return (
    <div className="bg-white shadow-xl pt-12 rounded-lg mb-16">
      <div className="px-12">
        <div className="grid grid-cols-2 gap-8">
          <div className="mb-6">
            <div className="mb-2 block">
              <Label htmlFor="base" value="Coupon applies to :" />
            </div>
            <Select {...register("pros")}>
              <option value="allpro">My all products</option>
              <option value="specificPro">Specific products</option>
            </Select>
          </div>
          <div className="mb-6">&nbsp;</div>
        </div>
        {productsCate === "specificPro" && (
          <>
            <div className="grid grid-cols-1 gap-8">
              <div className="mb-6">
                <div className="mb-2 block">
                  <Label
                    htmlFor="base"
                    value="Select the products that this coupon applies to :"
                  />
                </div>
                <Select
                  onChange={handleProductSelect}
                  value={selectedProductId}
                >
                  <option value="">Search your product</option>
                  {Array.isArray(productDropDownList?.data) &&
                    productDropDownList?.data?.map((lists) => {
                      return (
                        <>
                          <option value={lists?.id}>
                            {lists?.product_name}
                          </option>
                        </>
                      );
                    })}
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 border border-[#4ABCEF]">
              <ul
                id="style-3"
                className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownSearchButton"
              >
                {Array.isArray(filteredProducts) &&
                  filteredProducts?.map((products) => {
                    return (
                      <>
                        <li key={products.id}>
                          <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input
                              // id="checkbox-item-11"
                              id={`checkbox-item-${products.id}`}
                              type="checkbox"
                              // checked={!!selectedProducts[products.id]}
                              onChange={() => handleCheckboxChange(products.id)}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="checkbox-item-11"
                              className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                              {products?.product_name}
                            </label>
                          </div>
                          {/* {selectedProducts[products.id] !== undefined && (
                            <div className="mt-2">
                              <Label
                                htmlFor={`payment-type-${products.id}`}
                                value="Payment Type"
                              />
                              <Select
                                id={`payment-type-${products.id}`}
                                onChange={(e) =>
                                  handlePaymentTypeChange(
                                    products.id,
                                    e.target.value
                                  )
                                }
                                required
                              >
                                <option>Select</option>
                                {products.productPriceData?.map(
                                  (product_price) =>
                                    product_price?.paymentType?.map(
                                      (payment_type) => (
                                        <>
                                          <option
                                            key={payment_type.id}
                                            value={payment_type.id}
                                          >
                                            {payment_type.payment_type_name}
                                          </option>
                                        </>
                                      )
                                    )
                                )}
                              </Select>
                            </div>
                          )} */}

                          {selectedProducts[products.id] !== undefined && (
                            <div className="mt-2">
                              <Label
                                htmlFor={`payment-type-${products.id}`}
                                value="Payment Type"
                              />
                              <div id={`payment-type-${products.id}`}>
                                {products.productPriceData?.map(
                                  (product_price) =>
                                    product_price?.paymentType?.map(
                                      (payment_type) => (
                                        <div
                                          key={payment_type.id}
                                          className="flex items-center mt-2"
                                        >
                                          <input
                                            type="checkbox"
                                            id={`payment-type-${products.id}-${payment_type.id}`}
                                            value={payment_type.id}
                                            onChange={(e) =>
                                              handlePaymentTypeChange(
                                                products.id,
                                                payment_type.id,
                                                e.target.checked
                                              )
                                            }
                                          />
                                          <label
                                            htmlFor={`payment-type-${products.id}-${payment_type.id}`}
                                            className="ml-2"
                                          >
                                            {payment_type.payment_type_name}
                                          </label>
                                        </div>
                                      )
                                    )
                                )}
                              </div>
                            </div>
                          )}
                        </li>
                      </>
                    );
                  })}
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="grid grid-cols-2 mt-8">
        <button
          type="button"
          onClick={() => {
            handlePreviousPage();
          }}
          className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CouponProducts;
