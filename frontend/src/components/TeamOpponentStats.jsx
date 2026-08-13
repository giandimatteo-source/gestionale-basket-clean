import React, { useState } from 'react';

const theme = {
  bg: { primary: '#0f172a', secondary: '#1e293b', tertiary: '#334155' },
  text: { primary: '#f1f5f9', secondary: '#cbd5e1' },
  accent: '#3b82f6',
  border: '#1e293b',
};

export default function TeamOpponentStats() {
  const [stats] = useState([
    { category: 'SCORING', nostro: '68.5 PPG', avversari: '62.3 PPG', media: '65.4 PPG' },
    { category: 'FG%', nostro: '47.2%', avversari: '44.1%', media: '45.7%' },
    { category: '3P%', nostro: '36.5%', avversari: '32.1%', media: '34.3%' },
    { category: 'FT%', nostro: '75.2%', avversari: '71.8%', media: '73.5%' },
    { category: 'OFFENSIVE REBOUNDS', nostro: '10.2', avversari: '8.5', media: '9.3' },
    { category: 'DEFENSIVE REBOUNDS', nostro: '27.3', avversari: '25.1', media: '26.2' },
    { category: 'TOTAL REBOUNDS', nostro: '37.5', avversari: '33.6', media: '35.5' },
    { category: 'ASSISTS', nostro: '16.8', avversari: '14.2', media: '15.5' },
    { category: 'TURNOVERS', nostro: '12.1', avversari: '13.5', media: '12.8' },
    { category: 'STEALS', nostro: '7.2', avversari: '5.8', media: '6.5' },
    { category: 'BLOCKS', nostro: '3.1', avversari: '2.9', media: '3.0' },
    { category: 'FOULS', nostro: '16.2', avversari: '17.1', media: '16.6' },
  ]);

  const getBgColor = (nostro, avversari) => {
    const isNumeric = nostro.includes('.') || nostro.match(/\d+/);
    if (!isNumeric) return 'transparent';

    const n = parseFloat(nostro);
    const a = parseFloat(avversari);

    if (nostro.includes('%') || avversari.includes('%')) {
      return n > a ? '#10b981' : '#ef4444';
    } else if (nostro.includes('PPG') || nostro.includes('Rebounds') || nostro.includes('Assists')) {
      return n > a ? '#10b981' : '#ef4444';
    } else {
      return n < a ? '#10b981' : '#ef4444';
    }
  };

  return (
    <div style={{ color: theme.text.primary }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>📊 Team & Opponent Stats Comparison</h2>

      <div style={{ backgroundColor: theme.bg.secondary, border: `1px solid ${theme.border}`, borderRadius: '8px', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: theme.bg.tertiary }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: `1px solid ${theme.border}` }}>CATEGORIA</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: `1px solid ${theme.border}` }}>NOSTRO TEAM</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: `1px solid ${theme.border}` }}>AVVERSARI</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: `1px solid ${theme.border}` }}>MEDIA LEGA</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: `1px solid ${theme.border}` }}>DIFFERENZA</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat, idx) => {
              const n = parseFloat(stat.nostro);
              const a = parseFloat(stat.avversari);
              const diff = (n - a).toFixed(1);
              const bgColor = getBgColor(stat.nostro, stat.avversari);

              return (
                <tr key={idx} style={{ borderBottom: `1px solid ${theme.border}` }}>
                  <td style={{ padding: '12px', fontWeight: '500' }}>{stat.category}</td>
                  <td style={{
                    padding: '12px',
                    textAlign: 'center',
                    backgroundColor: bgColor,
                    opacity: bgColor === 'transparent' ? 1 : 0.15,
                    fontWeight: '600',
                    color: theme.text.primary
                  }}>
                    {stat.nostro}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', color: theme.text.secondary }}>{stat.avversari}</td>
                  <td style={{ padding: '12px', textAlign: 'center', color: theme.text.secondary, fontSize: '12px' }}>{stat.media}</td>
                  <td style={{
                    padding: '12px',
                    textAlign: 'center',
                    color: diff > 0 ? '#10b981' : '#ef4444',
                    fontWeight: '600'
                  }}>
                    {diff > 0 ? '+' : ''}{diff}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '24px', padding: '16px', backgroundColor: theme.bg.secondary, border: `1px solid ${theme.border}`, borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>📈 Analisi Chiave</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: theme.text.secondary }}>
          <li>✅ Superiori nel tiro (FG% +3.1%, 3P% +4.4%)</li>
          <li>✅ Vantaggio nei rimbalzi offensivi (+1.7)</li>
          <li>✅ Miglior efficienza assist (16.8 vs 14.2)</li>
          <li>⚠️ Più turnover rispetto alla media (-0.7)</li>
          <li>✅ Difesa efficace: +1.4 steals sulla media</li>
        </ul>
      </div>
    </div>
  );
}
