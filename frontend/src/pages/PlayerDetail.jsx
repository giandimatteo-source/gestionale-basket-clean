import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Zap, Shield, AlertCircle } from 'lucide-react';
import '../styles/PlayerDetail.css';

const STATS_CONFIG = [
  // Basic
  { key: 'min', label: 'MIN', category: 'basic', color: '#00D9FF' },
  { key: 'points', label: 'Points', category: 'basic', color: '#FF6B35' },
  { key: 'pppp', label: 'PPPP', category: 'basic', color: '#7FFF00' },

  // Field Goals
  { key: 'fgPlus', label: 'FG+', category: 'fg', color: '#1E3A8A' },
  { key: 'fg', label: 'FG', category: 'fg', color: '#1E3A8A' },
  { key: 'fgPercent', label: 'FG%', category: 'fg', color: '#00D9FF', isPercent: true },
  { key: 'threePass', label: '3PT+', category: 'fg', color: '#FF6B35' },
  { key: 'threePt', label: '3PT', category: 'fg', color: '#FF6B35' },
  { key: 'threePtPercent', label: '3PT%', category: 'fg', color: '#00D9FF', isPercent: true },
  { key: 'ftPlus', label: 'FT+', category: 'fg', color: '#7FFF00' },
  { key: 'ft', label: 'FT', category: 'fg', color: '#7FFF00' },
  { key: 'ftPercent', label: 'FT%', category: 'fg', color: '#00D9FF', isPercent: true },
  { key: 'tsPercent', label: 'TS%', category: 'fg', color: '#00D9FF', isPercent: true },
  { key: 'twoPtPlus', label: '2PT+', category: 'fg', color: '#1E3A8A' },
  { key: 'twoPt', label: '2PT', category: 'fg', color: '#1E3A8A' },
  { key: 'twoPtPercent', label: '2PT%', category: 'fg', color: '#00D9FF', isPercent: true },

  // Rebounds
  { key: 'reb', label: 'REB', category: 'reb', color: '#FF6B35' },
  { key: 'oreb', label: 'OREB', category: 'reb', color: '#FF6B35' },
  { key: 'dreb', label: 'DREB', category: 'reb', color: '#7FFF00' },

  // Game
  { key: 'ast', label: 'AST', category: 'game', color: '#00D9FF' },
  { key: 'stl', label: 'STL', category: 'game', color: '#7FFF00' },
  { key: 'tov', label: 'TOV', category: 'game', color: '#FF6B35' },
  { key: 'blk', label: 'BLK', category: 'game', color: '#00D9FF' },
  { key: 'f', label: 'F', category: 'game', color: '#FF6B35' },
  { key: 'fd', label: 'FD', category: 'game', color: '#7FFF00' },
  { key: 'plusMinus', label: '+/-', category: 'game', color: '#1E3A8A' },
  { key: 'astTo', label: 'AST/TO', category: 'game', color: '#00D9FF' },

  // Ratings
  { key: 'orat', label: 'ORAT', category: 'rating', color: '#FF6B35' },
  { key: 'drat', label: 'DRAT', category: 'rating', color: '#7FFF00' },
];

const PLAY_TYPES = [
  'Pick\'n\'Roll Handler',
  'Catch and shoots',
  'Isolation',
  'Screen offs',
  'Hand offs',
  'Transitions',
  'Catch and drives',
  'Pick\'n\'Rolls Roller',
  'Post ups',
  'Cuts',
  'Pick\'n\'Pops',
  'Putbacks',
];

