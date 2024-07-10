import React from "react";
import { Bar } from "react-chartjs-2";
import { useQuery } from "react-query";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { firestore } from "../helpers/firebase";

const fetchCandidateData = async () => {
  const skillsData = {};
  const querySnapshot = await getDocs(collection(firestore, "candidates"));
  querySnapshot.forEach((doc) => {
    const { skills } = doc.data();
    skills.forEach((skill) => {
      if (!skillsData[skill]) skillsData[skill] = 0;
      skillsData[skill]++;
    });
  });
  return skillsData;
};

const ChartComponent = () => {
  const { data, error, isLoading } = useQuery(
    "candidateData",
    fetchCandidateData
  );

  const chartData = {
    labels: Object.keys(data || {}),
    datasets: [
      {
        label: "Number of Candidates",
        data: Object.values(data || {}),
        backgroundColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div className="w-full max-w-4xl">
          <Bar data={chartData} />
        </div>
      )}
    </motion.div>
  );
};

export default ChartComponent;
