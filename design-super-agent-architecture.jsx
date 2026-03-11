export default function DesignSuperAgentArchitecture() {
  const line = (x1, y1, x2, y2, color = "#666") => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" />
  );

  const dashed = (x1, y1, x2, y2, color = "#444") => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1" strokeDasharray="4,4" />
  );

  const box = (x, y, w, h, text, bg = "#fff", textColor = "#222", fontSize = 11, bold = false, sub = null) => (
    <g>
      <rect
        x={x - w / 2} y={y - h / 2} width={w} height={h}
        rx={6} fill={bg} stroke="#ccc" strokeWidth="1"
      />
      <text
        x={x} y={sub ? y - 5 : y + 1}
        textAnchor="middle" dominantBaseline="middle"
        fill={textColor} fontSize={fontSize}
        fontWeight={bold ? 700 : 500}
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        {text}
      </text>
      {sub && (
        <text
          x={x} y={y + 9}
          textAnchor="middle" dominantBaseline="middle"
          fill="#888" fontSize={8}
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {sub}
        </text>
      )}
    </g>
  );

  const pill = (x, y, text, bg, color, fontSize = 7) => (
    <g>
      <rect x={x - 32} y={y - 9} width={64} height={18} rx={9} fill={bg} stroke={color} strokeWidth="0.5" />
      <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" fill={color} fontSize={fontSize} fontFamily="system-ui">
        {text}
      </text>
    </g>
  );

  return (
    <div style={{
      background: "#0a0a0f",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px 8px",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      <svg viewBox="0 0 960 1100" style={{ width: "100%", maxWidth: 960, height: "auto" }}>
        <defs>
          <linearGradient id="directorGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>

        {/* ===== TITLE ===== */}
        <text x={480} y={30} textAnchor="middle" fill="url(#titleGrad)" fontSize={22} fontWeight={800}
          fontFamily="system-ui" letterSpacing="0.05em">
          Design Super Agent — Architecture
        </text>
        <text x={480} y={50} textAnchor="middle" fill="#555" fontSize={9} fontFamily="system-ui" letterSpacing="2">
          MULTI-AGENT SYSTEM · BUILT WITH CLAUDE AGENT SDK · TYPESCRIPT
        </text>

        {/* ===== LEVEL 1: THE HUMAN ===== */}
        <rect x={380} y={70} width={200} height={44} rx={8} fill="#1a1508" stroke="#C9A84C" strokeWidth="1.5" />
        <text x={480} y={88} textAnchor="middle" fill="#C9A84C" fontSize={13} fontWeight={700} fontFamily="system-ui">
          👤 RONEN (The Human)
        </text>
        <text x={480} y={103} textAnchor="middle" fill="#998844" fontSize={8} fontFamily="system-ui">
          Architect · Taste Arbiter · Quality Gate
        </text>

        {/* Line: Human → Director */}
        {line(480, 114, 480, 150, "#C9A84C")}
        <text x={495} y={135} textAnchor="start" fill="#666" fontSize={7} fontFamily="system-ui">briefs + pushback</text>

        {/* ===== LEVEL 2: DIRECTOR (ORCHESTRATOR) ===== */}
        <rect x={320} y={150} width={320} height={56} rx={10} fill="url(#directorGlow)" stroke="#7c3aed" strokeWidth="2" />
        <text x={480} y={170} textAnchor="middle" fill="#a78bfa" fontSize={15} fontWeight={800} fontFamily="system-ui">
          🎯 DIRECTOR AGENT
        </text>
        <text x={480} y={186} textAnchor="middle" fill="#7c3aed" fontSize={9} fontFamily="system-ui">
          Claude Opus 4.6 · Orchestrator · Decision Maker
        </text>
        <text x={480} y={198} textAnchor="middle" fill="#555" fontSize={7} fontFamily="system-ui">
          Receives brief → Plans phases → Delegates → Reviews → Scores → Iterates
        </text>

        {/* Director tools row */}
        <text x={480} y={225} textAnchor="middle" fill="#7c3aed" fontSize={8} fontWeight={600} fontFamily="system-ui" letterSpacing="1.5">
          DIRECTOR TOOLS
        </text>

        {box(160, 245, 110, 22, "browse_references", "#1a1030", "#a78bfa", 8)}
        {box(290, 245, 100, 22, "view_reference", "#1a1030", "#a78bfa", 8)}
        {box(410, 245, 100, 22, "compare_images", "#1a1030", "#a78bfa", 8)}
        {box(530, 245, 110, 22, "check_regression", "#1a1030", "#a78bfa", 8)}
        {box(665, 245, 130, 22, "validate_project_images", "#1a1030", "#a78bfa", 8)}
        {box(800, 245, 90, 22, "score_design", "#1a1030", "#a78bfa", 8)}

        {/* ===== CONNECTOR LINES: Director → Sub-Agents ===== */}
        {line(400, 206, 180, 330, "#22c55e")}
        {line(480, 206, 480, 330, "#3b82f6")}
        {line(560, 206, 780, 330, "#f59e0b")}

        <text x={480} y={295} textAnchor="middle" fill="#888" fontSize={9} fontWeight={600} fontFamily="system-ui" letterSpacing="2">
          DELEGATES TO SUB-AGENTS
        </text>

        {/* ===== LEVEL 3: SUB-AGENTS ===== */}

        {/* Pencil Executor */}
        <rect x={70} y={330} width={220} height={52} rx={8} fill="#081a11" stroke="#22c55e" strokeWidth="1.5" />
        <text x={180} y={348} textAnchor="middle" fill="#22c55e" fontSize={12} fontWeight={700} fontFamily="system-ui">
          🎨 Pencil Executor
        </text>
        <text x={180} y={363} textAnchor="middle" fill="#22c55e" fontSize={9} fontFamily="system-ui">
          Claude Sonnet 4.6
        </text>
        <text x={180} y={375} textAnchor="middle" fill="#556655" fontSize={7} fontFamily="system-ui">
          Design creation & manipulation in .pen files
        </text>

        {/* Code Generator */}
        <rect x={370} y={330} width={220} height={52} rx={8} fill="#080f1a" stroke="#3b82f6" strokeWidth="1.5" />
        <text x={480} y={348} textAnchor="middle" fill="#3b82f6" fontSize={12} fontWeight={700} fontFamily="system-ui">
          💻 Code Generator
        </text>
        <text x={480} y={363} textAnchor="middle" fill="#3b82f6" fontSize={9} fontFamily="system-ui">
          Claude Sonnet 4.6
        </text>
        <text x={480} y={375} textAnchor="middle" fill="#555570" fontSize={7} fontFamily="system-ui">
          React/Vite project scaffolding & implementation
        </text>

        {/* Researcher */}
        <rect x={670} y={330} width={220} height={52} rx={8} fill="#1a1508" stroke="#f59e0b" strokeWidth="1.5" />
        <text x={780} y={348} textAnchor="middle" fill="#f59e0b" fontSize={12} fontWeight={700} fontFamily="system-ui">
          🔍 Researcher
        </text>
        <text x={780} y={363} textAnchor="middle" fill="#f59e0b" fontSize={9} fontFamily="system-ui">
          Claude Haiku 4.5
        </text>
        <text x={780} y={375} textAnchor="middle" fill="#665544" fontSize={7} fontFamily="system-ui">
          Fast lookup, analysis, web research
        </text>

        {/* ===== LEVEL 4: SUB-AGENT TOOLS ===== */}
        <text x={480} y={405} textAnchor="middle" fill="#888" fontSize={8} fontWeight={600} fontFamily="system-ui" letterSpacing="1.5">
          SUB-AGENT TOOLS
        </text>

        {/* Pencil Executor tools */}
        {line(130, 382, 100, 420, "#22c55e88")}
        {line(160, 382, 150, 420, "#22c55e88")}
        {line(200, 382, 210, 420, "#22c55e88")}
        {line(230, 382, 270, 420, "#22c55e88")}

        {box(100, 430, 80, 22, "batch_design", "#081a11", "#22c55e", 8)}
        {box(150, 455, 70, 22, "batch_get", "#081a11", "#22c55e", 8)}
        {box(220, 430, 90, 22, "get_screenshot", "#081a11", "#22c55e", 8)}
        {box(270, 455, 100, 22, "snapshot_layout", "#081a11", "#22c55e", 8)}

        {/* Code Generator tools */}
        {line(430, 382, 400, 420, "#3b82f688")}
        {line(460, 382, 460, 420, "#3b82f688")}
        {line(500, 382, 520, 420, "#3b82f688")}
        {line(530, 382, 570, 420, "#3b82f688")}

        {box(400, 430, 80, 22, "safe_bash ⛔", "#0f0818", "#3b82f6", 8)}
        {box(460, 455, 50, 22, "Write", "#080f1a", "#3b82f6", 8)}
        {box(520, 430, 45, 22, "Edit", "#080f1a", "#3b82f6", 8)}
        {box(570, 455, 45, 22, "Read", "#080f1a", "#3b82f6", 8)}

        {/* Researcher tools */}
        {line(740, 382, 720, 420, "#f59e0b88")}
        {line(780, 382, 780, 420, "#f59e0b88")}
        {line(820, 382, 840, 420, "#f59e0b88")}

        {box(720, 430, 80, 22, "WebSearch", "#1a1508", "#f59e0b", 8)}
        {box(780, 455, 70, 22, "WebFetch", "#1a1508", "#f59e0b", 8)}
        {box(840, 430, 45, 22, "Read", "#1a1508", "#f59e0b", 8)}

        {/* ===== SEPARATOR ===== */}
        <line x1={80} y1={490} x2={880} y2={490} stroke="#333" strokeWidth="1" strokeDasharray="4,4" />

        {/* ===== LEVEL 5: METHODOLOGY — Corridor Narrowing ===== */}
        <text x={480} y={515} textAnchor="middle" fill="#ef4444" fontSize={10} fontWeight={700} fontFamily="system-ui" letterSpacing="2">
          6-ROUND CORRIDOR NARROWING
        </text>
        <text x={480} y={528} textAnchor="middle" fill="#555" fontSize={7} fontFamily="system-ui">
          Eliminates 97% of design space before execution
        </text>

        {/* Funnel visualization */}
        {/* Round 1 */}
        <rect x={140} y={540} width={680} height={20} rx={4} fill="#7c3aed11" stroke="#7c3aed33" strokeWidth="1" />
        <text x={155} y={553} fill="#7c3aed" fontSize={8} fontWeight={600} fontFamily="system-ui">Round 1: Mood & Palette</text>
        <text x={800} y={553} textAnchor="end" fill="#555" fontSize={7} fontFamily="system-ui">100% → 50%</text>

        {/* Round 2 */}
        <rect x={195} y={565} width={570} height={20} rx={4} fill="#3b82f611" stroke="#3b82f633" strokeWidth="1" />
        <text x={210} y={578} fill="#3b82f6" fontSize={8} fontWeight={600} fontFamily="system-ui">Round 2: Typography & Layout</text>
        <text x={745} y={578} textAnchor="end" fill="#555" fontSize={7} fontFamily="system-ui">50% → 25%</text>

        {/* Round 3 */}
        <rect x={240} y={590} width={480} height={20} rx={4} fill="#22c55e11" stroke="#22c55e33" strokeWidth="1" />
        <text x={255} y={603} fill="#22c55e" fontSize={8} fontWeight={600} fontFamily="system-ui">Round 3: Component Architecture</text>
        <text x={700} y={603} textAnchor="end" fill="#555" fontSize={7} fontFamily="system-ui">25% → 12%</text>

        {/* Round 4 */}
        <rect x={280} y={615} width={400} height={20} rx={4} fill="#f59e0b11" stroke="#f59e0b33" strokeWidth="1" />
        <text x={295} y={628} fill="#f59e0b" fontSize={8} fontWeight={600} fontFamily="system-ui">Round 4: Imagery & Motion</text>
        <text x={660} y={628} textAnchor="end" fill="#555" fontSize={7} fontFamily="system-ui">12% → 6%</text>

        {/* Round 5 */}
        <rect x={320} y={640} width={320} height={20} rx={4} fill="#ec489911" stroke="#ec489933" strokeWidth="1" />
        <text x={335} y={653} fill="#ec4899" fontSize={8} fontWeight={600} fontFamily="system-ui">Round 5: Polish & Micro-interactions</text>
        <text x={620} y={653} textAnchor="end" fill="#555" fontSize={7} fontFamily="system-ui">6% → 3%</text>

        {/* Round 6 — AI Slop Check */}
        <rect x={360} y={665} width={240} height={22} rx={4} fill="#ef444422" stroke="#ef4444" strokeWidth="1.5" />
        <text x={480} y={679} textAnchor="middle" fill="#ef4444" fontSize={9} fontWeight={700} fontFamily="system-ui">
          ⛔ Round 6: AI SLOP CHECK
        </text>

        {/* Execute */}
        <text x={480} y={705} textAnchor="middle" fill="#22c55e" fontSize={9} fontWeight={600} fontFamily="system-ui">
          → Execute with precision (3% of design space)
        </text>

        {/* ===== SEPARATOR ===== */}
        <line x1={80} y1={720} x2={880} y2={720} stroke="#333" strokeWidth="1" strokeDasharray="4,4" />

        {/* ===== LEVEL 6: KNOWLEDGE BASE ===== */}
        <text x={480} y={745} textAnchor="middle" fill="#6ECFCF" fontSize={10} fontWeight={700} fontFamily="system-ui" letterSpacing="2">
          KNOWLEDGE BASE — 39 MODULES · 6,200+ LINES
        </text>

        {/* Knowledge categories */}
        {box(130, 775, 100, 26, "Core (8)", "#081a1a", "#6ECFCF", 9, true, "930 lines")}
        {box(260, 775, 100, 26, "Taste (11)", "#081a1a", "#6ECFCF", 9, true, "2,020 lines")}
        {box(390, 775, 110, 26, "Reasoning (5)", "#081a1a", "#6ECFCF", 9, true, "726 lines")}
        {box(520, 775, 110, 26, "Domains (6)", "#081a1a", "#6ECFCF", 9, true, "668 lines")}
        {box(650, 775, 100, 26, "Culture (4)", "#081a1a", "#6ECFCF", 9, true, "500 lines")}
        {box(790, 775, 130, 26, "Implementation (4)", "#081a1a", "#6ECFCF", 9, true, "940 lines")}

        {/* Knowledge detail pills */}
        {pill(130, 805, "color theory", "#081a1a", "#4a9999")}
        {pill(200, 805, "typography", "#081a1a", "#4a9999")}
        {pill(260, 805, "palettes", "#081a1a", "#4a9999")}
        {pill(330, 805, "Whendell", "#081a1a", "#4a9999")}
        {pill(400, 805, "corridor", "#081a1a", "#4a9999")}
        {pill(470, 805, "calibration", "#081a1a", "#4a9999")}
        {pill(540, 805, "web/mobile", "#081a1a", "#4a9999")}
        {pill(610, 805, "psych-art", "#081a1a", "#4a9999")}
        {pill(680, 805, "anti-slop", "#081a1a", "#4a9999")}
        {pill(755, 805, "CSS systems", "#081a1a", "#4a9999")}
        {pill(830, 805, "React", "#081a1a", "#4a9999")}

        {/* ===== SEPARATOR ===== */}
        <line x1={80} y1={830} x2={880} y2={830} stroke="#333" strokeWidth="1" strokeDasharray="4,4" />

        {/* ===== LEVEL 7: SAFETY & GUARDRAILS ===== */}
        <text x={480} y={855} textAnchor="middle" fill="#ef4444" fontSize={10} fontWeight={700} fontFamily="system-ui" letterSpacing="2">
          SAFETY & GUARDRAILS
        </text>

        {/* Safety items */}
        <rect x={90} y={868} width={220} height={44} rx={6} fill="#1a0808" stroke="#ef444466" strokeWidth="1" />
        <text x={200} y={883} textAnchor="middle" fill="#ef4444" fontSize={9} fontWeight={700} fontFamily="system-ui">
          ⛔ safe_bash
        </text>
        <text x={200} y={896} textAnchor="middle" fill="#884444" fontSize={7} fontFamily="system-ui">
          Blocks 13 deployment patterns
        </text>
        <text x={200} y={907} textAnchor="middle" fill="#664444" fontSize={7} fontFamily="system-ui">
          vercel · netlify · git push · npm publish...
        </text>

        <rect x={330} y={868} width={200} height={44} rx={6} fill="#1a0808" stroke="#ef444466" strokeWidth="1" />
        <text x={430} y={883} textAnchor="middle" fill="#ef4444" fontSize={9} fontWeight={700} fontFamily="system-ui">
          📋 AGENT_SAFETY.md
        </text>
        <text x={430} y={896} textAnchor="middle" fill="#884444" fontSize={7} fontFamily="system-ui">
          5 mandatory rules
        </text>
        <text x={430} y={907} textAnchor="middle" fill="#664444" fontSize={7} fontFamily="system-ui">
          Code-level enforcement layer
        </text>

        <rect x={550} y={868} width={190} height={44} rx={6} fill="#1a0808" stroke="#f59e0b66" strokeWidth="1" />
        <text x={645} y={883} textAnchor="middle" fill="#f59e0b" fontSize={9} fontWeight={700} fontFamily="system-ui">
          🔍 Oversight Protocol
        </text>
        <text x={645} y={896} textAnchor="middle" fill="#886644" fontSize={7} fontFamily="system-ui">
          Fix 0 — Mandatory visual verify
        </text>
        <text x={645} y={907} textAnchor="middle" fill="#664444" fontSize={7} fontFamily="system-ui">
          Never score from code alone
        </text>

        <rect x={760} y={868} width={150} height={44} rx={6} fill="#1a0808" stroke="#3b82f666" strokeWidth="1" />
        <text x={835} y={883} textAnchor="middle" fill="#3b82f6" fontSize={9} fontWeight={700} fontFamily="system-ui">
          📊 Score Calibration
        </text>
        <text x={835} y={896} textAnchor="middle" fill="#446688" fontSize={7} fontFamily="system-ui">
          AI vs Reality tracking
        </text>
        <text x={835} y={907} textAnchor="middle" fill="#444466" fontSize={7} fontFamily="system-ui">
          v1: Δ42 → v3: Δ2
        </text>

        {/* ===== SEPARATOR ===== */}
        <line x1={80} y1={930} x2={880} y2={930} stroke="#333" strokeWidth="1" strokeDasharray="4,4" />

        {/* ===== LEVEL 8: IMAGE PIPELINE & MCP ===== */}
        <text x={300} y={955} textAnchor="middle" fill="#F472B6" fontSize={10} fontWeight={700} fontFamily="system-ui" letterSpacing="2">
          IMAGE PIPELINE
        </text>
        <text x={700} y={955} textAnchor="middle" fill="#34D399" fontSize={10} fontWeight={700} fontFamily="system-ui" letterSpacing="2">
          PROTOCOLS
        </text>

        {box(200, 980, 120, 28, "fal.ai Flux 2 Pro", "#1a0812", "#F472B6", 9, true, "Primary generator")}
        {box(380, 980, 130, 28, "OpenAI gpt-image-1", "#1a0812", "#F472B6", 9, true, "Alternative generator")}

        {box(600, 980, 120, 28, "Pencil MCP", "#081a11", "#34D399", 10, true, "Design ↔ Agent")}
        {box(760, 980, 140, 28, "Visual Reference R2", "#081a11", "#34D399", 9, true, "14 genres · 5 tiers")}

        {/* ===== LEVEL 9: OUTPUT ===== */}
        <line x1={80} y1={1010} x2={880} y2={1010} stroke="#333" strokeWidth="1" strokeDasharray="4,4" />

        <text x={480} y={1035} textAnchor="middle" fill="#22c55e" fontSize={10} fontWeight={700} fontFamily="system-ui" letterSpacing="2">
          OUTPUT — SHIPPED PROJECTS
        </text>

        {box(140, 1060, 110, 26, "Voyage Beyond", "#081a11", "#22c55e", 9, true, "Score: 74-78")}
        {box(280, 1060, 100, 26, "Riad Zellij", "#081a11", "#22c55e", 9, true, "Score: 72-78")}
        {box(410, 1060, 100, 26, "Deep Ocean", "#081a11", "#22c55e", 9, true, "Immersive")}
        {box(540, 1060, 120, 26, "Festivals ✓", "#081a11", "#22c55e", 9, true, "Production · 634K")}
        {box(680, 1060, 100, 26, "Kira Volkov", "#081a11", "#22c55e", 9)}
        {box(810, 1060, 90, 26, "Terrasight", "#081a11", "#22c55e", 9)}

        {/* Footer */}
        <text x={480} y={1095} textAnchor="middle" fill="#333" fontSize={8} fontFamily="system-ui" letterSpacing="1">
          DESIGN SUPER AGENT · BUILT BY RONEN KATZ · 2026
        </text>
      </svg>
    </div>
  );
}
