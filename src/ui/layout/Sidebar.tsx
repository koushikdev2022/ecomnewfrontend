import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// import Logo from '../images/logo/logo.svg';
// import SidebarLinkGroup from './SidebarLinkGroup';
import SidebarLinkGroup from "../layout/SidebarLinkGroup";
import { logo } from '../../assets/images/images';

import { AiFillSetting, AiFillTag, AiFillTags, AiOutlineDashboard, AiOutlineLogout, AiOutlineNotification, AiOutlineUser, BiLineChart, BiLineChartDown, BsPersonWorkspace, BsViewStacked, MdManageAccounts, MdOutlineShoppingCartCheckout, MdSpaceDashboard, MdViewStream, PiClipboardTextBold, RiCoupon2Fill, RiCouponLine, RxDashboard } from "../../assets/icons/index";
import { FaCircle, FaFirstOrderAlt } from 'react-icons/fa';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const onHoverOpenSidebar = () => {
    setSidebarOpen(false);
  }
  //   const onHoverCloseSidebar = () => {
  //   setSidebarOpen(true);
  // }
   useEffect(()=>{
       setSidebarOpen(true);
  },[])
  return (
    <aside
      ref={sidebar}
      style={{zIndex:1}}
      className={`left-0 top-[50px] z-9999 flex w-72 rounded-0 flex-col overflow-y-hidden bg-white duration-300 ease-linear absolute h-screen lg:h-auto shadow-xl ${
        sidebarOpen ? '-translate-x-full lg:static lg:w-24 lg:translate-x-0 ' : 'lg:translate-x-0 lg:static'
      }`}
      onMouseEnter={onHoverOpenSidebar}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-4 py-5 lg:py-[23px]">
        <NavLink className="text-center w-full" to="/">
          {/* <img src={logo} alt="Logo" className='w-40' /> */}
          { sidebarOpen ? 
            <>
            <p className='text-[#2AA9E1] text-[26px] font-bold'>Logo</p>
            </>
            :
            <>
            <p className='text-[#2AA9E1] text-[36px] font-bold'>Logo</p>
            </>
          }
          
          {/* &nbsp; */}
        </NavLink>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="sidebar_menu no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear overscroll-none">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-0 py-4 px-4 lg:px-0">
          {/* <!-- Menu Group --> */}
          <div>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <NavLink
                  to="/dashboard"
                  className={`group relative flex items-center gap-2 rounded-sm py-2 px-4 ${ sidebarOpen ? 'justify-center' : 'justify-start' } font-normal text-sm text-gray-600 duration-300 ease-in-out hover:bg-graydark mb-2 ${
                    pathname.includes('dashboard') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                   { sidebarOpen ? 
                    <>
                    <RxDashboard className='text-xl' />
                    </>
                    :
                    <>
                    <RxDashboard className='text-xl' />
                    Dashboard
                    </>
                  }
                </NavLink>
              </li>
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Dropdown Menu Ends here --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/forms' || pathname.includes('forms')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to='#'
                        className={`group relative flex items-center gap-2 rounded-sm py-2 px-4 ${ sidebarOpen ? 'justify-center' : 'justify-start' } font-normal text-sm text-gray-600 duration-300 ease-in-out hover:bg-graydark ${
                          (pathname === '/forms' ||
                            pathname.includes('forms')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >

                        { sidebarOpen ? 
                          <>
                          <MdManageAccounts className='text-2xl' />
                          </>
                          :
                          <>
                         <MdManageAccounts className='text-2xl' />
                        Dropdowns
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width='20'
                          height='20'
                          viewBox='0 0 20 20'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z'
                            fill=''
                          />
                        </svg>
                          </>
                        }
                      </NavLink>
                      <div
                        className={`translate transform overflow-hidden transition-all ${
                          !open && 'hidden transition-all'
                        }`}
                      >
                        <ul className='mt-1 mb-2 flex flex-col gap-1'>
                          <li>
                            <NavLink
                              to='/item1'
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2 rounded-md px-4 text-sm font-medium text-gray-600 duration-300 ease-in-out hover:text-[#4abef1] ' +
                                (isActive && '!text-[#4abef1]')
                              }
                            >
                              <FaCircle className='text-[7px] text-[#b3b3b3] mr-2' />
                              Item One
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to='/item2'
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2 rounded-md px-4 text-sm font-medium text-gray-600 duration-300 ease-in-out hover:text-[#4abef1] ' +
                                (isActive && '!text-[#4abef1]')
                              }
                            >
                              <FaCircle className='text-[7px] text-[#b3b3b3] mr-2' />
                              Item Two
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Dropdown Menu Start here --> */}

              {/* <!-- Menu Item Calendar --> */}
              <li>
                <NavLink
                  to="/product"
                  className={`group relative flex items-center gap-2 rounded-sm px-4 py-2 ${ sidebarOpen ? 'justify-center' : 'justify-start' } font-normal text-sm text-gray-600 duration-300 ease-in-out hover:bg-graydark mb-2 ${
                    pathname.includes('product') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  { sidebarOpen ? 
                    <>
                    <BsViewStacked className='text-xl' />
                    </>
                    :
                    <>
                    <BsViewStacked className='text-xl' />
                    Product
                    </>
                  }
                </NavLink>
              </li>
              
              {/* <!-- Menu Item Calendar --> */}
              

              {/* <!-- Menu Item Offer Request --> */}
              {/* <li>
                <NavLink
                  to="/load-editor"
                  className={`group relative flex items-center gap-2 rounded-sm py-2 px-4 ${ sidebarOpen ? 'justify-center' : 'justify-start' } font-normal text-sm text-gray-600 duration-300 ease-in-out hover:bg-graydark mb-2 ${
                    pathname.includes('load-editor') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  { sidebarOpen ? 
                    <>
                    <MdOutlineShoppingCartCheckout className='text-2xl' />
                    </>
                    :
                    <>
                    <MdOutlineShoppingCartCheckout className='text-2xl' />
                    Checkout
                    </>
                  }
                </NavLink>
              </li> */}
              {/* <!-- Menu Item Offer Request --> */}

              {/* <!-- Menu Item Offer Request --> */}
              <li>
                <NavLink
                  to="/upsells"
                  className={`group relative flex items-center gap-2 rounded-sm py-2 px-4 ${ sidebarOpen ? 'justify-center' : 'justify-start' } font-normal text-sm text-gray-600 duration-300 ease-in-out hover:bg-graydark mb-2 ${
                    pathname.includes('upsells') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  { sidebarOpen ? 
                    <>
                    <BiLineChart className='text-2xl' />
                    </>
                    :
                    <>
                    <BiLineChart className='text-2xl' />
                    Upsells
                    </>
                  }
                </NavLink>
              </li>
              {/* <!-- Menu Item Offer Request --> */}

              {/* <!-- Menu Item Offer Request --> */}
              <li>
                <NavLink
                  to="/downsells"
                  className={`group relative flex items-center gap-2 rounded-sm py-2 px-4 ${ sidebarOpen ? 'justify-center' : 'justify-start' } font-normal text-sm text-gray-600 duration-300 ease-in-out hover:bg-graydark mb-2 ${
                    pathname.includes('downsells') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  { sidebarOpen ? 
                    <>
                    <BiLineChartDown className='text-2xl' />
                    </>
                    :
                    <>
                    <BiLineChartDown className='text-2xl' />
                    Downsells
                    </>
                  }
                </NavLink>
              </li>
              {/* <!-- Menu Item Offer Request --> */}

              {/* <!-- Menu Item Offer Request --> */}
              <li>
                <NavLink
                  to="/coupons"
                  className={`group relative flex items-center gap-2 rounded-sm py-2 px-4 ${ sidebarOpen ? 'justify-center' : 'justify-start' } font-normal text-sm text-gray-600 duration-300 ease-in-out hover:bg-graydark mb-2 ${
                    pathname.includes('coupons') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  { sidebarOpen ? 
                    <>
                    <RiCouponLine className='text-2xl' />
                    </>
                    :
                    <>
                    <RiCouponLine className='text-2xl' />
                    Coupons
                    </>
                  }
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/orders"
                  className={`group relative flex items-center gap-2 rounded-sm py-2 px-4 ${ sidebarOpen ? 'justify-center' : 'justify-start' } font-normal text-sm text-gray-600 duration-300 ease-in-out hover:bg-graydark mb-2 ${
                    pathname.includes('orders') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                   { sidebarOpen ? 
                    <>
                    <PiClipboardTextBold className='text-2xl' />
                    </>
                    :
                    <>
                    <PiClipboardTextBold className='text-2xl' />
                    Orders
                    </>
                  }
                </NavLink>
              </li>
              {/* <!-- Menu Item Offer Request --> */}


              


            </ul>
          </div>

        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
