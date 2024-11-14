import React, { useState } from "react";

import { Label, TextInput, Select, Textarea, Checkbox } from "flowbite-react";
import { paypalIcon, stripeIcon } from "../../../assets/images/images";
import { useDrop } from "react-dnd";
const ItemTypes = {
  COMPONENT: "component",
};
const CheckoutTemplateOne = () => {
  const [components, setComponents] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.COMPONENT,
    drop: (item) => addComponent(item.type),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addComponent = (type) => {
    console.log(`Adding ${type} to template`);
    // Logic to add the component to the template
    setComponents((prevComponents) => [...prevComponents, type]);
  };
  const deleteComponent = (indexToDelete) => {
    setComponents((prevComponents) =>
      prevComponents.filter((_, index) => index !== indexToDelete)
    );
  };
  //***** Previous renderComponent************

  // const renderComponent = (type, index) => {
  //   switch (type) {
  //     case "text":
  //       return (
  //         <TextInput
  //           type="text"
  //           sizing="md"
  //           placeholder="Text Input"
  //           key={index}
  //         />
  //       );
  //     case "textarea":
  //       return <Textarea placeholder="Textarea" rows={3} key={index} />;
  //     case "checkbox":
  //       return (
  //         <div key={index}>
  //           <Checkbox id={`checkbox-${index}`} />
  //           <Label htmlFor={`checkbox-${index}`}>Checkbox</Label>
  //         </div>
  //       );
  //     case "label":
  //       return (
  //         <div key={index}>
  //           <Label htmlFor={`label-${index}`}>label</Label>
  //         </div>
  //       );
  //     // Add other components here
  //     default:
  //       return null;
  //   }
  // };

  //***** Previous renderComponent************

  const renderComponent = (type, index) => {
    return (
      <div
        key={index}
        className="relative group mb-4" // Add this class for hover effect
      >
        {type === "text" && (
          <TextInput type="text" sizing="md" placeholder="Text Input" />
        )}
        {type === "textarea" && <Textarea placeholder="Textarea" rows={3} />}
        {type === "checkbox" && (
          <div>
            <Checkbox id={`checkbox-${index}`} />
            <Label htmlFor={`checkbox-${index}`}>Checkbox</Label>
          </div>
        )}
        {type === "label" && (
          <div>
            <Label htmlFor={`label-${index}`}>label</Label>
          </div>
        )}
        {/* Add the delete button */}
        <button
          className="absolute bottom-[-30px] left-0 bg-white-500 text-white px-2 py-1 rounded hidden group-hover:block" // Hidden by default, shows on hover
          onClick={() => deleteComponent(index)}
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
            />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div contentEditable>
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl text-[#4F4F4F] font-bold mb-8">
          Checkout Template One
        </h2>
        <div className="checkout_main_wrap">
          <div className="flex gap-12">
            <div className="w-6/12 shadow-md p-8 rounded-lg" ref={drop}>
              {components.length > 0 &&
                components.map((type, index) => renderComponent(type, index))}
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
                  <button
                    type="submit"
                    className="bg-[#22331D] hover:bg-black text-white font-medium text-[24px] w-full py-3"
                  >
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

export default CheckoutTemplateOne;

// import { Checkbox, Label, Textarea, TextInput } from "flowbite-react";
// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { useDrop } from "react-dnd";

// // Sample product data
// const initialProducts = [
//   { id: "1", name: "Lorem ipsum", orderId: "123AVDOO45", price: "$000.00" },
//   { id: "2", name: "Lorem ipsum", orderId: "123AVDOO45", price: "$000.00" },
// ];
// const ItemTypes = {
//   COMPONENT: "component",
// };
// const CheckoutTemplateOne = () => {
//   const [products, setProducts] = React.useState(initialProducts);
//   const [components, setComponents] = useState([]);
//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: ItemTypes.COMPONENT,
//     drop: (item) => addComponent(item.type),
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   }));
//   // Handling the drag end event
//   const handleOnDragEnd = (result) => {
//     if (!result.destination) return;
//     const items = Array.from(products);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);
//     setProducts(items);
//   };
//   const addComponent = (type) => {
//     console.log(`Adding ${type} to template`);
//     // Logic to add the component to the template
//     setComponents((prevComponents) => [...prevComponents, type]);
//   };
//   const renderComponent = (type, index) => {
//     switch (type) {
//       case "text":
//         return (
//           <TextInput
//             type="text"
//             sizing="md"
//             placeholder="Text Input"
//             key={index}
//           />
//         );
//       case "textarea":
//         return <Textarea placeholder="Textarea" rows={3} key={index} />;
//       case "checkbox":
//         return (
//           <div key={index}>
//             <Checkbox id={`checkbox-${index}`} />
//             <Label htmlFor={`checkbox-${index}`}>Checkbox</Label>
//           </div>
//         );
//       case "label":
//         return (
//           <div key={index}>
//             <Label htmlFor={`label-${index}`}>label</Label>
//           </div>
//         );
//       // Add other components here
//       default:
//         return null;
//     }
//   };
//   return (
//     <div contentEditable>
//       <div className="bg-white p-8 rounded-lg">
//         <h2 className="text-2xl text-[#4F4F4F] font-bold mb-8">
//           Checkout Template One
//         </h2>
//         <div className="checkout_main_wrap">
//           <div className="flex gap-12">
//             <div className="w-6/12 shadow-md p-8 rounded-lg " ref={drop}>
//               {/* Billing and other inputs go here */}
//               {components.length > 0 &&
//                 components.map((type, index) => renderComponent(type, index))}
//             </div>
//             <div className="w-6/12">
//               {/* Order Details with Drag and Drop */}
//               {/* {components.length > 0 &&
//                 components.map((type, index) => renderComponent(type, index))} */}
//               <DragDropContext onDragEnd={handleOnDragEnd}>
//                 <Droppable droppableId="products">
//                   {(provided) => (
//                     <div
//                       {...provided.droppableProps}
//                       ref={provided.innerRef}
//                       className="shadow-md py-5 rounded-lg mb-8"
//                     >
//                       <h3 className="text-2xl text-[#4F4F4F] font-bold mb-8 text-center">
//                         Order Details
//                       </h3>
//                       {products.map(({ id, name, orderId, price }, index) => (
//                         <Draggable key={id} draggableId={id} index={index}>
//                           {(provided) => (
//                             <div
//                               className="mb-4 p-5 flex justify-between items-center"
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                             >
//                               <div className="flex">
//                                 <div className="border border-[#22331D] w-24 h-24 rounded-lg flex justify-center items-center">
//                                   <button className="text-[#5E5E5E] font-medium text-sm text-center">
//                                     Add product photo
//                                   </button>
//                                 </div>
//                                 <div className="ml-4">
//                                   <h3 className="text-[#22331D] text-[20px] font-semibold">
//                                     {name}
//                                   </h3>
//                                   <p className="text-[#22331D] text-sm font-semibold">
//                                     ORDER ID : {orderId}
//                                   </p>
//                                   <p className="text-[#22331D] text-base font-bold">
//                                     {price}
//                                   </p>
//                                 </div>
//                               </div>
//                               <div className="border border-[#D4D4D4] rounded-md px-2 py-1">
//                                 <button className="text-black text-base font-medium">
//                                   +
//                                 </button>
//                                 <span className="text-black text-base font-semibold mx-3">
//                                   01
//                                 </span>
//                                 <button className="text-black text-base font-medium">
//                                   -
//                                 </button>
//                               </div>
//                             </div>
//                           )}
//                         </Draggable>
//                       ))}
//                       {provided.placeholder}
//                     </div>
//                   )}
//                 </Droppable>
//               </DragDropContext>

//               {/* Order Summary and Checkout Button */}
//               <div className="px-4">
//                 <button
//                   type="submit"
//                   className="bg-[#22331D] hover:bg-black text-white font-medium text-[24px] w-full py-3"
//                 >
//                   Complete Order
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutTemplateOne;
