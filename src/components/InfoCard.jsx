import React from 'react';

export default function InfoCards() {
  const cards = [
    { title: 'Current Semester', value: 'Spring 2025' },
    { title: 'Credits Enrolled', value: '12 / 18' },
    { title: 'GPA', value: '3.7' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {cards.map((card, index) => (
        <div key={index} className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="text-indigo-700 font-semibold mb-1">{card.title}</h3>
          <p className="text-gray-700 text-lg">{card.value}</p>
        </div>
      ))}
    </div>
  );
}