import React, { useState } from 'react';

const RUOLI = [
  'Head Coach',
  'Assistant Coach',
  'Strength & Conditioning',
  'Video Coach',
  'Medical Staff (Doctor)',
  'Medical Staff (Physio)',
  'Nutritionist',
  'Other'
];

export default function StaffForm({ initialData, onSubmit, onClose, isEditing }) {
  const [formData, setFormData] = useState(initialData || {
    nome_cognome: '',
    ruolo: '',
    email: '',
    telefono: '',
    specializzazione: '',
    note: ''
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nome_cognome?.trim()) newErrors.nome_cognome = 'Obbligatorio';
    if (!formData.ruolo) newErrors.ruolo = 'Obbligatorio';
    if (!formData.email?.trim()) newErrors.email = 'Obbligatorio';
    if (formData.email && !formData.email.includes('@')) newErrors.email = 'Email non valida';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    data.append('nome_cognome', formData.nome_cognome);
    data.append('ruolo', formData.ruolo);
    data.append('email', formData.email);
    data.append('telefono', formData.telefono);
    data.append('specializzazione', formData.specializzazione);
    data.append('note', formData.note);
    if (file) data.append('foto', file);

    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">{isEditing ? 'Modifica Staff' : 'Aggiungi Staff'}</h2>

      {/* Foto Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Foto</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {initialData?.foto_url && (
          <img src={initialData.foto_url} alt="Current" className="mt-2 h-32 w-32 object-cover rounded" />
        )}
      </div>

      {/* Nome Cognome */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nome Cognome *</label>
        <input
          type="text"
          name="nome_cognome"
          value={formData.nome_cognome}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.nome_cognome ? 'border-red-500' : ''}`}
        />
        {errors.nome_cognome && <p className="text-red-500 text-sm mt-1">{errors.nome_cognome}</p>}
      </div>

      {/* Ruolo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Ruolo *</label>
        <select
          name="ruolo"
          value={formData.ruolo}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.ruolo ? 'border-red-500' : ''}`}
        >
          <option value="">Seleziona...</option>
          {RUOLI.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        {errors.ruolo && <p className="text-red-500 text-sm mt-1">{errors.ruolo}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Telefono */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
        <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Specializzazione */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Specializzazione</label>
        <input
          type="text"
          name="specializzazione"
          value={formData.specializzazione}
          onChange={handleInputChange}
          placeholder="Es. video analysis, strength training"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Note */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleInputChange}
          rows="3"
          placeholder="Disponibilità, collaborazioni, contatti speciali"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Salva
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
        >
          Annulla
        </button>
      </div>
    </form>
  );
}
