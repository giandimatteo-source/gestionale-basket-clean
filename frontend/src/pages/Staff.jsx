import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Mail, Phone, Upload, Download, FileUp, X, Grid, List } from 'lucide-react';
import {
  getStaffList,
  createStaff,
  updateStaff,
  deleteStaff,
  importStaffFromExcel,
  exportStaffToExcel,
} from '../services/staffService';

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [importLoading, setImportLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    phone: '',
    bio: '',
    photo: null,
  });

  // Carica staff da API
  useEffect(() => {
    loadStaff();
  }, [searchTerm, positionFilter]);

  const loadStaff = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getStaffList(1, 100, { search: searchTerm, position: positionFilter });
      setStaff(result.data || []);
    } catch (err) {
      setError('Error loading staff');
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
        await updateStaff(editingId, formData);
        setSuccess('Staff updated successfully');
      } else {
        await createStaff(formData);
        setSuccess('Staff added successfully');
      }
      resetForm();
      loadStaff();
    } catch (err) {
      setError(err.message || 'Error saving staff');
    } finally {
      setLoading(false);
    }
  };

  // Edit staff
  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      email: member.email,
      position: member.position,
      phone: member.phone || '',
      bio: member.bio || '',
      photo: null,
    });
    setEditingId(member.id);
    setIsModalOpen(true);
  };

  // Delete staff
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this staff member?')) return;
    try {
      await deleteStaff(id);
      setSuccess('Staff deleted successfully');
      loadStaff();
    } catch (err) {
      setError('Error deleting staff');
    }
  };

  // Import Excel
  const handleImportExcel = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setImportLoading(true);
      const result = await importStaffFromExcel(file);
      setSuccess(`Import completed: ${result.summary.created} created, ${result.summary.skipped} skipped`);
      loadStaff();
    } catch (err) {
      setError('Error importing file');
    } finally {
      setImportLoading(false);
    }
  };

  // Export Excel
  const handleExportExcel = async () => {
    try {
      await exportStaffToExcel();
      setSuccess('File downloaded successfully');
    } catch (err) {
      setError('Error exporting file');
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ name: '', email: '', position: '', phone: '', bio: '', photo: null });
    setEditingId(null);
    setIsModalOpen(false);
  };

  // Filtra staff
  const filteredStaff = staff.filter(s =>
    (s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!positionFilter || s.position === positionFilter)
  );

  // Posizioni uniche
  const positions = [...new Set(staff.map(s => s.position))].sort();

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', background: 'linear-gradient(135deg, #00D9FF, #FF6B35)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Staff Team
        </h1>
        <div className="flex gap-2">
          <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0, 217, 255, 0.1)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid rgba(0, 217, 255, 0.2)', marginRight: '1rem' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                background: viewMode === 'grid' ? 'rgba(0, 217, 255, 0.3)' : 'transparent',
                color: '#00D9FF',
                border: viewMode === 'grid' ? '1px solid rgba(0, 217, 255, 0.5)' : '1px solid transparent',
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                transition: 'all 300ms ease'
              }}
            >
              <Grid size={16} /> Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                background: viewMode === 'list' ? 'rgba(0, 217, 255, 0.3)' : 'transparent',
                color: '#00D9FF',
                border: viewMode === 'list' ? '1px solid rgba(0, 217, 255, 0.5)' : '1px solid transparent',
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                transition: 'all 300ms ease'
              }}
            >
              <List size={16} /> List
            </button>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            style={{ background: '#00D9FF', color: '#000', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', cursor: 'pointer', border: 'none' }}
            onMouseOver={(e) => e.target.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.5)'}
            onMouseOut={(e) => e.target.style.boxShadow = 'none'}
          >
            <Plus size={20} /> Add
          </button>
          <button
            onClick={handleExportExcel}
            style={{ background: 'rgba(127, 255, 0, 0.1)', color: '#7FFF00', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', cursor: 'pointer', border: '1px solid rgba(127, 255, 0, 0.3)' }}
          >
            <Download size={20} /> Export
          </button>
          <label style={{ background: 'rgba(255, 107, 53, 0.1)', color: '#FF6B35', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', cursor: 'pointer', border: '1px solid rgba(255, 107, 53, 0.3)' }}>
            <FileUp size={20} /> Import
            <input type="file" accept=".xlsx,.csv" onChange={handleImportExcel} style={{ display: 'none' }} disabled={importLoading} />
          </label>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div style={{ background: 'rgba(255, 56, 96, 0.1)', border: '1px solid rgba(255, 56, 96, 0.3)', color: '#FF5860', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ background: 'rgba(127, 255, 0, 0.1)', border: '1px solid rgba(127, 255, 0, 0.3)', color: '#7FFF00', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
          ✅ {success}
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '1rem', marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search by name or email..."
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

      {/* Staff Grid/List */}
      {!loading && filteredStaff.length > 0 && viewMode === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredStaff.map(member => (
            <div key={member.id} style={{ background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8), rgba(45, 53, 97, 0.6))', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 217, 255, 0.1)', borderRadius: '0.75rem', overflow: 'hidden', transition: 'all 300ms ease' }}>
              {/* Photo */}
              <div style={{ height: '200px', background: 'linear-gradient(135deg, #0f172a, #0A0E27)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontSize: '4rem' }}>
                {member.photo ? (
                  <img src={`https://gestionale-basket-clean.onrender.com${member.photo}`} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  '👤'
                )}
              </div>

              {/* Info */}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f1f5f9', marginBottom: '0.5rem' }}>
                  {member.name}
                </h3>
                <p style={{ color: '#00D9FF', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem' }}>
                  {member.position}
                </p>

                {/* Contact */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
                  {member.email && (
                    <a href={`mailto:${member.email}`} style={{ color: '#7FFF00', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Mail size={16} /> {member.email}
                    </a>
                  )}
                  {member.phone && (
                    <a href={`tel:${member.phone}`} style={{ color: '#7FFF00', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Phone size={16} /> {member.phone}
                    </a>
                  )}
                </div>

                {member.bio && (
                  <p style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                    "{member.bio}"
                  </p>
                )}

                {/* Actions */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleEdit(member)}
                    style={{ background: 'rgba(0, 217, 255, 0.1)', color: '#00D9FF', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid rgba(0, 217, 255, 0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: '600' }}
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    style={{ background: 'rgba(255, 56, 96, 0.1)', color: '#FF5860', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid rgba(255, 56, 96, 0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: '600' }}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Staff List View */}
      {!loading && filteredStaff.length > 0 && viewMode === 'list' && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ background: 'rgba(0, 217, 255, 0.1)', borderBottom: '2px solid rgba(0, 217, 255, 0.3)' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#00D9FF' }}>Name</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#00D9FF' }}>Position</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#00D9FF' }}>Email</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#00D9FF' }}>Phone</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#00D9FF' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map(member => (
                <tr key={member.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <td style={{ padding: '1rem', color: '#f1f5f9' }}>{member.name}</td>
                  <td style={{ padding: '1rem', color: '#00D9FF' }}>{member.position}</td>
                  <td style={{ padding: '1rem', color: '#cbd5e1' }}>
                    <a href={`mailto:${member.email}`} style={{ color: '#7FFF00', textDecoration: 'none' }}>
                      {member.email}
                    </a>
                  </td>
                  <td style={{ padding: '1rem', color: '#cbd5e1' }}>
                    {member.phone ? (
                      <a href={`tel:${member.phone}`} style={{ color: '#7FFF00', textDecoration: 'none' }}>
                        {member.phone}
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button
                      onClick={() => handleEdit(member)}
                      style={{ background: 'rgba(0, 217, 255, 0.1)', color: '#00D9FF', padding: '0.4rem 0.8rem', borderRadius: '0.25rem', border: '1px solid rgba(0, 217, 255, 0.2)', cursor: 'pointer', marginRight: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}
                    >
                      <Edit size={14} style={{ display: 'inline', marginRight: '0.25rem' }} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      style={{ background: 'rgba(255, 56, 96, 0.1)', color: '#FF5860', padding: '0.4rem 0.8rem', borderRadius: '0.25rem', border: '1px solid rgba(255, 56, 96, 0.2)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600' }}
                    >
                      <Trash2 size={14} style={{ display: 'inline', marginRight: '0.25rem' }} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredStaff.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#cbd5e1' }}>
          <p>📭 No staff found</p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => resetForm()}>
          <div style={{ background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.9), rgba(45, 53, 97, 0.8))', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 217, 255, 0.2)', borderRadius: '0.75rem', padding: '2rem', maxWidth: '500px', width: '90%', maxHeight: '90vh', overflow: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#f1f5f9' }}>
                {editingId ? 'Edit Staff' : 'Add Staff'}
              </h2>
              <button onClick={resetForm} style={{ background: 'transparent', color: '#cbd5e1', cursor: 'pointer', border: 'none', fontSize: '1.5rem' }}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Name */}
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0, 217, 255, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)', color: '#f1f5f9', borderRadius: '0.5rem', fontSize: '1rem' }}
                />
              </div>

              {/* Email */}
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0, 217, 255, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)', color: '#f1f5f9', borderRadius: '0.5rem', fontSize: '1rem' }}
                />
              </div>

              {/* Position */}
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="e.g. Head Coach, Fitness Coach"
                  required
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0, 217, 255, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)', color: '#f1f5f9', borderRadius: '0.5rem', fontSize: '1rem' }}
                />
              </div>

              {/* Phone */}
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0, 217, 255, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)', color: '#f1f5f9', borderRadius: '0.5rem', fontSize: '1rem' }}
                />
              </div>

              {/* Bio */}
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0, 217, 255, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)', color: '#f1f5f9', borderRadius: '0.5rem', fontSize: '1rem', fontFamily: 'inherit' }}
                />
              </div>

              {/* Photo */}
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Photo</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleInputChange}
                  accept="image/*"
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0, 217, 255, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)', color: '#f1f5f9', borderRadius: '0.5rem', fontSize: '0.875rem' }}
                />
              </div>

              {/* Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
                <button
                  type="submit"
                  style={{ background: '#00D9FF', color: '#000', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: '600', cursor: 'pointer', border: 'none' }}
                  disabled={loading}
                >
                  {editingId ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{ background: 'rgba(255, 56, 96, 0.1)', color: '#FF5860', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: '600', cursor: 'pointer', border: '1px solid rgba(255, 56, 96, 0.2)' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
