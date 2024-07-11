import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button onClick={goBack} className="text-white py-2 px-4 rounded font-extrabold">
      Back
    </button>
  );
};

export default BackButton;
