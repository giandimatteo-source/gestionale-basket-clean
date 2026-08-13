import React, { useState } from 'react';
import { X, Edit, Trash2, Plus, AlertCircle } from 'lucide-react';
import axios from 'axios';
import InjuryForm from './InjuryForm';

export default function PlayerDetail({ player, onClose, onEdit, onDelete, onUpdate }) {
  const [showInjuryForm, setShowInjuryForm] = useState(false);
  const [injuries, setInjuries] = useState(player.injuries || []);
  const [editingInjury, setEditingInjury] = useState(null);
  const [error, setError] = useState(null);

  const age = new Date().getFullYear() - new Date(player.data_nascita).getFullYear();

  const handleAddInjury = async (formData) => {
    try {
      const response = await axios.post(
        `/api/roster/${player.player_id}/injuries`,
        formData
      );
      setInjuries([...injuries, response.data]);
      setShowInjuryForm(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Errore');
    }
  };

  const handleDeleteInjury = async (injuryId) => {
    if (!window.confirm('Eliminare infortunio?')) return;
    try {
      await axios.delete(
        `/api/roster/${player.player_id}/injuries/${injuryId}`
      );
      setInjuries(injuries.filter(i => i.injury_id !== injuryId));
    } catch (err) {
      setError('Errore nell\'eliminazione');
    }
  };

  const activeInjuries = injuries.filter(i => i.status === 'in_corso');

  return (
    <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-lg overflow-y-auto z-40">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b flex justify-between items-center p-6">
        <h2 className="text-xl font-bold">#{player.numero_maglia} {player.nome} {player.cognome}</h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
          <X size={24} />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        {/* Foto */}
        {player.foto_url && (
          <div className="text-center">
            <img src={player.foto_url} alt="" className="w-32 h-32 rounded-lg mx-auto object-cover" />
          </div>
        )}

        {/* Basic Info */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Ruolo:</span>
            <span className="font-semibold">{player.ruolo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Età:</span>
            <span className="font-semibold">{age} anni</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Altezza:</span>
            <span className="font-semibold">{player.altezza_cm} cm</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Peso:</span>
            <span className="font-semibold">{player.peso_kg} kg</span>
          </div>
        </div>

        {/* Contact */}
        {(player.email || player.telefono) && (
          <div className="pt-4 border-t space-y-2">
            {player.email && (
              <a href={`mailto:${player.email}`} className="block text-blue-600 hover:underline text-sm">
                {player.email}
              </a>
            )}
            {player.telefono && (
              <a href={`tel:${player.telefono}`} className="block text-blue-600 hover:underline text-sm">
                {player.telefono}
              </a>
            )}
          </div>
        )}

        {/* Injuries */}
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              {activeInjuries.length > 0 && <AlertCircle size={20} className="text-red-600" />}
              Infortuni
            </h3>
            <button
              onClick={() => setShowInjuryForm(true)}
              className="text-blue-600 hover:underline text-sm flex items-center gap-1"
            >
              <Plus size={16} /> Aggiungi
            </button>
          </div>

          {injuries.length === 0 ? (
            <p className="text-gray-600 text-sm">Nessun infortunio registrato</p>
          ) : (
            <div className="space-y-3">
              {injuries.map(injury => (
                <div key={injury.injury_id} className={`p-3 rounded-lg border ${
                  injury.status === 'in_corso' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{injury.parte_corpo}</p>
                      <p className="text-sm text-gray-600">{injury.tipo}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteInjury(injury.injury_id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>Data: {new Date(injury.data_infortunio).toLocaleDateString('it-IT')}</p>
                    <p>Status: <span className={injury.status === 'in_corso' ? 'text-red-600 font-semibold' : 'text-green-600'}>
                      {injury.status}
                    </span></p>
                    {injury.eta_ritorno && (
                      <p>ETA Ritorno: {new Date(injury.eta_ritorno).toLocaleDateString('it-IT')}</p>
                    )}
                    {injury.note && <p className="mt-2 italic">{injury.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Injury Form */}
        {showInjuryForm && (
          <div className="pt-4 border-t">
            <InjuryForm
              onSubmit={handleAddInjury}
              onClose={() => setShowInjuryForm(false)}
            />
          </div>
        )}

        {/* Actions */}
        <div className="pt-4 border-t flex gap-2">
          <button
            onClick={() => onEdit(player)}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition font-medium"
          >
            <Edit size={18} /> Modifica
          </button>
          <button
            onClick={() => {
              if (window.confirm('Eliminare giocatrice?')) {
                onDelete(player.player_id);
              }
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition font-medium"
          >
            <Trash2 size={18} /> Elimina
          </button>
        </div>
      </div>
    </div>
  );
}
