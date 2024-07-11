import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/solid";

const CandidatesList = ({ searchCriteria, candidates, handleDelete }) => {
  const [sortBy, setSortBy] = useState(null);

  const filteredCandidates = candidates.filter((candidate) => {
    const { name, skills, experience, location } = candidate;
    const searchRegex = new RegExp(searchCriteria, "i");

    return (
      searchRegex.test(name) ||
      searchRegex.test(skills) ||
      searchRegex.test(experience.toString()) ||
      searchRegex.test(location)
    );
  });

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortBy === "experience") {
      return b.experience - a.experience; // Sort by experience descending
    } else if (sortBy === "codingResults") {
      return b.codingResults - a.codingResults; // Sort by coding results descending
    } else {
      return 0;
    }
  });

  const handleSort = (criteria) => {
    setSortBy(criteria);
  };

  const highlightScore = (score) => {
    return score > 70 ? "text-green-500 font-bold" : "text-gray-700";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center bg-gray-100 overflow-y-auto"
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <div className="flex justify-end mb-4">
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="text-blue-500 hover:underline flex items-center space-x-1"
                onClick={() => handleSort("dropdown")}
              >
                Sort by
                <ChevronDownIcon className="h-4 w-4" />
              </button>
            </div>
            {sortBy === "dropdown" && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-1" role="none">
                  <button
                    onClick={() => handleSort("experience")}
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Experience
                  </button>
                  <button
                    onClick={() => handleSort("codingResults")}
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Score
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <ul className="space-y-4">
          {sortedCandidates.map((candidate) => (
            <motion.li
              key={candidate.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-100 p-4 rounded-md flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{candidate.name}</p>
                <p>{candidate.skills}</p>
                <p>{candidate.experience} years of experience</p>
                <p>{candidate.location}</p>
                <p
                  className={`mt-2 ${highlightScore(candidate.videoInterview)}`}
                >
                  Video Interview: {candidate.videoInterview}
                </p>
                <p
                  className={`mt-2 ${highlightScore(candidate.codingResults)}`}
                >
                  Coding Results: {candidate.codingResults}
                </p>
              </div>
              <div>
                <Link
                  to={`/edit/${candidate.id}`}
                  className="text-blue-500 mr-4 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(candidate.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default CandidatesList;
