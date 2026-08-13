import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, Download, Undo2 } from 'lucide-react';

const theme = {
  bg: { primary: '#0f172a', secondary: '#1e293b', tertiary: '#334155' },
  text: { primary: '#f1f5f9', secondary: '#cbd5e1' },
  accent: '#3b82f6',
  border: '#1e293b',
};

export default function PlaybookDrawingCanvas({ play, onSave }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('line');
  const [color, setColor] = useState('#3b82f6');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [opacity, setOpacity] = useState(100);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const [playName, setPlayName] = useState(play?.name || '');
  const [playDescription, setPlayDescription] = useState(play?.description || '');
  const [playCategory, setPlayCategory] = useState(play?.category || 'Offensive');

  const categories = ['Offensive', 'Defensive', 'Out of Bounds', 'ATO'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    // Draw court background
    ctx.fillStyle = '#1a472a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw court lines
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    // Center line
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    // Three-point line
    ctx.beginPath();
    ctx.arc(canvas.width / 4, canvas.height / 2, 150, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc((canvas.width * 3) / 4, canvas.height / 2, 150, 0, Math.PI * 2);
    ctx.stroke();

    // Key
    ctx.strokeRect(canvas.width / 4 - 40, canvas.height / 2 - 150, 80, 300);

    saveHistory();
  }, []);

  const saveHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(canvas.toDataURL());
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const undo = () => {
    if (historyStep > 0) {
      const newStep = historyStep - 1;
      setHistoryStep(newStep);
      const canvas = canvasRef.current;
      const img = new Image();
      img.src = history[newStep];
      img.onload = () => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
    }
  };

  const clearCanvas = () => {
    if (confirm('Eliminare tutto il disegno?')) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#1a472a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(canvas.width / 4, canvas.height / 2, 150, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc((canvas.width * 3) / 4, canvas.height / 2, 150, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeRect(canvas.width / 4 - 40, canvas.height / 2 - 150, 80, 300);

      saveHistory();
    }
  };

  const exportSVG = () => {
    const canvas = canvasRef.current;
    const imgData = canvas.toDataURL('image/png');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
      <image href="${imgData}" width="${canvas.width}" height="${canvas.height}"/>
    </svg>`;

    const link = document.createElement('a');
    link.href = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    link.download = `${playName || 'play'}.svg`;
    link.click();
  };

  const handleMouseDown = (e) => {
    if (!canvasRef.current) return;
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvasRef.current.getContext('2d');

    ctx.globalAlpha = opacity / 100;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const startX = x;
    const startY = y;

    const handleMouseMove = (moveEvent) => {
      const moveX = moveEvent.clientX - rect.left;
      const moveY = moveEvent.clientY - rect.top;

      // Redraw from history
      if (history[historyStep]) {
        const img = new Image();
        img.src = history[historyStep];
        img.onload = () => {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.drawImage(img, 0, 0);
          ctx.globalAlpha = opacity / 100;
          ctx.strokeStyle = color;
          ctx.fillStyle = color;
          ctx.lineWidth = strokeWidth;

          if (tool === 'line') {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(moveX, moveY);
            ctx.stroke();
          } else if (tool === 'arrow') {
            drawArrow(ctx, startX, startY, moveX, moveY);
          } else if (tool === 'circle') {
            const radius = Math.hypot(moveX - startX, moveY - startY);
            ctx.beginPath();
            ctx.arc(startX, startY, radius, 0, Math.PI * 2);
            ctx.stroke();
          } else if (tool === 'rect') {
            ctx.strokeRect(startX, startY, moveX - startX, moveY - startY);
          } else if (tool === 'player') {
            ctx.beginPath();
            ctx.arc(moveX, moveY, 8, 0, Math.PI * 2);
            ctx.fill();
          } else if (tool === 'text') {
            ctx.font = '16px Arial';
            ctx.fillText(tool, moveX, moveY);
          }
        };
      }
    };

    const handleMouseUp = () => {
      if (tool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else if (tool === 'arrow') {
        drawArrow(ctx, startX, startY, x, y);
      } else if (tool === 'circle') {
        const radius = Math.hypot(x - startX, y - startY);
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.stroke();
      } else if (tool === 'rect') {
        ctx.strokeRect(startX, startY, x - startX, y - startY);
      } else if (tool === 'player') {
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setIsDrawing(false);
      saveHistory();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const drawArrow = (ctx, fromX, fromY, toX, toY) => {
    const headlen = 15;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  };

  return (
    <div style={{ color: theme.text.primary }}>
      {/* Play Info */}
      <div style={{ marginBottom: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <input
          type="text"
          placeholder="Nome della giocata"
          value={playName}
          onChange={(e) => setPlayName(e.target.value)}
          style={{
            padding: '12px',
            backgroundColor: theme.bg.tertiary,
            color: theme.text.primary,
            border: `1px solid ${theme.border}`,
            borderRadius: '6px',
            fontSize: '14px',
          }}
        />
        <input
          type="text"
          placeholder="Descrizione"
          value={playDescription}
          onChange={(e) => setPlayDescription(e.target.value)}
          style={{
            padding: '12px',
            backgroundColor: theme.bg.tertiary,
            color: theme.text.primary,
            border: `1px solid ${theme.border}`,
            borderRadius: '6px',
            fontSize: '14px',
          }}
        />
        <select
          value={playCategory}
          onChange={(e) => setPlayCategory(e.target.value)}
          style={{
            padding: '12px',
            backgroundColor: theme.bg.tertiary,
            color: theme.text.primary,
            border: `1px solid ${theme.border}`,
            borderRadius: '6px',
            fontSize: '14px',
          }}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Toolbar */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
        padding: '16px',
        backgroundColor: theme.bg.secondary,
        borderRadius: '8px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {/* Tool Selection */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {['line', 'arrow', 'circle', 'rect', 'player'].map(t => (
            <button
              key={t}
              onClick={() => setTool(t)}
              style={{
                padding: '8px 12px',
                backgroundColor: tool === t ? theme.accent : theme.bg.tertiary,
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              {t === 'line' && '📏'}
              {t === 'arrow' && '➜'}
              {t === 'circle' && '●'}
              {t === 'rect' && '▭'}
              {t === 'player' && '●'}
            </button>
          ))}
        </div>

        {/* Color Picker */}
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ width: '40px', height: '40px', cursor: 'pointer', border: 'none', borderRadius: '4px' }}
        />

        {/* Stroke Width */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '12px' }}>Spessore:</label>
          <input
            type="range"
            min="1"
            max="8"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
            style={{ width: '80px' }}
          />
          <span style={{ fontSize: '12px', minWidth: '20px' }}>{strokeWidth}px</span>
        </div>

        {/* Opacity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '12px' }}>Opacità:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(parseInt(e.target.value))}
            style={{ width: '80px' }}
          />
          <span style={{ fontSize: '12px', minWidth: '30px' }}>{opacity}%</span>
        </div>

        {/* Action Buttons */}
        <button
          onClick={undo}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            backgroundColor: theme.accent,
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          <Undo2 size={16} /> Annulla
        </button>

        <button
          onClick={clearCanvas}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            backgroundColor: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          <RotateCcw size={16} /> Pulisci
        </button>

        <button
          onClick={exportSVG}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            backgroundColor: '#10b981',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          <Download size={16} /> Esporta
        </button>
      </div>

      {/* Canvas */}
      <div style={{ marginBottom: '24px' }}>
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          style={{
            display: 'block',
            border: `2px solid ${theme.border}`,
            borderRadius: '8px',
            cursor: tool === 'player' ? 'crosshair' : 'pencil',
            width: '100%',
            maxWidth: '800px',
          }}
        />
      </div>

      {/* Save Button */}
      <button
        onClick={() => {
          if (!playName.trim()) {
            alert('Inserisci un nome per la giocata');
            return;
          }
          onSave({
            name: playName,
            description: playDescription,
            category: playCategory,
            drawing: canvasRef.current?.toDataURL(),
          });
        }}
        style={{
          padding: '12px 24px',
          backgroundColor: theme.accent,
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '600',
        }}
      >
        💾 Salva Giocata
      </button>
    </div>
  );
}
