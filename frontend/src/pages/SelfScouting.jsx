import React, { useState } from 'react';
import ShootingDashboard from '../components/ShootingDashboard';
import PostGameStats from '../components/PostGameStats';
import HustleStats from '../components/HustleStats';
import OffensiveBreakdown from '../components/OffensiveBreakdown';
import TeamOpponentStats from '../components/TeamOpponentStats';

const theme = {
  bg: { primary: '#0f172a', secondary: '#1e293b', tertiary: '#334155' },
  text: { primary: '#f1f5f9', secondary: '#cbd5e1' },
  accent: '#3b82f6',
  border: '#1e293b',
};

export default function SelfScouting() {
  const [activeTab, setActiveTab] = useState('shooting');

  const tabs = [
    { id: 'shooting', label: '🎯 Shooting', component: ShootingDashboard },
    { id: 'postgame', label: '📊 Post-Game Stats', component: PostGameStats },
    { id: 'hustle', label: '💪 Hustle Stats', component: HustleStats },
    { id: 'offensive', label: '🎯 Offensive Breakdown', component: OffensiveBreakdown },
    { id: 'team', label: '📈 Team Stats', component: TeamOpponentStats },
  ];

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component;

  return (
    <div style={{ color: theme.text.primary }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 24px 0' }}>Self-Scouting Analysis</h1>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
        borderBottom: `1px solid ${theme.border}`,
        overflowX: 'auto',
        paddingBottom: '12px',
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === tab.id ? theme.accent : 'transparent',
              color: activeTab === tab.id ? '#fff' : theme.text.secondary,
              border: activeTab === tab.id ? `2px solid ${theme.accent}` : `1px solid ${theme.border}`,
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.backgroundColor = theme.bg.tertiary;
                e.target.style.color = theme.text.primary;
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = theme.text.secondary;
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{
        animation: 'fadeIn 0.3s ease',
        '@keyframes fadeIn': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}>
        {ActiveComponent && <ActiveComponent />}
      </div>

      {/* Analytics Summary */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: theme.bg.secondary,
        border: `1px solid ${theme.border}`,
        borderRadius: '8px',
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>📊 Riepilogo Partita</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', color: theme.text.secondary, marginBottom: '4px' }}>OPPONENT</div>
            <div style={{ fontSize: '16px', fontWeight: '600' }}>TORTONA</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: theme.text.secondary, marginBottom: '4px' }}>DATA</div>
            <div style={{ fontSize: '16px', fontWeight: '600' }}>18/07/2024</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: theme.text.secondary, marginBottom: '4px' }}>RISULTATO</div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#10b981' }}>WIN 68-62</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: theme.text.secondary, marginBottom: '4px' }}>TIPO</div>
            <div style={{ fontSize: '16px', fontWeight: '600' }}>Friendly</div>
          </div>
        </div>
      </div>
    </div>
  );
}
