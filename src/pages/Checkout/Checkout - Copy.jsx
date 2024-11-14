import React from "react";

import { Label, TextInput, Select, Textarea, Checkbox } from "flowbite-react";
import { paypalIcon, stripeIcon } from "../../assets/images/images";

const Checkout = () => {
  return (
    <div>
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl text-[#4F4F4F] font-bold mb-8">Checkout</h2>
        <div className="checkout_main_wrap">
          <div className="flex gap-12">
            <div className="w-6/12 shadow-md p-8 rounded-lg">
              <div className="mb-4">
                <div className="mb-1 block">
                  <Label value="Billing email *" className="text-[#22331D]" />
                </div>
                <TextInput
                  type="email"
                  sizing="md"
                  placeholder="Lorem Ipsum@gmail.com"
                />
              </div>
              <div className="mb-4">
                <div className="mb-1 block">
                  <Label
                    value="Name on the bill *"
                    className="text-[#22331D]"
                  />
                </div>
                <TextInput type="text" sizing="md" placeholder="Lorem Ipsum" />
              </div>
              <div className="mb-4">
                <div className="mb-1 block">
                  <Label value="Phone Number *" className="text-[#22331D]" />
                </div>
                <TextInput type="tel" sizing="md" placeholder="+91" />
              </div>
              <div className="mb-4">
                <div className="mb-1 block">
                  <Label value="Select Country *" className="text-[#22331D]" />
                </div>
                <Select required>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>France</option>
                  <option>Germany</option>
                </Select>
              </div>
              <div className="mb-4 flex gap-8">
                <div className="w-6/12">
                  <div className="mb-1 block">
                    <Label value="Select State*" className="text-[#22331D]" />
                  </div>
                  <Select required>
                    <option>Select State</option>
                    <option>State 01</option>
                    <option>State 02</option>
                    <option>State 03</option>
                  </Select>
                </div>
                <div className="w-6/12">
                  <div className="mb-1 block">
                    <Label value="Select City*" className="text-[#22331D]" />
                  </div>
                  <Select required>
                    <option>Select City</option>
                    <option>City 01</option>
                    <option>City 02</option>
                    <option>City 03</option>
                  </Select>
                </div>
              </div>
              <div className="mb-4">
                <div className="mb-1 block">
                  <Label value="Postal Code" className="text-[#22331D]" />
                </div>
                <TextInput type="text" sizing="md" placeholder="Postal Code" />
              </div>
              <div className="mb-4">
                <div className="mb-1 block">
                  <Label
                    value="Delivery Address *"
                    className="text-[#22331D]"
                  />
                </div>
                <Textarea
                  placeholder="Delivery Address"
                  className="reresize-none"
                  required
                  rows={4}
                />
              </div>
              <div className="mb-4 flex items-center">
                <div className="flex items-center gap-2 mr-8">
                  <Checkbox id="home" />
                  <Label htmlFor="home" className="text-[#22331D]">
                    Home
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="office" />
                  <Label htmlFor="office" className="text-[#22331D]">
                    Office
                  </Label>
                </div>
              </div>
            </div>
            <div className="w-6/12">
              <div className="shadow-md p-5 rounded-lg mb-8">
                <h3 className="text-2xl text-[#4F4F4F] font-bold mb-8 text-center">
                  Select Payment Type
                </h3>
                <div className="mb-4 flex justify-center items-center">
                  <div className="flex items-center gap-2 mr-8">
                    <Checkbox id="home" />
                    <Label htmlFor="home">
                      <img src={paypalIcon} alt="paypalIcon" className="w-24" />
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="office" />
                    <Label htmlFor="office">
                      <img src={stripeIcon} alt="stripeIcon" className="w-16" />
                    </Label>
                  </div>
                </div>
              </div>
              <div className="shadow-md py-5 rounded-lg mb-8">
                <h3 className="text-2xl text-[#4F4F4F] font-bold mb-8 text-center">
                  Order Details
                </h3>
                <div className="mb-4 p-5">
                  <div className="mb-4 flex justify-between items-center">
                    <div className="flex">
                      <div className="border border-[#22331D] w-24 h-24 rounded-lg flex justify-center items-center">
                        <button className="text-[#5E5E5E] font-medium text-sm text-center">
                          Add product photo
                        </button>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-[#22331D] text-[20px] font-semibold">
                          Lorem ipsum
                        </h3>
                        <p className="text-[#22331D] text-sm font-semibold">
                          ORDER ID : 123AVDOO45
                        </p>
                        <p className="text-[#22331D] text-base font-bold">
                          $000.00
                        </p>
                      </div>
                    </div>
                    <div className="border border-[#D4D4D4] rounded-md px-2 py-1">
                      <button className="text-black text-base font-medium">
                        +
                      </button>
                      <span className="text-black text-base font-semibold mx-3">
                        01
                      </span>
                      <button className="text-black text-base font-medium">
                        -
                      </button>
                    </div>
                  </div>
                  <div className="mb-4 flex justify-between items-center">
                    <div className="flex">
                      <div className="border border-[#22331D] w-24 h-24 rounded-lg flex justify-center items-center">
                        <button className="text-[#5E5E5E] font-medium text-sm text-center">
                          Add product photo
                        </button>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-[#22331D] text-[20px] font-semibold">
                          Lorem ipsum
                        </h3>
                        <p className="text-[#22331D] text-sm font-semibold">
                          ORDER ID : 123AVDOO45
                        </p>
                        <p className="text-[#22331D] text-base font-bold">
                          $000.00
                        </p>
                      </div>
                    </div>
                    <div className="border border-[#D4D4D4] rounded-md px-2 py-1">
                      <button className="text-black text-base font-medium">
                        +
                      </button>
                      <span className="text-black text-base font-semibold mx-3">
                        01
                      </span>
                      <button className="text-black text-base font-medium">
                        -
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="border-t border-[#DCDC] p-5">
                    <div className="flex justify-between items-center">
                      <p className="text-[#888787] text-base font-medium">
                        Subtotal
                      </p>
                      <span className="text-[#737373] text-sm font-medium">
                        $000.00
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-[#888787] text-base font-medium">
                        Shipping
                      </p>
                      <span className="text-[#737373] text-sm font-medium">
                        --
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-[#DCDC] p-5">
                    <div className="flex justify-between items-center">
                      <p className="text-[#888787] text-base font-medium">
                        Total (USD)
                      </p>
                      <span className="text-[#737373] text-sm font-medium">
                        $000.00
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-4">
                  <button className="bg-[#22331D] hover:bg-black text-white font-medium text-[24px] w-full py-3">
                    Complete Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
