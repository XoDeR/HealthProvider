import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notifications from "./pages/Notifications";
import UserList from "./pages/Admin/UserList";
import DoctorList from "./pages/Admin/DoctorList";
import Profile from "./pages/Doctor/Profile";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/apply-doctor"
          element={
            <ProtectedRoute>
              <ApplyDoctor />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/userlist"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/doctorlist"
          element={
            <ProtectedRoute>
              <DoctorList />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/doctor/profile/:userId"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
