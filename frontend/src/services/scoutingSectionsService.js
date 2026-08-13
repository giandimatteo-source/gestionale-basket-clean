const API_URL = 'https://gestionale-basket-clean.onrender.com/api/scouting-sections';

const getToken = () => localStorage.getItem('token');

// ============= PLAYER STATS =============

export async function getPlayerStats(reportId, sheetType = null) {
  const params = new URLSearchParams({ reportId });
  if (sheetType) params.append('sheetType', sheetType);

  const response = await fetch(`${API_URL}/player-stats?${params}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) throw new Error('Error loading player stats');
  return response.json();
}

export async function createPlayerStat(data) {
  const response = await fetch(`${API_URL}/player-stats`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Error creating player stat');
  return response.json();
}

export async function updatePlayerStat(id, data) {
  const response = await fetch(`${API_URL}/player-stats/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Error updating player stat');
  return response.json();
}

export async function deletePlayerStat(id) {
  const response = await fetch(`${API_URL}/player-stats/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) throw new Error('Error deleting player stat');
  return response.json();
}

// ============= OFFENSIVE BREAKDOWN =============

export async function getOffensiveBreakdown(reportId) {
  const response = await fetch(`${API_URL}/offensive-breakdown?reportId=${reportId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) throw new Error('Error loading offensive breakdown');
  return response.json();
}

export async function createOffensiveBreakdown(data) {
  const response = await fetch(`${API_URL}/offensive-breakdown`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Error creating offensive breakdown');
  return response.json();
}

export async function updateOffensiveBreakdown(id, data) {
  const response = await fetch(`${API_URL}/offensive-breakdown/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Error updating offensive breakdown');
  return response.json();
}

export async function deleteOffensiveBreakdown(id) {
  const response = await fetch(`${API_URL}/offensive-breakdown/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) throw new Error('Error deleting offensive breakdown');
  return response.json();
}

// ============= COMPARING STATS =============

export async function getComparingStats(reportId) {
  const response = await fetch(`${API_URL}/comparing-stats?reportId=${reportId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) throw new Error('Error loading comparing stats');
  return response.json();
}

export async function createComparingStat(data) {
  const response = await fetch(`${API_URL}/comparing-stats`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Error creating comparing stat');
  return response.json();
}

export async function updateComparingStat(id, data) {
  const response = await fetch(`${API_URL}/comparing-stats/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Error updating comparing stat');
  return response.json();
}

export async function deleteComparingStat(id) {
  const response = await fetch(`${API_URL}/comparing-stats/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) throw new Error('Error deleting comparing stat');
  return response.json();
}

// ============= KEY POINTS =============

export async function getKeyPoints(reportId) {
  const response = await fetch(`${API_URL}/key-points?reportId=${reportId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) throw new Error('Error loading key points');
  return response.json();
}

export async function createKeyPoint(data) {
  const response = await fetch(`${API_URL}/key-points`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Error creating key point');
  return response.json();
}

export async function updateKeyPoint(id, data) {
  const response = await fetch(`${API_URL}/key-points/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Error updating key point');
  return response.json();
}

export async function deleteKeyPoint(id) {
  const response = await fetch(`${API_URL}/key-points/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) throw new Error('Error deleting key point');
  return response.json();
}
