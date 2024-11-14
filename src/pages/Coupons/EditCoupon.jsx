import { Datepicker, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSingleCoupon, updateCoupon } from "../../Reducer/CouponSlice";
import { useForm } from "react-hook-form";
import { convertToSubmitFormat } from "../../utils/DateSubmitFormatter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCoupon = () => {
  // const { singleCoupon } = useSelector((state) => state?.coupon);
  // let couponId;
  // const location = useLocation();
  // const dispatch = useDispatch();
  // // console.log("location?.state?.id: ", location?.state?.id);

  // if (location?.state?.id) {
  //   couponId = location?.state?.id;
  // }
  // // console.log("couponId", couponId);

  // const {
  //   register,
  //   handleSubmit,
  //   setError,
  //   setValue,
  //   formState: { errors },
  //   reset,
  // } = useForm();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   dispatch(getSingleCoupon({ id: couponId })).then((res) => {
  //     console.log("Coupon Response: ", res);
  //     const couponData = res?.payload?.data?.[0];

  //     setValue("coupon_name", couponData?.coupon_name);
  //     setValue("coupon_code", couponData?.coupon_code);
  //     setValue("status", couponData?.status);
  //     setValue("coupon_type", couponData?.coupon_type);
  //     setValue("coupon_amount", couponData?.coupon_amount);
  //     setValue(
  //       "coupon_end_date",
  //       convertToSubmitFormat(couponData?.coupon_end_date)
  //     );
  //     // setValue("coupon_start_date", couponData?.coupon_start_date);
  //     setValue("coupon_maximum_use", couponData?.coupon_maximum_use);
  //     setValue(
  //       "coupon_start_date",
  //       convertToSubmitFormat(couponData?.coupon_start_date)
  //     );
  //     console.log(
  //       "coupon_specific_product",
  //       couponData?.coupon_specific_product
  //     );

  //     couponData?.coupon_specific_product?.forEach((product, index) => {
  //       setValue(
  //         `coupon_specific_product[${index}].product_name`,
  //         product.product_name
  //       );
  //       setValue(`coupon_specific_product[${index}].id`, product.id);
  //       console.log("coupon_specific_product: ", product.id);

  //       const paymentTypes = couponData?.coupon_specific_payment.find(
  //         (payment) => payment.product === product.id
  //       )?.payment_type;
  //       // console.log("Payment Type: ", couponData?.coupon_specific_payment);
  //       console.log("Payment Type: ", product.id);

  //       paymentTypes?.forEach((paymentType, paymentIndex) => {
  //         setValue(
  //           `coupon_specific_product[${index}].payment_type[${paymentIndex}]`,
  //           paymentType
  //         );
  //       });
  //     });
  //   });
  // }, []);
  // // console.log("singleCoupon", singleCoupon?.data);
  // // const onSubmit = (data) => {
  // //   dispatch(updateCoupon(data)).then((res) => {
  // //     console.log("res", res);
  // //   });
  // // };

  // const onSubmit = (data) => {
  //   const updatePayload = {
  //     id: location?.state?.id,
  //     coupon_name: data.coupon_name,
  //     coupon_code: data.coupon_code,
  //     status: data.status,
  //     coupon_type: data.coupon_type,
  //     amount: data.coupon_amount,
  //     coupon_start_date: data.coupon_start_date,
  //     coupon_end_date: data.coupon_end_date,
  //     coupon_maximum_use: data.coupon_maximum_use,
  //     coupon_specific_product: [],
  //     coupon_specific_payment: [],
  //   };

  //   // Process products and payment types
  //   singleCoupon?.data?.[0]?.coupon_specific_product?.forEach(
  //     (product, index) => {
  //       if (data?.coupon_specific_product[index]?.selected) {
  //         // Add the selected product ID
  //         updatePayload.coupon_specific_product.push(product.id);

  //         // Get the associated payment types
  //         const paymentTypes =
  //           data?.coupon_specific_product[index]?.payment_type;
  //         if (paymentTypes && paymentTypes.length > 0) {
  //           updatePayload.coupon_specific_payment.push({
  //             product: product.id,
  //             payment_type: paymentTypes.map(Number), // Ensure payment_type is an array of numbers
  //           });
  //         }
  //       }
  //     }
  //   );

  //   // Dispatch update action
  //   dispatch(updateCoupon(updatePayload)).then((res) => {
  //     // console.log("Update Product: ", res);
  //     if (res?.payload?.status_code === 200) {
  //       toast.success(res?.payload?.message, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //       setTimeout(() => {
  //         navigate("/coupons");
  //       }, 2000);
  //     }
  //   });
  // };
  // useEffect(() => {
  //   singleCoupon?.data?.[0]?.coupon_specific_product?.forEach(
  //     (product, index) => {
  //       const isSelected =
  //         singleCoupon?.data?.[0]?.coupon_specific_product?.some(
  //           (item) => item.id === product.id
  //         );

  //       setValue(`coupon_specific_product[${index}].selected`, isSelected);

  //       const paymentType =
  //         singleCoupon?.data?.[0]?.coupon_specific_payment?.find(
  //           (p) => p.product === product.id
  //         )?.payment_type;

  //       setValue(`coupon_specific_product[${index}].payment_type`, paymentType);
  //     }
  //   );
  // }, [singleCoupon, setValue]);
  // const [isDisabled, setIsDisabled] = useState(true);

  const { singleCoupon } = useSelector((state) => state?.coupon);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let couponId;

  if (location?.state?.id) {
    couponId = location?.state?.id;
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(getSingleCoupon({ id: couponId })).then((res) => {
      const couponData = res?.payload?.data?.[0];

      setValue("coupon_name", couponData?.coupon_name);
      setValue("coupon_code", couponData?.coupon_code);
      setValue("status", couponData?.status);
      setValue("coupon_type", couponData?.coupon_type);
      setValue("coupon_amount", couponData?.coupon_amount);
      setValue(
        "coupon_end_date",
        convertToSubmitFormat(couponData?.coupon_end_date)
      );
      setValue(
        "coupon_start_date",
        convertToSubmitFormat(couponData?.coupon_start_date)
      );
      setValue("coupon_maximum_use", couponData?.coupon_maximum_use);

      couponData?.coupon_specific_product?.forEach((product, index) => {
        setValue(`coupon_specific_product[${index}].selected`, true);
        setValue(`coupon_specific_product`, product);
        console.log("coupon_specific_product", product);

        const paymentTypes = couponData?.coupon_specific_payment.find(
          (payment) => payment.product === product
        )?.payment_type;

        setValue(
          `coupon_specific_product[${index}].payment_type`,
          paymentTypes || []
        );
      });
    });
  }, [dispatch, couponId, setValue]);

  const onSubmit = (data) => {
    const updatePayload = {
      id: couponId,
      coupon_name: data.coupon_name,
      coupon_code: data.coupon_code,
      status: data.status,
      coupon_type: data.coupon_type,
      amount: data.coupon_amount,
      coupon_start_date: data.coupon_start_date,
      coupon_end_date: data.coupon_end_date,
      coupon_maximum_use: data.coupon_maximum_use,
      coupon_specific_product: [],
      coupon_specific_payment: [],
    };

    // singleCoupon?.data?.[0]?.coupon_specific_product.forEach(
    //   (product, index) => {
    //     console.log("Hello");

    //     // if (data?.coupon_specific_product[index]) {
    //     updatePayload.coupon_specific_product.push(product);
    //     console.log("Products: ", product);

    //     const paymentTypes = data?.coupon_specific_product[index] || [];
    //     console.log("paymentTypes: ", paymentTypes);

    //     if (paymentTypes.length > 0) {
    //       updatePayload.coupon_specific_payment.push({
    //         product: product,
    //         payment_type: paymentTypes.map(Number),
    //       });
    //     }
    //   }
    // );

    singleCoupon?.data?.[0]?.coupon_specific_product.forEach(
      (product, index) => {
        // Check if the product is selected
        if (data?.coupon_specific_product[index]?.selected) {
          // Add the selected product to the payload
          updatePayload.coupon_specific_product.push(product);

          // Extract payment types for this product
          const paymentTypes =
            data?.coupon_specific_product[index]?.payment_type || [];

          // Ensure payment types are not empty and push them to the coupon_specific_payment
          if (paymentTypes.length > 0) {
            updatePayload.coupon_specific_payment.push({
              product: product,
              payment_type: paymentTypes.map(Number), // Ensure values are converted to numbers
            });
          }
        }
      }
    );
    dispatch(updateCoupon(updatePayload)).then((res) => {
      if (res?.payload?.status_code === 200) {
        toast.success(res?.payload?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/coupons");
        }, 2000);
      }
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="product_details_area px-0 py-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white shadow-xl pt-12 rounded-lg mb-16">
            <div className="px-12">
              <div className="grid grid-cols-2 gap-8">
                <div className="mb-6">
                  <div className="mb-2 block">
                    <Label htmlFor="base" value="Coupon name" />
                  </div>
                  <TextInput
                    type="text"
                    sizing="md"
                    placeholder="Coupon Name"
                    {...register("coupon_name")}
                  />
                </div>
                <div className="mb-6">
                  <div className="mb-2 inline-flex items-center">
                    <Label htmlFor="base" value="Coupon code" />
                    <p className="text-xs pl-4">At least 6 characters</p>
                  </div>
                  <TextInput
                    type="text"
                    sizing="md"
                    placeholder="Coupon code"
                    {...register("coupon_code")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-8">
                <div className="mb-6">
                  <div className="mb-2 block">
                    <Label htmlFor="base" value="Coupon status" />
                  </div>
                  <Select {...register("status")}>
                    <option value="">Coupon status</option>
                    <option value={1}>Enabled</option>
                    <option value={0}>Disabled</option>
                  </Select>
                </div>
                <div className="mb-6">
                  <div className="mb-2 block">
                    <Label htmlFor="base" value="Discount type" />
                  </div>
                  <Select {...register("coupon_type")}>
                    <option value="">Discount type</option>
                    <option value="percentage">Percentage</option>
                    <option value="flat">Flat</option>
                  </Select>
                </div>
                <div className="mb-6">
                  <div className="mb-2 inline-flex items-center">
                    <Label htmlFor="base" value="Discount price" />
                  </div>
                  <TextInput
                    type="text"
                    sizing="md"
                    placeholder="$"
                    {...register("coupon_amount")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="mb-6">
                  <div className="mb-2 inline-flex items-center">
                    <Label htmlFor="base" value="Select date :" />
                  </div>
                  {singleCoupon?.data?.[0]?.coupon_start_date &&
                  singleCoupon?.data?.[0]?.coupon_start_date !== null ? (
                    <div className="calendar_wrap">
                      <Datepicker
                        value={
                          singleCoupon?.data?.[0]?.coupon_start_date &&
                          singleCoupon?.data?.[0]?.coupon_start_date !== null &&
                          convertToSubmitFormat(
                            singleCoupon?.data?.[0]?.coupon_start_date
                          )
                        }
                        // disabled={redeemable === "immediately"}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="mb-6">
                  <div className="mb-2 inline-flex items-center">
                    <Label htmlFor="base" value="Select date :" />
                  </div>

                  <div className="calendar_wrap">
                    <Datepicker
                      value={
                        singleCoupon?.data?.[0]?.coupon_end_date ? (
                          convertToSubmitFormat(
                            singleCoupon?.data?.[0]?.coupon_end_date
                          )
                        ) : (
                          <></>
                        )
                      }
                      // disabled={reedemUntillDate === "disableIt"}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="mb-2 inline-flex items-center">
                  <Label htmlFor="base" value="Disable this coupon after :" />
                </div>
                <div className="flex">
                  <TextInput
                    type="text"
                    sizing="md"
                    placeholder="0"
                    className="w-[150px] mr-4"
                    {...register("coupon_maximum_use")}
                  />
                  <p className="text-[#535353] font-medium text-base py-3">
                    total uses
                  </p>
                </div>
              </div>

              <div
                className={`grid grid-cols-1 gap-8 border border-[#4ABCEF] hidden `}
              >
                <ul
                  id="style-3"
                  className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownSearchButton"
                >
                  {singleCoupon?.data?.[0]?.coupon_specific_product?.map(
                    (product, index) => {
                      // Find the payment types associated with this product
                      const productPayments =
                        singleCoupon?.data?.[0]?.coupon_specific_payment?.find(
                          (p) => p.product === product.id
                        )?.payment_type;
                      console.log("");

                      return (
                        <li key={product.id}>
                          <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input
                              type="checkbox"
                              defaultChecked={true} // Checked by default since the product is part of coupon_specific_product
                              {...register(
                                `coupon_specific_product[${index}].selected`
                              )}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor={`checkbox-item-${product.id}`}
                              className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                              {product?.product_name}
                            </label>
                          </div>

                          <div className="mt-2">
                            <Label htmlFor={`payment-type-${product.id}`} />
                            <Select
                              {...register(
                                `coupon_specific_product[${index}].payment_type`
                              )}
                              defaultValue={
                                productPayments && productPayments[0]
                              } // Set the default value to the first payment type associated with this product
                            >
                              <option value="">Select</option>
                              {productPayments?.map((paymentType) => (
                                <option key={paymentType} value={paymentType}>
                                  {paymentType === 1
                                    ? "One-time Payment"
                                    : "Subscription"}
                                </option>
                              ))}
                            </Select>
                          </div>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-8">
              <Link
                to="/coupons"
                className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg"
              >
                Back
              </Link>
              <button
                type="submit"
                className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default EditCoupon;
