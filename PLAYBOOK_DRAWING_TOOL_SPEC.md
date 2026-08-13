# PLAYBOOK MODULE SPECIFICATION

## 1. PLAYBOOK DATABASE VIEW

**URL**: `/playbook`

**Layout**:
```
┌─────────────────────────────────────────────────────────┐
│ PLAYBOOK                                      [+ NEW]   │
├─────────────────────────────────────────────────────────┤
│ Search: ________________  Category: [Offensive▼]        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  OFFENSIVE PLAYS                                        │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │ [Thumbnail]  │ │ [Thumbnail]  │ │ [Thumbnail]  │   │
│  │ Triangle Off │ │ Pick & Roll  │ │ 5 Out - Drag │   │
│  │ High         │ │ Handler      │ │              │   │
│  │ [EDIT]       │ │ [EDIT]       │ │ [EDIT]       │   │
│  └──────────────┘ └──────────────┘ └──────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Categories**: Offensive, Defensive, Out of Bounds, ATO (After TimeOut)

**Card Click → Open Detail Modal**

---

## 2. PLAYBOOK DETAIL VIEW

**Modal/Drawer** with full play information:

```
┌─────────────────────────────────────────┐
│ TRIANGLE OFFENSE                   [X]  │
├─────────────────────────────────────────┤
│                                         │
│ CANVAS DRAWING (600x400)                │
│ ┌─────────────────────────────────────┐ │
│ │                                     │ │
│ │        [COURT WITH DRAWING]         │ │
│ │        (X marks, O marks, lines)    │ │
│ │                                     │ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Categoria: Offensive                   │
│ Descrizione:                            │
│ Triangle offense setup with PG at top   │
│ of the key, wing spots...               │
│                                         │
│ Video Demo: [Link to Hudl]             │
│                                         │
│               [EDIT] [DELETE] [CLOSE]   │
└─────────────────────────────────────────┘
```

---

## 3. DRAWING TOOL - DETAILED SPEC

### 3.1 Interface Layout

```
┌──────────────────────────────────────────────────────┐
│ New Play / Edit: "Triangle Offense"          [SAVE]  │
├──────────────────────────────────────────────────────┤
│  TOOLBAR                   │         CANVAS          │
│  ─────────────────────    │   ┌──────────────────┐  │
│                           │   │  COURT DRAWING   │  │
│  [Line Tool] ─────────    │   │  600x400px       │  │
│  [Arrow Tool] ────────>   │   │                  │  │
│  [Circle Tool] ◯          │   │                  │  │
│  [Rectangle] ▭            │   │                  │  │
│                           │   │                  │  │
│  [X Player] ⊗             │   │                  │  │
│  [O Player] ●             │   │                  │  │
│  [Number Input] 1..5      │   │                  │  │
│                           │   │                  │  │
│  [Text Tool] Aa           │   │                  │  │
│                           │   │                  │  │
│  COLOR PICKER             │   │                  │  │
│  ┌─────────────────┐      │   │                  │  │
│  │ [blue]         │      │   │                  │  │
│  │ [red]          │      │   │                  │  │
│  │ [white]        │      │   │                  │  │
│  │ [yellow]       │      │   │                  │  │
│  │ [custom]       │      │   │                  │  │
│  └─────────────────┘      │   │                  │  │
│                           │   │                  │  │
│  [Undo] [Redo] [Clear]   │   │                  │  │
│                           │   └──────────────────┘  │
│                           │  Stroke: [█ 2px]       │
│                           │  Opacity: [████████░]  │
└──────────────────────────────────────────────────────┘
```

### 3.2 Tools & Functionality

#### Line Tool
- Draw straight line from point A to point B
- Click once to set start, click again to set end
- Preview while dragging

#### Arrow Tool
- Like line tool, but with arrowhead at endpoint
- Indicates direction of movement (ball, player)

#### Circle Tool
- Click + drag to draw circle
- Used for marking zones, defensive coverage areas

#### Rectangle Tool
- Click + drag to draw rectangle
- For key areas, zones, court sections

#### Player Markers
- **X Marker** (defending team)
  - Click to place, drag to move
  - Can input number (1-5, or leave empty)
  - Size: 30x30px

- **O Marker** (offensive team)
  - Click to place, drag to move
  - Can input number (1-5, or leave empty)
  - Size: 30x30px

#### Text Tool
- Click on canvas to place text cursor
- Type label/annotation
- Editable after placement

#### Color Picker
- Dropdown with preset colors (blue, red, white, yellow, etc.)
- Custom color input (hex or RGB)
- Applies to next drawn element

#### Undo/Redo
- Undo: revert last action (draw, delete, move)
- Redo: revert undo
- Clear: erase entire drawing (with confirmation)

#### Stroke Width
- Slider: 1px to 8px
- Default: 2px
- For lines, arrows, shapes

#### Opacity/Transparency
- Slider: 0% to 100%
- Useful for overlaying plays

---

## 4. KEYBOARD SHORTCUTS (Optional but useful)

- **Z**: Undo (Ctrl+Z / Cmd+Z)
- **Shift+Z**: Redo (Ctrl+Shift+Z / Cmd+Shift+Z)
- **Delete**: Delete selected element
- **Escape**: Deselect / Cancel tool
- **L**: Line tool
- **A**: Arrow tool
- **C**: Circle tool
- **R**: Rectangle tool
- **T**: Text tool

---

## 5. DATA STRUCTURE

**PLAY**:
```json
{
  "play_id": "uuid",
  "nome_play": "Triangle Offense",
  "categoria": "offensive|defensive|out_of_bounds|ato",
  "disegno_svg": "<svg>...</svg>",  // Full SVG markup
  "descrizione_testuale": "Triangle offense setup...",
  "video_demo": "https://hudl.com/...",
  "thumbnail": "/uploads/playbook/...",  // Generated from SVG
  "created_at": "datetime",
  "updated_at": "datetime",
  "metadata": {
    "author": "coach_id",
    "tags": ["pnr", "high-low"],
    "difficulty": "intermediate",
    "players_involved": ["1", "3", "4"]
  }
}
```

**DRAWING DATA STRUCTURE** (for storage):
```json
{
  "elements": [
    {
      "type": "line",
      "x1": 300,
      "y1": 200,
      "x2": 450,
      "y2": 350,
      "stroke": "#0066cc",
      "strokeWidth": 2,
      "opacity": 1
    },
    {
      "type": "arrow",
      "x1": 450,
      "y1": 350,
      "x2": 500,
      "y2": 380,
      "stroke": "#ff0000",
      "strokeWidth": 2
    },
    {
      "type": "circle",
      "cx": 200,
      "cy": 200,
      "r": 40,
      "fill": "none",
      "stroke": "#00aa00",
      "strokeWidth": 1
    },
    {
      "type": "player_x",
      "x": 300,
      "y": 200,
      "number": "1",
      "fill": "#0066cc"
    },
    {
      "type": "player_o",
      "x": 350,
      "y": 250,
      "number": "3",
      "fill": "#ff0000"
    },
    {
      "type": "text",
      "x": 100,
      "y": 50,
      "text": "Triangle",
      "fontSize": 16,
      "fill": "#000000"
    }
  ],
  "background": "court"  // or "blank"
}
```

---

## 6. FORM FIELDS (Add/Edit Play)

```
┌──────────────────────────────────┐
│ NUOVA GIOCATA                    │
├──────────────────────────────────┤
│                                  │
│ Nome Giocata: ________________   │
│                                  │
│ Categoria: [Offensive ▼]         │
│   - Offensive                    │
│   - Defensive                    │
│   - Out of Bounds                │
│   - ATO (After TimeOut)          │
│                                  │
│ Descrizione Tattica:             │
│ _______________________________  │
│ _______________________________  │
│                                  │
│ Video Demo (Hudl): ____________ │
│                                  │
│ [DRAWING TOOL EMBEDDED]          │
│ ┌──────────────────────────────┐ │
│ │        (see section 3)       │ │
│ └──────────────────────────────┘ │
│                                  │
│      [SAVE] [CANCEL] [DELETE]    │
└──────────────────────────────────┘
```

---

## 7. IMPLEMENTATION NOTES

### Technology Choices:
- **SVG.js** or **Fabric.js** for canvas drawing
  - SVG.js: Lightweight, good for simple shapes
  - Fabric.js: More powerful, better for complex interactions
  - **Recommendation**: Fabric.js for full interactivity

### Court Background:
- SVG or image of basketball court
- 600x400px standard size
- Includes:
  - Three-point line
  - Key (painted area)
  - Free throw line
  - Half-court line
  - Baseline and sidelines

### Color Presets:
```
Blue:   #0066cc (team color)
Red:    #ff0000 (opponent)
White:  #ffffff (neutral/3pt line)
Yellow: #ffcc00 (highlights)
Green:  #00aa00 (zones)
Black:  #000000 (text/lines)
```

### SVG Generation:
- Convert Fabric.js canvas to SVG
- Store in database as `<svg>...</svg>` string
- Generate PNG thumbnail for preview

### Mobile Responsiveness:
- Canvas resizes for mobile (responsive)
- Toolbar icons stack vertically on mobile
- Touch events supported (tap = click, pinch = zoom if needed)

---

## 8. INTEGRATION WITH OTHER MODULES

### CALENDAR:
- When creating a training, can attach plays to it
- "Practice Focus: Triangle Offense"

### SELF SCOUTING:
- When analyzing game, can reference plays used
- "Used Triangle Offense 5 times - 60% efficiency"

### ALLENAMENTI:
- Training plan can include specific plays to practice
- "Drill 1: Triangle Offense - 15 minutes"

---

## 9. SUCCESS CRITERIA

✅ Drawing tools work smoothly (line, arrow, circle, rectangle, text)  
✅ Player markers (X/O with numbers) place and move correctly  
✅ Color picker updates element colors  
✅ Undo/Redo work correctly  
✅ Play saves with SVG drawing  
✅ Thumbnail generates from drawing  
✅ Play detail modal displays drawing  
✅ List view shows thumbnails  
✅ Responsive on mobile  
✅ Keyboard shortcuts work (optional)  

---

## 10. FUTURE ENHANCEMENTS

- **Animation playback**: Show animated sequence of plays
- **Multi-layer drawings**: Support overlaying multiple plays
- **Import/Export**: Download plays as PNG/SVG
- **Comments**: Coach feedback on plays
- **Version history**: Track play modifications over time
- **Public library**: Share plays with community
- **AI suggestions**: Auto-generate play diagrams from text description

---

**Ready for implementation in Claude Code!** 🚀
