import { useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs/dist/grapes.min.js';
// import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css';
// import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js';
import 'grapesjs-preset-webpage';
import plugin from 'grapesjs-preset-webpage';
import basicPlugin from 'grapesjs-blocks-basic';
import gjsForms from 'grapesjs-plugin-forms';
import grapesjsScriptEditor from 'grapesjs-script-editor';
import grapesTabs from 'grapesjs-tabs';
import api from '../../../store/Api';
import {
  fetchPaymentMethods,
  loadEditor,
  saveEditor,
  saveHtmlCssJs,
} from '../../../Reducer/EditorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  paypalIcon,
  shirt,
  stripeIcon,
  tutorialsImg,
} from '../../../assets/images/images';
import axios from 'axios';
import { bumpOfferTemplateOne } from './BumpOffer';

const WebBuilder = ({
  proid,
  // onComplete,
  templateId,
  // setTemplateId,
  // setShowCheckoutOptions,
  // setShow,
  handleEditorSave,
  firstTime,
}) => {
  console.log('templateId', templateId);
  const dispatch = useDispatch();
  // const location = useLocation();
  const navigate = useNavigate();
  // const templateId = location.pathname.split('/').pop();

  // dynamic URL
  let loadURL = `https://ecomapi.bestworks.cloud/product/save-template/${templateId}`;

  const { paymentProviders } = useSelector((state) => state.editor);

  const [gjsProject, setGjsProject] = useState(getCookie('gjsProject') || '');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [nameAttribute, setNameAttribute] = useState('');

  const bumpTemplate = bumpOfferTemplateOne;
  const [bumpHtml, setBumpHtml] = useState(bumpTemplate);

  const handleCouponCheck = () => {};
  const handleSubmit = () => {};

  // options json
  const countryOptions = [
    { value: '', text: 'Select Country' },
    { value: 'ind', text: 'India' },
    { value: 'aus', text: 'Australia' },
    { value: 'uk', text: 'United Kingdom' },
    { value: 'usa', text: 'United States' },
    { value: 'ita', text: 'Italy' },
    { value: 'ger', text: 'Germany' },
  ];
  const stateOptions = [
    { value: '', text: 'Select State' },
    { value: 'and', text: 'Andhra Pradesh' },
    { value: 'tel', text: 'Telangana' },
    { value: 'tn', text: 'Tamil Nadu' },
    { value: 'kar', text: 'Karnataka' },
    { value: 'ker', text: 'Kerala' },
    { value: 'up', text: 'Uttar Pradesh' },
  ];
  const cityOptions = [
    { value: '', text: 'Select City' },
    { value: 'hyd', text: 'Hyderabad' },
    { value: 'sec', text: 'Secunderabad' },
    { value: 'che', text: 'Chennai' },
    { value: 'ban', text: 'Bangalore' },
    { value: 'koc', text: 'Kochi' },
    { value: 'lko', text: 'Lucknow' },
  ];

  // const paymentImages = [
  //   { imgAlt: 'paypalIcon', imgSrc: paypalIcon, value: 'paypal' },
  //   {
  //     imgAlt: 'stripeIcon',
  //     imgSrc:
  //       'https://ecomapi.bestworks.online/assets/payment_provider/stripe.png',
  //     value: 'stripe',
  //   },
  // ];

  const orderDetails = {
    product_image: shirt,
    product_name: 'Shirt',
    order_id: '123AVDO45',
    product_price: 100,
    product_quantity: '1',
    total_shipping: 100,
    total_price: 100,
  };

  const handleOnStore = (data) => {
    dispatch(saveEditor({ id: templateId, data: data }));
    setCookie('gjsProject', data, 1);
    // sessionStorage.setItem('gjsProject', data);
    // localStorage.setItem('gjsProject', data);
  };

  // navigate to checkout page
  const handleSave = (html, css, js) => {
    console.log('typeof css', typeof css);
    // navigate('/demoPage', { state: { html: html, css: css, js: js } });
    dispatch(
      saveHtmlCssJs({ product_id: proid, html: html, css: css, javascript: js })
    );
    handleEditorSave();
  };

  // Set Cookies
  function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }
  // Get cookies
  function getCookie(name) {
    const nameEQ = name + '=';
    const cookiesArray = document.cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
      let cookie = cookiesArray[i].trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  }

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'gjsProject') {
        setGjsProject(event.newValue);
      }
    };

    // Listen for storage events (changes from other tabs/windows)
    window.addEventListener('storage', handleStorageChange);

    // Listen for custom events (changes from the same tab/window)
    window.addEventListener('gjsProjectChange', handleStorageChange);

    // Cleanup: remove event listeners when component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('gjsProjectChange', handleStorageChange);
    };
  }, []);

  const userTokenData = JSON.parse(localStorage.getItem('ecomToken'));
  let token = userTokenData && userTokenData.token ? userTokenData.token : null;

  // // Locate the component with id 'bumpHtmlPart'
  // const addObjectToComponent = (pages, newObject) => {
  //   const findComponent = (components) => {
  //     for (const component of components) {
  //       if (component.attributes?.id === 'bumpHtmlPart') {
  //         console.log('component.attributes.id', component.attributes.id);
  //         // Add the new object to the found component
  //         component.components.push(newObject);
  //         return true; // Stop further searching once added
  //       }
  //       if (component.components && component.components.length > 0) {
  //         if (findComponent(component.components)) {
  //           return true;
  //         }
  //       }
  //     }
  //     return false;
  //   };

  //   for (const page of pages) {
  //     for (const frame of page.frames) {
  //       if (findComponent(frame.component.components)) {
  //         break;
  //       }
  //     }
  //   }
  // };

  useEffect(() => {
    dispatch(fetchPaymentMethods()).then((res) => {
      // console.log('res', res);
      if (res.payload.status_code === 200) {
        const editor = grapesjs.init({
          container: '#gjs',
          height: '700px',
          width: '100%',
          plugins: [
            plugin,
            basicPlugin,
            gjsForms,
            grapesjsScriptEditor,
            grapesTabs,
          ],
          storageManager: {
            type: 'remote',
            options: {
              remote: {
                onStore: (data) => {
                  console.log('data', data);
                },
                onLoad: (result) => {
                  console.log('result', result.data.data[0].data);
                  if (
                    result &&
                    result.data &&
                    result.data.data &&
                    Array.isArray(result.data.data) &&
                    result.data.data.length > 0
                  ) {
                    // // Add the new object
                    // addObjectToComponent(
                    //   result.data.data[0].data.pages,
                    //   bumpHtml
                    // );
                    return result.data.data[0].data;
                  }
                },
              },
            },

            stepsBeforeSave: 1,
            id: 'gjs-',
            autosave: true,
            storeComponents: true,
            storeStyles: true,
            storeHtml: true,
            storeCss: true,
            storeComponentsJson: true,
            contentTypeJson: true,
          },
          assetManager: {
            // assets: [
            //   'http://placehold.it/350x250/78c5d6/fff/image1.jpg',
            //   {
            //     type: 'image',
            //     src: 'http://placehold.it/350x250/459ba8/fff/image2.jpg',
            //     height: 350,
            //     width: 250,
            //     name: 'displayName',
            //   },
            //   {
            //     src: 'http://placehold.it/350x250/79c267/fff/image3.jpg',
            //     height: 350,
            //     width: 250,
            //     name: 'displayName',
            //   },
            // ],
          },
          deviceManager: {
            devices: [
              {
                name: 'Desktop',
                width: '', // default size
              },
              {
                id: 'tablet',
                name: 'Tablet',
                width: '768px',
                widthMedia: '992px',
              },
              {
                name: 'Mobile',
                width: '320px', // this value will be used on canvas width
                widthMedia: '480px', // this value will be used in CSS @media
              },
            ],
          },
        });

        editor.Storage.add('remote', {
          async load() {
            return await axios
              .get(
                firstTime
                  ? `https://ecomapi.bestworks.cloud/product/list-template/${templateId}`
                  : `https://ecomapi.bestworks.cloud/product/list-per-product-template/${proid}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`, // Replace with your actual token
                    'Content-Type': 'application/json',
                  },
                }
              )
              .then((res) => {
                console.log('payel res', res);
                if (res.data.status_code === 200) {
                  firstTime = false;
                }
                return res;
              });
          },

          async store(data) {
            const config = {
              headers: { Authorization: `Bearer ${token}` },
            };
            const bodyParameters = { data: data };
            return axios.post(
              `https://ecomapi.bestworks.cloud/product/product-save-template/${proid}`,
              bodyParameters,
              config
            );
          },
        });

        // Commands
        editor.Commands.add('set-device-desktop', {
          run: (editor) => {
            editor.setDevice('Desktop');
            // editor.getModel().refresh();
          },
        });
        editor.Commands.add('set-device-mobile', {
          run: (editor) => {
            editor.setDevice('Mobile');
          },
        });

        // Add a custom save button
        editor.Panels.addButton('options', {
          id: 'save-db',
          className: 'fa fa-floppy-o',
          command: 'save-db',
          attributes: { title: 'Save' },
        });

        // Define the save command
        editor.Commands.add('save-db', {
          run: (editor, sender) => {
            sender && sender.set('active', 0); // turn off the button
            editor.store();
            console.log('HTML->', editor.getHtml());
            const html = editor.getHtml();
            const css = editor.getCss();
            const js = editor.getJs();
            console.log('js', js);
            handleSave(html, css, js);
          },
        });

        // // Add new custom input box component
        // editor.BlockManager.add('my-input-id', {
        //   label: 'Custom Input',
        //   content: {
        //     type: 'input',
        //     attributes: {
        //       type: 'text',
        //       placeholder: '',
        //       'data-name': 'custom-input-box',
        //     },
        //     script: function () {
        //       let inputEl = this;
        //       console.log('id of input box', inputEl.id);
        //       // Select the input element by its ID
        //       const inputElement = document.getElementById(inputEl.id);
        //       console.log('inputElement', inputElement);

        //       // Get the name attribute
        //       const nameAttribute = inputElement.getAttribute('name');
        //       console.log(nameAttribute); // Outputs: lname

        //       inputEl.addEventListener('input', (event) => {
        //         console.log('inputEl name', event.target.nodeName);
        //         const inputValue = event.target.value;
        //         if (nameAttribute === 'fName') {
        //           setFname(inputValue);
        //         } else if (nameAttribute === 'lName') {
        //           setLname(inputValue);
        //         } else if (nameAttribute === 'age') {
        //           setInputValue(inputValue);
        //         }
        //       });
        //     },
        //     style: {
        //       // color: 'red',
        //     },
        //   },
        // });

        // Add custom select box component for country
        editor.BlockManager.add('my-select-id', {
          label: 'Country Select',
          className: '',
          content: {
            type: 'Select',
            components: [
              {
                tagName: 'Select',
                attributes: {
                  class: 'custom-select',
                },
                components: countryOptions.map((opt) => ({
                  key: opt.value,
                  type: 'option',
                  tagName: 'option',
                  attributes: { value: opt.value },
                  content: opt.text,
                })),
                script: function () {
                  let selectEl = this;
                  selectEl.addEventListener('change', (event) => {
                    const selectedCountry = event.target.value;
                    setSelectedCountry(selectedCountry);
                  });
                },
              },
            ],
            style: {
              // color: 'red',
            },
          },
        });

        // Add custom select box component for state
        editor.BlockManager.add('my-state-select-id', {
          label: 'State Select Box',
          content: {
            type: 'Select',
            components: [
              {
                tagName: 'select',
                attributes: { class: 'custom-state-select' },
                components: stateOptions.map((opt) => ({
                  type: 'option',
                  tagName: 'option',
                  attributes: { value: opt.value },
                  content: opt.text,
                })),
                // script: function () {
                //   let el = this;
                //   el.addEventListener('change', (event) => {
                //     const selectedState = event.target.value;
                //     setSelectedState(selectedState);
                //   });
                // },
              },
            ],
            style: {
              // color: 'red',
            },
          },
        });

        // Add custom select box component for city
        editor.BlockManager.add('my-city-select-id', {
          id: 'my-city-select-id',
          label: 'City Select Box',
          content: {
            type: 'Select',
            components: [
              {
                tagName: 'select',
                attributes: {
                  class: 'custom-city-select',
                },
                components: cityOptions.map((opt) => ({
                  key: opt.value,
                  type: 'option',
                  tagName: 'option',
                  attributes: { value: opt.value },
                  content: opt.text,
                })),
                // script: function () {
                //   let el = this;
                //   el.addEventListener('change', (event) => {
                //     const selectedCity = event.target.value;
                //     setSelectedCity(selectedCity);
                //   });
                // },
              },
            ],
            style: {
              // color: 'red',
            },
          },
        });

        // add custom payment image component
        // Extend GrapesJS with custom block for image list
        const generateImageBlocks = (images) => {
          console.log('payement images in editor-->>', images);
          return images
            .map(
              (img, index) => `
            <div className="gap-2">
              <input type="radio" id="paymentImage" name="paymentType" value=${img.value} />
              <label for="paymentImage" >
                <img src="${img.image}" alt="${img.provider_type_short_name}"  />
              </label>
            </div>`
            )
            .join('');
        };

        editor.BlockManager.add('my-payment-image-id', {
          label: 'Payment Image',
          content: `
            <div>
              <h3>
                Select Payment Type
              </h3>
              <div className="align-middle">
                ${generateImageBlocks(res.payload.paymentProviderTypes)}
              </div>
            </div>
          `,
          category: 'Basic',
          script: function () {
            let paymentImageEl = this;
            console.log('id of payment image', paymentImageEl.id);
            // Select the radio button element by its ID
            const paymentImageElement = document.getElementById(
              paymentImageEl.id
            );
            console.log('paymentImageElement', paymentImageElement);
            paymentImageEl.addEventListener('input', (event) => {
              const inputValue = event.target.value;
              setPaymentType(inputValue);
            });
          },

          style: {
            display: 'flex',
            textAlign: 'center',
          },
        });

        // Add custom order details component for order summary
        editor.BlockManager.add('custom-order-details', {
          label: 'Order Details',
          content: {
            type: 'order-details',
            components: [
              {
                tagName: 'div',
                attributes: {
                  // class: 'flex',
                },
                style: {
                  display: 'flex',
                  padding: '1%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
                components: [
                  {
                    tagName: 'div',
                    attributes: {
                      // class:
                      //   'border border-[#22331D] w-24 h-24 rounded-lg flex justify-center items-center',
                    },
                    style: {
                      // border: '1px solid #22331D',
                      width: '20%',
                      height: '60%',
                      // borderRadius: '30%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '0 5% 0 0',
                      padding: '0 0 0 0',
                    },
                    components: [
                      {
                        tagName: 'image',
                        attributes: {
                          src: orderDetails.product_image,
                          alt: 'product_image',
                        },
                        style: {
                          width: '50px',
                          height: '50px',
                          borderRadius: '60px',
                          border: '1px solid #22331D ',
                        },
                      },
                    ],
                  },
                  {
                    tagName: 'div',
                    attributes: {
                      // class: 'ml-4',
                    },
                    style: {
                      margin: '0 0 0 0',
                      padding: '0 0 0 0',
                    },
                    components: [
                      {
                        tagName: 'h3',
                        attributes: {
                          // class: 'text-[#22331D] text-[20px] font-semibold',
                        },
                        style: {
                          fontSize: '20px',
                          fontWeight: '600',
                          color: '#22331D',
                          margin: '0 0 4px 0',
                        },
                        content: orderDetails.product_name,
                      },
                      {
                        tagName: 'p',
                        attributes: {
                          // class: 'text-[#22331D] text-sm font-semibold',
                        },
                        content: `ORDER ID : ${orderDetails.order_id}`,
                        style: {
                          fontSize: '14px',
                          fontWeight: '500',
                          color: '#22331D',
                          margin: '0 0 2px 0',
                        },
                      },
                      {
                        tagName: 'p',
                        attributes: {
                          // class: 'text-[#22331D] text-base font-bold',
                        },
                        content: `$${orderDetails.product_price}`,
                        style: {
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#22331D',
                          margin: '0 0 0 0',
                        },
                      },
                    ],
                  },
                  {
                    tagName: 'div',
                    attributes: {
                      // class: 'border border-[#D4D4D4] rounded-md px-2 py-1',
                    },
                    style: {
                      border: '1px solid #D4D4D4',
                      borderRadius: '5px',
                      padding: '0 0 0 0',
                      margin: '5% 0 12% 3%',
                    },
                    components: [
                      {
                        tagName: 'button',
                        attributes: {
                          class: 'text-black text-base font-medium',
                          type: 'button',
                        },
                        content: '-',
                        style: {
                          margin: '0 10px 0 0',
                        },
                        // script: {
                        //   click: function () {

                        //     let quantity = this.closest('span').textContent;
                        //     if (quantity > 1) {
                        //       quantity--;
                        //       this.closest('span').textContent = quantity;
                        //     }
                        //   },
                        // },
                      },
                      {
                        tagName: 'span',
                        attributes: {
                          class: 'text-black text-base font-semibold mx-3',
                        },
                        content: orderDetails.product_quantity,
                      },
                      {
                        tagName: 'button',
                        attributes: {
                          class: 'text-black text-base font-medium',
                          type: 'button',
                        },
                        content: '+',
                        // script: {
                        //   click: function () {
                        //     let quantity = this.closest('span').textContent;
                        //     quantity++;
                        //     this.closest('span').textContent = quantity;
                        //   },
                        // },
                        style: {
                          margin: '0 0 0 10px',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          category: 'Basic',
        });

        // Add custom functionality into built-in input box component
        editor.Components.addType('input', {
          isComponent: (el) => el.tagName === 'INPUT',
          model: {
            defaults: {
              script: function () {
                let inputEl = this;
                // console.log('id of input box', inputEl.id);
                // Select the input element by its ID
                const inputElement = document.getElementById(inputEl.id);
                console.log('inputElement', inputElement);

                // Get the name attribute
                const nameAttribute = inputElement.getAttribute('name');
                console.log('nameAttribute', nameAttribute); // Outputs: lname
                if (nameAttribute === 'couponCheck') {
                  inputEl.addEventListener('blur', (event) => {
                    console.log('if couponcheck', nameAttribute);
                    handleCouponCheck();
                  });
                }

                inputEl.addEventListener('input', (event) => {
                  console.log('input event listener', nameAttribute);
                  const inputValues = event.target.value;
                  console.log('inputValues', inputValues);
                  if (nameAttribute === 'couponCheck') {
                    handleSetCouponData(inputValues);
                  }
                  // setInputValue(inputValues);
                  // setNameAttribute(nameAttribute);
                });
              },
            },
          },
        });

        // Add custom functionality into built-in radio button component
        editor.Components.addType('radio', {
          isComponent: (el) => el.tagName === 'INPUT' && el.type === 'radio',
          model: {
            defaults: {
              script: function () {
                let radioEl = this;
                console.log('id of radio button', radioEl.id);
                // Select the radio button element by its ID
                const radioElement = document.getElementById(radioEl.id);
                console.log('radioElement', radioElement);

                // Get the name attribute
                const nameAttribute = radioElement.getAttribute('name');
                console.log(nameAttribute); // Outputs: paymentType

                radioEl.addEventListener('change', (event) => {
                  console.log('radioEl name', event.target.nodeName);
                  const selectedPaymentType = event.target.value;
                  console.log('selectedPaymentType', selectedPaymentType);
                  setPaymentType(selectedPaymentType);
                });
              },
            },
          },
        });

        // Add custom functionality into built-in checkbox component
        editor.Components.addType('checkbox', {
          isComponent: (el) => el.tagName === 'INPUT' && el.type === 'checkbox',
          model: {
            defaults: {
              script: function () {
                let checkboxEl = this;
                // console.log('id of checkbox', checkboxEl.id);
                // Select the checkbox element by its ID
                const checkboxElement = document.getElementById(checkboxEl.id);
                // console.log('checkboxElement', checkboxElement);

                // Get the name attribute
                const nameAttribute = checkboxElement.getAttribute('name');
                // console.log(nameAttribute); // Outputs: terms

                checkboxEl.addEventListener('change', (event) => {
                  // console.log('checkboxEl name', event.target.nodeName);
                  const isChecked = event.target.checked;
                  // console.log('isChecked', isChecked);
                });
              },
            },
          },
        });

        // Add custom functionality into built-in textarea component
        editor.Components.addType('textarea', {
          isComponent: (el) => el.tagName === 'TEXTAREA',
          model: {
            defaults: {
              script: function () {
                let textareaEl = this;
                console.log('id of textarea', textareaEl.id);
                // Select the textarea element by its ID
                const textareaElement = document.getElementById(textareaEl.id);
                console.log('textareaElement', textareaElement);

                // Get the name attribute
                const nameAttribute = textareaElement.getAttribute('name');
                console.log(nameAttribute); // Outputs: address

                textareaEl.addEventListener('input', (event) => {
                  console.log('textareaEl name', event.target.nodeName);
                  const inputValue = event.target.value;
                  console.log('inputValue', inputValue);
                });
              },
            },
          },
        });

        // Add custom functionality into built-in link component
        editor.Components.addType('link', {
          // isComponent: (el) => console.log('el-->>>', el),
          model: {
            defaults: {
              script: function () {
                let linkEl = this;
                console.log('id of link', linkEl.id);
                // Select the link element by its ID
                const linkElement = document.getElementById(linkEl.id);
                console.log('linkElement', linkElement);

                // Get the name attribute
                const nameAttribute = linkElement.getAttribute('name');
                console.log(nameAttribute); // Outputs: link

                linkEl.addEventListener('click', (event) => {
                  console.log('linkEl name', event.target.nodeName);
                  const linkValue = event.target.href;
                  console.log('linkValue', linkValue);
                  setLink(linkValue);
                });
              },
            },
          },
        });

        // Add custom functionality into built-in text box component
        editor.Components.addType('text', {
          isComponent: (el) => el.tagName === 'TEXT',
          model: {
            defaults: {
              script: function () {
                let textEl = this;
                console.log('id of text', textEl.id);
                // Select the text element by its ID
                const textElement = document.getElementById(textEl.id);
                // console.log('textElement payel', textElement);

                // Get the name attribute
                const nameAttribute = textElement.getAttribute('name');
                // console.log('payel', nameAttribute); // Outputs: text

                console.log('nameAttribute', nameAttribute);

                textEl.addEventListener('input', (event) => {
                  setNameAttribute(nameAttribute);
                });
              },
            },
          },
        });

        // Add custom functionality into built-in button component
        editor.Components.addType('button', {
          isComponent: (el) => el.tagName === 'BUTTON',
          model: {
            defaults: {
              script: function () {
                let btnEl = this;
                const btnElementId = document.getElementById(btnEl.id);

                const nameAttribute = btnElementId.getAttribute('name');
                btnEl.addEventListener('click', (event) => {
                  handleSubmit();
                });
              },
            },
          },
        });

        // Add custom line component
        editor.BlockManager.add('my-line-id', {
          label: 'Line',
          content: {
            tagName: 'hr',
            attributes: {
              class: 'line',
            },
            style: {
              width: '100%',
              height: '4px',
              colour: '#fbfbfb',
            },
          },
          category: 'Basic',
        });
      }
    });
  }, [dispatch]);

  // useEffect(() => {
  //   if (paymentProviders.length > 0) {
  //     // add custom payment image component
  //     // Extend GrapesJS with custom block for image list
  //     const generateImageBlocks = (images) => {
  //       console.log('payement images in editor-->>', images);
  //       return images
  //         .map(
  //           (img, index) => `
  //       <div className="gap-2">
  //         <input type="radio" id="paymentImage" name="paymentType" value=${img.value} />
  //         <label for="paymentImage" >
  //           <img src="${img.image}" alt="${img.provider_type_short_name}"  />
  //         </label>
  //       </div>`
  //         )
  //         .join('');
  //     };
  //     editor.BlockManager.add('my-payment-image-id', {
  //       label: 'Payment Image',
  //       content: `
  //       <div>
  //         <h3>
  //           Select Payment Type
  //         </h3>
  //         <div className="align-middle">
  //           ${generateImageBlocks(paymentProviders)}
  //         </div>
  //       </div>
  //     `,
  //       category: 'Basic',
  //       script: function () {
  //         let paymentImageEl = this;
  //         console.log('id of payment image', paymentImageEl.id);
  //         // Select the radio button element by its ID
  //         const paymentImageElement = document.getElementById(
  //           paymentImageEl.id
  //         );
  //         console.log('paymentImageElement', paymentImageElement);
  //         paymentImageEl.addEventListener('input', (event) => {
  //           const inputValue = event.target.value;
  //           setPaymentType(inputValue);
  //         });
  //       },

  //       style: {
  //         display: 'flex',
  //         textAlign: 'center',
  //       },
  //     });
  //   }
  // }, [paymentProviders]);

  return (
    <div id='gjs' className='.gjs-row'>
      <div className='panel__top'>
        <div className='panel__basic-actions'></div>
        <div
          className='panel__devices'
          style={{
            position: 'initial',
          }}
        ></div>
        <div className='panel__switcher'></div>
      </div>
    </div>
  );
};

export default WebBuilder;
// ********************************************************************************************************************
