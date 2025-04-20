import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  studentcourses,
  lecturercourses,
} from "../../redux/Slices/coursesSlice";
import { Link } from "react-router-dom";
import empty from "../../images/emptyimg.png";
import CourseListSkeleton from "../../components/common/skeletons/CourseListSkeleton";
import { PiPlusCircleBold } from "react-icons/pi";

const Card2 = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const courses = useSelector((state) => state.course.courses);
  const loading = useSelector((state) => state.course.loading);

  useEffect(() => {
    if (user) {
      if (user.role === "student") {
        dispatch(studentcourses());
        console.log("Fetching student courses");
      } else if (user.role === "lecturer") {
        dispatch(lecturercourses());
        console.log("Fetching lecturer courses");
      }
    }
  }, [user, dispatch]);

  // Early return if loading
  if (loading) {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 px-6">
          <CourseListSkeleton />
          <CourseListSkeleton />
          <CourseListSkeleton />
        </div>
      </>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <p className="font-bold text-xs sm:text-lg">All Courses</p>
        {user.role === "student" && (
          <Link
            to="/registercourses"
            className="cursor-pointer flex gap-1 items-center
              px-4 py-2 bg-green-200 text-green-700 border-2 hover:border-green-500 
               rounded-lg hover:bg-opacity-70 transition font-semibold shadow-md text-xs sm:text-lg"
          >
            <PiPlusCircleBold className="text-sm sm:text-xl font-bold" />
            Register
          </Link>
        )}
      </div>

      {courses && courses.length == 0 ? (
        <div className="flex flex-col items-center justify-center ">
          <img src={empty} alt="" className="w-[200px] sm:w-[400px]" />
          <div className="max-w-xl">
            <p className="text-center text-sm sm:text-base font-medium text-gray-500">
              {user.role === "student"
                ? "You haven’t registered for any courses yet. Start by selecting and registering for your courses."
                : user.role === "lecturer"
                ? "No courses have been assigned to you yet. You will receive your course assignments soon."
                : ""}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap">
          {courses &&
            courses.map((item) => (
              <Link
                key={item._id}
                to={`/courses/${item._id}`}
                className="group overflow-hidden w-full md:w-1/2 lg:w-1/3 p-4"
              >
                <img
                  className="h-[200px] w-full rounded-lg group-hover:scale-105 transition-transform duration-200 ease-in-out"
                  src={item.image}
                  alt=""
                />
                <div className="mt-2">
                  <h1 className="text-xs text-gray-700 font-bold">
                    {item.course_code} - {item.course_title}
                  </h1>
                  <p className="text-sm font-normal">
                    Lecturer -{" "}
                    <span className="text-xs font-bold"> {item.name}</span>
                  </p>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default Card2;
