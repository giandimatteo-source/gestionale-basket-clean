import React, { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

const theme = {
  bg: { primary: '#0f172a', secondary: '#1e293b', tertiary: '#334155' },
  text: { primary: '#f1f5f9', secondary: '#cbd5e1' },
  accent: '#3b82f6',
  border: '#1e293b',
};

export default function GameCard() {
  const [gameState, setGameState] = useState({
    opponent: 'Avversari',
    date: new Date().toISOString().split('T')[0],
    quarter: 1,
    timeRemaining: '10:00',
    score: { our: 0, their: 0 },
    active: false,
  });

  const [players, setPlayers] = useState([
    { id: 1, name: 'Giocatrice 1', points: 0, rebounds: 0, assists: 0, fouls: 0, turnovers: 0, onCourt: true },
    { id: 2, name: 'Giocatrice 2', points: 0, rebounds: 0, assists: 0, fouls: 0, turnovers: 0, onCourt: true },
    { id: 3, name: 'Giocatrice 3', points: 0, rebounds: 0, assists: 0, fouls: 0, turnovers: 0, onCourt: true },
    { id: 4, name: 'Giocatrice 4', points: 0, rebounds: 0, assists: 0, fouls: 0, turnovers: 0, onCourt: true },
    { id: 5, name: 'Giocatrice 5', points: 0, rebounds: 0, assists: 0, fouls: 0, turnovers: 0, onCourt: true },
    { id: 6, name: 'Giocatrice 6', points: 0, rebounds: 0, assists: 0, fouls: 0, turnovers: 0, onCourt: false },
  ]);

  const [actionLog, setActionLog] = useState([]);

  const updatePlayerStat = (playerId, stat, value) => {
    setPlayers(players.map(p =>
      p.id === playerId ? { ...p, [stat]: p[stat] + value } : p
    ));

    const player = players.find(p => p.id === playerId);
    const action = `${player?.name} +${stat}: ${value}`;
    setActionLog([{ time: new Date().toLocaleTimeString(), action }, ...actionLog.slice(0, 19)]);
  };

  const togglePlayerOnCourt = (playerId) => {
    setPlayers(players.map(p =>
      p.id === playerId ? { ...p, onCourt: !p.onCourt } : p
    ));
  };

  const updateScore = (team, points) => {
    setGameState({
      ...gameState,
      score: {
        ...gameState.score,
        [team]: Math.max(0, gameState.score[team] + points)
      }
    });
  };

  const updateQuarter = (increment) => {
    const newQuarter = Math.max(1, Math.min(4, gameState.quarter + increment));
    setGameState({ ...gameState, quarter: newQuarter });
  };

  const resetGame = () => {
    if (confirm('Resettare la partita?')) {
      setGameState({
        opponent: 'Avversari',
        date: new Date().toISOString().split('T')[0],
        quarter: 1,
        timeRemaining: '10:00',
        score: { our: 0, their: 0 },
        active: false,
      });
      setPlayers(players.map(p => ({ ...p, points: 0, rebounds: 0, assists: 0, fouls: 0, turnovers: 0 })));
      setActionLog([]);
    }
  };

  return (
    <div style={{ color: theme.text.primary }}>
      {/* Game Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '16px',
        marginBottom: '24px',
        padding: '16px',
        backgroundColor: theme.bg.secondary,
        borderRadius: '8px',
      }}>
        <div>
          <label style={{ fontSize: '12px', color: theme.text.secondary }}>Avversari</label>
          <input
            type="text"
            value={gameState.opponent}
            onChange={(e) => setGameState({ ...gameState, opponent: e.target.value })}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: theme.bg.primary,
              color: theme.text.primary,
              border: `1px solid ${theme.border}`,
              borderRadius: '4px',
              marginTop: '4px',
            }}
          />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: theme.text.secondary }}>Data</label>
          <input
            type="date"
            value={gameState.date}
            onChange={(e) => setGameState({ ...gameState, date: e.target.value })}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: theme.bg.primary,
              color: theme.text.primary,
              border: `1px solid ${theme.border}`,
              borderRadius: '4px',
              marginTop: '4px',
            }}
          />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: theme.text.secondary }}>Tempo Rimanente</label>
          <input
            type="text"
            value={gameState.timeRemaining}
            onChange={(e) => setGameState({ ...gameState, timeRemaining: e.target.value })}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: theme.bg.primary,
              color: theme.text.primary,
              border: `1px solid ${theme.border}`,
              borderRadius: '4px',
              marginTop: '4px',
            }}
          />
        </div>
      </div>

      {/* Scoreboard */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '16px',
        marginBottom: '24px',
      }}>
        {/* Our Score */}
        <div style={{
          backgroundColor: theme.bg.secondary,
          border: `2px solid ${theme.accent}`,
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '14px', color: theme.text.secondary, marginBottom: '12px' }}>Nostro Team</div>
          <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>{gameState.score.our}</div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <button
              onClick={() => updateScore('our', 3)}
              style={{
                padding: '8px 12px',
                backgroundColor: theme.accent,
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              +3
            </button>
            <button
              onClick={() => updateScore('our', 2)}
              style={{
                padding: '8px 12px',
                backgroundColor: theme.accent,
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              +2
            </button>
            <button
              onClick={() => updateScore('our', 1)}
              style={{
                padding: '8px 12px',
                backgroundColor: theme.accent,
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              +1
            </button>
          </div>
        </div>

        {/* Quarter */}
        <div style={{
          backgroundColor: theme.bg.secondary,
          border: `1px solid ${theme.border}`,
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '14px', color: theme.text.secondary, marginBottom: '12px' }}>Quarto Tempo</div>
          <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>{gameState.quarter}</div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <button
              onClick={() => updateQuarter(-1)}
              style={{
                padding: '8px 12px',
                backgroundColor: theme.bg.tertiary,
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              ←
            </button>
            <button
              onClick={() => updateQuarter(1)}
              style={{
                padding: '8px 12px',
                backgroundColor: theme.bg.tertiary,
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              →
            </button>
          </div>
        </div>

        {/* Their Score */}
        <div style={{
          backgroundColor: theme.bg.secondary,
          border: `1px solid ${theme.border}`,
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '14px', color: theme.text.secondary, marginBottom: '12px' }}>Avversari</div>
          <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>{gameState.score.their}</div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <button
              onClick={() => updateScore('their', 3)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#6b7280',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              +3
            </button>
            <button
              onClick={() => updateScore('their', 2)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#6b7280',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              +2
            </button>
            <button
              onClick={() => updateScore('their', 1)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#6b7280',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              +1
            </button>
          </div>
        </div>
      </div>

      {/* Players Stats */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', margin: '0 0 16px 0' }}>
          📊 Statistiche Giocatrici
        </h2>
        <div style={{
          display: 'grid',
          gap: '8px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        }}>
          {players.map(player => (
            <div
              key={player.id}
              style={{
                backgroundColor: player.onCourt ? theme.bg.secondary : theme.bg.tertiary,
                border: player.onCourt ? `2px solid ${theme.accent}` : `1px solid ${theme.border}`,
                borderRadius: '8px',
                padding: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: '600' }}>{player.name}</span>
                <button
                  onClick={() => togglePlayerOnCourt(player.id)}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: player.onCourt ? theme.accent : theme.bg.tertiary,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  {player.onCourt ? 'In Campo' : 'Fuori'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                {/* Points */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: theme.text.secondary }}>Punti</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{player.points}</div>
                  <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                    <button
                      onClick={() => updatePlayerStat(player.id, 'points', 1)}
                      style={{
                        padding: '2px 6px',
                        backgroundColor: theme.accent,
                        color: '#fff',
                        border: 'none',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        fontSize: '11px',
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => updatePlayerStat(player.id, 'points', -1)}
                      style={{
                        padding: '2px 6px',
                        backgroundColor: '#6b7280',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        fontSize: '11px',
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>

                {/* Rebounds */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: theme.text.secondary }}>Rimb</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{player.rebounds}</div>
                  <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                    <button
                      onClick={() => updatePlayerStat(player.id, 'rebounds', 1)}
                      style={{
                        padding: '2px 6px',
                        backgroundColor: theme.accent,
                        color: '#fff',
                        border: 'none',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        fontSize: '11px',
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => updatePlayerStat(player.id, 'rebounds', -1)}
                      style={{
                        padding: '2px 6px',
                        backgroundColor: '#6b7280',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        fontSize: '11px',
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>

                {/* Assists */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: theme.text.secondary }}>Assist</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{player.assists}</div>
                  <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                    <button
                      onClick={() => updatePlayerStat(player.id, 'assists', 1)}
                      style={{
                        padding: '2px 6px',
                        backgroundColor: theme.accent,
                        color: '#fff',
                        border: 'none',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        fontSize: '11px',
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => updatePlayerStat(player.id, 'assists', -1)}
                      style={{
                        padding: '2px 6px',
                        backgroundColor: '#6b7280',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        fontSize: '11px',
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>

                {/* Fouls */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: theme.text.secondary }}>Falli</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{player.fouls}</div>
                  <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                    <button
                      onClick={() => updatePlayerStat(player.id, 'fouls', 1)}
                      style={{
                        padding: '2px 6px',
                        backgroundColor: theme.accent,
                        color: '#fff',
                        border: 'none',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        fontSize: '11px',
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => updatePlayerStat(player.id, 'fouls', -1)}
                      style={{
                        padding: '2px 6px',
                        backgroundColor: '#6b7280',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        fontSize: '11px',
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>

                {/* Turnovers */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: theme.text.secondary }}>Perse</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{player.turnovers}</div>
                  <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                    <button
                      onClick={() => updatePlayerStat(player.id, 'turnovers', 1)}
                      style={{
                        padding: '2px 6px',
                        backgroundColor: theme.accent,
                        color: '#fff',
                        border: 'none',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        fontSize: '11px',
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => updatePlayerStat(player.id, 'turnovers', -1)}
                      style={{
                        padding: '2px 6px',
                        backgroundColor: '#6b7280',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        fontSize: '11px',
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Log */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 16px 0' }}>📝 Log Azioni</h2>
          <div style={{
            backgroundColor: theme.bg.secondary,
            border: `1px solid ${theme.border}`,
            borderRadius: '8px',
            padding: '16px',
            maxHeight: '400px',
            overflowY: 'auto',
          }}>
            {actionLog.length === 0 ? (
              <div style={{ color: theme.text.secondary, textAlign: 'center', padding: '20px' }}>
                Nessuna azione registrata
              </div>
            ) : (
              actionLog.map((entry, idx) => (
                <div key={idx} style={{
                  padding: '8px',
                  borderBottom: idx < actionLog.length - 1 ? `1px solid ${theme.border}` : 'none',
                  fontSize: '14px',
                }}>
                  <div style={{ color: theme.text.secondary, fontSize: '12px' }}>{entry.time}</div>
                  <div>{entry.action}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Controls */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 16px 0' }}>🎮 Controlli</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={resetGame}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                backgroundColor: '#ef4444',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              <RotateCcw size={18} /> Resetta Partita
            </button>
          </div>

          <div style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: theme.bg.secondary,
            borderRadius: '8px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '12px', color: theme.text.secondary, marginBottom: '12px' }}>Punteggio Finale</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '12px' }}>
              {gameState.score.our} - {gameState.score.their}
            </div>
            <div style={{ fontSize: '14px', color: theme.text.secondary }}>
              {gameState.score.our > gameState.score.their ? '✅ Vittoria' : gameState.score.our < gameState.score.their ? '❌ Sconfitta' : '⚖️ Pareggio'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
