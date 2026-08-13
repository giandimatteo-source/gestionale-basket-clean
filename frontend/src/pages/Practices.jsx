import React, { useState, useEffect } from 'react';
import { Plus, X, Play, Trash2, Edit, Upload } from 'lucide-react';
import { getTrainingSessions, createTrainingSession, updateTrainingSession, deleteTrainingSession } from '../services/trainingsService.js';
import '../styles/Trainings.css';

export default function Practices() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    duration: 60,
    type: 'General',
    description: '',
    notes: '',
    video: null,
  });

  const userRole = JSON.parse(localStorage.getItem('user') || '{}').role;
  const canEdit = ['ADMIN', 'EDITOR'].includes(userRole);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const result = await getTrainingSessions();
      setSessions(result.data || []);
    } catch (error) {
      console.error('Error loading trainings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        date: new Date(formData.date).toISOString(),
      };

      if (selectedSession) {
        await updateTrainingSession(selectedSession.id, payload);
      } else {
        await createTrainingSession(payload);
      }

      resetForm();
      loadSessions();
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving training session');
    }
  };

  const handleDelete = async () => {
    if (!selectedSession || !window.confirm('Delete this training?')) return;
    try {
      await deleteTrainingSession(selectedSession.id);
      resetForm();
      loadSessions();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (session) => {
    setSelectedSession(session);
    setFormData({
      title: session.title,
      date: new Date(session.date).toISOString().split('T')[0],
      duration: session.duration,
      type: session.type,
      description: session.description || '',
      notes: session.notes || '',
      video: null,
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setSelectedSession(null);
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      duration: 60,
      type: 'General',
      description: '',
      notes: '',
      video: null,
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="page-container">
      <div className="trainings-header">
        <h1>🏋️ Practices</h1>
        {canEdit && (
          <button className="btn-add-training" onClick={() => { setSelectedSession(null); setIsModalOpen(true); }}>
            <Plus size={20} /> New Practice
          </button>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>⏳ Loading...</div>
      ) : sessions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#cbd5e1' }}>
          📹 No trainings yet. {canEdit && 'Create one to get started!'}
        </div>
      ) : (
        <div className="trainings-grid">
          {sessions.map(session => (
            <div key={session.id} className="training-card">
              <div className="training-header">
                <h3>{session.title}</h3>
                {canEdit && (
                  <div className="training-actions">
                    <button onClick={() => handleEdit(session)} className="action-btn edit">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => { setSelectedSession(session); handleDelete(); }} className="action-btn delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>

              <div className="training-info">
                <div className="info-item">
                  <span className="label">📅 Date</span>
                  <span className="value">{formatDate(session.date)}</span>
                </div>
                <div className="info-item">
                  <span className="label">⏱️ Duration</span>
                  <span className="value">{session.duration} min</span>
                </div>
                <div className="info-item">
                  <span className="label">🏷️ Type</span>
                  <span className="value">{session.type}</span>
                </div>
              </div>

              {session.description && (
                <div className="training-description">
                  <p>{session.description}</p>
                </div>
              )}

              {session.fileUrl && (
                <div className="training-video">
                  <a href={`${session.fileUrl}`} target="_blank" rel="noopener noreferrer" className="video-link">
                    <Play size={20} /> Watch Video
                  </a>
                </div>
              )}

              {session.notes && (
                <div className="training-notes">
                  <small>📝 {session.notes}</small>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {isModalOpen && canEdit && (
        <div className="modal-overlay" onClick={() => resetForm()}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedSession ? 'Edit Training' : 'New Training'}</h2>
              <button className="modal-close" onClick={() => resetForm()}><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="training-form">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Training session title"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Duration (min)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    min="10"
                    max="300"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Type</label>
                <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                  <option>General</option>
                  <option>Offensive</option>
                  <option>Defensive</option>
                  <option>Conditioning</option>
                  <option>Tactical</option>
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Training description..."
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>📹 Video Upload</label>
                <div className="video-upload" onClick={() => document.querySelector('input[type="file"]')?.click()}>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={e => setFormData({ ...formData, video: e.target.files[0] })}
                    className="file-input"
                  />
                  <span className="upload-hint">
                    {formData.video ? formData.video.name : 'Choose a video file (MP4, MOV, AVI, WebM)'}
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes..."
                  rows={2}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-save">💾 {selectedSession ? 'Update' : 'Create'}</button>
                {selectedSession && <button type="button" className="btn-delete" onClick={handleDelete}>🗑️ Delete</button>}
                <button type="button" className="btn-cancel" onClick={() => resetForm()}>✕ Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
