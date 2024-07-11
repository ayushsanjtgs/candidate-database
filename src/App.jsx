import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/home/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import EditCandidate from "./components/EditCandidate";
import Header from "./components/common/Header";
import AddCandidate from "./components/AddCandidate";
import ChartsPage from "./pages/ChartsPage";
import UserProfile from "./components/UserProfile";

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
                <ChartsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditCandidate />
              </PrivateRoute>
            }
          />
          <Route
            path="/userProfile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
