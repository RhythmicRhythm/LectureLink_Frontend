import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { signinSchema } from "../../schemas";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ImSpinner10 } from "react-icons/im";
import auth1 from "../../images/auth1.png";
import logo from "../../images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../components/forms/TextInput";
import { useSigninMutation } from "../../redux/apis/authApi";
import { setCredentials } from "../../redux/Slices/authSlice";

const initialValues = {
  email: "",
  password: "",
};

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [signin, { isLoading }] = useSigninMutation();
  const { userInfo } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate("/dashboard");
  //   }
  // }, [navigate, userInfo]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signinSchema,

      onSubmit: async (values) => {
        try {
          const res = await signin(values).unwrap();
          console.log(res);
          dispatch(setCredentials({ ...res }));
          navigate("/dashboard");
        } catch (err) {}
      },
    });

  return (
    <>
      <section className="flex min-h-screen">
        <div className="z-0 flex w-full flex-col justify-center  px-0 text-black md:px-16 lg:w-1/2">
          <div
            style={{
              backgroundImage: `url(${auth1})`,
              backgroundPosition: "center",
            }}
            className="w-full h-20 sm:hidden"
          ></div>
          <div className="min-w-screen flex min-h-screen items-center justify-center px-5 py-5">
            <div className="absolute top-20 sm:top-0 right-0 left-0 p-4 text-center">
              <img src={logo} alt="logo" />
            </div>

            <form onSubmit={handleSubmit} className="w-[400px]">
              <div className="">
                <p className="mt-3 text-xs text-left text-gray-600 dark:text-gray-200">
                  Welcome to Ofspace Academy
                </p>
                <p className="font-bold text-2xl text-gray-800"> Login With</p>
              </div>

              <div className="">
                <TextInput
                  label="Email Address"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  touched={touched.email}
                />
              </div>
              <div className="relative mt-2">
                <TextInput
                  label="Password"
                  id="password"
                  // type="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password}
                  touched={touched.password}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[50%]  cursor-pointer text-gray-400"
                >
                  {showPassword ? (
                    <AiOutlineEye className="font-bold text-xl" />
                  ) : (
                    <AiOutlineEyeInvisible className="font-bold text-xl" />
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                  <p></p>
                  <Link
                    to="/forgotpassword"
                    className="text-xs mytext-primry hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                {/* SUBMIT BUTTON */}
                <button type="submit" disabled={isLoading} className="mybtn-primary">
                  {isLoading && <ImSpinner10 className="animate-spin" />}
                  <span>{isLoading ? "loading..." : "Sign In"}</span>
                </button>
              </div>
              <div className="mt-12 flex gap-2">
                <p className="text-xs">have an account?</p>
                <a
                  href="/signup"
                  className="text-xs text-gray-500 dark:text-gray-400 hover:underline"
                >
                  Sign up
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="login-half relative hidden w-1/2 items-center bg-[#F4FAF9] text-white lg:flex justify-center">
          <img src={auth1} alt="" />
        </div>
      </section>
    </>
  );
};

export default Signin;
