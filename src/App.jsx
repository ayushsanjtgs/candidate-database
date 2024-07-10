import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/home/Dashboard";
import ChartComponent from "./components/ChartComponent";
import PrivateRoute from "./components/PrivateRoute";
import EditCandidate from "./components/EditCandidate";
import Header from "./components/common/Header";
import AddCandidate from "./components/AddCandidate";
import "./index.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route
            path="/add-candidate"
            element={
              <PrivateRoute>
                <AddCandidate />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/charts"
            element={
              <PrivateRoute>
                <ChartComponent />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id" // Define route parameter for candidate id
            element={
              <PrivateRoute>
                <EditCandidate />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
