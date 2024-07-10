import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../helpers/firebase";
import ChartComponent from "../components/ChartComponent";

const ChartsPage = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Candidates",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        yAxisID: "y1",
      },
      {
        label: "Max Years of Experience",
        data: [],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
        yAxisID: "y2",
      },
    ],
  });

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const candidatesCollection = collection(firestore, "candidates");
        const querySnapshot = await getDocs(candidatesCollection);
        const candidatesData = [];
        querySnapshot.forEach((doc) => {
          candidatesData.push(doc.data());
        });

        const skillCounts = {};
        const skillExperience = {};

        candidatesData.forEach((candidate) => {
          const skillsArray = candidate.skills
            .split(",")
            .map((skill) => skill.trim());
          const experience = candidate.experience;

          skillsArray.forEach((skill) => {
            if (!skillCounts[skill]) {
              skillCounts[skill] = 0;
              skillExperience[skill] = [];
            }
            skillCounts[skill] += 1;
            skillExperience[skill].push(experience);
          });
        });

        const maxExperience = {};
        for (const skill in skillExperience) {
          maxExperience[skill] = Math.max(...skillExperience[skill]);
        }

        setChartData({
          labels: Object.keys(skillCounts),
          datasets: [
            {
              label: "Number of Candidates",
              data: Object.values(skillCounts),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              yAxisID: "y1",
            },
            {
              label: "Max Years of Experience",
              data: Object.values(maxExperience),
              backgroundColor: "rgba(153, 102, 255, 0.6)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
              yAxisID: "y2",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Candidates by Skills and Maximum Years of Experience",
      },
    },
    scales: {
      y1: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Number of Candidates",
        },
      },
      y2: {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Max Years of Experience",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ChartComponent data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartsPage;
