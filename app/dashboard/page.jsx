import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
        <p className="text-[#6b6b8a] mt-1 text-sm">Create and start your AI mock interview</p>
      </div>

      {/* New interview trigger */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <AddNewInterview />
      </div>

      {/* Interview list */}
      <InterviewList />
    </div>
  );
};

export default Dashboard;
