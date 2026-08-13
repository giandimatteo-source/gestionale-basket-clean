import React, { useState } from 'react';

const TIPI = ['Distorsione', 'Strappo', 'Frattura', 'Contusione', 'Altro'];
const STATI = ['In corso', 'Guarito', 'Sospetto'];

export default function InjuryForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    data_infortunio: new Date().toISOString().split('T')[0],
    tipo: '',
    parte_corpo: '',
    status: 'In corso',
    eta_ritorno: '',
    note: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.data_infortunio) newErrors.data_infortunio = 'Obbligatorio';
    if (!formData.tipo) newErrors.tipo = 'Obbligatorio';
    if (!formData.parte_corpo?.trim()) newErrors.parte_corpo = 'Obbligatorio';
    if (!formData.status) newErrors.status = 'Obbligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      data_infortunio: formData.data_infortunio,
      tipo: formData.tipo,
      parte_corpo: formData.parte_corpo,
      status: formData.status.toLowerCase().replace(' ', '_'),
      eta_ritorno: formData.eta_ritorno || null,
      note: formData.note || null
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-gray-50 p-4 rounded-lg">
      <h4 className="font-semibold text-gray-900">Registra Infortunio</h4>

      {/* Data */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Data Infortunio *</label>
        <input
          type="date"
          name="data_infortunio"
          value={formData.data_infortunio}
          onChange={handleChange}
          className={`w-full px-2 py-1 border rounded text-sm ${errors.data_infortunio ? 'border-red-500' : ''}`}
        />
        {errors.data_infortunio && <p className="text-red-500 text-xs mt-1">{errors.data_infortunio}</p>}
      </div>

      {/* Tipo */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Tipo *</label>
        <select
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className={`w-full px-2 py-1 border rounded text-sm ${errors.tipo ? 'border-red-500' : ''}`}
        >
          <option value="">Seleziona...</option>
          {TIPI.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.tipo && <p className="text-red-500 text-xs mt-1">{errors.tipo}</p>}
      </div>

      {/* Parte Corpo */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Parte Corpo *</label>
        <input
          type="text"
          name="parte_corpo"
          value={formData.parte_corpo}
          onChange={handleChange}
          placeholder="Es. caviglia sinistra"
          className={`w-full px-2 py-1 border rounded text-sm ${errors.parte_corpo ? 'border-red-500' : ''}`}
        />
        {errors.parte_corpo && <p className="text-red-500 text-xs mt-1">{errors.parte_corpo}</p>}
      </div>

      {/* Status */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Status *</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={`w-full px-2 py-1 border rounded text-sm ${errors.status ? 'border-red-500' : ''}`}
        >
          {STATI.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* ETA Ritorno (solo se In corso) */}
      {formData.status === 'In corso' && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">ETA Ritorno</label>
          <input
            type="date"
            name="eta_ritorno"
            value={formData.eta_ritorno}
            onChange={handleChange}
            className="w-full px-2 py-1 border rounded text-sm"
          />
        </div>
      )}

      {/* Note */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Note</label>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          rows="2"
          placeholder="Es. Riposo consigliato, terapie..."
          className="w-full px-2 py-1 border rounded text-sm"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="flex-1 bg-primary text-white py-1 rounded text-sm hover:bg-blue-700 transition font-medium"
        >
          Salva
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-gray-300 text-gray-700 py-1 rounded text-sm hover:bg-gray-400 transition font-medium"
        >
          Annulla
        </button>
      </div>
    </form>
  );
}
