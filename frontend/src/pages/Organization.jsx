import React from 'react';

const theme = {
  bg: { primary: '#0f172a', secondary: '#1e293b', tertiary: '#334155' },
  text: { primary: '#f1f5f9', secondary: '#cbd5e1' },
  accent: '#3b82f6',
  border: '#1e293b',
};

export default function Organization() {
  return (
    <div style={{ color: theme.text.primary }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>🏢 Organizzazione</h1>
      <div style={{ backgroundColor: theme.bg.secondary, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '24px' }}>
        <p>Modulo Organizzazione - In sviluppo</p>
      </div>
    </div>
  );
}
