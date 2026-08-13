import React from 'react';
import ScoutingAdminSections from './ScoutingAdminSections';
import ScoutingPlayers from './ScoutingPlayers';

export default function ScoutingPage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = user?.role;

  const isAdmin = ['ADMIN', 'EDITOR'].includes(userRole);

  return isAdmin ? <ScoutingAdminSections /> : <ScoutingPlayers />;
}
