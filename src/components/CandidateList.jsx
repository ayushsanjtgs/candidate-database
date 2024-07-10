import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { motion } from "framer-motion";
import { firestore } from "../helpers/firebase";

const CandidatesList = ({ searchCriteria }) => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const candidatesCollection = collection(firestore, "candidates");
        const querySnapshot = await getDocs(candidatesCollection);
        const candidateList = [];
        querySnapshot.forEach((doc) => {
          candidateList.push({ id: doc.id, ...doc.data() });
        });
        setCandidates(candidateList);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "candidates", id));
      setCandidates(candidates.filter((candidate) => candidate.id !== id));
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

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
      className="flex flex-col items-center justify-center bg-gray-100"
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
