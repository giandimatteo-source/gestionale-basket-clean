import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const theme = {
  bg: { primary: '#0f172a', secondary: '#1e293b', tertiary: '#334155' },
  text: { primary: '#f1f5f9', secondary: '#cbd5e1' },
  accent: '#3b82f6',
  border: '#1e293b',
};

export default function OffensiveBreakdown() {
  const [offensiveData] = useState([
    { action: 'FASTBREAK', plays: 12, points: 18, fgm: 9, fga: 12, ppp: 1.50, assists: 8 },
    { action: 'HALF COURT', plays: 28, points: 32, fgm: 14, fga: 28, ppp: 1.14, assists: 7 },
    { action: 'EARLY OFFENSE', plays: 15, points: 19, fgm: 8, fga: 15, ppp: 1.27, assists: 4 },
    { action: 'ISOS', plays: 10, points: 12, fgm: 5, fga: 10, ppp: 1.20, assists: 1 },
    { action: 'PICK & ROLL', plays: 18, points: 24, fgm: 11, fga: 18, ppp: 1.33, assists: 6 },
    { action: 'POST TOUCHES', plays: 12, points: 15, fgm: 7, fga: 12, ppp: 1.25, assists: 2 },
  ]);

  const totalStats = offensiveData.reduce((acc, action) => ({
    plays: acc.plays + action.plays,
    points: acc.points + action.points,
    fgm: acc.fgm + action.fgm,
    fga: acc.fga + action.fga,
    assists: acc.assists + action.assists,
  }), { plays: 0, points: 0, fgm: 0, fga: 0, assists: 0 });

  const calculateFG = () => ((totalStats.fgm / totalStats.fga) * 100).toFixed(1);
  const calculatePPP = () => (totalStats.points / totalStats.plays).toFixed(2);

  return (
    <div style={{ color: theme.text.primary }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>🎯 Offensive Breakdown - 6 Azioni</h2>

      {/* Statistiche Generali */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: theme.bg.secondary, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: theme.text.secondary, marginBottom: '8px' }}>TOTAL PLAYS</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: theme.accent }}>{totalStats.plays}</div>
        </div>
        <div style={{ backgroundColor: theme.bg.secondary, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: theme.text.secondary, marginBottom: '8px' }}>TOTAL POINTS</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>{totalStats.points}</div>
        </div>
        <div style={{ backgroundColor: theme.bg.secondary, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: theme.text.secondary, marginBottom: '8px' }}>FG%</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>
            {calculateFG()}% ({totalStats.fgm}/{totalStats.fga})
          </div>
        </div>
        <div style={{ backgroundColor: theme.bg.secondary, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: theme.text.secondary, marginBottom: '8px' }}>PPP</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#8b5cf6' }}>{calculatePPP()}</div>
        </div>
      </div>

      {/* Tabella Azioni */}
      <div style={{ backgroundColor: theme.bg.secondary, border: `1px solid ${theme.border}`, borderRadius: '8px', overflow: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: theme.bg.tertiary }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: `1px solid ${theme.border}` }}>AZIONE</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: `1px solid ${theme.border}` }}>PLAYS</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: `1px solid ${theme.border}` }}>POINTS</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: `1px solid ${theme.border}` }}>FG</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: `1px solid ${theme.border}` }}>PPP</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: `1px solid ${theme.border}` }}>AST</th>
            </tr>
          </thead>
          <tbody>
            {offensiveData.map((action, idx) => {
              const fg = ((action.fgm / action.fga) * 100).toFixed(0);
              return (
                <tr key={idx} style={{ borderBottom: `1px solid ${theme.border}` }}>
                  <td style={{ padding: '12px', fontWeight: '500' }}>{action.action}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{action.plays}</td>
                  <td style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#10b981' }}>{action.points}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{action.fgm}/{action.fga} ({fg}%)</td>
                  <td style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: theme.accent }}>{action.ppp.toFixed(2)}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{action.assists}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <div style={{ backgroundColor: theme.bg.secondary, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>Efficienza per Azione</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={offensiveData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
            <XAxis dataKey="action" stroke={theme.text.secondary} />
            <YAxis stroke={theme.text.secondary} />
            <Tooltip contentStyle={{ backgroundColor: theme.bg.tertiary, border: `1px solid ${theme.border}` }} />
            <Legend />
            <Bar dataKey="ppp" name="PPP" fill={theme.accent} />
            <Bar dataKey="points" name="Points" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
