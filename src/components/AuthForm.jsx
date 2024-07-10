import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { motion } from "framer-motion";
import { auth } from "../helpers/firebase";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Signup successful! Redirecting to admin page...");
        setTimeout(() => navigate("/admin"), 2000);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Login successful! Redirecting to admin page...");
        setTimeout(() => navigate("/admin"), 2000);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
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
        {message && (
          <p className="mt-4 text-center text-green-500">{message}</p>
        )}
      </div>
    </motion.div>
  );
};

export default AuthForm;
