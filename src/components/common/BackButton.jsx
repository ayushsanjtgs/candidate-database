import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={goBack}
      className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
    >
      Back
    </button>
  );
};

export default BackButton;
