import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const signupSchema = yup.object().shape({
  fullname: yup.string().required("firstname is required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, {
      message:
        "Min 5 characters, including 1 uppercase, 1 lowercase, and 1 number.",
    })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});
export const signinSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().min(5).required("Required"),
});
export const forgotSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
});
export const verifySchema = yup.object().shape({
  code: yup.string().required("Required"),
});
export const changeSchema = yup.object().shape({
  password: yup.string().min(5).required("Required"),
});
export const addblogSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  subtitle: yup.string().required("Subtitle is required"),
  tag: yup.string().required("Tag is required"),
  content: yup.string().required("Blog Content cannot empty"),
});
