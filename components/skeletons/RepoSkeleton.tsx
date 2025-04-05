import React from "react";

const RepoSkeleton = ({ numberOfSkeleton } : {numberOfSkeleton : number}) => {
  return (
    <div className={`space-y-4 w-full mx-auto px-4 ${numberOfSkeleton === 3 ? "max-w-3xl" : ""}`}>
      {Array.from({ length: numberOfSkeleton }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border p-6 shadow-sm space-y-4 bg-white"
        >
          <div className="h-5 w-1/3 bg-gray-300 rounded"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded"></div>

          <div className="flex flex-wrap gap-2 pt-4">
            <div className="h-6 w-14 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-10 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
          </div>

          <div className="flex justify-between pt-4">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepoSkeleton;
