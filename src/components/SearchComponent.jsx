import React, { useState } from "react";
import { useQuery } from "react-query";
import { collection, query, where, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { firestore } from "../helpers/firebase";

const fetchCandidates = async (searchTerm) => {
  const candidates = [];
  const q = query(
    collection(firestore, "candidates"),
    where("skills", "array-contains", searchTerm)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) =>
    candidates.push({ id: doc.id, ...doc.data() })
  );
  return candidates;
};

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, error, isLoading } = useQuery(
    ["candidates", searchTerm],
    () => fetchCandidates(searchTerm),
    {
      enabled: !!searchTerm,
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by skill"
        className="w-full p-2 mb-4 border rounded max-w-md"
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="w-full max-w-md">
        {data?.map((candidate) => (
          <div key={candidate.id} className="bg-white p-4 mb-4 rounded shadow">
            <p>Name: {candidate.name}</p>
            <p>Skills: {candidate.skills}</p>
            <p>Experience: {candidate.experience}</p>
            <p>Location: {candidate.location}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SearchComponent;
