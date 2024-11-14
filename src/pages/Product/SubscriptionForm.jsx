import { Label, Select, TextInput } from "flowbite-react";

const SubscriptionForm = ({ watch, register, selectedCurrency, errors }) => {
  let limit_of_Quantity = watch("quantity");
  let trialPeriods = watch("trialPeriods");
  const subscriptionTodayBasePrice = watch("subscription_base_price");
  return (
    <>
      <div className="mb-5">
        <div className="flex gap-8">
          <div className="mb-0 w-6/12">
            <div className="mb-2 block">
              <Label htmlFor="countries" value="Billing Frequency" />
            </div>
            <Select
              required
              {...register("subscription_type_billing_frequency")}
            >
              <option>Select</option>
              <option value={12}>Yearly</option>
              <option value={1}>Monthly</option>
              <option value={6}>Half Yearly</option>
              <option value={4}>Quarterly</option>
            </Select>
          </div>
          <div className="mb-0 w-6/12">
            <div className="mb-2 block">
              <Label htmlFor="countries" value="Monthly Price" />
            </div>
            <TextInput
              type="text"
              placeholder={selectedCurrency}
              {...register("subscription_base_price", { required: true })}
            />
          </div>

          <div className="mb-0 w-6/12">
            <div className="mb-2 block">
              <Label htmlFor="countries" value="Today's Price" />
            </div>
            <TextInput
              type="text"
              placeholder={selectedCurrency}
              {...register("subscription_today_base_price", { required: true })}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-3">
          <div className="mb-0 w-3/12 ">
            <div className="mb-2 block">
              <Label htmlFor="countries" value="Trial Period" />
            </div>
            <Select {...register("trialPeriods")}>
              <option>Select</option>
              <option value="None">None</option>
              <option value="custom">Custom</option>
            </Select>
          </div>
          {trialPeriods === "custom" && (
            <>
              <div className="w-5/12 flex gap-2">
                <div className="mb-0 w-6/12">
                  <div className="mb-2 block">
                    <Label htmlFor="countries" value="Enter Trial Periods" />
                  </div>
                  <TextInput
                    type="text"
                    placeholder="Enter Trial Periods"
                    {...register("subscription_trail_priod")}
                  />
                </div>
                <div className="mb-0 w-6/12">
                  <div className="mb-2 block">&nbsp;</div>
                  <Select {...register("dayOrMonth")}>
                    <option>Select Periods</option>
                    <option value={86400000}>Day</option>
                    <option value={2592000000}>Month</option>
                  </Select>
                </div>
              </div>
            </>
          )}

          <div className="mb-0 w-4/12">
            <div className="mb-2 block">
              <Label htmlFor="countries" value="Number Of Rebills" />
            </div>
            <TextInput
              type="text"
              placeholder="Number Of Rebills"
              {...register("subscription_rebills")}
            />
          </div>
        </div>
      </div>
      <div className="mb-5">
        <div className="notify_section border border-[#48C7FF] p-8">
          <p className="text-black">
            Your customer will be charged
            {subscriptionTodayBasePrice || `000.00`} {selectedCurrency}{" "}
            immediately
          </p>
        </div>
      </div>
      <div className="mb-5">
        <div className="mb-2 block">
          <Label htmlFor="countries" value="Limit of Quantity" />
        </div>
        <Select defaultValue={0} {...register("quantity", { required: true })}>
          <option>Select Limit of Quantity</option>
          <option value={0}>Unlimited</option>
          <option value={1}>Limited</option>
        </Select>
      </div>
      {limit_of_Quantity === "1" && (
        <>
          <div className="mb-5">
            <div className="mb-2 block">
              <Label htmlFor="countries" value="Quantity" />
            </div>
            <TextInput
              type="text"
              placeholder="Quantity"
              {...register("subscription_type_quantity", { required: true })}
            />
          </div>
        </>
      )}
    </>
  );
};
export default SubscriptionForm;
