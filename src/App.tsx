import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Toaster } from '@/components/ui/sonner';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Lobby from './pages/Lobby';
import Exam from './pages/Exam';
import History from './pages/History';
import Grades from './pages/Grades';
import Appeals from './pages/Appeals';
import Profile from './pages/Profile';
import SubmissionSuccess from './pages/SubmissionSuccess';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="history" element={<History />} />
          <Route path="grades" element={<Grades />} />
          <Route path="appeals" element={<Appeals />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>

        <Route path="/lobby/:examId" element={<Lobby />} />
        <Route path="/exam/:examId" element={<Exam />} />
        <Route path="/submission-success/:examId" element={<SubmissionSuccess />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
      <Toaster position="top-center" richColors />
    </Router>
  );
}

