import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRosterById } from '../services/rosterService.js';
import { getShootingStats, createShootingStats } from '../services/shootingStatsService.js';
import '../styles/ShootingStats.css';

export default function PracticesShootingStatsPage() {
  const { id: rosterId } = useParams();
  const [player, setPlayer] = useState(null);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    lhCorM: '', lhCorA: '',
    lhWgM: '', lhWgA: '',
    topM: '', topA: '',
    rtWgM: '', rtWgA: '',
    rtCorM: '', rtCorA: '',
    notes: '',
  });

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'ADMIN';

  useEffect(() => {
    // Pulisci localStorage per evitare dati stantii
    localStorage.removeItem('shootingStats_' + rosterId);
    loadData();
    // Ricarica i dati ogni 3 secondi per sincronizzazione real-time
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
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
      setError('Errore nel caricamento dei dati');
      console.error('Error loading:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Valida che i campi siano riempiti
      const values = Object.values(formData).filter(v => v !== '' && v !== new Date().toISOString().split('T')[0] && v !== formData.notes);
      if (values.length === 0) {
        setError('Inserisci almeno un valore');
        return;
      }

      const data = {
        rosterId,
        date: formData.date,
        lhCorM: parseInt(formData.lhCorM) || 0,
        lhCorA: parseInt(formData.lhCorA) || 0,
        lhWgM: parseInt(formData.lhWgM) || 0,
        lhWgA: parseInt(formData.lhWgA) || 0,
        topM: parseInt(formData.topM) || 0,
        topA: parseInt(formData.topA) || 0,
        rtWgM: parseInt(formData.rtWgM) || 0,
        rtWgA: parseInt(formData.rtWgA) || 0,
        rtCorM: parseInt(formData.rtCorM) || 0,
        rtCorA: parseInt(formData.rtCorA) || 0,
        notes: formData.notes || '',
      };

      await createShootingStats(data);

      // Resetta il form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        lhCorM: '', lhCorA: '',
        lhWgM: '', lhWgA: '',
        topM: '', topA: '',
        rtWgM: '', rtWgA: '',
        rtCorM: '', rtCorA: '',
        notes: '',
      });

      // Ricarica i dati dal server
      await loadData();
    } catch (error) {
      setError(`Errore: ${error.message}`);
    }
  };

  const handleDelete = async (statId) => {
    if (window.confirm('Eliminare questo record?')) {
      try {
        const { deleteShootingStats } = await import('../services/shootingStatsService.js');
        await deleteShootingStats(statId);
        await loadData();
      } catch (error) {
        setError(`Errore eliminazione: ${error.message}`);
      }
    }
  };

  const calculatePercentage = (made, attempted) => {
    if (attempted === 0) return '0.0';
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
          ❌ {error}
        </div>
      )}

      {isAdmin ? (
        <form onSubmit={handleSubmit} className="shooting-form">
          <h3>📝 Aggiungi Statistiche (Solo Admin)</h3>

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
              { key: 'lhCor', label: 'LC' },
              { key: 'lhWg', label: 'LW' },
              { key: 'top', label: 'TOP' },
              { key: 'rtWg', label: 'RW' },
              { key: 'rtCor', label: 'RC' },
            ].map(zone => (
              <div key={zone.key}>
                <label style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>{zone.label}</label>
                <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.25rem' }}>
                  <input
                    type="number"
                    min="0"
                    placeholder="M"
                    value={formData[`${zone.key}M`]}
                    onChange={(e) => setFormData({ ...formData, [`${zone.key}M`]: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, [`${zone.key}A`]: e.target.value })}
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
            <textarea
              placeholder="Note (opzionale)"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem',
                background: 'rgba(0, 217, 255, 0.05)',
                border: '1px solid rgba(0, 217, 255, 0.2)',
                color: '#f1f5f9',
                borderRadius: '0.35rem',
                minHeight: '60px',
                fontSize: '0.9rem',
              }}
            />
          </div>

          <button type="submit" className="btn-add-stat" style={{ width: '100%' }}>
            ✓ Salva
          </button>
        </form>
      ) : (
        <div style={{
          background: 'rgba(0, 217, 255, 0.1)',
          border: '1px solid rgba(0, 217, 255, 0.2)',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          color: '#00D9FF',
          textAlign: 'center',
        }}>
          👁️ Visualizzazione (Solo Admin può modificare)
        </div>
      )}

      {/* Tabella dei dati */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>DATA</th>
              <th>LC</th>
              <th>LW</th>
              <th>TOP</th>
              <th>RW</th>
              <th>RC</th>
              <th>TOT%</th>
              <th>NOTE</th>
              {isAdmin && <th>AZIONI</th>}
            </tr>
          </thead>
          <tbody>
            {stats.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: '#cbd5e1' }}>
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
                    {isAdmin && (
                      <td>
                        <button
                          onClick={() => handleDelete(stat.id)}
                          style={{
                            background: '#FF5860',
                            color: '#fff',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.25rem',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
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
