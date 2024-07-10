import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CandidatesList = ({ searchCriteria, candidates, handleDelete }) => {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center bg-gray-100 overflow-y-auto"
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <ul className="space-y-4">
          {filteredCandidates.map((candidate) => (
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
