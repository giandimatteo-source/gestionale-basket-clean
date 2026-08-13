import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const theme = {
  bg: { primary: '#0f172a', secondary: '#1e293b', tertiary: '#334155' },
  text: { primary: '#f1f5f9', secondary: '#cbd5e1' },
  accent: '#3b82f6',
  border: '#1e293b',
};

export default function ShootingDashboard() {
  const [data] = useState({
    game: 'vs TORTONA (18/07/2024)',
    contexts: [
      { name: 'FASTBREAK', '24-20': { '2pm': 2, '2pa': 3, '3pm': 1, '3pa': 2 }, '19-15': { '2pm': 1, '2pa': 2, '3pm': 0, '3pa': 1 }, '14-10': { '2pm': 2, '2pa': 4, '3pm': 1, '3pa': 2 }, '9-5': { '2pm': 1, '2pa': 1, '3pm': 0, '3pa': 1 }, '4-0': { '2pm': 0, '2pa': 1, '3pm': 0, '3pa': 0 } },
      { name: 'SIDE 1-PASS', '24-20': { '2pm': 3, '2pa': 5, '3pm': 1, '3pa': 2 }, '19-15': { '2pm': 2, '2pa': 3, '3pm': 0, '3pa': 1 }, '14-10': { '2pm': 1, '2pa': 2, '3pm': 1, '3pa': 2 }, '9-5': { '2pm': 2, '2pa': 2, '3pm': 0, '3pa': 1 }, '4-0': { '2pm': 1, '2pa': 3, '3pm': 0, '3pa': 1 } },
      { name: 'SIDE 2+-PASS', '24-20': { '2pm': 1, '2pa': 2, '3pm': 1, '3pa': 3 }, '19-15': { '2pm': 0, '2pa': 1, '3pm': 0, '3pa': 2 }, '14-10': { '2pm': 3, '2pa': 4, '3pm': 1, '3pa': 2 }, '9-5': { '2pm': 1, '2pa': 2, '3pm': 0, '3pa': 1 }, '4-0': { '2pm': 0, '2pa': 2, '3pm': 0, '3pa': 1 } },
      { name: 'PAINT 1-PASS', '24-20': { '2pm': 2, '2pa': 2, '3pm': 0, '3pa': 0 }, '19-15': { '2pm': 3, '2pa': 4, '3pm': 0, '3pa': 0 }, '14-10': { '2pm': 2, '2pa': 3, '3pm': 0, '3pa': 0 }, '9-5': { '2pm': 1, '2pa': 1, '3pm': 0, '3pa': 0 }, '4-0': { '2pm': 0, '2pa': 1, '3pm': 0, '3pa': 0 } },
      { name: 'PAINT 2+-PASS', '24-20': { '2pm': 1, '2pa': 3, '3pm': 0, '3pa': 1 }, '19-15': { '2pm': 1, '2pa': 2, '3pm': 1, '3pa': 1 }, '14-10': { '2pm': 2, '2pa': 2, '3pm': 0, '3pa': 1 }, '9-5': { '2pm': 0, '2pa': 1, '3pm': 0, '3pa': 0 }, '4-0': { '2pm': 1, '2pa': 1, '3pm': 1, '3pa': 1 } },
      { name: 'NO PAINT', '24-20': { '2pm': 0, '2pa': 1, '3pm': 1, '3pa': 2 }, '19-15': { '2pm': 1, '2pa': 2, '3pm': 0, '3pa': 1 }, '14-10': { '2pm': 1, '2pa': 3, '3pm': 1, '3pa': 1 }, '9-5': { '2pm': 2, '2pa': 3, '3pm': 0, '3pa': 1 }, '4-0': { '2pm': 1, '2pa': 2, '3pm': 0, '3pa': 1 } },
    ],
  });

  const calculatePercentage = (made, attempted) => attempted === 0 ? '0%' : `${((made / attempted) * 100).toFixed(1)}%`;

  const calculateTotals = () => {
    let total2pm = 0, total2pa = 0, total3pm = 0, total3pa = 0;
    data.contexts.forEach(ctx => {
      Object.values(ctx).forEach(clock => {
        if (clock && typeof clock === 'object') {
          total2pm += clock['2pm'] || 0;
          total2pa += clock['2pa'] || 0;
          total3pm += clock['3pm'] || 0;
          total3pa += clock['3pa'] || 0;
        }
      });
    });
    return { total2pm, total2pa, total3pm, total3pa };
  };

  const totals = calculateTotals();

  return (
    <div style={{ color: theme.text.primary }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>🎯 Shooting Dashboard - {data.game}</h2>

      {/* Matrice Tiri */}
      <div style={{ backgroundColor: theme.bg.secondary, border: `1px solid ${theme.border}`, borderRadius: '8px', overflow: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: theme.bg.tertiary }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: `1px solid ${theme.border}` }}>CONTESTO</th>
              {['24-20"', '19-15"', '14-10"', '9-5"', '4-0"'].map(clock => (
                <th key={clock} style={{ padding: '12px', textAlign: 'center', borderBottom: `1px solid ${theme.border}`, minWidth: '100px' }}>
                  {clock}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.contexts.map((context, idx) => (
              <tr key={idx} style={{ borderBottom: `1px solid ${theme.border}` }}>
                <td style={{ padding: '12px', fontWeight: '500', backgroundColor: theme.bg.tertiary }}>{context.name}</td>
                {['24-20', '19-15', '14-10', '9-5', '4-0'].map(clock => {
                  const stats = context[clock];
                  const fg2p = calculatePercentage(stats['2pm'], stats['2pa']);
                  const fg3p = calculatePercentage(stats['3pm'], stats['3pa']);
                  return (
                    <td key={clock} style={{ padding: '12px', textAlign: 'center', fontSize: '13px' }}>
                      <div style={{ marginBottom: '6px', fontWeight: '600' }}>
                        2P: {stats['2pm']}/{stats['2pa']} ({fg2p})
                      </div>
                      <div style={{ color: theme.text.secondary }}>
                        3P: {stats['3pm']}/{stats['3pa']} ({fg3p})
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totali Partita */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: theme.bg.secondary, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: theme.text.secondary, marginBottom: '8px' }}>2-POINT</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: theme.accent }}>
            {totals.total2pm}/{totals.total2pa} ({calculatePercentage(totals.total2pm, totals.total2pa)})
          </div>
        </div>
        <div style={{ backgroundColor: theme.bg.secondary, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: theme.text.secondary, marginBottom: '8px' }}>3-POINT</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: theme.accent }}>
            {totals.total3pm}/{totals.total3pa} ({calculatePercentage(totals.total3pm, totals.total3pa)})
          </div>
        </div>
        <div style={{ backgroundColor: theme.bg.secondary, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: theme.text.secondary, marginBottom: '8px' }}>TOTAL FG%</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>
            {totals.total2pm + totals.total3pm}/{totals.total2pa + totals.total3pa} ({calculatePercentage(totals.total2pm + totals.total3pm, totals.total2pa + totals.total3pa)})
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ backgroundColor: theme.bg.secondary, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>Tendenza per Contesto</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.contexts}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
            <XAxis dataKey="name" stroke={theme.text.secondary} />
            <YAxis stroke={theme.text.secondary} />
            <Tooltip contentStyle={{ backgroundColor: theme.bg.tertiary, border: `1px solid ${theme.border}`, color: theme.text.primary }} />
            <Legend />
            <Bar dataKey="24-20.2pm" name="2PM (24-20)" fill="#3b82f6" />
            <Bar dataKey="24-20.3pm" name="3PM (24-20)" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
