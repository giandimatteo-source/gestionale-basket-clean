import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import LayoutWrapper from './components/LayoutWrapper.jsx';
import './index.css';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Staff from './pages/Staff';
import Roster from './pages/Roster';
import PlayerDetail from './pages/PlayerDetail';
import Calendar from './pages/Calendar';
import Practices from './pages/Practices';
import PracticesShooting from './pages/PracticesShooting';
import MyProfile from './pages/MyProfile';
import Playbook from './pages/Playbook';
import Scouting from './pages/Scouting';
import PracticesShootingStats from './pages/PracticesShootingStats';
import Organization from './pages/Organization';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<LayoutWrapper />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/roster" element={<Roster />} />
          <Route path="/roster/:id" element={<PlayerDetail />} />
          <Route path="/roster/:id/shooting-stats" element={<PracticesShootingStats />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/practices" element={<Practices />} />
          <Route path="/practices-shooting" element={<PracticesShooting />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/playbook" element={<Playbook />} />
          <Route path="/scouting" element={<Scouting />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}
