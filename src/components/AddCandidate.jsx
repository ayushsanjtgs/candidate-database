import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { firestore } from "../helpers/firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "./common/Loader";

const AddCandidate = () => {
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState({
    name: "",
    skills: "",
    experience: "",
    location: "",
    videoInterview: "",
    codingResults: "",
  });
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      await addDoc(collection(firestore, "candidates"), candidate);
      toast.success("Candidate added successfully!");
      setCandidate({
        name: "",
        skills: "",
        experience: "",
        location: "",
        videoInterview: "",
        codingResults: "",
      });
      setLoader(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding candidate: ", error);
      setLoader(false);
    }
  };

  if (loader) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6">Add Candidate</h2>
        <input
          type="text"
          name="name"
          value={candidate.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="skills"
          value={candidate.skills}
          onChange={handleChange}
          placeholder="Skills"
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="number"
          name="experience"
          value={candidate.experience}
          onChange={handleChange}
          placeholder="Experience"
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="location"
          value={candidate.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="number"
          name="videoInterview"
          value={candidate.videoInterview}
          onChange={handleChange}
          placeholder="Video Interview Results"
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="number"
          name="codingResults"
          value={candidate.codingResults}
          onChange={handleChange}
          placeholder="Coding Results"
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Add Candidate
        </button>
      </form>
    </motion.div>
  );
};

export default AddCandidate;
