import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import AdminForm from "./components/AdminForm";
import SearchComponent from "./components/SearchComponent";
import ChartComponent from "./components/ChartComponent";
import PrivateRoute from "./components/PrivateRoute";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <SearchComponent />
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
      </Routes>
    </Router>
  );
};

export default App;
