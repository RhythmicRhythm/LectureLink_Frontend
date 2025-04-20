import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getuserdata } from "../../redux/Slices/authSlice";
import { BACKEND_URL } from "../../services/authService";
import DashboardNameInfo from "../../components/common/skeletons/DashboardNameInfo";

const Info = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  useEffect(() => {
    dispatch(getuserdata());
  }, []);

  return (
    <div className="">
      {loading ? (
        <DashboardNameInfo />
      ) : (
        <div className="">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <div className="">
                <img
                  src={user?.photo}
                  className="w-14 h-14 rounded-lg"
                  alt=""
                />
              </div>
              <div className="">
                {user?.role == "lecturer" ? (
                  // Render content for staff account
                  <h1 className="text-xl text-gray-700 font-bold mb-2">
                    {user?.title} {user?.fullname}
                  </h1>
                ) : (
                  // Render content for student account
                  <h1 className="text-xl text-gray-700 font-bold mb-2">
                    {user?.fullname}
                  </h1>
                )}

                {user?.role == "lecturer" ? (
                  // Render content for staff account
                  <p className="text-xs text-gray-500">LECTURER ACCOUNT</p>
                ) : (
                  // Render content for student account
                  <p className="text-xs text-gray-500">STUDENT ACCOUNT</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-12">
            <h1 className="text-lg text-gray-600 font-bold">
              Accademic Information
            </h1>
            <div className="flex items-center pt-8 ">
              {user?.isAdmin ? null : ( // If isAdmin is true, do not display anything
                // If isAdmin is false, display the semester information
                <div className=" text-gray-500 border-r border-gray-400">
                  <p className="text-[10px]">semester</p>
                  <h2 className="text-xs font-semibold text-gray-800 mr-2">
                    {user?.semester}
                  </h2>
                </div>
              )}

              <div className="px-2 text-gray-500 border-r border-gray-400">
                <p className="text-[10px] ">Department</p>
                <h2 className="text-xs font-semibold text-gray-600 mr-2">
                  {user?.department}
                </h2>
              </div>
              <div className="px-2 text-gray-500 border-r">
                <p className="text-[10px] ">Date of Birth</p>
                <h2 className="text-xs font-semibold text-gray-600 mr-2">
                  {user?.dob}
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
