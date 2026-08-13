import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const theme = {
  bg: { primary: '#0f172a', secondary: '#1e293b', tertiary: '#334155' },
  text: { primary: '#f1f5f9', secondary: '#cbd5e1' },
  accent: '#3b82f6',
  border: '#1e293b',
};

export default function HustleStats() {
  const [players] = useState([
    { name: 'Eva Lisec', deflections: 8, steals: 2, blocks: 1, loose_balls: 3, charges_drawn: 1 },
    { name: 'Teja Oblak', deflections: 6, steals: 3, blocks: 0, loose_balls: 2, charges_drawn: 0 },
    { name: 'Tina Cvij', deflections: 4, steals: 1, blocks: 0, loose_balls: 1, charges_drawn: 1 },
    { name: 'Andjela Milic', deflections: 7, steals: 1, blocks: 2, loose_balls: 2, charges_drawn: 0 },
    { name: 'Ivana Dojkic', deflections: 3, steals: 0, blocks: 0, loose_balls: 1, charges_drawn: 0 },
  ]);

  const trendData = [
    { game: 'Gara 1', avg_deflections: 5.2, avg_steals: 1.8, avg_blocks: 0.6 },
    { game: 'Gara 2', avg_deflections: 5.8, avg_steals: 2.1, avg_blocks: 0.8 },
    { game: 'Gara 3', avg_deflections: 6.2, avg_steals: 1.9, avg_blocks: 0.7 },
    { game: 'Gara 4', avg_deflections: 5.9, avg_steals: 2.2, avg_blocks: 0.9 },
  ];

  const totalHustle = players.reduce((acc, p) => ({
    deflections: acc.deflections + p.deflections,
    steals: acc.steals + p.steals,
    blocks: acc.blocks + p.blocks,
  }), { deflections: 0, steals: 0, blocks: 0 });

  return (
    <div style={{ color: theme.text.primary }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>💪 Hustle Stats - Effort Metrics</h2>

      {/* Totali Partita */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: theme.bg.secondary, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: theme.text.secondary, marginBottom: '8px' }}>DEFLECTIONS</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: theme.accent }}>{totalHustle.deflections}</div>
        </div>
        <div style={{ backgroundColor: theme.bg.secondary, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: theme.text.secondary, marginBottom: '8px' }}>STEALS</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>{totalHustle.steals}</div>
        </div>
        <div style={{ backgroundColor: theme.bg.secondary, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: theme.text.secondary, marginBottom: '8px' }}>BLOCKS</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>{totalHustle.blocks}</div>
        </div>
      </div>

      {/* Tabella Giocatrici */}
      <div style={{ backgroundColor: theme.bg.secondary, border: `1px solid ${theme.border}`, borderRadius: '8px', overflow: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: theme.bg.tertiary }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: `1px solid ${theme.border}` }}>GIOCATRICE</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: `1px solid ${theme.border}` }}>DEFLECTIONS</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: `1px solid ${theme.border}` }}>STEALS</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: `1px solid ${theme.border}` }}>BLOCKS</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: `1px solid ${theme.border}` }}>LOOSE BALLS</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: `1px solid ${theme.border}` }}>CHARGES</th>
            </tr>
          </thead>
          <tbody>
            {players.map((p, idx) => (
              <tr key={idx} style={{ borderBottom: `1px solid ${theme.border}` }}>
                <td style={{ padding: '12px', fontWeight: '500' }}>{p.name}</td>
                <td style={{ padding: '12px', textAlign: 'center', color: theme.accent, fontWeight: '600' }}>{p.deflections}</td>
                <td style={{ padding: '12px', textAlign: 'center', color: '#10b981', fontWeight: '600' }}>{p.steals}</td>
                <td style={{ padding: '12px', textAlign: 'center', color: '#f59e0b', fontWeight: '600' }}>{p.blocks}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{p.loose_balls}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{p.charges_drawn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Trend Analysis */}
      <div style={{ backgroundColor: theme.bg.secondary, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>📈 Trend Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
            <XAxis dataKey="game" stroke={theme.text.secondary} />
            <YAxis stroke={theme.text.secondary} />
            <Tooltip contentStyle={{ backgroundColor: theme.bg.tertiary, border: `1px solid ${theme.border}` }} />
            <Legend />
            <Line type="monotone" dataKey="avg_deflections" stroke={theme.accent} name="Deflections" />
            <Line type="monotone" dataKey="avg_steals" stroke="#10b981" name="Steals" />
            <Line type="monotone" dataKey="avg_blocks" stroke="#f59e0b" name="Blocks" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
