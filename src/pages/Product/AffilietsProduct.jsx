import { Checkbox, Label, Modal, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { CiDiscount1 } from "react-icons/ci";
import { FaHandshakeSimple } from "react-icons/fa6";
import { HiDocumentText } from "react-icons/hi2";
import { IoMdSettings } from "react-icons/io";
import { SlPlus } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  createAffiliateOption,
  createCommissionSetUp,
  getAffiliatePaidType,
  getCommissionOption,
  getCommissionTypes,
} from "../../Reducer/AffiliateSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { data } from "autoprefixer";

const AffilietsProduct = ({ proid, setShow, onComplete, onBack }) => {
  const { commission, commission_type, affiliate_paid_type } = useSelector(
    (state) => state?.affil
  );
  const [openSetupCommissionsModal, setOpenSetupCommissionsModal] =
    useState(false);
  const [openSetupOptionsModal, setOpenSetupOptionsModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openUrlModal, setOpenUrlModal] = useState(false);
  const [commissionSetupId, setcommissionSetupId] = useState("");
  const [urlData, setUrlData] = useState({ name: "", url: "" });
  const handleSaveUrl = () => {
    setUrlData({ ...urlData });
    setOpenUrlModal(false);
  };
  const handleCheckboxChange = (e) => {
    setIsModalOpen(e.target.checked);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommissionOption());
    dispatch(getCommissionTypes());
    dispatch(getAffiliatePaidType());
  }, [dispatch]);
  // console.log("commission", commission);
  // console.log("type", commission_type);
  const handlePreviousePage = () => {
    setShow({
      AddProduct: false,
      PricingProduct: false,
      Customer_Invoice: false,
      BumpProduct: false,
      PaymentProcessor: false,
      PaymentProcessorTwo: true,
      AffilietsProduct: false,
      Checkout: false,
      SuccessPage: false,
    });
    onBack();
  };

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    setValue: setValue1,
    watch: watch1,
    formState: { errors1 },
  } = useForm();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createCommissionSetUp({ ...data, product_id: proid })).then(
      (res) => {
        // console.log("affi: ", res);
        if (res?.payload?.status_code === 201) {
          toast.success(res?.payload?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "light",
          });
          setcommissionSetupId(res?.payload?.data?.id);
          setOpenSetupCommissionsModal(false);
        } else {
          toast.error("Something Went Wrong", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    );
  };

  const onSubmit1 = (data) => {
    const payload = {
      allow_signup: data?.allow_signup,
      commission_setup_id: commissionSetupId,
      user_cookies: data?.user_cookies,
      cookies_expire: data?.cookies_expire,
      commission_account: data?.commission_account,
      url: [urlData],
    };
    dispatch(createAffiliateOption(payload)).then((res) => {
      // console.log("res affile option: ", res);
      if (res?.payload?.status_code === 201) {
        toast.success(res?.payload?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
        setOpenSetupOptionsModal(false);
        // nevigate("/product");
      }
    });
  };
  return (
    <>
      <div className="bg-white shadow-xl pt-12 rounded-lg mb-16">
        <div className="p-8 mb-4">
          <div className="flex items-center">
            <HiDocumentText className="mr-4 text-[#E37B5C] text-3xl" />
            <div className="flex items-center gap-2">
              <Checkbox
                id="product"
                className="mr-2"
                onChange={handleCheckboxChange}
              />
              <Label htmlFor="product" className="text-black font-bold">
                Do you want affiliates to promote this product?
              </Label>
            </div>
          </div>
          {isModalOpen && (
            <>
              <div className="mt-12">
                <div className="flex gap-8">
                  <div className="w-7/12">
                    <h3 className="text-2xl text-black font-medium pb-6">
                      % Commissions:
                    </h3>
                    <div className="mb-8">
                      <p className="text-xl text-black font-medium pb-4">
                        Lorem Ipsum
                      </p>
                      <ul className="pl-4">
                        <li className="text-black text-base mb-3 list-disc">
                          <strong>Front-end:</strong> 75% commission of $000.00
                          (from $000.00 price)
                        </li>
                        <li className="text-black text-base list-disc">
                          <strong>Payment:</strong> You will pay manually after
                          7 days
                        </li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <p className="text-xl text-black font-medium pb-4">
                        Lorem Ipsum
                      </p>
                      <ul className="pl-4">
                        <li className="text-black text-base mb-3 list-disc">
                          <strong>Front-end:</strong> 75% commission of $000.00
                          (from $000.00 price)
                        </li>
                        <li className="text-black text-base list-disc">
                          <strong>Payment:</strong> You will pay manually after
                          7 days
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-center items-end w-5/12">
                    <button
                      onClick={() => setOpenSetupCommissionsModal(true)}
                      className="inline-flex items-center justify-center bg-[#D2F1FF] text-[#2AA9E1] text-[22px] font-bold py-3 px-8 rounded-lg hover:bg-[#373737]"
                    >
                      <CiDiscount1 className="text-3xl font-extrabold mr-2" />{" "}
                      Edit commission settings
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <h3 className="text-2xl text-black font-medium pb-6 flex items-center">
                  <IoMdSettings className="mr-2" /> Options
                </h3>
                <p className="text-xl text-black font-medium pb-4">
                  Lorem Ipsum
                </p>
                <p className="text-black text-base pb-8">
                  Affiliates signups are <strong>approved automatically</strong>
                  . Your affiliate use a <strong>last-cookie</strong> system.
                  Affiliate links take customers directly to your checkout page.
                  Affiliates can set up <strong>funnel tracking code</strong>.
                  Affiliates can set up a URL to deliver the bonuses.{" "}
                </p>
                <div className="flex justify-end items-end mb-8">
                  <button
                    onClick={() => setOpenSetupOptionsModal(true)}
                    className="inline-flex items-center justify-center bg-[#D2F1FF] text-[#2AA9E1] text-[22px] font-bold py-3 px-8 rounded-lg hover:bg-[#373737]"
                  >
                    <IoMdSettings className="text-3xl font-extrabold mr-2" />{" "}
                    Edit affiliate options
                  </button>
                </div>
                <div className="flex justify-end items-end">
                  <button className="text-white text-[17px] font-medium py-2 px-6 bg-[#2AA9E1] rounded-[4px] hover:bg-[#373737]">
                    Save and get URL
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="grid grid-cols-2 mt-8">
          <button
            onClick={() => {
              handlePreviousePage();
            }}
            type="button"
            className="bg-[#373737] hover:bg-[#4ABCEF] text-white text-xl leading-[54px] font-semibold text-center rounded-bl-lg"
          >
            Back
          </button>
          <button
            onClick={onComplete}
            className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg"
          >
            Next
          </button>
          {/* <Link
            to="/product"
            className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-3xl"
          >
            Next
          </Link> */}
        </div>
      </div>
      <Modal
        show={openUrlModal}
        onClose={() => setOpenUrlModal(false)}
        size="2xl"
        className="product_details_area"
      >
        <Modal.Header className="coose_product_bg pl-10">
          Enter Url
        </Modal.Header>
        <Modal.Body>
          <div className="flex gap-8">
            <div className="w-4/12">
              <div className="mb-2 block">
                <Label htmlFor="countries" value="Name" />
              </div>
              <div className="flex justify-between border border-[#48C7FF]">
                <TextInput
                  type="text"
                  required
                  placeholder="Name"
                  className="no_border_field"
                  value={urlData.name}
                  onChange={(e) =>
                    setUrlData({ ...urlData, name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="w-4/12">
              <div className="mb-2 block">
                <Label htmlFor="countries" value="URL" />
              </div>
              <div className="flex justify-between border border-[#48C7FF]">
                <TextInput
                  type="text"
                  required
                  placeholder="URL"
                  className="no_border_field"
                  value={urlData.url}
                  onChange={(e) =>
                    setUrlData({ ...urlData, url: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="mb-0 w-4/12">
            <div className="mb-2 block">&nbsp;</div>
            <button
              onClick={handleSaveUrl}
              className="bg-[#2AA9E1] w-full text-white text-xl leading-[50px] font-bold hover:bg-[#373737] flex justify-center items-center"
            >
              Save
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={openSetupOptionsModal}
        onClose={() => setOpenSetupOptionsModal(false)}
        size="4xl"
        className="product_details_area"
      >
        <Modal.Header className="coose_product_bg pl-10">
          Choose your affiliate options
        </Modal.Header>
        <form onSubmit={handleSubmit1(onSubmit1)}>
          <Modal.Body className="p-0">
            <div className="py-10 px-10">
              <div className="mb-5">
                <div className="flex gap-8">
                  <div className="w-4/12">
                    <div className="mb-2 block">
                      <Label htmlFor="countries" value="Allow new sign-ups?" />
                    </div>
                    <Select {...register1("allow_signup", { required: true })}>
                      <option>Select</option>
                      <option value={1}>Auto-approve</option>
                      <option value={2}>Manual-approve</option>
                      <option value={0}>Disable</option>
                    </Select>
                  </div>
                  <div className="w-4/12">
                    <div className="mb-2 block">
                      <Label
                        htmlFor="countries"
                        value="Use first or last cookie?"
                      />
                    </div>
                    <Select {...register1("user_cookies", { required: true })}>
                      <option>Select</option>
                      <option value={1}>First Cookies</option>
                      <option value={2}>Last Cookies</option>
                    </Select>
                  </div>
                  <div className="w-4/12">
                    <div className="mb-2 block">
                      <Label htmlFor="countries" value="Cookie expiry" />
                    </div>
                    <Select
                      {...register1("cookies_expire", { required: true })}
                    >
                      <option>Select</option>
                      <option value={0}>Lifetime</option>
                      <option value="7">7 days</option>
                      <option value="14">14 days</option>
                      <option value="30">30 days</option>
                      <option value="60">60 days</option>
                      <option value="90">3 months</option>
                      <option value="180">6 months</option>
                      <option value="365">1 year</option>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <div className="mb-2 block">
                  <Label
                    htmlFor="countries"
                    value="Require affiliates to connect their PayPal account for payment?"
                  />
                </div>
                <Select
                  {...register1("commission_account", { required: true })}
                >
                  <option>Select</option>
                  <option value={1}>
                    Yes,Affiliates must connect their Paypal Account
                  </option>
                  <option value={2}>
                    No,I am able to pay affiliates via some other means(cheque
                    etc)
                  </option>
                </Select>
              </div>

              <div className="mb-5">
                <div className="flex gap-4">
                  <div className="mb-0 w-8/12">
                    <div className="mb-2 block">
                      <Label
                        htmlFor="countries"
                        value="Affiliate link target URL?"
                      />
                    </div>
                    <TextInput
                      type="text"
                      required
                      placeholder="Affiliate link target URL?"
                      value={urlData.url}
                      readOnly
                    />
                  </div>
                  <div className="mb-0 w-4/12">
                    <div className="mb-2 block">&nbsp;</div>
                    <button
                      onClick={() => {
                        setOpenUrlModal(true);
                      }}
                      type="button"
                      className="bg-[#2AA9E1] w-full text-white text-xl leading-[50px] font-bold hover:bg-[#373737] flex justify-center items-center"
                    >
                      <SlPlus className="mr-2" />
                      Add URLs
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 mt-0">
              <button
                type="submit"
                className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg rounded-bl-lg"
              >
                Save
              </button>
            </div>
          </Modal.Body>
        </form>
      </Modal>

      <Modal
        show={openSetupCommissionsModal}
        onClose={() => setOpenSetupCommissionsModal(false)}
        size="4xl"
        className="product_details_area"
      >
        <Modal.Header className="coose_product_bg pl-10">
          Set up affiliate commissions
        </Modal.Header>
        <Modal.Body className="p-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-10 px-10">
              <div className="mb-5">
                <div className="mb-2 block">
                  <Label
                    htmlFor="countries"
                    value="Affiliate commissions should be"
                  />
                </div>
                <Select
                  {...register("commission_option_id", { required: true })}
                >
                  <option>Select</option>
                  {commission?.data?.map((com) => {
                    return (
                      <>
                        <option value={com?.id}>{com?.commission_name}</option>
                      </>
                    );
                  })}
                </Select>
              </div>
              <div className="mb-5">
                <div className="mb-2 block">
                  <Label htmlFor="countries" value="Commission type" />
                </div>
                <Select {...register("commission_type_id", { required: true })}>
                  <option>Select</option>
                  {commission_type?.data?.map((types) => {
                    return (
                      <>
                        <option value={types?.id}>{types?.type_name}</option>
                      </>
                    );
                  })}
                </Select>
              </div>
              <div className="mb-5">
                <div className="flex gap-8">
                  <div className="w-4/12">
                    <div className="mb-2 block">
                      <Label htmlFor="countries" value="Product Commission" />
                    </div>
                    <div className="flex justify-between border border-[#48C7FF]">
                      <TextInput
                        type="text"
                        required
                        placeholder="$"
                        className="no_border_field"
                        {...register("one_type_commission", { required: true })}
                      />
                      <div className="bg-[#BEEBFF] text-2xl px-3 py-1.5">%</div>
                    </div>
                  </div>
                  <div className="w-4/12">
                    <div className="mb-2 block">
                      <Label htmlFor="countries" value="Recurring Commission" />
                    </div>
                    <div className="flex justify-between border border-[#48C7FF]">
                      <TextInput
                        type="text"
                        required
                        placeholder="$"
                        className="no_border_field"
                        {...register("reccurring_commission", {
                          required: true,
                        })}
                      />
                      <div className="bg-[#BEEBFF] text-2xl px-3 py-1.5">%</div>
                    </div>
                  </div>
                  <div className="w-4/12">
                    <div className="mb-2 block">
                      <Label
                        htmlFor="countries"
                        value="Bump offer commission"
                      />
                    </div>
                    <div className="flex justify-between border border-[#48C7FF]">
                      <TextInput
                        type="text"
                        required
                        placeholder="$"
                        className="no_border_field"
                        {...register("bump_commission", { required: true })}
                      />
                      <div className="bg-[#BEEBFF] text-2xl px-3 py-1.5">%</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <div className="flex gap-8">
                  <div className="mb-0 w-6/12">
                    <div className="mb-2 block">
                      <Label
                        htmlFor="countries"
                        value="How should affiliates get paid?"
                      />
                    </div>
                    <Select
                      {...register("affiliate_payment_type_id", {
                        required: true,
                      })}
                    >
                      <option>Select</option>
                      {affiliate_paid_type?.data?.map((paidType) => {
                        return (
                          <>
                            <option value={paidType?.id}>
                              {paidType?.paid_type_name}
                            </option>
                          </>
                        );
                      })}
                    </Select>
                  </div>
                  <div className="mb-0 w-6/12">
                    <div className="mb-2 block">
                      <Label
                        htmlFor="countries"
                        value="Commission are due after..."
                      />
                    </div>
                    <Select
                      {...register("commission_get_after_days", {
                        required: true,
                      })}
                    >
                      <option>Select</option>
                      <option value="7">7 days</option>
                      <option value="14">14 days</option>
                      <option value="30">30 days</option>
                      <option value="60">60 days</option>
                      <option value="90">90 days</option>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 mt-0">
              <button
                type="submit"
                className="bg-[#4ABCEF] hover:bg-[#373737] text-white text-xl leading-[54px] font-semibold text-center rounded-br-lg rounded-bl-lg"
              >
                Save
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AffilietsProduct;
