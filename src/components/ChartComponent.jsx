import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const ChartComponent = ({ data, options }) => {
  console.log(data);
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
