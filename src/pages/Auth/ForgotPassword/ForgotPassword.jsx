import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordIcon, logo } from "../../../assets/images/images";

const ForgotPassword = () => {
  return (
    <div className="my-0 md:my-16 lg:my-0 mx-4 lg:mx-0 flex justify-center items-center h-screen">
      <div className="w-full max-w-lg my-0 mx-auto">
        <div className="text-center mb-4">
          <img className="inline-block w-44" src={forgotPasswordIcon} />
        </div>
        <h1 className="text-[40px] leading-[40px] text-[#4abef1] pb-5">
          Forgot your password?
        </h1>
        <p className="text-base md:text-lg text-blue-900 font-medium text-center pb-8">
          No worries, we got you covered.
        </p>
        <div className="login_area">
          <form>
            <div className="mb-6">
              <input
                type="email"
                id="email"
                className="bg-white border border-[#4abef1] text-[#888888] text-base rounded-xl focus:ring-[#009BF2] focus:border-[#4abef1] block w-full py-4 px-3"
                placeholder="Enter your email address"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-[#4abef1] font-Manrope font-extrabold text-[23px] mb-2 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-xl text-xl w-full px-5 py-3.5 text-center"
            >
              Reset Password
            </button>
            <div className="block text-center mt-3">
              <Link
                className="text-sm text-[#4abef1] font-medium hover:text-black"
                to="/"
              >
                Back to Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
