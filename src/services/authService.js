import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export const BACKEND_URL = "http://localhost:5000";

// export const BACKEND_URL = "https://edu-tech-backend.onrender.com";

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};


export const updateUser = async (postData) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/users/updateuser`,
      postData
    );
    if (response.statusText === "OK") {
      toast.success("post added Successful...");
    }
    toast.success("post added Successful...");
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(error.response.data);
  }
};

// Forgot Password
export const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/users/forgotpassword`,
      userData
    );

    if (response.status === 200) {
      return response.data;
    } else {
      // Handle the custom error message here
      const errorMessage = response.data.error || "An error occurred.";

      console.log(response);
    }
  } catch (error) {
    // Handle network errors
    const message =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();
    toast.error(error.response.data.message);
    console.log(error.response.data);
  }
};

export const verifycode = async (userData, emailId) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/users/resetemailsent/${emailId}`,
      userData
    );

    if (response.status === 200) {
      return response.data;
    } else {
      // Handle the custom error message here
      const errorMessage = response.data.error || "An error occurred.";

      console.log(response);
    }
  } catch (error) {
    // Handle network errors
    const message =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();
    toast.error(error.response.data.message);
    console.log(error.response.data);
  }
};

export const resetpassword = async (userData, emailId) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/users/resetpassword/${emailId}`,
      userData
    );

    if (response.status === 200) {
      return response.data;
    } else {
      // Handle the custom error message here
      const errorMessage = response.data.error || "An error occurred.";

      console.log(response);
    }
  } catch (error) {
    // Handle network errors
    const message =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();
    toast.error(error.response.data.message);
    console.log(error.response.data);
  }
};

export const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/users/loggedin`);

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
    console.log(error);
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    await axios.get(`${BACKEND_URL}/users/logout`);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Get User Profile
export const getUser = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/users/getuser`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
    console.log(error.response.data);
  }
};

// Delete Post
export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`${BACKEND_URL}/posts/${postId}`);
    toast.success("post deleted Successful...");
    return response.status;
  } catch (error) {
    console.log(error);
  }
};
