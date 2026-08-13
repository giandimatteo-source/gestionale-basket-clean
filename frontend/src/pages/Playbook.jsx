import React, { useState, useEffect } from 'react';
import { Plus, X, Trash2, Edit, Download, Tag, Video, FileText } from 'lucide-react';
import { getPlaybooks, getAllTags, createPlaybook, updatePlaybook, deletePlaybook } from '../services/playbookService.js';
import '../styles/Playbook.css';

export default function PlaybookPage() {
  const [playbooks, setPlaybooks] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Offensive');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaybook, setSelectedPlaybook] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    side: 'Offensive',
    tags: [],
    notes: '',
    file: null,
  });
  const [tagInput, setTagInput] = useState('');

  const userRole = JSON.parse(localStorage.getItem('user') || '{}').role;
  const canEdit = ['ADMIN', 'EDITOR'].includes(userRole);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [playbooksRes, tagsRes] = await Promise.all([
        getPlaybooks(),
        getAllTags(),
      ]);
      setPlaybooks(playbooksRes.data || []);
      setAllTags(tagsRes.data || []);
    } catch (error) {
      console.error('Error loading:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedPlaybook) {
        await updatePlaybook(selectedPlaybook.id, formData);
      } else {
        await createPlaybook(formData);
      }
      resetForm();
      loadData();
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving playbook');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this playbook?')) return;
    try {
      await deletePlaybook(id);
      loadData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (playbook) => {
    setSelectedPlaybook(playbook);
    setFormData({
      name: playbook.name,
      description: playbook.description || '',
      side: playbook.side,
      tags: playbook.tags ? JSON.parse(playbook.tags) : [],
      notes: playbook.notes || '',
      file: null,
    });
    setIsModalOpen(true);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag),
    });
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setSelectedPlaybook(null);
    setFormData({
      name: '',
      description: '',
      side: 'Offensive',
      tags: [],
      notes: '',
      file: null,
    });
  };

  const filteredPlaybooks = playbooks.filter(pb => {
    const sideMatch = pb.side === activeTab;
    const tagMatch = selectedTags.length === 0 || 
      selectedTags.some(tag => {
        const pbTags = pb.tags ? JSON.parse(pb.tags) : [];
        return pbTags.includes(tag);
      });
    return sideMatch && tagMatch;
  });

  return (
    <div className="page-container">
      <div className="playbook-header">
        <h1>📖 Playbook</h1>
        {canEdit && (
          <button className="btn-add-playbook" onClick={() => { setSelectedPlaybook(null); setFormData({...formData, side: activeTab}); setIsModalOpen(true); }}>
            <Plus size={20} /> Add Play
          </button>
        )}
      </div>

      <div className="playbook-tabs">
        <button
          className={`tab-btn ${activeTab === 'Offensive' ? 'active' : ''}`}
          onClick={() => setActiveTab('Offensive')}
        >
          🔴 Offensive
        </button>
        <button
          className={`tab-btn ${activeTab === 'Defensive' ? 'active' : ''}`}
          onClick={() => setActiveTab('Defensive')}
        >
          🔵 Defensive
        </button>
      </div>

      {allTags.length > 0 && (
        <div className="tag-filter">
          <div className="filter-label">Filter by tags:</div>
          <div className="tag-list">
            {allTags.map(tag => (
              <button
                key={tag}
                className={`tag-filter-btn ${selectedTags.includes(tag) ? 'active' : ''}`}
                onClick={() => {
                  setSelectedTags(prev =>
                    prev.includes(tag)
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  );
                }}
              >
                <Tag size={14} /> {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>⏳ Loading...</div>
      ) : filteredPlaybooks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#cbd5e1' }}>
          📋 No plays yet. {canEdit && 'Create one to get started!'}
        </div>
      ) : (
        <div className="playbook-grid">
          {filteredPlaybooks.map(playbook => (
            <div key={playbook.id} className="playbook-card">
              <div className="playbook-header-card">
                <h3>{playbook.name}</h3>
                {canEdit && (
                  <div className="playbook-actions">
                    <button onClick={() => handleEdit(playbook)} className="action-btn edit">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(playbook.id)} className="action-btn delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>

              {playbook.description && (
                <p className="playbook-description">{playbook.description}</p>
              )}

              <div className="playbook-file">
                <a href={`https://gestionale-basket-clean.onrender.com${playbook.fileUrl}`} target="_blank" rel="noopener noreferrer" className="file-link">
                  {playbook.fileType === 'Video' ? (
                    <>
                      <Video size={18} /> Watch Video
                    </>
                  ) : (
                    <>
                      <FileText size={18} /> Download PDF
                    </>
                  )}
                </a>
              </div>

              {formData.tags && formData.tags.length > 0 && (
                <div className="playbook-tags">
                  {JSON.parse(playbook.tags || '[]').map(tag => (
                    <span key={tag} className="tag-badge">{tag}</span>
                  ))}
                </div>
              )}

              {playbook.notes && (
                <div className="playbook-notes">
                  <small>{playbook.notes}</small>
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
              <h2>{selectedPlaybook ? 'Edit Play' : 'New Play'}</h2>
              <button className="modal-close" onClick={() => resetForm()}><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="playbook-form">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Play title"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Play description..."
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>📹/📄 File Upload</label>
                <div className="file-upload" onClick={() => document.querySelector('input[type="file"]')?.click()}>
                  <input
                    type="file"
                    accept="application/pdf,video/*"
                    onChange={e => setFormData({ ...formData, file: e.target.files[0] })}
                    className="file-input"
                  />
                  <span className="upload-hint">
                    {formData.file ? formData.file.name : 'PDF or Video file'}
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label>Tags</label>
                <div className="tag-input-group">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="Add tag and press Enter"
                  />
                  <button type="button" onClick={handleAddTag} className="btn-add-tag">+</button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="tag-list-edit">
                    {formData.tags.map(tag => (
                      <span key={tag} className="tag-edit">
                        {tag}
                        <button type="button" onClick={() => handleRemoveTag(tag)} className="tag-remove">×</button>
                      </span>
                    ))}
                  </div>
                )}
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
                <button type="submit" className="btn-save">💾 {selectedPlaybook ? 'Update' : 'Create'}</button>
                <button type="button" className="btn-cancel" onClick={() => resetForm()}>✕ Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
