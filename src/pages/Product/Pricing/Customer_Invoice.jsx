import { Checkbox, Label } from "flowbite-react";
import { FaFileInvoiceDollar } from "react-icons/fa";

const Customer_Invoice = () => {
  return (
    <>
      <div className="bg-white shadow-xl px-12 py-8 rounded-3xl mb-16">
        <div className="flex items-center">
          <FaFileInvoiceDollar className="mr-4 text-[#E37B5C] text-2xl" />
          <div className="flex items-center gap-2">
            <Checkbox id="invoice" className="mr-2" />
            <Label htmlFor="invoice" className="text-black font-bold">
              Do you want to customize your customer’s invoice?{" "}
            </Label>
          </div>
        </div>
      </div>
    </>
  );
};
export default Customer_Invoice;
