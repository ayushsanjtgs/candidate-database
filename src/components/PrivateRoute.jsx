import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../helpers/firebase";
import Loader from "./common/Loader";

const PrivateRoute = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return children;
};

export default PrivateRoute;
