export default function AgentMindMap() {
  const line = (x1, y1, x2, y2, color = "#666") => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" />
  );

  const box = (x, y, w, h, text, bg = "#fff", textColor = "#222", fontSize = 11, bold = false, sub = null) => (
    <g>
      <rect
        x={x - w / 2} y={y - h / 2} width={w} height={h}
        rx={6} fill={bg} stroke="#ccc" strokeWidth="1"
      />
      <text
        x={x} y={sub ? y - 4 : y + 1}
        textAnchor="middle" dominantBaseline="middle"
        fill={textColor} fontSize={fontSize}
        fontWeight={bold ? 700 : 500}
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        {text}
      </text>
      {sub && (
        <text
          x={x} y={y + 10}
          textAnchor="middle" dominantBaseline="middle"
          fill="#888" fontSize={8}
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {sub}
        </text>
      )}
    </g>
  );

  return (
    <div style={{
      background: "#f4f4f4",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px 8px",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      <svg viewBox="0 0 900 920" style={{ width: "100%", maxWidth: 900, height: "auto" }}>

        {/* ===== LEVEL 1: THE CREATOR ===== */}
        {box(450, 35, 180, 40, "👤 THE CREATOR", "#1a1a2e", "#fff", 14, true, null)}
        <text x={450} y={62} textAnchor="middle" fill="#999" fontSize={8} fontFamily="system-ui">The Developer</text>

        {/* Lines from Creator to Learning platforms */}
        {line(450, 55, 140, 115, "#5DD8D8")}
        {line(450, 55, 310, 115, "#5DD8D8")}
        {line(450, 55, 450, 115, "#5DD8D8")}
        {line(450, 55, 590, 115, "#5DD8D8")}
        {line(450, 55, 760, 115, "#5DD8D8")}

        {/* ===== LEVEL 2: KNOWLEDGE SOURCES ===== */}
        <text x={450} y={90} textAnchor="middle" fill="#5DD8D8" fontSize={9} fontWeight={600} fontFamily="system-ui" letterSpacing="2">WHERE YOU LEARN</text>

        {box(140, 130, 130, 30, "Anthropic Academy", "#e0f7f7", "#1a5c5c", 9, true)}
        {box(310, 130, 120, 30, "Google Skills", "#e0f7f7", "#1a5c5c", 9, true)}
        {box(450, 130, 110, 30, "DeepLearning.AI", "#e0f7f7", "#1a5c5c", 9)}
        {box(590, 130, 130, 30, "Coursera × Anthropic", "#e0f7f7", "#1a5c5c", 9)}
        {box(760, 130, 130, 30, "OpenAI Docs", "#e0f7f7", "#1a5c5c", 9)}

        {/* Lines from Knowledge to Agent */}
        {line(140, 145, 450, 195, "#aaa")}
        {line(310, 145, 450, 195, "#aaa")}
        {line(450, 145, 450, 195, "#aaa")}
        {line(590, 145, 450, 195, "#aaa")}
        {line(760, 145, 450, 195, "#aaa")}

        {/* ===== LEVEL 3: THE AGENT ===== */}
        {box(450, 210, 200, 44, "🧠 THE AGENT", "#F27649", "#fff", 15, true)}

        {/* Lines from Agent to Frameworks */}
        {line(375, 232, 110, 310, "#F27649")}
        {line(410, 232, 290, 310, "#F27649")}
        {line(450, 232, 450, 310, "#F27649")}
        {line(490, 232, 610, 310, "#F27649")}
        {line(525, 232, 790, 310, "#F27649")}

        <text x={450} y={265} textAnchor="middle" fill="#F27649" fontSize={9} fontWeight={600} fontFamily="system-ui" letterSpacing="2">BUILT WITH FRAMEWORK</text>

        {/* ===== LEVEL 4: FRAMEWORKS / SDKs ===== */}
        {box(110, 325, 140, 34, "Claude Agent SDK", "#1a1a2e", "#F6C744", 10, true, null)}
        <text x={110} y={348} textAnchor="middle" fill="#aaa" fontSize={7} fontFamily="system-ui">Anthropic</text>

        {box(290, 325, 120, 34, "Google ADK", "#1a1a2e", "#34D399", 10, true)}
        <text x={290} y={348} textAnchor="middle" fill="#aaa" fontSize={7} fontFamily="system-ui">Google</text>

        {box(450, 325, 140, 34, "OpenAI Agents SDK", "#1a1a2e", "#60A5FA", 10, true)}
        <text x={450} y={348} textAnchor="middle" fill="#aaa" fontSize={7} fontFamily="system-ui">OpenAI</text>

        {box(610, 325, 100, 34, "LangGraph", "#1a1a2e", "#E879A0", 10, true)}
        <text x={610} y={348} textAnchor="middle" fill="#aaa" fontSize={7} fontFamily="system-ui">LangChain</text>

        {box(790, 325, 100, 34, "CrewAI", "#1a1a2e", "#C084FC", 10, true)}
        <text x={790} y={348} textAnchor="middle" fill="#aaa" fontSize={7} fontFamily="system-ui">Independent</text>

        {/* ===== LEVEL 5: LANGUAGES (under each framework) ===== */}
        <text x={450} y={380} textAnchor="middle" fill="#B68CFA" fontSize={9} fontWeight={600} fontFamily="system-ui" letterSpacing="2">PROGRAMMING LANGUAGES</text>

        {/* Claude Agent SDK languages */}
        {line(80, 342, 60, 405, "#F6C744")}
        {line(140, 342, 160, 405, "#F6C744")}
        {box(60, 415, 70, 24, "Python", "#FFF9E0", "#8B7000", 9, true)}
        {box(160, 415, 80, 24, "TypeScript", "#FFF9E0", "#8B7000", 9)}

        {/* Google ADK languages */}
        {line(250, 342, 215, 405, "#34D399")}
        {line(290, 342, 275, 405, "#34D399")}
        {line(310, 342, 335, 405, "#34D399")}
        {line(330, 342, 385, 405, "#34D399")}
        {box(215, 415, 60, 24, "Python", "#E0FFF0", "#006040", 9, true)}
        {box(275, 415, 50, 24, "TS", "#E0FFF0", "#006040", 9)}
        {box(335, 415, 40, 24, "Go", "#E0FFF0", "#006040", 9)}
        {box(385, 415, 45, 24, "Java", "#E0FFF0", "#006040", 9)}

        {/* OpenAI languages */}
        {line(420, 342, 430, 405, "#60A5FA")}
        {line(480, 342, 490, 405, "#60A5FA")}
        {box(430, 415, 60, 24, "Python", "#E0EFFF", "#003580", 9, true)}
        {box(490, 415, 50, 24, "TS", "#E0EFFF", "#003580", 9)}

        {/* LangGraph languages */}
        {line(590, 342, 580, 405, "#E879A0")}
        {line(630, 342, 640, 405, "#E879A0")}
        {box(580, 415, 60, 24, "Python", "#FFE0EB", "#800040", 9, true)}
        {box(640, 415, 50, 24, "TS", "#FFE0EB", "#800040", 9)}

        {/* CrewAI languages */}
        {line(790, 342, 790, 405, "#C084FC")}
        {box(790, 415, 70, 24, "Python", "#F0E0FF", "#4A0080", 9, true)}

        {/* ===== LEVEL 6: DEV ENVIRONMENTS ===== */}
        <text x={450} y={465} textAnchor="middle" fill="#F472B6" fontSize={9} fontWeight={600} fontFamily="system-ui" letterSpacing="2">DEV ENVIRONMENTS</text>

        {line(170, 480, 450, 480, "#F472B644")}
        {line(730, 480, 450, 480, "#F472B644")}

        {box(120, 495, 120, 26, "VS Code + Claude", "#fff", "#333", 9, true)}
        {box(270, 495, 110, 26, "Claude Code CLI", "#fff", "#333", 9)}
        {box(410, 495, 100, 26, "ADK Dev UI", "#fff", "#333", 9)}
        {box(550, 495, 120, 26, "OAI Agent Builder", "#fff", "#333", 9)}
        {box(700, 495, 100, 26, "Terminal + .env", "#fff", "#333", 9)}

        {/* ===== LEVEL 7: PROTOCOLS ===== */}
        <text x={450} y={540} textAnchor="middle" fill="#34D399" fontSize={9} fontWeight={600} fontFamily="system-ui" letterSpacing="2">PROTOCOLS & STANDARDS</text>

        {line(250, 555, 450, 555, "#34D39944")}
        {line(650, 555, 450, 555, "#34D39944")}

        {box(250, 570, 160, 30, "MCP", "#E0FFF0", "#006040", 11, true, "Agent ↔ Tools")}
        {box(450, 570, 160, 30, "A2A", "#E0FFF0", "#006040", 11, true, "Agent ↔ Agent")}
        {box(650, 570, 160, 30, "Agent Skills", "#E0FFF0", "#006040", 11, true, "Agent ↔ Expertise")}

        {/* ===== LEVEL 8: DEPLOYMENT ===== */}
        {line(250, 585, 450, 625, "#60A5FA")}
        {line(450, 585, 450, 625, "#60A5FA")}
        {line(650, 585, 450, 625, "#60A5FA")}

        <text x={450} y={620} textAnchor="middle" fill="#60A5FA" fontSize={9} fontWeight={600} fontFamily="system-ui" letterSpacing="2">DEPLOY TO</text>

        {box(180, 650, 120, 26, "Vertex AI", "#E0EFFF", "#003580", 9, true)}
        {box(330, 650, 110, 26, "AWS Bedrock", "#E0EFFF", "#003580", 9)}
        {box(470, 650, 100, 26, "Cloud Run", "#E0EFFF", "#003580", 9)}
        {box(600, 650, 80, 26, "Vercel", "#E0EFFF", "#003580", 9)}
        {box(720, 650, 100, 26, "Self-hosted", "#E0EFFF", "#003580", 9)}

        {line(180, 663, 180, 650, "#60A5FA44")}
        {line(330, 663, 330, 650, "#60A5FA44")}
        {line(470, 663, 470, 650, "#60A5FA44")}
        {line(600, 663, 600, 650, "#60A5FA44")}
        {line(720, 663, 720, 650, "#60A5FA44")}

        {/* ===== SEPARATOR ===== */}
        <line x1={100} y1={695} x2={800} y2={695} stroke="#ddd" strokeWidth="1" strokeDasharray="4,4" />
        <text x={450} y={715} textAnchor="middle" fill="#FF6B6B" fontSize={10} fontWeight={700} fontFamily="system-ui" letterSpacing="2">SUPER-AGENT PATTERN</text>

        {/* ===== SUPER AGENT ===== */}
        {box(450, 750, 200, 40, "🎯 Orchestrator", "#FF6B6B", "#fff", 13, true)}

        {line(370, 770, 170, 820, "#FF6B6B")}
        {line(410, 770, 330, 820, "#FF6B6B")}
        {line(490, 770, 570, 820, "#FF6B6B")}
        {line(530, 770, 730, 820, "#FF6B6B")}

        {box(170, 835, 120, 30, "Research Agent", "#FFE0E0", "#800000", 9, true, "WebSearch · Read")}
        {box(330, 835, 110, 30, "Code Agent", "#FFE0E0", "#800000", 9, true, "Bash · Edit")}
        {box(570, 835, 110, 30, "Data Agent", "#FFE0E0", "#800000", 9, true, "CodeExec · SQL")}
        {box(730, 835, 110, 30, "Comms Agent", "#FFE0E0", "#800000", 9, true, "Email · Slack")}

        {/* Sub-agent tools underneath */}
        {line(170, 850, 170, 880, "#ccc")}
        {line(330, 850, 330, 880, "#ccc")}
        {line(570, 850, 570, 880, "#ccc")}
        {line(730, 850, 730, 880, "#ccc")}

        {box(170, 892, 90, 22, "Claude Opus", "#f8f8f8", "#666", 8)}
        {box(330, 892, 100, 22, "Claude Sonnet", "#f8f8f8", "#666", 8)}
        {box(570, 892, 100, 22, "Gemini Flash", "#f8f8f8", "#666", 8)}
        {box(730, 892, 70, 22, "GPT-4o", "#f8f8f8", "#666", 8)}

      </svg>
    </div>
  );
}
