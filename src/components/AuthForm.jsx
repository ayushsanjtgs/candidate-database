import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { motion } from "framer-motion";
import { auth } from "../helpers/firebase";
import Loader from "./common/Loader";
import toast from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [loader, setLoader] = useState(false);

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      setLoader(true);
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        setLoader(false);
        toast.success("Signup successful!");
        navigate("/dashboard");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setLoader(false);
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      setLoader(false);
      console.error(error);
      toast.error(`Error: ${error.message}`);
    }
  };

  if (user) return <Navigate to="/dashboard" />;

  return loader ? (
    <Loader />
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleAuth}
          className="w-full p-2 mb-4 bg-blue-500 text-white rounded"
        >
          {isSignUp ? "Sign Up" : "Login"}
        </button>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full p-2 bg-gray-300 rounded"
        >
          {isSignUp ? "Switch to Login" : "Switch to Sign Up"}
        </button>
      </div>
    </motion.div>
  );
};

export default AuthForm;
