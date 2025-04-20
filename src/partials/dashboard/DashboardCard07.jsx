import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_URL } from "../../services/authService";
import DashboardCourseList from "../../components/common/skeletons/DashboardCourseList";
import coursesSlice, { allcourses } from "../../redux/Slices/coursesSlice";

function DashboardCard07() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allcourses());
  }, [dispatch]);

  const loading = useSelector((state) => state.course.loading);
  const courses = useSelector((state) => state.course.allcourses);

  return (
    <div className="p-4 col-span-full xl:col-span-8  dark:bg-slate-800 rounded-lg dark:border-slate-700">
      <div className="mt-12">
        <div className="mb-10">
          <h1 className="text-2xl text-gray-700 font-bold">All Courses</h1>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <DashboardCourseList /> <DashboardCourseList />{" "}
            <DashboardCourseList /> <DashboardCourseList />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {courses &&
              courses.map((item) => (
                <Link
                  key={item._id}
                  to={`/courses/${item._id}`}
                  className="flex justify-between items-center bg-white shadow-xl border-2 p-2 rounded-lg w-full sm:w-full"
                >
                  <div className="flex gap-3 items-center">
                    <div className="">
                      <img
                        src={item.image}
                        className="w-16 h-16 rounded-lg"
                        alt=""
                      />
                    </div>
                    <div className="mt-2">
                      <h1 className="text-xs sm:text-sm font-semibold text-gray-700">
                        {item.course_code}
                      </h1>
                      <p className="text-xs sm:text-sm">{item.course_title}</p>
                    </div>
                  </div>{" "}
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardCard07;
