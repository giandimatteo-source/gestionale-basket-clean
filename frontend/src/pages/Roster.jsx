import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Mail, Phone, Upload, Download, FileUp, X, ExternalLink, BarChart3, Grid3x3, List } from 'lucide-react';
import { useUserRole } from '../hooks/useUserRole';
import {
  getRosterList,
  createRoster,
  updateRoster,
  deleteRoster,
} from '../services/rosterService';

export default function Roster() {
  const navigate = useNavigate();
  const { isEditor } = useUserRole();
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    position: '',
    height: '',
    weight: '',
    dateOfBirth: '',
    nationality: '',
    instatId: '',
    photo: null,
  });

  const positions = ['PG', 'SG', 'SF', 'PF', 'C'];

  // Load roster
  useEffect(() => {
    loadRoster();
  }, [searchTerm, positionFilter]);

  const loadRoster = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getRosterList(1, 100, { search: searchTerm, position: positionFilter });
      setRoster(result.data || []);
    } catch (err) {
      setError('Error loading players');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form change
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo' && files) {
      setFormData(prev => ({ ...prev, photo: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        await updateRoster(editingId, formData);
        setSuccess('Player updated successfully');
      } else {
        await createRoster(formData);
        setSuccess('Player added successfully');
      }
      resetForm();
      loadRoster();
    } catch (err) {
      setError(err.message || 'Error saving player');
    } finally {
      setLoading(false);
    }
  };

  // Edit player
  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      number: member.number.toString(),
      position: member.position,
      height: member.height ? member.height.toString() : '',
      weight: member.weight ? member.weight.toString() : '',
      dateOfBirth: member.dateOfBirth ? new Date(member.dateOfBirth).toISOString().split('T')[0] : '',
      nationality: member.nationality || '',
      instatId: member.instatId || '',
      photo: null,
    });
    setEditingId(member.id);
    setIsModalOpen(true);
  };

  // Delete player
  const handleDelete = async (id) => {
    if (!window.confirm('Sei sicuro di voler eliminare questa giocatrice?')) return;
    try {
      await deleteRoster(id);
      setSuccess('Player deleted successfully');
      loadRoster();
    } catch (err) {
      setError('Error deleting player');
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ name: '', number: '', position: '', height: '', weight: '', dateOfBirth: '', nationality: '', instatId: '', photo: null });
    setEditingId(null);
    setIsModalOpen(false);
  };

  // Filter roster
  const filteredRoster = roster.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!positionFilter || r.position === positionFilter)
  );

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#f1f5f9', marginBottom: '1rem' }}>Roster Players</h1>
      </div>

      {/* Messages */}
      {error && (
        <div style={{ background: 'rgba(255, 56, 96, 0.1)', border: '1px solid #FF5860', color: '#FF5860', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ background: 'rgba(127, 255, 0, 0.1)', border: '1px solid #7FFF00', color: '#7FFF00', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
          {success}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {isEditor && (
            <button
              onClick={() => setIsModalOpen(true)}
              style={{ background: 'linear-gradient(135deg, #00D9FF, #00FFFF)', color: '#000', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: '600', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Plus size={20} /> Add
            </button>
          )}
        </div>

        {/* View Mode Toggle */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0, 217, 255, 0.1)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid rgba(0, 217, 255, 0.2)' }}>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              background: viewMode === 'grid' ? 'rgba(0, 217, 255, 0.3)' : 'transparent',
              color: '#00D9FF',
              padding: '0.5rem 1rem',
              borderRadius: '0.35rem',
              cursor: 'pointer',
              border: 'none',
              fontWeight: '600',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 200ms ease',
            }}
            title="Icon View"
          >
            <Grid3x3 size={18} /> Icona
          </button>
          <button
            onClick={() => setViewMode('list')}
            style={{
              background: viewMode === 'list' ? 'rgba(0, 217, 255, 0.3)' : 'transparent',
              color: '#00D9FF',
              padding: '0.5rem 1rem',
              borderRadius: '0.35rem',
              cursor: 'pointer',
              border: 'none',
              fontWeight: '600',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 200ms ease',
            }}
            title="List View"
          >
            <List size={18} /> Lista
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '0.75rem', background: 'rgba(0, 217, 255, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)', color: '#f1f5f9', borderRadius: '0.5rem', fontSize: '1rem' }}
        />
        <select
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
          style={{ padding: '0.75rem', background: 'rgba(0, 217, 255, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)', color: '#f1f5f9', borderRadius: '0.5rem', fontSize: '1rem' }}
        >
          <option value="">All Positions</option>
          {positions.map(pos => (
            <option key={pos} value={pos}>{pos}</option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#cbd5e1' }}>
          ⏳ Loading...
        </div>
      )}

      {/* Roster View */}
      {!loading && filteredRoster.length > 0 && viewMode === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredRoster.map(player => (
            <div key={player.id} style={{ background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8), rgba(45, 53, 97, 0.6))', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 217, 255, 0.1)', borderRadius: '0.75rem', overflow: 'hidden', transition: 'all 300ms ease' }}>
              {/* Photo */}
              <div style={{ height: '200px', background: 'linear-gradient(135deg, #0f172a, #0A0E27)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontSize: '4rem' }}>
                {player.photo ? (
                  <img src={`${player.photo}`} alt={player.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  '🏀'
                )}
              </div>

              {/* Info */}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f1f5f9', marginBottom: '0.5rem' }}>
                  {player.name}
                </h3>
                <p style={{ color: '#00D9FF', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  #{player.number} - {player.position}
                </p>

                {/* Stats */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                  {player.height && <div>📏 {player.height} cm</div>}
                  {player.weight && <div>⚖️ {player.weight} kg</div>}
                  {player.nationality && <div>🌍 {player.nationality}</div>}
                </div>

                {/* Instat Link */}
                {player.instatId && (
                  <a href={`https://app.hudl.com/instat/basketball/players/${player.instatId}`} target="_blank" rel="noopener noreferrer" style={{ color: '#7FFF00', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    <ExternalLink size={16} /> Profilo Instat
                  </a>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => navigate(`/roster/${player.id}`)}
                    style={{ background: 'rgba(127, 255, 0, 0.1)', color: '#7FFF00', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid rgba(127, 255, 0, 0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: '600' }}
                  >
                    <BarChart3 size={16} /> Stats
                  </button>
                  {isEditor && (
                    <>
                      <button
                        onClick={() => handleEdit(player)}
                        style={{ background: 'rgba(0, 217, 255, 0.1)', color: '#00D9FF', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid rgba(0, 217, 255, 0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: '600' }}
                      >
                        <Edit size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(player.id)}
                        style={{ background: 'rgba(255, 56, 96, 0.1)', color: '#FF5860', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid rgba(255, 56, 96, 0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: '600' }}
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Roster List View */}
      {!loading && filteredRoster.length > 0 && viewMode === 'list' && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8), rgba(45, 53, 97, 0.6))',
            borderRadius: '0.75rem',
            border: '1px solid rgba(0, 217, 255, 0.1)',
          }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(0, 217, 255, 0.2)' }}>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#00D9FF', fontWeight: '600' }}>Nome</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#00D9FF', fontWeight: '600' }}>#</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#00D9FF', fontWeight: '600' }}>Posizione</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#00D9FF', fontWeight: '600' }}>Altezza</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#00D9FF', fontWeight: '600' }}>Peso</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#00D9FF', fontWeight: '600' }}>Nazione</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: '#00D9FF', fontWeight: '600' }}>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoster.map(player => (
                <tr key={player.id} style={{ borderBottom: '1px solid rgba(0, 217, 255, 0.1)' }}>
                  <td style={{ padding: '1rem', color: '#f1f5f9', fontWeight: '600' }}>{player.name}</td>
                  <td style={{ padding: '1rem', color: '#cbd5e1' }}>{player.number}</td>
                  <td style={{ padding: '1rem', color: '#cbd5e1' }}>{player.position}</td>
                  <td style={{ padding: '1rem', color: '#cbd5e1' }}>{player.height ? `${player.height} cm` : '-'}</td>
                  <td style={{ padding: '1rem', color: '#cbd5e1' }}>{player.weight ? `${player.weight} kg` : '-'}</td>
                  <td style={{ padding: '1rem', color: '#cbd5e1' }}>{player.nationality || '-'}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => navigate(`/roster/${player.id}`)}
                        style={{ background: 'rgba(127, 255, 0, 0.1)', color: '#7FFF00', padding: '0.4rem 0.8rem', borderRadius: '0.35rem', border: '1px solid rgba(127, 255, 0, 0.2)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600' }}
                        title="Visualizza stats"
                      >
                        📊
                      </button>
                      {isEditor && (
                        <>
                          <button
                            onClick={() => handleEdit(player)}
                            style={{ background: 'rgba(0, 217, 255, 0.1)', color: '#00D9FF', padding: '0.4rem 0.8rem', borderRadius: '0.35rem', border: '1px solid rgba(0, 217, 255, 0.2)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600' }}
                            title="Modifica"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(player.id)}
                            style={{ background: 'rgba(255, 56, 96, 0.1)', color: '#FF5860', padding: '0.4rem 0.8rem', borderRadius: '0.35rem', border: '1px solid rgba(255, 56, 96, 0.2)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600' }}
                            title="Elimina"
                          >
                            🗑️
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredRoster.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#cbd5e1' }}>
          <p>🏀 No players found</p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => resetForm()}>
          <div style={{ background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.9), rgba(45, 53, 97, 0.8))', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 217, 255, 0.2)', borderRadius: '0.75rem', padding: '2rem', maxWidth: '500px', width: '90%', maxHeight: '90vh', overflow: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#f1f5f9' }}>
                {editingId ? 'Edit Player' : 'Add Player'}
              </h2>
              <button onClick={resetForm} style={{ background: 'transparent', color: '#cbd5e1', cursor: 'pointer', border: 'none', fontSize: '1.5rem' }}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Name */}
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Nome</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem', background: 'rgba(0, 217, 255, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)', color: '#f1f5f9', borderRadius: '0.5rem', fontSize: '1rem' }} />
              </div>

              {/* Number */}
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Numero Maglia</label>
                <input type="number" name="number" value={formData.number} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem', background: 'rgba(0, 217, 255, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)', color: '#f1f5f9', borderRadius: '0.5rem', fontSize: '1rem' }} />
              </div>

              {/* Position */}
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Posizione</label>
                <select name="position" value={formData.position} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem', background: 'rgba(0, 217, 255, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)', color: '#f1f5f9', borderRadius: '0.5rem', fontSize: '1rem' }}>
                  <option value="">Seleziona posizione</option>
                  {positions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
                </select>
              </div>

              {/* Height */}
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Altezza (cm)</label>
                <input type="number" name="height" value={formData.height} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0, 217, 255, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)', color: '#f1f5f9', borderRadius: '0.5rem', fontSize: '1rem' }} />
              </div>

              {/* Weight */}
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Peso (kg)</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0, 217, 255, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)', color: '#f1f5f9', borderRadius: '0.5rem', fontSize: '1rem' }} />
              </div>

              {/* Date of Birth */}
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Data di Nascita</label>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0, 217, 255, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)', color: '#f1f5f9', borderRadius: '0.5rem', fontSize: '1rem' }} />
              </div>

              {/* Nationality */}
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Nazionalità</label>
                <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0, 217, 255, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)', color: '#f1f5f9', borderRadius: '0.5rem', fontSize: '1rem' }} />
              </div>

              {/* Instat ID */}
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>ID Instat</label>
                <input type="text" name="instatId" placeholder="es. 3074" value={formData.instatId} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0, 217, 255, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)', color: '#f1f5f9', borderRadius: '0.5rem', fontSize: '1rem' }} />
              </div>

              {/* Photo */}
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Foto</label>
                <input type="file" name="photo" onChange={handleInputChange} accept="image/*" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0, 217, 255, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)', color: '#f1f5f9', borderRadius: '0.5rem', fontSize: '1rem' }} />
              </div>

              <button type="submit" disabled={loading} style={{ background: 'linear-gradient(135deg, #00D9FF, #00FFFF)', color: '#000', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' }}>
                {loading ? 'Saving...' : editingId ? 'Update' : 'Add'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
