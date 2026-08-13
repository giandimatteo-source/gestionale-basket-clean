const API_URL = 'http://localhost:5000/api/shooting-stats';

const getToken = () => localStorage.getItem('token');

export async function getShootingStats(rosterId) {
  const response = await fetch(`${API_URL}?rosterId=${rosterId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) throw new Error('Error loading shooting stats');
  return response.json();
}

export async function createShootingStats(data) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Error creating shooting stats');
  return response.json();
}

export async function updateShootingStats(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Error updating shooting stats');
  return response.json();
}

export async function deleteShootingStats(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) throw new Error('Error deleting shooting stats');
  return response.json();
}
