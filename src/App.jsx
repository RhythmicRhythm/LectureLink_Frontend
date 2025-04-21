import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import "./css/style.css";

// Import pages
// import Dashboard from "./pages/Dashboard";
// import Course from "./pages/Course";
// import History from "./pages/History";
// import Verifycode from "./pages/auth/VerifyCode";
// import AssignLecturers from "./pages/AssignLecturers";

// import Changepassword from "./pages/Changepassword";
// import NewCourse from "./pages/NewCourse";
// import Uploadfile from "./pages/Uploadfile";

// import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/SIgnup";
// import Forgotpassword from "./pages/auth/Forgotpassword";
// import Resetpassword from "./pages/auth/Resetpassword";

import { useDispatch, useSelector } from "react-redux";

// import { getLoginStatus } from "./services/authService";
// import RegisterCourses from "./pages/RegisterCourses";
// import Homepage from "./pages/Homepage";
// import Assignment from "./pages/Assignment";

axios.defaults.withCredentials = true;

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   async function loginStatus() {
  //     const status = await getLoginStatus();

  //     console.log(status);
  //   }
  //   loginStatus();
  // }, [dispatch]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              borderRadius: "10px",
              background: "#145c87",
              color: "#fff",
            },
          },
          error: {
            style: {
              borderRadius: "10px",
              background: "#145c87",
              color: "#fff",
            },
          },
        }}
      />
      <Routes>
        <Route exact path="/" element={<Signup />} />
        {/* AUTH ROUTES */}
        <Route exact path="/signup" element={<Signup />} />
        {/* <Route exact path="/signin" element={<Signin />} /> */}
        {/* <Route exact path="/studentupdate" element={<Studentupdate />} />
        <Route exact path="/staffupdate" element={<Staffupdate />} /> */}
        {/* <Route exact path="/forgotpassword" element={<Forgotpassword />} />
        <Route exact path="/resetpassword/:email" element={<Resetpassword />} />
        <Route exact path="/verifycode/:email" element={<Verifycode />} /> */}

        {/* DASHBOARD ROUTES  */}
        {/* <Route exact path="/dashboard/home" element={<Dashboard />} />
        <Route exact path="/courses" element={<History />} />
        <Route exact path="/courses/:id" element={<Course />} />
        <Route exact path="/uploadfile/:id" element={<Uploadfile />} />
        <Route exact path="/newcourse" element={<NewCourse />} />
        <Route exact path="/assignment/:id" element={<Assignment />} />
        <Route exact path="/assignlecturer" element={<AssignLecturers />} />
        <Route exact path="/registercourses" element={<RegisterCourses />} /> */}

        {/* <Route
          exact
          path="/settings/changepassword"
          element={<Changepassword />}
        /> */}
      </Routes>
    </>
  );
}

export default App;
