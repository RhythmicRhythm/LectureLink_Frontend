import React from "react";
import { RiFilterLine, RiSearchLine } from "react-icons/ri";
import CourseCard from "../components/CourseCard";
import { useGetCoursesQuery } from "../redux/apis/courseApi";

export default function CoursesSection() {
  const { data: courses, isLoading: loading } = useGetCoursesQuery();

  if (loading) {
    return (
     <h1 className="">
        Loading courses... <span className="animate-pulse">...</span>
     </h1>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">My Courses</h2>
        <div className="flex space-x-2">
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-1 px-3 rounded-md text-sm flex items-center">
            <RiFilterLine className="mr-1" /> Filter
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded-md text-sm flex items-center">
            <RiSearchLine className="mr-1" /> Browse Courses
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <CourseCard
            key={course._id}
            id={course._id} 
            code={course.course_code}
            title={course.course_title}
            description={course.course_description}
            professor={course.professor}
            modules={course.modules}
            students={course.students}
            bookmarked={course.bookmarked}
            status={course.status}
            image={course.image}
          />
        ))}
      </div>
    </div>
  );
}
