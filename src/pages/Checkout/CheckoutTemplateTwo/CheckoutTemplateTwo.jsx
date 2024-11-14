import React from "react";

import { Label, TextInput, Select, Textarea, Checkbox } from "flowbite-react";
import {
  learingImg,
  paypalIco,
  paypalIcon,
  stripeIcon,
  stripIcon,
  temp2Banner,
  tutorialsImg,
} from "../../../assets/images/images";
import { Link } from "react-router-dom";

const CheckoutTemplateTwo = () => {
  return (
    <div>
      <div className="bg-white p-8 rounded-lg checkout_template_two">
        <h2 className="text-2xl text-[#4F4F4F] font-bold mb-8">
          Checkout Template 2
        </h2>
        <div className="checkout_main_wrap">
          <div className="text-center">
            <img src={temp2Banner} alt="temp2Banner" className="inline-block" />
          </div>

          <div className="flex gap-0">
            {/* Left side start here */}
            <div className="bg-white w-6/12 p-8">
              <div className="mb-8">
                <div className="mb-4">
                  <div className="mb-3 block">
                    <Label
                      value="Contact Information"
                      className="text-[#4F4F4F] text-base font-bold"
                    />
                  </div>

                  <div className="flex gap-4">
                    <TextInput
                      type="text"
                      sizing="md"
                      className="w-6/12"
                      placeholder="First Name"
                    />
                    <TextInput
                      type="text"
                      sizing="md"
                      className="w-6/12"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <TextInput
                    type="email"
                    sizing="md"
                    placeholder="Your Email Address"
                  />
                </div>
                <div className="mb-4">
                  <TextInput type="tel" sizing="md" placeholder="+91" />
                </div>
              </div>
              <div className="mb-8">
                <div className="mb-4">
                  <div className="mb-3 block">
                    <Label
                      value="Billing Address"
                      className="text-[#4F4F4F] text-base font-bold"
                    />
                  </div>

                  <div className="mb-4 flex gap-8">
                    <div className="w-6/12">
                      <Select required>
                        <option>Select Country</option>
                        <option>Country 01</option>
                        <option>Country 02</option>
                        <option>Country 03</option>
                      </Select>
                    </div>
                    <div className="w-6/12">
                      <Select required>
                        <option>Select State</option>
                        <option>State 01</option>
                        <option>State 02</option>
                        <option>State 03</option>
                      </Select>
                    </div>
                  </div>

                  <div className="mb-4 flex gap-8">
                    <div className="w-6/12">
                      <Select required>
                        <option>Your City</option>
                        <option>Country 01</option>
                        <option>Country 02</option>
                        <option>Country 03</option>
                      </Select>
                    </div>
                    <div className="w-6/12">
                      <TextInput
                        type="text"
                        sizing="md"
                        placeholder="Postcode"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <TextInput
                    type="text"
                    sizing="md"
                    placeholder="Your  Address"
                  />
                </div>
                <div className="mb-4">
                  <TextInput
                    type="text"
                    sizing="md"
                    placeholder="Nearest Landmark"
                  />
                </div>
              </div>

              {/* tutorials_section start here */}
              <div className="tutorials_section mb-8">
                <div className="bg-white border-dashed border-2 border-[#AE1688] rounded-md p-8 flex">
                  <div className="w-4/12">
                    <img src={tutorialsImg} alt="tutorialsImg" />
                  </div>
                  <div className="relative w-8/12 px-3">
                    <div className="absolute right-[-10px] top-[-10px]">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#AE1688]"></div>
                      </label>
                    </div>
                    <h3 className="text-[#343434] font-medium text-[20px] pb-2">
                      * New Subscribers get free tutorials *
                    </h3>
                    <p className="text-[#303030] font-medium text-[18px] pb-2">
                      Special one -time offer, only $20
                    </p>
                    <p className="text-[#959595] font-normal text-base">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.{" "}
                    </p>
                  </div>
                </div>
              </div>
              {/* tutorials_section ends here */}

              {/* Choose a pricing option start here */}

              <div className="mb-8">
                <div className="mb-4">
                  <div className="mb-3 block">
                    <Label
                      value="Choose a pricing option"
                      className="text-[#4F4F4F] text-base font-bold"
                    />
                  </div>

                  <div className="mb-8">
                    <div className="flex gap-4">
                      <label className="w-full card-radio-btn">
                        <input
                          type="radio"
                          name="demo"
                          className="card-input-element hidden"
                          value="demo2"
                        />
                        <div className="card card-body w-full p-4">
                          <div className="content_head">
                            <h3 className="text-[#414141] font-medium text-[18px] leading-[24px] pb-4">
                              Annual- BEST deal (get 3 months free )
                            </h3>
                          </div>
                          <div className="text-[#737373] text-[18px] font-medium">
                            $200.00
                          </div>
                        </div>
                      </label>
                      <label className="w-full card-radio-btn">
                        <input
                          type="radio"
                          name="demo"
                          className="card-input-element hidden"
                          value="demo2"
                        />
                        <div className="card card-body w-full p-3">
                          <div className="content_head">
                            <h3 className="text-[#414141] font-medium text-[18px] leading-[24px] pb-4">
                              Monthly- BEST deal (get 5% off on the course )
                            </h3>
                          </div>
                          <div className="text-[#737373] text-[18px] font-medium pb-2">
                            $130.00
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Choose a pricing option ends here */}

              {/* Payment section start here */}
              <div className="mb-8">
                <div className="mb-4">
                  <div className="mb-3 block">
                    <Label
                      value="Payment Information"
                      className="text-[#4F4F4F] text-base font-bold"
                    />
                  </div>
                  <div className="flex rounded-md mb-6">
                    <div className="w-6/12">
                      <button className="bg-[#B03C9A] hover:bg-black px-4 py-4 flex justify-between items-center rounded-l-lg w-full border border-[#B03C9A]">
                        <p className="text-white text-base font-medium">
                          PayPal
                        </p>
                        <img src={paypalIco} alt="paypalIco" />
                      </button>
                    </div>
                    <div className="w-6/12">
                      <button className="bg-white hover:bg-[#B03C9A] px-4 py-4 flex justify-between items-center rounded-r-lg w-full border border-[#B03C9A]">
                        <p className="text-[#4B4C4D] text-base font-medium">
                          Stripe
                        </p>
                        <img src={stripIcon} alt="stripIcon" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-4 mb-6">
                    <div className="w-24 border border-[#BF96B7] rounded-md px-4 py-2">
                      <img src={paypalIcon} alt="paypalIcon" />
                    </div>
                    <div className="w-20 border border-[#BF96B7] rounded-md px-4 py-2">
                      <img src={stripeIcon} alt="stripeIcon" />
                    </div>
                  </div>
                  <div className="border-t border-[#C4C4C4] pt-3">
                    <p className="text-[#747474] text-[14px] font-normal text-center">
                      Please double check your email address is entered
                      correctly. If there’s a mistake, it means the unique id we
                      send to send won’t make it to you! Thank :){" "}
                    </p>
                  </div>
                </div>
              </div>
              {/* Payment section ends here */}
            </div>
            {/* Left side ends here */}
            {/* Right side start here */}
            <div className="bg-[#FFF5FD] p-8 w-6/12">
              <div className="text-center">
                <img
                  src={learingImg}
                  alt="learingImg"
                  className="inline-block"
                />
              </div>
              <h2 className="text-[#292929] text-[32px] font-semibold mb-4">
                Get to learn new things, starting at $12
              </h2>
              <div>
                <ul className="pl-6">
                  <li className="text-[#959595] font-normal text-base list-disc mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.{" "}
                  </li>
                  <li className="text-[#959595] font-normal text-base list-disc mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.{" "}
                  </li>
                  <li className="text-[#959595] font-normal text-base list-disc mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.{" "}
                  </li>
                  <li className="text-[#959595] font-normal text-base list-disc mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.{" "}
                  </li>
                </ul>
              </div>
              <div>
                <div className="mb-4">
                  <div className="mb-1 block">
                    <Label value="Apply Coupons" className="text-[#4F4F4F]" />
                  </div>
                  <TextInput
                    type="text"
                    sizing="md"
                    placeholder="Enter Coupon Code"
                  />
                </div>
                <div className="mb-8">
                  <div className="mb-1 block">
                    <Label value="Order Details" className="text-[#22331D]" />
                  </div>
                  <div className="flex justify-between items-center bg-white p-4 rounded-md">
                    <div className="w-48">
                      <h3 className="text-[17px] text-[#4E4D4D] font-medium pb-2">
                        Total Payment
                      </h3>
                      <p className="text-[14px] text-[#959595] font-medium">
                        Lorem Ipsum beginner masterclass
                      </p>
                    </div>
                    <div className="text-[#4E4D4D] text-[17px] font-medium">
                      $17
                    </div>
                  </div>
                </div>
                <div className="p-0">
                  <button
                    type="submit"
                    className="bg-[#B03C9A] hover:bg-black text-white font-medium rounded-lg text-[18px] w-full py-3"
                  >
                    Complete Order
                  </button>
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <Link className="bg-[#3F3E3F] hover:bg-[#E88BD6] text-[15px] text-white rounded-md px-4 py-2 mr-4">
                  Back
                </Link>
                <button className="bg-[#E88BD6] hover:bg-[#3F3E3F] text-[15px] text-white rounded-md px-4 py-2">
                  Save Changes
                </button>
              </div>
            </div>
            {/* Right side ends here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutTemplateTwo;
