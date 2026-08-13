// Staff API Service
const API_URL = 'http://localhost:5000/api/staff';

// Ottenere lista staff
export const getStaffList = async (page = 1, limit = 10, filters = {}) => {
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

    if (!response.ok) throw new Error('Errore nel caricamento staff');
    return await response.json();
  } catch (error) {
    console.error('Error fetching staff:', error);
    throw error;
  }
};

// Ottenere singolo staff
export const getStaffById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) throw new Error('Staff non trovato');
    return await response.json();
  } catch (error) {
    console.error('Error fetching staff:', error);
    throw error;
  }
};

// Creare nuovo staff
export const createStaff = async (data) => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('position', data.position);
    formData.append('phone', data.phone || '');
    formData.append('bio', data.bio || '');
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

    if (!response.ok) throw new Error('Errore nella creazione dello staff');
    return await response.json();
  } catch (error) {
    console.error('Error creating staff:', error);
    throw error;
  }
};

// Aggiornare staff
export const updateStaff = async (id, data) => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('position', data.position);
    formData.append('phone', data.phone || '');
    formData.append('bio', data.bio || '');
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

    if (!response.ok) throw new Error('Errore nell\'aggiornamento dello staff');
    return await response.json();
  } catch (error) {
    console.error('Error updating staff:', error);
    throw error;
  }
};

// Eliminare staff
export const deleteStaff = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) throw new Error('Errore nell\'eliminazione dello staff');
    return await response.json();
  } catch (error) {
    console.error('Error deleting staff:', error);
    throw error;
  }
};

// Importare staff da Excel
export const importStaffFromExcel = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/import/excel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });

    if (!response.ok) throw new Error('Errore nell\'import del file Excel');
    return await response.json();
  } catch (error) {
    console.error('Error importing staff:', error);
    throw error;
  }
};

// Esportare staff a Excel
export const exportStaffToExcel = async () => {
  try {
    const response = await fetch(`${API_URL}/export/excel`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) throw new Error('Errore nell\'export del file Excel');

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'staff_export.xlsx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error exporting staff:', error);
    throw error;
  }
};

// Aggiungere nota a staff
export const addStaffNote = async (id, content) => {
  try {
    const response = await fetch(`${API_URL}/${id}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) throw new Error('Errore nell\'aggiunta della nota');
    return await response.json();
  } catch (error) {
    console.error('Error adding note:', error);
    throw error;
  }
};

// Ottenere statistiche staff
export const getStaffStats = async () => {
  try {
    const response = await fetch(`${API_URL}/stats`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) throw new Error('Errore nel caricamento statistiche');
    return await response.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};
