import React, { useState } from 'react';

const theme = {
  bg: { primary: '#0f172a', secondary: '#1e293b', tertiary: '#334155' },
  text: { primary: '#f1f5f9', secondary: '#cbd5e1' },
  accent: '#3b82f6',
  border: '#1e293b',
};

export default function PostGameStats() {
  const [players] = useState([
    { id: 1, number: 1, name: 'Eva Lisec', mins: 28, pf: 2, pfd: 3, points: 15, '2pm': 5, '2pa': 8, '3pm': 2, '3pa': 4, ftm: 3, fta: 4, orb: 2, drb: 3, ast: 4, to: 2, blk: 1, st: 0, eff: 8 },
    { id: 2, number: 3, name: 'Teja Oblak', mins: 24, pf: 3, pfd: 2, points: 12, '2pm': 3, '2pa': 6, '3pm': 2, '3pa': 3, ftm: 0, fta: 0, orb: 1, drb: 2, ast: 2, to: 1, blk: 0, st: 1, eff: 5 },
    { id: 3, number: 5, name: 'Tina Cvij', mins: 20, pf: 2, pfd: 1, points: 8, '2pm': 3, '2pa': 5, '3pm': 1, '3pa': 2, ftm: 1, fta: 2, orb: 2, drb: 1, ast: 1, to: 0, blk: 0, st: 0, eff: 6 },
    { id: 4, number: 7, name: 'Andjela Milic', mins: 26, pf: 1, pfd: 2, points: 10, '2pm': 4, '2pa': 7, '3pm': 0, '3pa': 2, ftm: 2, fta: 3, orb: 1, drb: 4, ast: 3, to: 2, blk: 2, st: 1, eff: 7 },
    { id: 5, number: 9, name: 'Ivana Dojkic', mins: 22, pf: 0, pfd: 1, points: 6, '2pm': 2, '2pa': 4, '3pm': 1, '3pa': 3, ftm: 1, fta: 1, orb: 0, drb: 2, ast: 2, to: 1, blk: 0, st: 0, eff: 4 },
  ]);

  const calculatePercentage = (made, attempted) => attempted === 0 ? '0%' : `${((made / attempted) * 100).toFixed(1)}%`;

  const columns = [
    { key: 'number', label: '#', width: '40px' },
    { key: 'name', label: 'GIOCATRICE', width: '150px' },
    { key: 'mins', label: 'MIN', width: '50px' },
    { key: 'points', label: 'PTS', width: '50px' },
    { key: 'fg2p', label: '2P%', width: '60px', calc: (p) => `${p['2pm']}/${p['2pa']} ${calculatePercentage(p['2pm'], p['2pa'])}` },
    { key: 'fg3p', label: '3P%', width: '60px', calc: (p) => `${p['3pm']}/${p['3pa']} ${calculatePercentage(p['3pm'], p['3pa'])}` },
    { key: 'ftp', label: 'FT%', width: '60px', calc: (p) => `${p['ftm']}/${p['fta']} ${calculatePercentage(p['ftm'], p['fta'])}` },
    { key: 'reb', label: 'REB', width: '50px', calc: (p) => `${p['orb']}+${p['drb']}` },
    { key: 'ast', label: 'AST', width: '50px' },
    { key: 'to', label: 'TO', width: '50px' },
    { key: 'eff', label: 'EFF', width: '50px' },
  ];

  return (
    <div style={{ color: theme.text.primary }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>📊 Post-Game Stats - vs TORTONA (18/07/2024)</h2>

      <div style={{ backgroundColor: theme.bg.secondary, border: `1px solid ${theme.border}`, borderRadius: '8px', overflow: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
          <thead>
            <tr style={{ backgroundColor: theme.bg.tertiary }}>
              {columns.map(col => (
                <th
                  key={col.key}
                  style={{
                    padding: '12px',
                    textAlign: col.key === 'name' ? 'left' : 'center',
                    borderBottom: `1px solid ${theme.border}`,
                    width: col.width,
                    fontSize: '12px',
                    fontWeight: '600',
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {players.map((player, idx) => (
              <tr key={player.id} style={{ borderBottom: `1px solid ${theme.border}`, backgroundColor: idx % 2 === 0 ? theme.bg.primary : 'transparent' }}>
                {columns.map(col => (
                  <td
                    key={`${player.id}-${col.key}`}
                    style={{
                      padding: '12px',
                      textAlign: col.key === 'name' ? 'left' : 'center',
                      fontSize: '13px',
                      fontWeight: col.key === 'name' ? '500' : 'normal',
                    }}
                  >
                    {col.calc ? col.calc(player) : player[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button style={{
          padding: '10px 20px',
          backgroundColor: theme.accent,
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '500',
        }}>
          📥 Download Excel
        </button>
        <button style={{
          padding: '10px 20px',
          backgroundColor: theme.bg.tertiary,
          color: theme.text.primary,
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '500',
        }}>
          🖨️ Stampa
        </button>
      </div>
    </div>
  );
}
