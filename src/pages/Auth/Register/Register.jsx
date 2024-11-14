import { Link, useNavigate } from "react-router-dom";
import { LoginImg, logo } from "../../../assets/images/images";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../Reducer/AuthSlice";

const Register = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(registerUser(data)).then((res) => {
      console.log("res: ", res);
    });
  };
  return (
    <div className="my-0 lg:my-0 mx-4 lg:mx-0 flex justify-center items-center">
      <div className="w-full my-0 mx-auto">
        <div className="flex h-screen">
          <div
            className="w-6/12 bg-cover"
            style={{ backgroundImage: `url("${LoginImg}")` }}
          >
            &nbsp;
          </div>
          <div className="w-6/12 flex justify-center items-center">
            <div className="w-8/12">
              {/* <div className="text-center mb-8">
              <img className="inline-block" src={logo} />
            </div> */}
              <h1 className="text-[80px] leading-[80px] text-[#4abef1] pb-3 text-center">
                Welcome
              </h1>
              <p className="text-[#393939] text-3xl text-center pb-10">
                Please enter you details to continue
              </p>
              <div className="login_area">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-6">
                    <div className="flex gap-4">
                      <input
                        type="text"
                        className="bg-white border border-[#4abef1] text-[#888888] text-base rounded-xl focus:ring-[#4abef1] focus:border-[#4abef1] block w-full py-4 px-3"
                        placeholder="First Name"
                        required
                        {...register("first_name", { required: true })}
                      />

                      <input
                        type="text"
                        className="bg-white border border-[#4abef1] text-[#888888] text-base rounded-xl focus:ring-[#4abef1] focus:border-[#4abef1] block w-full py-4 px-3"
                        placeholder="Last Name"
                        required
                        {...register("last_name", { required: true })}
                      />
                    </div>
                    {errors.first_name && (
                      <span className="text-red-500">
                        First Name is required
                      </span>
                    )}
                    {errors.last_name && (
                      <span className="text-red-500">
                        Last Name is required
                      </span>
                    )}
                  </div>
                  <div className="mb-6">
                    <input
                      type="email"
                      id="email"
                      className="bg-white border border-[#4abef1] text-[#888888] text-base rounded-xl focus:ring-[#4abef1] focus:border-[#4abef1] block w-full py-4 px-3"
                      placeholder="Enter your email address"
                      required
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="text-red-500">Email is required</span>
                    )}
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between">
                      <div className="block md:hidden">
                        <Link
                          className="text-base md:text-xl text-teal-400 font-bold hover:text-teal-500"
                          to="/forgot-password"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                    <input
                      placeholder="Enter User Name"
                      type="text"
                      id="username"
                      className="bg-white border border-[#4abef1] text-[#888888] text-base rounded-xl focus:ring-[#4abef1] focus:border-[#4abef1] block w-full py-4 px-3"
                      required
                      {...register("user_name", { required: true })}
                    />
                    {errors.user_name && (
                      <span className="text-red-500">
                        User Name is required
                      </span>
                    )}
                  </div>
                  <div className="mb-6">
                    <input
                      placeholder="Enter Password"
                      type="password"
                      id="password"
                      className="bg-white border border-[#4abef1] text-[#888888] text-base rounded-xl focus:ring-[#4abef1] focus:border-[#4abef1] block w-full py-4 px-3"
                      required
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <span className="text-red-500">Password is required</span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-[#4abef1] font-Manrope font-extrabold text-[23px] mb-2 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-xl text-xl w-full px-5 py-3.5 text-center"
                  >
                    Sign Up
                  </button>
                  <div className="mb-2">
                    <div className="flex justify-center items-center">
                      <p className="text-[18px] text-center">
                        Already have an account?{" "}
                        <Link
                          to="/"
                          className="text-[#4abef1] hover:text-black"
                        >
                          Log In?
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
