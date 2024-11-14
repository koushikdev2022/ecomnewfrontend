import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../Reducer/AuthSlice';
import ProductSlice from '../Reducer/ProductSlice';
import PricingSlice from '../Reducer/PricingSlice';
import CouponSlice from '../Reducer/CouponSlice';
import UpSellSlice from '../Reducer/UpSellSlice';
import DownSellSlice from '../Reducer/DownSellSlice';
import EditorSlice from '../Reducer/EditorSlice';
import BumpProductSlice from '../Reducer/BumpProductSlice';
import AffiliateSlice from '../Reducer/AffiliateSlice';
import PaymentProcessorSlice from '../Reducer/PaymentProcessorSlice';
import FunnelSlice from '../Reducer/FunnelSlice';
import OrderSlice from '../Reducer/OrderSlice';
import PaymentSetupSlice from '../Reducer/PaymentSetupSlice';
import ProductTemplateSlice from '../Reducer/ProductTemplateSlice';
import RevenueSlice from '../Reducer/RevenueSlice';
import UserEditorSlice from '../Reducer/UserEditorSlice';
import PaymentSlice from '../Reducer/PaymentSlice';

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    product: ProductSlice,
    pricing: PricingSlice,
    coupon: CouponSlice,
    upSellProduct: UpSellSlice,
    downSellProduct: DownSellSlice,
    editor: EditorSlice,
    bump: BumpProductSlice,
    affil: AffiliateSlice,
    paymentPro: PaymentProcessorSlice,
    funnels: FunnelSlice,
    order: OrderSlice,
    paykey: PaymentSetupSlice,
    tempPlate: ProductTemplateSlice,
    rev: RevenueSlice,
    usereditors: UserEditorSlice,
    paymentKey: PaymentSlice,
  },
  devTools: import.meta.env.DEV,
});

export default store;