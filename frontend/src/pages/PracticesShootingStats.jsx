import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRosterById } from '../services/rosterService.js';
import { getShootingStats, createShootingStats, deleteShootingStats } from '../services/shootingStatsService.js';
import '../styles/ShootingStats.css';

export default function PracticesShootingStatsPage() {
  const { id: rosterId } = useParams();
  const [player, setPlayer] = useState(null);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  // Carica i dati dal server
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
    } catch (err) {
      setError('Errore nel caricamento');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Carica al montaggio e ricarica ogni 2 secondi
  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 2000);
    return () => clearInterval(interval);
  }, [rosterId]);

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
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
      setSuccess('✅ Salvato!');

      setFormData({
        date: new Date().toISOString().split('T')[0],
        lhCorM: '', lhCorA: '',
        lhWgM: '', lhWgA: '',
        topM: '', topA: '',
        rtWgM: '', rtWgA: '',
        rtCorM: '', rtCorA: '',
        notes: '',
      });

      // Ricarica subito i dati dal server
      setTimeout(loadData, 500);
    } catch (err) {
      setError(`❌ Errore: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Eliminare?')) {
      try {
        await deleteShootingStats(id);
        setSuccess('✅ Eliminato!');
        setTimeout(loadData, 500);
      } catch (err) {
        setError(`❌ Errore: ${err.message}`);
      }
    }
  };

  const percentage = (m, a) => a === 0 ? '0.0' : ((m / a) * 100).toFixed(1);

  if (loading) return <div className="page-container">Caricamento...</div>;
  if (!player) return <div className="page-container">Player non trovato</div>;

  return (
    <div className="page-container">
      <h1>{player.name}</h1>
      <p>{player.position} • #{player.number}</p>

      {error && <div style={{ color: '#FF5860', marginBottom: '1rem' }}>{error}</div>}
      {success && <div style={{ color: '#7FFF00', marginBottom: '1rem' }}>{success}</div>}

      {isAdmin && (
        <form onSubmit={handleSave} className="shooting-form">
          <h3>Aggiungi Statistiche</h3>
          <div style={{ marginBottom: '1rem' }}>
            <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} style={{ width: '100%', padding: '0.5rem' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
            {[{ k: 'lhCor', l: 'LC' }, { k: 'lhWg', l: 'LW' }, { k: 'top', l: 'TOP' }, { k: 'rtWg', l: 'RW' }, { k: 'rtCor', l: 'RC' }].map(z => (
              <div key={z.k}>
                <label style={{ fontSize: '0.75rem' }}>{z.l}</label>
                <input type="number" placeholder="M" value={formData[`${z.k}M`]} onChange={(e) => setFormData({ ...formData, [`${z.k}M`]: e.target.value })} style={{ width: '100%', padding: '0.5rem' }} />
                <input type="number" placeholder="A" value={formData[`${z.k}A`]} onChange={(e) => setFormData({ ...formData, [`${z.k}A`]: e.target.value })} style={{ width: '100%', padding: '0.5rem' }} />
              </div>
            ))}
          </div>

          <textarea placeholder="Note" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} style={{ width: '100%', padding: '0.5rem', minHeight: '60px' }} />
          <button type="submit" className="btn-add-stat" style={{ width: '100%', marginTop: '1rem' }}>Salva</button>
        </form>
      )}

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
            {stats.map(s => {
              const tot = (s.lhCorM || 0) + (s.lhWgM || 0) + (s.topM || 0) + (s.rtWgM || 0) + (s.rtCorM || 0);
              const totA = (s.lhCorA || 0) + (s.lhWgA || 0) + (s.topA || 0) + (s.rtWgA || 0) + (s.rtCorA || 0);
              return (
                <tr key={s.id}>
                  <td>{new Date(s.date).toLocaleDateString()}</td>
                  <td>{s.lhCorM}/{s.lhCorA} {percentage(s.lhCorM, s.lhCorA)}%</td>
                  <td>{s.lhWgM}/{s.lhWgA} {percentage(s.lhWgM, s.lhWgA)}%</td>
                  <td>{s.topM}/{s.topA} {percentage(s.topM, s.topA)}%</td>
                  <td>{s.rtWgM}/{s.rtWgA} {percentage(s.rtWgM, s.rtWgA)}%</td>
                  <td>{s.rtCorM}/{s.rtCorA} {percentage(s.rtCorM, s.rtCorA)}%</td>
                  <td style={{ color: '#7FFF00', fontWeight: 'bold' }}>{percentage(tot, totA)}%</td>
                  <td>{s.notes || '-'}</td>
                  {isAdmin && <td><button onClick={() => handleDelete(s.id)} style={{ background: '#FF5860', color: '#fff', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }}>✕</button></td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
