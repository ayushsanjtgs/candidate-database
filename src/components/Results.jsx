import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import { firestore } from "../helpers/firebase";
import { collection, getDocs } from "firebase/firestore";

const ResultsInterface = () => {
  const {
    data: candidates,
    isLoading,
    error,
  } = useQuery("candidates", async () => {
    const querySnapshot = await getDocs(collection(firestore, "candidates"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = async (id) => {
    // Implement delete logic here
  };

  const highlightScore = (score) => {
    return score > 70 ? "text-green-500 font-bold" : "text-gray-700";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-100 min-h-screen px-80"
    >
      <div className="mx-auto w-full">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
          <ul className="space-y-6">
            {candidates.map((candidate) => (
              <motion.li
                key={candidate.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-100 p-6 rounded-lg flex justify-between items-center shadow-sm"
              >
                <div>
                  <h2 className="text-xl font-semibold">{candidate.name}</h2>
                  <p
                    className={`mt-2 ${highlightScore(
                      candidate.videoInterview
                    )}`}
                  >
                    Video Interview: {candidate.videoInterview}
                  </p>
                  <p
                    className={`mt-2 ${highlightScore(
                      candidate.codingResults
                    )}`}
                  >
                    Coding Results: {candidate.codingResults}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <Link
                    to={`/edit/${candidate.id}`}
                    className="text-blue-500 hover:underline"
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
      </div>
    </motion.div>
  );
};

export default ResultsInterface;
