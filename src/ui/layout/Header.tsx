import React from 'react'
import { Link } from 'react-router-dom';
import { logo, logoIcon } from '../../assets/images/images';

import DropdownMessage from '../../components/DropdownMessage';
import DropdownNotification from '../../components/DropdownNotification';
import DropdownUser from '../../components/DropdownUser';
import { BiMenu } from "react-icons/bi";
import { FiAlignLeft } from 'react-icons/fi';
import { PiUserList } from 'react-icons/pi';
import { TiThMenu } from 'react-icons/ti';

function Header(props: {
    sidebarOpen: string | boolean | undefined;
    setSidebarOpen: (arg0: boolean) => void;
  }) {
    
  return (
    <div className="z-10 sticky top-0 z-999 flex bg-white shadow-md ml-0 rounded-lg mb-6">
        <div className="flex flex-grow items-center justify-between px-6 py-3 shadow-2">

            { props.sidebarOpen ?  
            <div className="flex items-center gap-2 sm:gap-4">
                {/* <!-- Hamburger Toggle BTN --> */}
                <button
                    aria-controls="sidebar"
                    onClick={(e) => {
                    e.stopPropagation();
                    props.setSidebarOpen(!props.sidebarOpen);
                    }}
                    className="z-99999 block rounded-sm bg-white p-1"
                >
                    <TiThMenu className='text-xl text-black hover:text-[#4ABEF1]' />
                </button>
                {/* <!-- Hamburger Toggle BTN --> */}
                <Link className="block flex-shrink-0" to="/">
                    {/* <img src={logoIcon} alt="Logo" /> */}
                    <p className='text-black text-xl font-semibold'>Dashboard</p>
                </Link>
            </div>

            :

            ""

            }


            { props.sidebarOpen ? 

            ""

            :

            <div className=''>
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* <!-- Hamburger Toggle BTN --> */}
                    <button
                        aria-controls="sidebar"
                        onClick={(e) => {
                        e.stopPropagation();
                        props.setSidebarOpen(!props.sidebarOpen);
                        }}
                        className="z-99999 block rounded-sm bg-white p-1"
                    >
                        <TiThMenu className='text-xl text-black hover:text-[#4ABEF1]' />
                    </button>
                    {/* <!-- Hamburger Toggle BTN --> */}
                    <Link className="block flex-shrink-0" to="/">
                        {/* <img src={logoIcon} alt="Logo" /> */}
                        <p className='text-black text-xl font-semibold'>Dashboard</p>
                    </Link>
                </div>
            </div>

            }

            <div className="hidden sm:block"> &nbsp;</div>

            <div className="flex items-center gap-3 2xsm:gap-7">
                <ul className="flex items-center gap-2 2xsm:gap-4">
                    {/* <!-- Notification Menu Area --> */}
                    <DropdownNotification />
                    {/* <!-- Notification Menu Area --> */}
                </ul>

                {/* <!-- User Area --> */}
                <DropdownUser />
                {/* <!-- User Area --> */}
            </div>
        </div>
    </div>
  )
}

export default Header