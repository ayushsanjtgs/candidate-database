import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../helpers/firebase";
import BackButton from "./BackButton";

const Header = () => {
  const [user] = useAuthState(auth);
  const location = useLocation();
  const navigate = useNavigate();

  const onProfileClick = () => {
    navigate("/userProfile");
  };

  const imageUrl = localStorage.getItem("imageUrl");

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-xl font-bold">
        Candidate database
      </Link>
      <div className="flex items-center gap-4">
        {user && location.pathname !== "/dashboard" && <BackButton />}
        {user && (
          <img
            src={
              user.imageUrl ||
              imageUrl ||
              "https://fastly.picsum.photos/id/40/4106/2806.jpg?hmac=MY3ra98ut044LaWPEKwZowgydHZ_rZZUuOHrc3mL5mI"
            }
            alt="Profile"
            className="rounded-full h-12 w-12 cursor-pointer"
            onClick={onProfileClick}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