export default function PlayerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPlayTypeTab, setShowPlayTypeTab] = useState('offensive');
  const [editMode, setEditMode] = useState(false);
  const [editStats, setEditStats] = useState({});
  const [saving, setSaving] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPlayer();
  }, [id]);

  const fetchPlayer = async () => {
    try {
      const response = await fetch(`/api/roster/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Errore nel caricamento');
      const data = await response.json();
      setPlayer(data.data);
      if (data.data.stats) {
        setEditStats(data.data.stats);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatChange = (key, value) => {
    setEditStats(prev => ({
      ...prev,
      [key]: value === '' ? null : parseFloat(value) || null,
    }));
  };

  const saveStats = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/roster/${id}/stats`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editStats),
      });
      if (!response.ok) throw new Error('Errore nel salvataggio');
      setEditMode(false);
      await fetchPlayer();
    } catch (error) {
      console.error(error);
      alert('Errore nel salvataggio delle stats');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="player-loading">Caricamento...</div>;
  if (!player) return <div className="player-error">Giocatrice non trovata</div>;

  const getStatValue = (value) => {
    if (value === null || value === undefined) return '-';
    return typeof value === 'number' ? value.toFixed(1) : value;
  };

  const getStatColor = (key) => {
    const config = STATS_CONFIG.find(s => s.key === key);
    return config?.color || '#00D9FF';
  };

  const getStatCategory = (key) => {
    const config = STATS_CONFIG.find(s => s.key === key);
    return config?.category || 'other';
  };

  return (
    <div className="player-detail">
      {/* Header Navigation */}
      <div className="player-nav">
        <button onClick={() => navigate('/roster')} className="player-back-btn">
          <ArrowLeft size={20} /> Roster
        </button>
      </div>

      {/* Hero Section */}
      <div className="player-hero">
        <div className="hero-content">
          <div className="hero-photo">
            {player.photo ? (
              <img src={`http://localhost:5000${player.photo}`} alt={player.name} />
            ) : (
              <div className="photo-placeholder">👩‍🏀</div>
            )}
          </div>

          <div className="hero-info">
            <div className="hero-number">{player.number}</div>
            <h1 className="hero-name">{player.name}</h1>
            <p className="hero-position">{player.position}</p>

            <div className="hero-stats-grid">
              {player.height && <div><span>Altezza</span> {player.height} cm</div>}
              {player.weight && <div><span>Peso</span> {player.weight} kg</div>}
              {player.nationality && <div><span>Nazionalità</span> {player.nationality}</div>}
              {player.dateOfBirth && (
                <div>
                  <span>Data Nascita</span>
                  {new Date(player.dateOfBirth).toLocaleDateString('it-IT')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Statistiche Generali */}
      <div className="stats-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 className="section-title">
            <Zap size={24} /> Statistiche Generali
          </h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                style={{
                  background: 'linear-gradient(135deg, #00D9FF, #00FFFF)',
                  color: '#000',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                ✏️ Modifica
              </button>
            ) : (
              <>
                <button
                  onClick={saveStats}
                  disabled={saving}
                  style={{
                    background: 'linear-gradient(135deg, #7FFF00, #90EE90)',
                    color: '#000',
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    opacity: saving ? 0.6 : 1,
                  }}
                >
                  {saving ? '⏳ Salvataggio...' : '💾 Salva'}
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  style={{
                    background: 'rgba(255, 88, 96, 0.1)',
                    color: '#FF5860',
                    padding: '0.75rem 1.5rem',
                    border: '1px solid rgba(255, 88, 96, 0.2)',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  ✕ Annulla
                </button>
              </>
            )}
          </div>
        </div>

        <div className="stats-categories">
          {['basic', 'fg', 'reb', 'game', 'rating'].map(category => (
            <div key={category} className="stats-category">
              <h3 className="category-title">
                {category === 'basic' && '📊 Base'}
                {category === 'fg' && '🎯 Field Goals'}
                {category === 'reb' && '🏀 Rimbalzi'}
                {category === 'game' && '⚡ Gioco'}
                {category === 'rating' && '📈 Rating'}
              </h3>

              <div className="stats-grid">
                {STATS_CONFIG.filter(s => s.category === category).map(stat => (
                  <div
                    key={stat.key}
                    className="stat-card"
                    style={{
                      borderLeftColor: stat.color,
                      '--stat-color': stat.color,
                    }}
                  >
                    <div className="stat-label">{stat.label}</div>
                    {!editMode ? (
                      <div className="stat-value">
                        {getStatValue(editStats?.[stat.key])}
                        {stat.isPercent && '%'}
                      </div>
                    ) : (
                      <input
                        type="number"
                        step="0.1"
                        value={editStats?.[stat.key] ?? ''}
                        onChange={(e) => handleStatChange(stat.key, e.target.value)}
                        style={{
                          background: 'rgba(0, 217, 255, 0.1)',
                          border: '1px solid rgba(0, 217, 255, 0.3)',
                          color: stat.color,
                          padding: '0.5rem',
                          borderRadius: '0.25rem',
                          fontSize: '1rem',
                          fontWeight: '700',
                          textAlign: 'center',
                          width: '100%',
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Play Types */}
      {player.stats && (
        <div className="play-types-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 className="section-title">
              <Shield size={24} /> Play Types Analysis
            </h2>
          </div>

          <div className="play-type-tabs">
            <button
              className={`tab-btn ${showPlayTypeTab === 'offensive' ? 'active' : ''}`}
              onClick={() => setShowPlayTypeTab('offensive')}
            >
              🔴 Offensive
            </button>
            <button
              className={`tab-btn ${showPlayTypeTab === 'defensive' ? 'active' : ''}`}
              onClick={() => setShowPlayTypeTab('defensive')}
            >
              🔵 Defensive
            </button>
          </div>

          <div className="play-types-grid">
            {PLAY_TYPES.map(playType => (
              <div key={playType} className="play-type-card">
                <h4>{playType}</h4>
                <div className="play-type-stats">
                  {!editMode ? (
                    <>
                      <div className="pt-stat">
                        <span>FG%</span>
                        <strong>-</strong>
                      </div>
                      <div className="pt-stat">
                        <span>POSS</span>
                        <strong>-</strong>
                      </div>
                      <div className="pt-stat">
                        <span>PPP</span>
                        <strong>-</strong>
                      </div>
                    </>
                  ) : (
                    <>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="FG%"
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          background: 'rgba(0, 217, 255, 0.1)',
                          border: '1px solid rgba(0, 217, 255, 0.2)',
                          color: '#00D9FF',
                          borderRadius: '0.25rem',
                          fontSize: '0.85rem',
                        }}
                      />
                      <input
                        type="number"
                        step="0.1"
                        placeholder="POSS"
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          background: 'rgba(0, 217, 255, 0.1)',
                          border: '1px solid rgba(0, 217, 255, 0.2)',
                          color: '#00D9FF',
                          borderRadius: '0.25rem',
                          fontSize: '0.85rem',
                        }}
                      />
                      <input
                        type="number"
                        step="0.01"
                        placeholder="PPP"
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          background: 'rgba(0, 217, 255, 0.1)',
                          border: '1px solid rgba(0, 217, 255, 0.2)',
                          color: '#00D9FF',
                          borderRadius: '0.25rem',
                          fontSize: '0.85rem',
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Infortuni */}
      {player.injuries && player.injuries.length > 0 && (
        <div className="injuries-section">
          <h2 className="section-title">
            <AlertCircle size={24} /> Infortuni
          </h2>
          <div className="injuries-list">
            {player.injuries.map(injury => (
              <div key={injury.id} className="injury-item">
                <div className="injury-header">
                  <h4>{injury.description}</h4>
                  <span className={`injury-severity ${injury.severity.toLowerCase()}`}>
                    {injury.severity}
                  </span>
                </div>
                <div className="injury-info">
                  <span>Data: {new Date(injury.date).toLocaleDateString('it-IT')}</span>
                  {injury.returnDate && (
                    <span>Ritorno: {new Date(injury.returnDate).toLocaleDateString('it-IT')}</span>
                  )}
                  {injury.notes && <p className="injury-notes">{injury.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
