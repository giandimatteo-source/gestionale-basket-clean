const API_URL = '/api/calendar';

const getToken = () => localStorage.getItem('token');

export async function getEvents(startDate, endDate) {
  let url = API_URL;

  if (startDate && endDate) {
    const start = startDate.toISOString();
    const end = endDate.toISOString();
    url = `${API_URL}?startDate=${start}&endDate=${end}`;
  }

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) throw new Error('Errore nel caricamento degli eventi');
  return response.json();
}

export async function getEventById(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) throw new Error('Errore nel caricamento dell\'evento');
  return response.json();
}

export async function createEvent(data) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Errore nella creazione dell\'evento');
  return response.json();
}

export async function updateEvent(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Errore nell\'aggiornamento dell\'evento');
  return response.json();
}

export async function deleteEvent(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) throw new Error('Errore nell\'eliminazione dell\'evento');
  return response.json();
}

export async function acceptEvent(id, email) {
  const response = await fetch(`${API_URL}/${id}/accept`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) throw new Error('Errore nell\'accettazione dell\'evento');
  return response.json();
}

export async function declineEvent(id, email) {
  const response = await fetch(`${API_URL}/${id}/decline`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) throw new Error('Errore nel rifiuto dell\'evento');
  return response.json();
}
