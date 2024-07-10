import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CandidatesList from "../CandidateList";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { firestore } from "../../helpers/firebase";
import toast from "react-hot-toast";
import Loader from "../common/Loader";

const Dashboard = () => {
  const [searchText, setSearchText] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [loader, setLoader] = useState(false);

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
    setLoader(true);
    try {
      await deleteDoc(doc(firestore, "candidates", id));
      setCandidates(candidates.filter((candidate) => candidate.id !== id));
      setLoader(false);
      toast.success("Candidate deleted successfully!");
    } catch (error) {
      console.error("Error deleting candidate:", error);
      toast.error("Error deleting Candidate:", error);
      setLoader(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  if (loader) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Search Candidates</h2>
          <div>
            <Link
              to="/add-candidate"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Add Candidate
            </Link>
            <Link
              to="/charts"
              className="bg-yellow-500 hover:bg-blue-600 text-white py-2 px-4 rounded ml-4"
            >
              View in Graph
            </Link>
          </div>
        </div>
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search by name, skills, experience..."
          className="w-full p-2 border rounded"
        />
        {candidates.length ? (
          <CandidatesList
            searchCriteria={searchText}
            candidates={candidates}
            handleDelete={handleDelete}
          />
        ) : (
          <p className="text-center mt-10">No Candidates available!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
