import React from 'react';
const Login = React.lazy(() => import('../pages/Auth/Login/Login'));
import InsideLayout from '../ui/layout/InsideLayout';
import OutsideLayout from '../ui/layout/OutsideLayout';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import ForgotPassword from '../pages/Auth/ForgotPassword/ForgotPassword.jsx';
import Settings from '../pages/Settings/Settings.jsx';
import Register from '../pages/Auth/Register/Register.jsx';

import Product from '../pages/Product/Product.jsx';
import ProductDetails from '../pages/Product/ProductDetails.jsx';
import Coupons from '../pages/Coupons/Coupons.jsx';
import CreateNewCoupon from '../pages/CreateNewCoupon/CreateNewCoupon.jsx';
import CheckoutTemplateTwo from '../pages/Checkout/CheckoutTemplateTwo/CheckoutTemplateTwo.jsx';
import Upsells from '../pages/Upsells/Upsells.jsx';
import UpsellsDetails from '../pages/Upsells/upsellsDetails.jsx';
import DownsellsDetails from '../pages/Downsells/DownsellsDetails.jsx';
import Downsells from '../pages/Downsells/Downsells.jsx';
import DemoPage from '../pages/Checkout/DemoPage/DemoPage.jsx';
import Funnel from '../pages/Funnel/Funnel.jsx';
import EditCoupon from '../pages/Coupons/EditCoupon.jsx';
import EditDownSell from '../pages/Downsells/EditDownSell.jsx';
import EditUpSell from '../pages/Upsells/EditUpsell.jsx';

import AdminEditor from '../pages/Checkout/Editor/AdminEditor.jsx';
import AdminCheckout from '../pages/Checkout/Admin/AdminCheckout.jsx';
import ViewOrders from '../pages/Orders/ViewOrders.jsx';
import PageNotFound from '../pages/PageNotFound.jsx';
import OutsideLayout2 from '../ui/layout/OutsideLayout2.jsx';
import Editor from '../pages/Editor/Editor.jsx';
import LoadEditor from '../pages/Editor/LoadEditor.jsx';

import UserLoadUser from '../pages/userEditor/UserLoadUser.jsx';
import UserEditor from '../pages/userEditor/userEditor.jsx';
import NewUserEditor from '../pages/userEditor/NewUserEditor.jsx';
import TemplateByProduct from '../pages/TemplateRedirectionPage/TempalteByProduct.jsx';
// import StripeProviderComponent from '../pages/TemplateRedirectionPage/StripeProviderComponent.jsx';
import PaymentRedirect from '../pages/TemplateRedirectionPage/PaymentRedirect.jsx';
import MiddlePage from '../pages/TemplateRedirectionPage/MiddlePage.jsx';
import Profile from '../pages/Profile/Profile.jsx';
import ResetPassword from '../pages/Auth/ForgotPassword/ResetPassword.jsx';


const allRoutes = [
  {
    path: '/',
    element: <OutsideLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: 'login', element: <Login /> },
    ],
  },
  {
    path: '/forgot-password',
    element: <OutsideLayout />,
    children: [
      { index: true, element: <ForgotPassword /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
    ],
  },
  {
    path: '/reset-password/:token',
    element: <OutsideLayout />,
    children: [
      { index: true, element: <ResetPassword /> },
      { path: 'reset-password', element: <ResetPassword /> },
    ],
  },
  {
    path: '/register',
    element: <OutsideLayout />,
    children: [
      { index: true, element: <Register /> },
      { path: 'register', element: <Register /> },
    ],
  },
  {
    path: '/dashboard',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/product',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <Product />,
      },
    ],
  },
  {
    path: '/product-details',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <ProductDetails />,
      },
    ],
  },

  {
    path: '/edit-coupon',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <EditCoupon />,
      },
    ],
  },
  {
    path: '/settings',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <Settings />,
      },
    ],
  },

  {
    path: '/profile',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <Profile />,
      },
    ],
  },

  {
    path: '/checkout',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        // element: <Checkout />,
        element: <AdminCheckout />,
      },
    ],
  },
  {
    path: '/checkout-template/:id',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        // element: <CheckoutTemplateOne />
        element: <AdminEditor />,
      },
    ],
  },
  {
    path: '/demoPage',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <DemoPage />,
      },
    ],
  },
  {
    path: '/checkout-template-two',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <CheckoutTemplateTwo />,
      },
    ],
  },

  {
    path: '/upsells',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <Upsells />,
      },
    ],
  },
  {
    path: '/upsell-details',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <UpsellsDetails />,
      },
    ],
  },

  {
    path: '/downsells',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <Downsells />,
      },
    ],
  },
  {
    path: '/downsells-details',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <DownsellsDetails />,
      },
    ],
  },

  {
    path: '/coupons',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <Coupons />,
      },
    ],
  },
  {
    path: '/orders',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <ViewOrders />,
      },
    ],
  },
  {
    path: '/create-new-coupon',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <CreateNewCoupon />,
      },
    ],
  },
  {
    path: '/funnel',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <Funnel />,
      },
    ],
  },
  {
    path: '/pageNotFound',
    element: <OutsideLayout2 />,
    children: [
      {
        index: true,
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: '/editor',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <Editor />,
      },
    ],
  },
  {
    path: '/user-editor/:id/:productid',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <UserEditor />,
      },
    ],
  },
  {
    path: '/user-editor-page/:id/:productid',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <NewUserEditor />
      },
    ],
  },
  {
    path: '/load-editor',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <LoadEditor />,
      },
    ],
  },
  {
    path: '/user-load-editor/:id/:productid',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <UserLoadUser />,
      },
    ],
  },
  {
    path: '/key-load',
    element: <OutsideLayout />,
    children: [
      {
        index: true,
        element: <MiddlePage />,
      },
    ],
  },
  // {
  //   path: '/payment',
  //   element: <OutsideLayout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <StripeProviderComponent />,
  //     },
  //   ],
  // },
  {
    path: '/payment-redirect',
    element: <OutsideLayout />,
    children: [
      {
        index: true,
        element: <PaymentRedirect />,
      },
    ],
  },
  {
    path: '/edit-downsell/:down_sell_id',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <EditDownSell />,
      },
    ],
  },
  {
    path: '/edit-upsell/:up_sell_id',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <EditUpSell />,
      },
    ],
  },

  // {
  //   path: '/checkout-url/*',
  //   element: <DynamicURLContent />,
  // },

  {
    path: '/checkout-url/:id/:slug',
    element: <TemplateByProduct />,
  },

  {
    path: '*',
    element: 'Outside page not found',
  },
];
export default allRoutes;
