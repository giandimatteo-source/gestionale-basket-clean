import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';
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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

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
    } catch (error) {
      console.error('Error loading:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, rosterId };
      if (editingId) {
        await updateShootingStats(editingId, data);
      } else {
        await createShootingStats(data);
      }
      setFormData({
        date: new Date().toISOString().split('T')[0],
        lhCorM: 0, lhCorA: 0,
        lhWgM: 0, lhWgA: 0,
        topM: 0, topA: 0,
        rtWgM: 0, rtWgA: 0,
        rtCorM: 0, rtCorA: 0,
        notes: '',
      });
      setEditingId(null);
      setIsFormOpen(false);
      loadData();
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this record?')) {
      try {
        await deleteShootingStats(id);
        loadData();
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  const handleEdit = (stat) => {
    setFormData({
      date: stat.date.split('T')[0],
      lhCorM: stat.lhCorM || 0,
      lhCorA: stat.lhCorA || 0,
      lhWgM: stat.lhWgM || 0,
      lhWgA: stat.lhWgA || 0,
      topM: stat.topM || 0,
      topA: stat.topA || 0,
      rtWgM: stat.rtWgM || 0,
      rtWgA: stat.rtWgA || 0,
      rtCorM: stat.rtCorM || 0,
      rtCorA: stat.rtCorA || 0,
      notes: stat.notes || '',
    });
    setEditingId(stat.id);
    setIsFormOpen(true);
  };

  const calculatePercentage = (made, attempted) => {
    if (attempted === 0) return 0;
    return ((made / attempted) * 100).toFixed(2);
  };

  const calculateTotals = () => {
    const totals = {
      lhCorM: 0, lhCorA: 0,
      lhWgM: 0, lhWgA: 0,
      topM: 0, topA: 0,
      rtWgM: 0, rtWgA: 0,
      rtCorM: 0, rtCorA: 0,
    };

    stats.forEach(stat => {
      Object.keys(totals).forEach(key => {
        totals[key] += stat[key] || 0;
      });
    });

    return totals;
  };

  if (loading) return <div className="page-container">Loading...</div>;
  if (!player) return <div className="page-container">Player not found</div>;

  const totals = calculateTotals();
  const chartData = stats.map(stat => ({
    date: new Date(stat.date).toLocaleDateString(),
    percentage: calculatePercentage(
      (stat.lhCorM || 0) + (stat.lhWgM || 0) + (stat.topM || 0) + (stat.rtWgM || 0) + (stat.rtCorM || 0),
      (stat.lhCorA || 0) + (stat.lhWgA || 0) + (stat.topA || 0) + (stat.rtWgA || 0) + (stat.rtCorA || 0)
    ),
  }));

  const positionStats = {
    'LH COR': stats.map(stat => calculatePercentage(stat.lhCorM, stat.lhCorA)),
    'LH WG': stats.map(stat => calculatePercentage(stat.lhWgM, stat.lhWgA)),
    'TOP': stats.map(stat => calculatePercentage(stat.topM, stat.topA)),
    'RT WG': stats.map(stat => calculatePercentage(stat.rtWgM, stat.rtWgA)),
    'RT COR': stats.map(stat => calculatePercentage(stat.rtCorM, stat.rtCorA)),
  };

  return (
    <div className="page-container">
      <div className="shooting-header">
        <div className="player-info">
          <h1>🏀 {player.name} - Shooting Stats</h1>
          <p style={{ color: '#cbd5e1', marginTop: '0.5rem' }}>#{player.number} • {player.position}</p>
        </div>
        {canEdit && (
          <button
            className="btn-add-stat"
            onClick={() => {
              setEditingId(null);
              setFormData({
                date: new Date().toISOString().split('T')[0],
                lhCorM: 0, lhCorA: 0,
                lhWgM: 0, lhWgA: 0,
                topM: 0, topA: 0,
                rtWgM: 0, rtWgA: 0,
                rtCorM: 0, rtCorA: 0,
                notes: '',
              });
              setIsFormOpen(true);
            }}
          >
            <Plus size={18} /> Add Entry
          </button>
        )}
      </div>

      {/* Form */}
      {isFormOpen && canEdit && (
        <form onSubmit={handleSubmit} className="shooting-form">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              style={{
                padding: '0.5rem',
                background: 'rgba(0, 217, 255, 0.05)',
                border: '1px solid rgba(0, 217, 255, 0.2)',
                color: '#f1f5f9',
                borderRadius: '0.35rem',
                gridColumn: '1 / -1',
              }}
            />
            {['lhCor', 'lhWg', 'top', 'rtWg', 'rtCor'].map(zone => (
              <div key={zone} style={{ display: 'flex', gap: '0.5rem', minWidth: '100px' }}>
                <input
                  type="number"
                  min="0"
                  placeholder={`${zone} M`}
                  value={formData[`${zone}M`]}
                  onChange={(e) => setFormData({ ...formData, [`${zone}M`]: parseInt(e.target.value) || 0 })}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    background: 'rgba(0, 217, 255, 0.05)',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                    color: '#f1f5f9',
                    borderRadius: '0.35rem',
                  }}
                />
                <input
                  type="number"
                  min="0"
                  placeholder={`${zone} A`}
                  value={formData[`${zone}A`]}
                  onChange={(e) => setFormData({ ...formData, [`${zone}A`]: parseInt(e.target.value) || 0 })}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    background: 'rgba(0, 217, 255, 0.05)',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                    color: '#f1f5f9',
                    borderRadius: '0.35rem',
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <textarea
              placeholder="Notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(0, 217, 255, 0.05)',
                border: '1px solid rgba(0, 217, 255, 0.2)',
                color: '#f1f5f9',
                borderRadius: '0.35rem',
                minHeight: '80px',
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn-save"><Save size={16} /> Save</button>
            <button type="button" className="btn-cancel" onClick={() => setIsFormOpen(false)}><X size={16} /> Cancel</button>
          </div>
        </form>
      )}

      {/* Chart */}
      {chartData.length > 0 && (
        <>
          <div className="shooting-chart">
            <h3>📈 Daily Stats Trend</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.25rem', height: '200px', padding: '1rem', overflowX: 'auto' }}>
              {chartData.map((d, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    minWidth: '30px',
                    height: `${Math.max(10, d.percentage * 2)}px`,
                    background: `linear-gradient(135deg, #00D9FF, #7FFF00)`,
                    borderRadius: '4px 4px 0 0',
                    position: 'relative',
                  }}
                  title={`${d.date}: ${d.percentage}%`}
                />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', fontSize: '0.75rem', marginTop: '0.5rem' }}>
              <span>{chartData[0]?.date}</span>
              <span>{chartData[chartData.length - 1]?.date}</span>
            </div>
          </div>

          <div className="shooting-chart">
            <h3>🎯 Position Performance</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', padding: '1rem' }}>
              {Object.entries(positionStats).map(([position, percentages]) => {
                const avgPercentage = percentages.filter(p => p > 0).reduce((a, b) => a + parseFloat(b), 0) / percentages.filter(p => p > 0).length;
                const maxPercentage = Math.max(...percentages.filter(p => p > 0));
                const minPercentage = Math.min(...percentages.filter(p => p > 0));

                return (
                  <div key={position} style={{
                    background: 'rgba(0, 217, 255, 0.05)',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                  }}>
                    <div style={{ color: '#00D9FF', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                      {position}
                    </div>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.2)',
                      borderRadius: '0.35rem',
                      padding: '0.5rem',
                      marginBottom: '0.5rem',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'flex-end',
                      overflow: 'hidden',
                    }}>
                      {percentages.map((p, i) => (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            height: `${Math.max(5, p * 0.4)}px`,
                            background: p > 0 ? `hsl(${(parseFloat(p) * 1.2)}, 100%, 50%)` : 'rgba(127, 255, 0, 0.2)',
                            marginRight: i < percentages.length - 1 ? '2px' : 0,
                            borderRadius: '2px',
                          }}
                          title={`${p}%`}
                        />
                      ))}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#cbd5e1', textAlign: 'center' }}>
                      Avg: <span style={{ color: '#7FFF00', fontWeight: '600' }}>{avgPercentage.toFixed(1)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Table */}
      <div style={{ overflowX: 'auto', marginTop: '2rem', marginRight: 0, marginLeft: 0, borderRadius: '0.75rem', border: '1px solid rgba(0, 217, 255, 0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#f1f5f9', minWidth: '800px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(0, 217, 255, 0.2)' }}>
              <th style={{ padding: '1rem', textAlign: 'left', color: '#00D9FF' }}>Date</th>
              <th style={{ padding: '1rem', textAlign: 'center', color: '#00D9FF' }}>LH COR</th>
              <th style={{ padding: '1rem', textAlign: 'center', color: '#00D9FF' }}>LH WG</th>
              <th style={{ padding: '1rem', textAlign: 'center', color: '#00D9FF' }}>TOP</th>
              <th style={{ padding: '1rem', textAlign: 'center', color: '#00D9FF' }}>RT WG</th>
              <th style={{ padding: '1rem', textAlign: 'center', color: '#00D9FF' }}>RT COR</th>
              <th style={{ padding: '1rem', textAlign: 'center', color: '#00D9FF' }}>TOTAL %</th>
              <th style={{ padding: '1rem', textAlign: 'center', color: '#00D9FF' }}>Notes</th>
              {canEdit && <th style={{ padding: '1rem', textAlign: 'center', color: '#00D9FF' }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {stats.map(stat => (
              <tr key={stat.id} style={{ borderBottom: '1px solid rgba(0, 217, 255, 0.1)' }}>
                <td style={{ padding: '1rem' }}>{new Date(stat.date).toLocaleDateString()}</td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>{stat.lhCorM}/{stat.lhCorA} ({calculatePercentage(stat.lhCorM, stat.lhCorA)}%)</td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>{stat.lhWgM}/{stat.lhWgA} ({calculatePercentage(stat.lhWgM, stat.lhWgA)}%)</td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>{stat.topM}/{stat.topA} ({calculatePercentage(stat.topM, stat.topA)}%)</td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>{stat.rtWgM}/{stat.rtWgA} ({calculatePercentage(stat.rtWgM, stat.rtWgA)}%)</td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>{stat.rtCorM}/{stat.rtCorA} ({calculatePercentage(stat.rtCorM, stat.rtCorA)}%)</td>
                <td style={{ padding: '1rem', textAlign: 'center', color: '#7FFF00', fontWeight: 'bold' }}>
                  {calculatePercentage(
                    (stat.lhCorM || 0) + (stat.lhWgM || 0) + (stat.topM || 0) + (stat.rtWgM || 0) + (stat.rtCorM || 0),
                    (stat.lhCorA || 0) + (stat.lhWgA || 0) + (stat.topA || 0) + (stat.rtWgA || 0) + (stat.rtCorA || 0)
                  )}%
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#cbd5e1' }}>{stat.notes}</td>
                {canEdit && (
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <button onClick={() => handleEdit(stat)} style={{ background: 'none', border: 'none', color: '#00D9FF', cursor: 'pointer', marginRight: '0.5rem' }}>
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(stat.id)} style={{ background: 'none', border: 'none', color: '#FF5860', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
            <tr style={{ borderTop: '2px solid rgba(0, 217, 255, 0.2)', fontWeight: 'bold', color: '#7FFF00' }}>
              <td style={{ padding: '1rem' }}>TOTAL</td>
              <td style={{ padding: '1rem', textAlign: 'center' }}>{totals.lhCorM}/{totals.lhCorA}</td>
              <td style={{ padding: '1rem', textAlign: 'center' }}>{totals.lhWgM}/{totals.lhWgA}</td>
              <td style={{ padding: '1rem', textAlign: 'center' }}>{totals.topM}/{totals.topA}</td>
              <td style={{ padding: '1rem', textAlign: 'center' }}>{totals.rtWgM}/{totals.rtWgA}</td>
              <td style={{ padding: '1rem', textAlign: 'center' }}>{totals.rtCorM}/{totals.rtCorA}</td>
              <td style={{ padding: '1rem', textAlign: 'center' }}>
                {calculatePercentage(
                  totals.lhCorM + totals.lhWgM + totals.topM + totals.rtWgM + totals.rtCorM,
                  totals.lhCorA + totals.lhWgA + totals.topA + totals.rtWgA + totals.rtCorA
                )}%
              </td>
              <td></td>
              {canEdit && <td></td>}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
