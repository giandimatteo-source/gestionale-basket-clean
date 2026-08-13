import React, { useState } from 'react';

const RUOLI = ['PG', 'SG', 'SF', 'PF', 'C'];

export default function PlayerForm({ initialData, onSubmit, onClose, isEditing }) {
  const [formData, setFormData] = useState(initialData || {
    numero_maglia: '',
    nome: '',
    cognome: '',
    ruolo: '',
    data_nascita: '',
    altezza_cm: '',
    peso_kg: '',
    email: '',
    telefono: ''
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.numero_maglia) newErrors.numero_maglia = 'Obbligatorio';
    if (!formData.nome?.trim()) newErrors.nome = 'Obbligatorio';
    if (!formData.cognome?.trim()) newErrors.cognome = 'Obbligatorio';
    if (!formData.ruolo) newErrors.ruolo = 'Obbligatorio';
    if (!formData.data_nascita) newErrors.data_nascita = 'Obbligatorio';
    if (!formData.altezza_cm) newErrors.altezza_cm = 'Obbligatorio';
    if (!formData.peso_kg) newErrors.peso_kg = 'Obbligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    data.append('numero_maglia', formData.numero_maglia);
    data.append('nome', formData.nome);
    data.append('cognome', formData.cognome);
    data.append('ruolo', formData.ruolo);
    data.append('data_nascita', formData.data_nascita);
    data.append('altezza_cm', formData.altezza_cm);
    data.append('peso_kg', formData.peso_kg);
    data.append('email', formData.email);
    data.append('telefono', formData.telefono);
    if (file) data.append('foto', file);

    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <h2 className="text-xl font-bold mb-4">{isEditing ? 'Modifica Giocatrice' : 'Aggiungi Giocatrice'}</h2>

      {/* Foto */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Foto</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
        {initialData?.foto_url && (
          <img src={initialData.foto_url} alt="Current" className="mt-2 h-32 w-32 object-cover rounded" />
        )}
      </div>

      {/* Numero Maglia */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Numero Maglia *</label>
        <input
          type="number"
          name="numero_maglia"
          min="1"
          max="15"
          value={formData.numero_maglia}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg ${errors.numero_maglia ? 'border-red-500' : ''}`}
        />
        {errors.numero_maglia && <p className="text-red-500 text-sm">{errors.numero_maglia}</p>}
      </div>

      {/* Nome Cognome */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg ${errors.nome ? 'border-red-500' : ''}`}
          />
          {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cognome *</label>
          <input
            type="text"
            name="cognome"
            value={formData.cognome}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg ${errors.cognome ? 'border-red-500' : ''}`}
          />
          {errors.cognome && <p className="text-red-500 text-sm">{errors.cognome}</p>}
        </div>
      </div>

      {/* Ruolo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Ruolo *</label>
        <select
          name="ruolo"
          value={formData.ruolo}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg ${errors.ruolo ? 'border-red-500' : ''}`}
        >
          <option value="">Seleziona...</option>
          {RUOLI.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        {errors.ruolo && <p className="text-red-500 text-sm">{errors.ruolo}</p>}
      </div>

      {/* Data Nascita */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Data Nascita *</label>
        <input
          type="date"
          name="data_nascita"
          value={formData.data_nascita}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-lg ${errors.data_nascita ? 'border-red-500' : ''}`}
        />
        {errors.data_nascita && <p className="text-red-500 text-sm">{errors.data_nascita}</p>}
      </div>

      {/* Altezza Peso */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Altezza (cm) *</label>
          <input
            type="number"
            name="altezza_cm"
            value={formData.altezza_cm}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg ${errors.altezza_cm ? 'border-red-500' : ''}`}
          />
          {errors.altezza_cm && <p className="text-red-500 text-sm">{errors.altezza_cm}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Peso (kg) *</label>
          <input
            type="number"
            step="0.1"
            name="peso_kg"
            value={formData.peso_kg}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg ${errors.peso_kg ? 'border-red-500' : ''}`}
          />
          {errors.peso_kg && <p className="text-red-500 text-sm">{errors.peso_kg}</p>}
        </div>
      </div>

      {/* Contact */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
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
