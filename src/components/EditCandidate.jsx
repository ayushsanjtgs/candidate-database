import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { firestore } from "../helpers/firebase";
import toast from "react-hot-toast";

const EditCandidate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState({
    name: "",
    skills: "",
    experience: "",
    location: "",
    videoInterview: "",
    codingResults: "",
  });

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const docRef = doc(firestore, "candidates", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCandidate(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchCandidate();
  }, [id]);

  const handleChange = (e) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(firestore, "candidates", id);
      await updateDoc(docRef, candidate);
      toast.success("Update successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Error updating candidate:", error);
      console.error("Error updating candidate:", error);
    }
  };

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
        <h2 className="text-2xl font-semibold mb-6">Edit Candidate</h2>
        <label className="text-gray-700">Name</label>
        <input
          name="name"
          value={candidate.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 mb-4 border rounded"
        />
        <label className="text-gray-700">Skills</label>
        <input
          name="skills"
          value={candidate.skills}
          onChange={handleChange}
          placeholder="Skills"
          className="w-full p-2 mb-4 border rounded"
        />
        <label className="text-gray-700">Experience</label>
        <input
          name="experience"
          value={candidate.experience}
          onChange={handleChange}
          placeholder="Experience"
          className="w-full p-2 mb-4 border rounded"
        />
        <label className="text-gray-700">Location</label>
        <input
          name="location"
          value={candidate.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 mb-4 border rounded"
        />
        <label className="text-gray-700">Video Interview</label>
        <input
          name="videoInterview"
          value={candidate.videoInterview}
          onChange={handleChange}
          placeholder="Video Interview"
          className="w-full p-2 mb-4 border rounded"
        />
        <label className="text-gray-700">Coding Results</label>
        <input
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
          Update Candidate
        </button>
      </form>
    </motion.div>
  );
};

export default EditCandidate;
