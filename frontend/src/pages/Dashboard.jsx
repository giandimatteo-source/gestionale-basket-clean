import React from 'react';

export default function Dashboard() {
  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem', margin: '0 0 2rem 0', background: 'linear-gradient(135deg, #00D9FF, #FF6B35)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        Dashboard
      </h1>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Next Game */}
        <div style={{ background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8), rgba(45, 53, 97, 0.6))', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 217, 255, 0.1)', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)', transition: 'all 300ms ease-in-out', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '0.5rem', background: 'linear-gradient(135deg, #7FFF00, #7FFF00)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '700', color: '#000', boxShadow: '0 0 20px rgba(127, 255, 0, 0.3)' }}>📅</div>
            <h3 style={{ margin: 0, fontSize: '0.875rem', color: '#cbd5e1', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Next Game</h3>
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: '700', background: 'linear-gradient(135deg, #00D9FF, #FF6B35)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem', lineHeight: '1' }}>20/07</div>
          <div style={{ fontSize: '0.875rem', color: '#7FFF00', fontWeight: '600' }}>In 5 days</div>
        </div>

        {/* Recent Files */}
        <div style={{ background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8), rgba(45, 53, 97, 0.6))', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 217, 255, 0.1)', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)', transition: 'all 300ms ease-in-out', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '0.5rem', background: 'linear-gradient(135deg, #FF6B35, #FF8C42)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '700', color: '#000', boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)' }}>📂</div>
            <h3 style={{ margin: 0, fontSize: '0.875rem', color: '#cbd5e1', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recent Files</h3>
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: '700', background: 'linear-gradient(135deg, #FF6B35, #FF8C42)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem', lineHeight: '1' }}>12</div>
          <div style={{ fontSize: '0.875rem', color: '#7FFF00', fontWeight: '600' }}>Uploaded this week</div>
        </div>
      </div>

      {/* Info Banner */}
      <div style={{ background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(127, 255, 0, 0.05))', border: '1px solid rgba(0, 217, 255, 0.2)', borderRadius: '0.75rem', padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 0.5rem 0', color: '#00D9FF', fontSize: '1.5rem' }}>🏀 Welcome to GEAS Basket</h2>
        <p style={{ margin: 0, color: '#cbd5e1' }}>Select a section from the menu to start managing your team.</p>
      </div>
    </div>
  );
}
