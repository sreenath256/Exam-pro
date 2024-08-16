import React from 'react';

const StudentCard = ({ name, email }) => {
    
  return (
    <div className="max-w-sm  bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Email:</span> {email}
        </p>
      </div>
    </div>
  );
};

export default StudentCard;