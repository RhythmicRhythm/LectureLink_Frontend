import { useState } from "react";
import { useFormik } from "formik";
import { signupSchema } from "../../schemas";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ImSpinner10 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import auth1 from "../../images/auth1.png";
import logo from "../../images/Logo.png";
import TextInput from "../../components/forms/TextInput";
import { useSignupMutation } from "../../redux/apis/authApi";

const initialValues = {
  fullname: "",
  email: "",
  password: "",
};

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [signup, { isLoading: loading }] = useSignupMutation();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupSchema,

      onSubmit: async (values) => {
         await signup(values).unwrap();
        navigate("/signin")
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

            <form onSubmit={handleSubmit} className="w-[400px] mt-14">
              <div className="">
                <p className="mt-3 text-xs text-left text-gray-600 dark:text-gray-200">
                  Welcome to Ofspace Academy
                </p>
                <p className="font-bold text-2xl text-gray-800">
                  {" "}
                  Sign Up With
                </p>
              </div>

              <div className="mt-4">
                <TextInput
                  label="Fullname"
                  id="fullname"
                  placeholder="Enter your Fullname"
                  value={values.fullname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.fullname}
                  touched={touched.fullname}
                />
              </div>

              <div className="mt-2">
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

              <div className="mt-2">
                <TextInput
                  label="Confirm Password"
                  id="confirmPassword"
                  type="password"
                  placeholder="Enter your password again"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                />
              </div>

              <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                   {/* SUBMIT BUTTON */}
                <button type="submit" disabled={loading} className="mybtn-primary">
                  {loading && <ImSpinner10 className="animate-spin" />}
                  <span>{loading ? "Loading..." : "Sign Up"}</span>
                </button>
              </div>

              <div className="mt-12 flex gap-2">
                <p className="text-xs">have an account?</p>
                <a
                  href="/signin"
                  className="text-xs text-gray-500 dark:text-gray-400 hover:underline"
                >
                  Sign In
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

export default Signup;
