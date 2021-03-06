import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Home from './BoardComponents/Home';
import BoardUser from './BoardComponents/BoardUser';
import BoardModerator from './BoardComponents/BoardModerator';
import BoardAdmin from './BoardComponents/BoardAdmin';

import ProtectedRoute from './pages/ProtectedRoute';
import Landing from './pages/Landing';
import Register from './pages/Register';

import { Register, Landing, Error, ProtectedRoute } from './pages';
import {
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
  AddJob,
} from './pages/dashboard';

import Login from './components/Login';
import Profile from './components/Profile';

import AuthService from './services/auth.service';

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'));
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/check"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
            // <SharedLayout />
          }
        />
        <Route path="/" element={<SharedLayout />}>
          {/* <Route index element={<Stats />} /> */}
          <Route path="stats" element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user" element={<BoardUser />} />
        <Route path="/mod" element={<BoardModerator />} />
        <Route path="/admin" element={<BoardAdmin />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
