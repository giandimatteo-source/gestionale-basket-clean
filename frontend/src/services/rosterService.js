// Roster API Service
const API_URL = 'https://gestionale-basket-clean.onrender.com/api/roster';

// Ottenere lista giocatrici
export const getRosterList = async (page = 1, limit = 10, filters = {}) => {
  try {
    const params = new URLSearchParams({
      page,
      limit,
      ...(filters.position && { position: filters.position }),
      ...(filters.search && { search: filters.search }),
    });

    const response = await fetch(`${API_URL}?${params}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) throw new Error('Errore nel caricamento giocatrici');
    return await response.json();
  } catch (error) {
    console.error('Error fetching roster:', error);
    throw error;
  }
};

// Ottenere singola giocatrice
export const getRosterById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) throw new Error('Giocatrice non trovata');
    return await response.json();
  } catch (error) {
    console.error('Error fetching roster:', error);
    throw error;
  }
};

// Creare nuova giocatrice
export const createRoster = async (data) => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('number', data.number);
    formData.append('position', data.position);
    formData.append('height', data.height || '');
    formData.append('weight', data.weight || '');
    formData.append('dateOfBirth', data.dateOfBirth || '');
    formData.append('nationality', data.nationality || '');
    formData.append('instatId', data.instatId || '');
    if (data.photo) {
      formData.append('photo', data.photo);
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });

    if (!response.ok) throw new Error('Errore nella creazione della giocatrice');
    return await response.json();
  } catch (error) {
    console.error('Error creating roster:', error);
    throw error;
  }
};

// Aggiornare giocatrice
export const updateRoster = async (id, data) => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('number', data.number);
    formData.append('position', data.position);
    formData.append('height', data.height || '');
    formData.append('weight', data.weight || '');
    formData.append('dateOfBirth', data.dateOfBirth || '');
    formData.append('nationality', data.nationality || '');
    formData.append('instatId', data.instatId || '');
    if (data.photo) {
      formData.append('photo', data.photo);
    }

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });

    if (!response.ok) throw new Error('Errore nell\'aggiornamento della giocatrice');
    return await response.json();
  } catch (error) {
    console.error('Error updating roster:', error);
    throw error;
  }
};

// Eliminare giocatrice
export const deleteRoster = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) throw new Error('Errore nell\'eliminazione della giocatrice');
    return await response.json();
  } catch (error) {
    console.error('Error deleting roster:', error);
    throw error;
  }
};

// Aggiornare stats giocatrice
export const updatePlayerStats = async (id, stats) => {
  try {
    const response = await fetch(`${API_URL}/${id}/stats`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(stats),
    });

    if (!response.ok) throw new Error('Errore nell\'aggiornamento delle stats');
    return await response.json();
  } catch (error) {
    console.error('Error updating stats:', error);
    throw error;
  }
};

// Ottenere stats roster
export const getRosterStats = async () => {
  try {
    const response = await fetch(`${API_URL}/stats/summary`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) throw new Error('Errore nel caricamento statistiche');
    return await response.json();
  } catch (error) {
    console.error('Error fetching roster stats:', error);
    throw error;
  }
};
