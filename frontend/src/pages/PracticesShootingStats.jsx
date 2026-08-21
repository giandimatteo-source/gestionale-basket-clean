import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRosterById } from '../services/rosterService.js';
import {
  getShootingStats,
  createShootingStats,
  updateShootingStats,
  deleteShootingStats,
} from '../services/shootingStatsService.js';
import '../styles/ShootingStats.css';

export default function PracticesShootingStatsPage() {
  const { id: rosterId } = useParams();
  const [player, setPlayer] = useState(null);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    lhCorM: 0, lhCorA: 0,
    lhWgM: 0, lhWgA: 0,
    topM: 0, topA: 0,
    rtWgM: 0, rtWgA: 0,
    rtCorM: 0, rtCorA: 0,
    notes: '',
  });

  const userRole = JSON.parse(localStorage.getItem('user') || '{}').role;
  const canEdit = ['ADMIN', 'EDITOR', 'COACH'].includes(userRole);

  useEffect(() => {
    loadData();
  }, [rosterId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [playerRes, statsRes] = await Promise.all([
        getRosterById(rosterId),
        getShootingStats(rosterId),
      ]);
      setPlayer(playerRes.data);
      setStats(statsRes.data || []);
      setError('');
    } catch (error) {
      setError('Errore nel caricamento dei dati dal server');
      console.error('Error loading:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const data = { ...formData, rosterId };
      console.log('📤 Invio dati al server:', data);

      await createShootingStats(data);

      console.log('✅ Dati salvati con successo al server');
      setSuccessMessage('✅ Dati salvati con successo!');

      // Resetta il form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        lhCorM: 0, lhCorA: 0,
        lhWgM: 0, lhWgA: 0,
        topM: 0, topA: 0,
        rtWgM: 0, rtWgA: 0,
        rtCorM: 0, rtCorA: 0,
        notes: '',
      });

      // Ricarica SEMPRE i dati dal server
      await loadData();

      // Nascondi il messaggio di successo dopo 3 secondi
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('❌ Errore nel salvataggio:', error);
      setError(`❌ Errore: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Cancellare questo record?')) {
      try {
        await deleteShootingStats(id);
        await loadData();
        setSuccessMessage('Record cancellato');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setError(`Errore nel cancellamento: ${error.message}`);
      }
    }
  };

  const calculatePercentage = (made, attempted) => {
    if (attempted === 0) return 0;
    return ((made / attempted) * 100).toFixed(1);
  };

  if (loading) return <div className="page-container">Caricamento...</div>;
  if (!player) return <div className="page-container">Giocatore non trovato</div>;

  return (
    <div className="page-container">
      <div className="shooting-header">
        <div className="player-info">
          <h1>{player.name}</h1>
          <p>{player.position} • #{player.number}</p>
        </div>
      </div>

      {error && (
        <div style={{
          background: 'rgba(255, 88, 96, 0.2)',
          border: '1px solid #FF5860',
          color: '#FF5860',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
        }}>
          {error}
        </div>
      )}

      {successMessage && (
        <div style={{
          background: 'rgba(127, 255, 0, 0.2)',
          border: '1px solid #7FFF00',
          color: '#7FFF00',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
        }}>
          {successMessage}
        </div>
      )}

      {canEdit && (
        <form onSubmit={handleSubmit} className="shooting-form">
          <h3>Aggiungi statistiche</h3>

          <div style={{ marginBottom: '1rem' }}>
            <label>Data:</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                background: 'rgba(0, 217, 255, 0.05)',
                border: '1px solid rgba(0, 217, 255, 0.2)',
                color: '#f1f5f9',
                borderRadius: '0.35rem',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
            {[
              { key: 'lhCor', label: 'LEFT CORNER' },
              { key: 'lhWg', label: 'LEFT WING' },
              { key: 'top', label: 'TOP' },
              { key: 'rtWg', label: 'RIGHT WING' },
              { key: 'rtCor', label: 'RIGHT CORNER' },
            ].map(zone => (
              <div key={zone.key}>
                <label style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>{zone.label}</label>
                <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.25rem' }}>
                  <input
                    type="number"
                    min="0"
                    placeholder="M"
                    value={formData[`${zone.key}M`]}
                    onChange={(e) => setFormData({ ...formData, [`${zone.key}M`]: parseInt(e.target.value) || 0 })}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      background: 'rgba(0, 217, 255, 0.05)',
                      border: '1px solid rgba(0, 217, 255, 0.2)',
                      color: '#f1f5f9',
                      borderRadius: '0.25rem',
                      fontSize: '0.9rem',
                    }}
                  />
                  <input
                    type="number"
                    min="0"
                    placeholder="A"
                    value={formData[`${zone.key}A`]}
                    onChange={(e) => setFormData({ ...formData, [`${zone.key}A`]: parseInt(e.target.value) || 0 })}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      background: 'rgba(0, 217, 255, 0.05)',
                      border: '1px solid rgba(0, 217, 255, 0.2)',
                      color: '#f1f5f9',
                      borderRadius: '0.25rem',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Note:</label>
            <textarea
              placeholder="Note (opzionale)"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                background: 'rgba(0, 217, 255, 0.05)',
                border: '1px solid rgba(0, 217, 255, 0.2)',
                color: '#f1f5f9',
                borderRadius: '0.35rem',
                minHeight: '60px',
                fontSize: '0.9rem',
              }}
            />
          </div>

          <button
            type="submit"
            className="btn-add-stat"
            style={{ width: '100%' }}
          >
            ✓ Salva sul server
          </button>
        </form>
      )}

      {/* Tabella dei dati */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>DATA</th>
              <th>LC M/A/%</th>
              <th>LW M/A/%</th>
              <th>TOP M/A/%</th>
              <th>RW M/A/%</th>
              <th>RC M/A/%</th>
              <th>TOTALE%</th>
              <th>NOTE</th>
              {canEdit && <th>AZIONI</th>}
            </tr>
          </thead>
          <tbody>
            {stats.length === 0 ? (
              <tr>
                <td colSpan={canEdit ? 9 : 8} style={{ textAlign: 'center', padding: '2rem', color: '#cbd5e1' }}>
                  Nessun dato
                </td>
              </tr>
            ) : (
              stats.map((stat) => {
                const total = (stat.lhCorM || 0) + (stat.lhWgM || 0) + (stat.topM || 0) + (stat.rtWgM || 0) + (stat.rtCorM || 0);
                const totalAttempts = (stat.lhCorA || 0) + (stat.lhWgA || 0) + (stat.topA || 0) + (stat.rtWgA || 0) + (stat.rtCorA || 0);
                const totalPercentage = calculatePercentage(total, totalAttempts);

                return (
                  <tr key={stat.id}>
                    <td>{new Date(stat.date).toLocaleDateString()}</td>
                    <td>{stat.lhCorM}/{stat.lhCorA} {calculatePercentage(stat.lhCorM, stat.lhCorA)}%</td>
                    <td>{stat.lhWgM}/{stat.lhWgA} {calculatePercentage(stat.lhWgM, stat.lhWgA)}%</td>
                    <td>{stat.topM}/{stat.topA} {calculatePercentage(stat.topM, stat.topA)}%</td>
                    <td>{stat.rtWgM}/{stat.rtWgA} {calculatePercentage(stat.rtWgM, stat.rtWgA)}%</td>
                    <td>{stat.rtCorM}/{stat.rtCorA} {calculatePercentage(stat.rtCorM, stat.rtCorA)}%</td>
                    <td style={{ color: '#7FFF00', fontWeight: 'bold' }}>{totalPercentage}%</td>
                    <td style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>{stat.notes || '-'}</td>
                    {canEdit && (
                      <td>
                        <button
                          onClick={() => handleDelete(stat.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#FF5860',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                          }}
                        >
                          ✕ Elimina
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
