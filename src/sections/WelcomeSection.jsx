import React from 'react';
import InfoCards from '../components/InfoCard';
import ScheduleList from '../components/ScheduleList';
import AssignmentsList from '../components/AssignmentsList';
import AttendanceSummary from '../components/AttendanceSummary';

export default function WelcomeSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-sm p-6 col-span-2">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, Rhythmic!</h1>
            <p className="text-gray-600">Monday, April 20, 2025</p>
          </div>
          <div className="flex items-center">
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mr-2">STUDENT</span>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">Music Department</span>
          </div>
        </div>
        
        <InfoCards />
        <ScheduleList />
      </div>

      <div className="space-y-6">
        <AssignmentsList />
        <AttendanceSummary />
      </div>
    </div>
  );
}