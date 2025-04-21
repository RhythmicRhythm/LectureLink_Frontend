import React from 'react';
import { RiFilterLine, RiSearchLine } from 'react-icons/ri';
import CourseCard from '../components/CourseCard';

export default function CoursesSection() {
  const courses = [
    {
      id: 1,
      code: 'MUS101',
      title: 'Introduction to Music Theory',
      description: 'Understanding foundational concepts of music notation, rhythm, and harmony.',
      professor: 'Dr. Johnson',
      modules: 8,
      students: 34,
      bookmarked: true,
      status: 'Active',
      image: '/course-music-theory.jpg'
    },
    {
      id: 2,
      code: 'MUS202',
      title: 'Music History: Baroque to Modern',
      description: 'Exploring the evolution of Western art music from the Baroque period to contemporary styles.',
      professor: 'Prof. Garcia',
      modules: 12,
      students: 28,
      bookmarked: false,
      status: 'Active',
      image: '/course-music-history.jpg'
    },
    {
      id: 3,
      code: 'MUS207',
      title: 'Jazz Improvisation and Performance',
      description: 'Developing skills for jazz improvisation, performance techniques, and ensemble playing.',
      professor: 'Prof. Wilson',
      modules: 10,
      students: 22,
      bookmarked: false,
      status: 'Active',
      image: '/course-jazz.jpg'
    },
    {
      id: 4,
      code: 'MUS401',
      title: 'Digital Music Production',
      description: 'Creating and producing music using digital tools and audio engineering principles.',
      professor: 'Dr. Kim',
      modules: 14,
      students: 19,
      bookmarked: false,
      status: 'Active',
      image: '/course-production.jpg'
    }
  ];

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
        {courses.map((course) => (
          <CourseCard 
            key={course.id}
            code={course.code}
            title={course.title}
            description={course.description}
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