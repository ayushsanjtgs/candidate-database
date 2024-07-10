import React, { useState } from "react";
import { Link } from "react-router-dom";
import CandidatesList from "../CandidateList";

const Dashboard = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Search Candidates</h2>
          <Link
            to="/add-candidate"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Add Candidate
          </Link>
        </div>
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search by name, skills, experience..."
          className="w-full p-2 border rounded"
        />
        <CandidatesList searchCriteria={searchText} />
      </div>
    </div>
  );
};

export default Dashboard;
