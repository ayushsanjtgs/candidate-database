import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../helpers/firebase";
import BackButton from "./BackButton";

const Header = () => {
  const [user] = useAuthState(auth);
  const location = useLocation();

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-xl font-bold">
        Candidate database
      </Link>
      <div>
        {user && location.pathname !== "/dashboard" && <BackButton />}
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        ) : (
          <Link to="/" className="text-white hover:underline">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
