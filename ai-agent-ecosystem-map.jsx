import { useState } from "react";

const LAYERS = [
  {
    id: "creator",
    label: "THE CREATOR",
    subtitle: "The Developer / Builder",
    color: "#C9A84C",
    bgColor: "#1a1508",
    borderColor: "#C9A84C",
    icon: "👤",
    items: [
      { name: "You", detail: "The human who architects, prompts, and ships the agent" }
    ],
    description: "Everything begins here. The developer decides WHAT to build, WHO it serves, and HOW it behaves."
  },
  {
    id: "education",
    label: "KNOWLEDGE SOURCE",
    subtitle: "Where The Creator Learns",
    color: "#6ECFCF",
    bgColor: "#081a1a",
    borderColor: "#6ECFCF",
    icon: "📚",
    items: [
      { name: "Anthropic Academy", detail: "13 free courses: API fundamentals → Agent Skills → MCP → Cloud deploy (anthropic.skilljar.com)" },
      { name: "Google Skills / GEAR", detail: "Free labs w/ 35 monthly credits. ADK, MCP, A2A, Vertex AI (skills.google)" },
      { name: "OpenAI Docs & Cookbook", detail: "Agents SDK guides, Responses API, AgentKit tutorials (platform.openai.com)" },
      { name: "DeepLearning.AI", detail: "Short courses w/ Anthropic (Agent Skills, Computer Use) + LangChain/LangGraph" },
      { name: "Coursera × Anthropic", detail: "'Building with Claude API' specialization — MCP, RAG, Agentic Workflows" },
      { name: "GitHub Repos", detail: "anthropics/courses • google/adk-samples • openai/openai-agents-python" },
    ],
    description: "Before writing a line of code, the creator harvests structured knowledge from vendor training platforms, open-source repos, and community courses."
  },
  {
    id: "framework",
    label: "AGENT FRAMEWORK / SDK",
    subtitle: "The Skeleton That Holds the Agent Together",
    color: "#E07B54",
    bgColor: "#1a0f08",
    borderColor: "#E07B54",
    icon: "🧠",
    items: [
      { name: "Claude Agent SDK", detail: "Anthropic · TypeScript/Python · 'Give the agent a computer' philosophy · Built-in bash, file, web tools" },
      { name: "Google ADK", detail: "Google · Python/TS/Go/Java · LLM Agents + Workflow Agents (Sequential/Parallel/Loop) · Vertex AI deploy" },
      { name: "OpenAI Agents SDK", detail: "OpenAI · Python/TypeScript · Agents + Handoffs + Guardrails · Evolved from Swarm · 19K+ GitHub stars" },
      { name: "LangGraph", detail: "LangChain · Python/TypeScript · Graph-based state machines · 25K stars · Production-grade orchestration" },
      { name: "CrewAI", detail: "Independent · Python · Role-based agent teams · 44K+ stars · Easiest to start with" },
      { name: "Pydantic AI", detail: "Pydantic team · Python · Type-safe agents · Powers internals of every other SDK" },
    ],
    description: "The framework provides the agent loop, tool orchestration, state management, and multi-agent coordination patterns."
  },
  {
    id: "languages",
    label: "PROGRAMMING LANGUAGES",
    subtitle: "The Code That Brings Agents to Life",
    color: "#A78BFA",
    bgColor: "#110d1a",
    borderColor: "#A78BFA",
    icon: "💻",
    items: [
      { name: "Python", detail: "Primary language across ALL frameworks · pip install · Most mature SDK support · Required: 3.10+" },
      { name: "TypeScript/JavaScript", detail: "Full support in Claude Agent SDK, Google ADK, OpenAI Agents SDK · npm install · Node.js 18+" },
      { name: "Go", detail: "Google ADK only · go get google.golang.org/adk · Good for high-performance agent services" },
      { name: "Java", detail: "Google ADK only · Maven/Gradle · Enterprise integration · ADK v0.6.0+" },
      { name: "YAML (Declarative)", detail: "Google ADK Agent Config · No-code agent definition · Introduced Aug 2025" },
    ],
    description: "Python dominates. TypeScript is the strong second. Go and Java are Google ADK-specific. YAML is declarative (no-code) option."
  },
  {
    id: "devenv",
    label: "DEV ENVIRONMENTS & TOOLS",
    subtitle: "Where Code Gets Written, Tested, Debugged",
    color: "#F472B6",
    bgColor: "#1a0812",
    borderColor: "#F472B6",
    icon: "🔧",
    items: [
      { name: "VS Code + Claude Extension", detail: "Primary IDE for most agent devs · Claude Code built-in · GitHub Copilot alternative" },
      { name: "Claude Code CLI", detail: "Terminal-based agentic coding · Required runtime for Claude Agent SDK · npm install -g @anthropic-ai/claude-code" },
      { name: "ADK Dev UI (adk web)", detail: "Google's browser-based agent debugger · Step-by-step event inspection · http://localhost:8000" },
      { name: "OpenAI Agent Builder", detail: "Visual drag-and-drop canvas for composing agent logic · Part of AgentKit · Beta" },
      { name: "LangSmith", detail: "LangChain's tracing/debugging platform · 5K free traces/mo · Required for LangGraph production" },
      { name: "Terminal + venv/npm", detail: "Python venv or npm init · .env files for API keys · The universal starting point" },
    ],
    description: "Every framework ships its own dev tooling. The IDE is VS Code. The CLI is your terminal. The debugger varies by framework."
  },
  {
    id: "protocols",
    label: "PROTOCOLS & STANDARDS",
    subtitle: "The Universal Connectors",
    color: "#34D399",
    bgColor: "#081a11",
    borderColor: "#34D399",
    icon: "🔗",
    items: [
      { name: "MCP (Model Context Protocol)", detail: "Agent ↔ Tools · Anthropic-created, Linux Foundation governed · 97M monthly downloads · 5,800+ servers" },
      { name: "A2A (Agent2Agent Protocol)", detail: "Agent ↔ Agent · Google-created · 50+ partners · Cross-framework agent communication" },
      { name: "Agent Skills (Open Standard)", detail: "Agent ↔ Expertise · Anthropic-created · Adopted by Microsoft, OpenAI, GitHub, Figma, Cursor" },
      { name: "OpenAPI Specs", detail: "Agent ↔ REST APIs · Standard HTTP tool definitions · Supported by all frameworks" },
    ],
    description: "MCP = how agents talk to tools. A2A = how agents talk to each other. Skills = how agents gain expertise. All are open standards."
  },
  {
    id: "deploy",
    label: "DEPLOYMENT & HOSTING",
    subtitle: "Where Agents Run in Production",
    color: "#60A5FA",
    bgColor: "#080f1a",
    borderColor: "#60A5FA",
    icon: "☁️",
    items: [
      { name: "Vertex AI Agent Engine", detail: "Google Cloud · Managed ADK runtime · Auto-scaling · Production-grade" },
      { name: "Google Cloud Run", detail: "Containerized agent deployment · Any framework · Docker-based" },
      { name: "AWS Bedrock", detail: "Claude Agent SDK + Amazon Bedrock · Enterprise Claude access · Set CLAUDE_CODE_USE_BEDROCK=1" },
      { name: "Vercel / Railway / Fly.io", detail: "Lightweight deploys for TypeScript/Node agents · Good for indie/startup" },
      { name: "Self-hosted (Docker/K8s)", detail: "Any framework · Full control · Kubernetes for scale · Open-source models via Ollama/vLLM" },
    ],
    description: "Production deployment ranges from fully managed (Vertex AI, Bedrock) to self-hosted (Docker + your own infra)."
  },
];

const SUPER_AGENT = {
  label: "SUPER-AGENT (ORCHESTRATOR)",
  color: "#FF6B6B",
  subAgents: [
    { name: "Research Agent", tools: "WebSearch, Glob, Read", model: "Claude Opus" },
    { name: "Code Agent", tools: "Bash, Edit, Write", model: "Claude Sonnet" },
    { name: "Data Agent", tools: "CodeExec, DB Query", model: "Gemini Flash" },
    { name: "Comms Agent", tools: "Email API, Slack MCP", model: "GPT-4o" },
  ]
};

export default function AgentEcosystemMap() {
  const [expandedLayer, setExpandedLayer] = useState(null);
  const [showSuperAgent, setShowSuperAgent] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0a0a0f 0%, #0d0d18 50%, #0a0a0f 100%)",
      color: "#e0e0e0",
      fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace",
      padding: "24px 16px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background grid */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
        backgroundSize: "40px 40px",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto" }}>
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{
            fontSize: "clamp(20px, 4vw, 32px)",
            fontWeight: 800,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            background: "linear-gradient(135deg, #C9A84C, #E07B54, #A78BFA, #6ECFCF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 6,
          }}>
            The AI Agent Building Stack
          </h1>
          <p style={{ color: "#888", fontSize: 13, letterSpacing: "0.08em" }}>
            MARCH 2026 · EVERY LAYER FROM CREATOR TO DEPLOYMENT
          </p>
        </div>

        {/* Vertical connector line */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: 120,
          bottom: 100,
          width: 2,
          background: "linear-gradient(180deg, #C9A84C22, #6ECFCF22, #E07B5422, #A78BFA22, #F472B622, #34D39922, #60A5FA22)",
          zIndex: 0,
        }} />

        {/* Layers */}
        {LAYERS.map((layer, i) => {
          const isExpanded = expandedLayer === layer.id;
          return (
            <div key={layer.id} style={{ position: "relative", zIndex: 1, marginBottom: 12 }}>
              {/* Layer connector dot */}
              <div style={{
                position: "absolute",
                left: "50%",
                top: -6,
                transform: "translateX(-50%)",
                width: 12, height: 12,
                borderRadius: "50%",
                background: layer.color,
                boxShadow: `0 0 12px ${layer.color}44`,
                zIndex: 2,
              }} />

              {/* Layer card */}
              <div
                onClick={() => setExpandedLayer(isExpanded ? null : layer.id)}
                style={{
                  background: layer.bgColor,
                  border: `1px solid ${isExpanded ? layer.color : layer.borderColor + "33"}`,
                  borderRadius: 8,
                  padding: "14px 18px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: isExpanded ? `0 0 30px ${layer.color}15, inset 0 0 30px ${layer.color}08` : "none",
                }}
              >
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 22 }}>{layer.icon}</span>
                    <div>
                      <div style={{
                        fontSize: "clamp(11px, 2.5vw, 14px)",
                        fontWeight: 700,
                        color: layer.color,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}>
                        {layer.label}
                      </div>
                      <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
                        {layer.subtitle}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    width: 28, height: 28,
                    borderRadius: "50%",
                    border: `1px solid ${layer.color}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, color: layer.color,
                    transition: "transform 0.3s",
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}>
                    ▾
                  </div>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${layer.color}22` }}>
                    <p style={{ fontSize: 12, color: "#aaa", marginBottom: 14, lineHeight: 1.6 }}>
                      {layer.description}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {layer.items.map((item, j) => (
                        <div key={j} style={{
                          background: `${layer.color}08`,
                          border: `1px solid ${layer.color}18`,
                          borderRadius: 6,
                          padding: "10px 14px",
                        }}>
                          <div style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: layer.color,
                            marginBottom: 3,
                          }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: 11, color: "#999", lineHeight: 1.5 }}>
                            {item.detail}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Super Agent Section */}
        <div style={{ marginTop: 32, marginBottom: 24 }}>
          <div
            onClick={() => setShowSuperAgent(!showSuperAgent)}
            style={{
              background: "linear-gradient(135deg, #1a0808 0%, #1a0f18 100%)",
              border: `2px solid ${showSuperAgent ? "#FF6B6B" : "#FF6B6B33"}`,
              borderRadius: 10,
              padding: "18px 20px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: showSuperAgent ? "0 0 40px #FF6B6B15" : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 24 }}>🎯</span>
                <div>
                  <div style={{
                    fontSize: "clamp(12px, 2.5vw, 15px)",
                    fontWeight: 800,
                    color: "#FF6B6B",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}>
                    SUPER-AGENT PATTERN
                  </div>
                  <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
                    Orchestrator That Activates Specialized Sub-Agents
                  </div>
                </div>
              </div>
              <div style={{
                fontSize: 12, color: "#FF6B6B",
                border: "1px solid #FF6B6B44",
                borderRadius: 4,
                padding: "4px 10px",
              }}>
                {showSuperAgent ? "COLLAPSE" : "EXPAND"}
              </div>
            </div>

            {showSuperAgent && (
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #FF6B6B22" }}>
                <p style={{ fontSize: 12, color: "#aaa", marginBottom: 16, lineHeight: 1.6 }}>
                  A Super-Agent (or Orchestrator) is a parent agent that receives a complex task, decomposes it into sub-tasks,
                  and delegates each sub-task to a specialized child agent. Each child has its own tools, model, and instructions.
                  The orchestrator manages state, collects results, and synthesizes the final output.
                </p>

                {/* Orchestrator box */}
                <div style={{
                  background: "#FF6B6B11",
                  border: "2px solid #FF6B6B44",
                  borderRadius: 8,
                  padding: 16,
                  textAlign: "center",
                  marginBottom: 12,
                }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#FF6B6B", letterSpacing: "0.1em" }}>
                    🎯 ORCHESTRATOR AGENT
                  </div>
                  <div style={{ fontSize: 11, color: "#999", marginTop: 4 }}>
                    Receives task → Plans subtasks → Delegates → Collects → Synthesizes
                  </div>
                  <div style={{ fontSize: 10, color: "#666", marginTop: 4 }}>
                    Pattern: Google ADK sub_agents=[ ] · Claude subagents · OpenAI Handoffs
                  </div>
                </div>

                {/* Arrow */}
                <div style={{ textAlign: "center", color: "#FF6B6B44", fontSize: 20, margin: "4px 0" }}>
                  ▼ delegates to ▼
                </div>

                {/* Sub-agents grid */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: 10,
                }}>
                  {SUPER_AGENT.subAgents.map((sa, i) => {
                    const colors = ["#6ECFCF", "#A78BFA", "#34D399", "#F472B6"];
                    const c = colors[i % colors.length];
                    return (
                      <div key={i} style={{
                        background: `${c}08`,
                        border: `1px solid ${c}33`,
                        borderRadius: 6,
                        padding: "12px 14px",
                      }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: c, marginBottom: 6 }}>
                          {sa.name}
                        </div>
                        <div style={{ fontSize: 10, color: "#888", lineHeight: 1.5 }}>
                          <span style={{ color: "#666" }}>Tools:</span> {sa.tools}
                        </div>
                        <div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>
                          <span style={{ color: "#666" }}>Model:</span> {sa.model}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{
                  marginTop: 14,
                  padding: "10px 14px",
                  background: "#ffffff06",
                  borderRadius: 6,
                  border: "1px solid #ffffff0a",
                }}>
                  <div style={{ fontSize: 11, color: "#888", lineHeight: 1.6 }}>
                    <strong style={{ color: "#ccc" }}>Implementation:</strong> In Google ADK, use <code style={{ color: "#E07B54", background: "#E07B5411", padding: "1px 4px", borderRadius: 3 }}>sub_agents=[agent1, agent2]</code> on the parent LlmAgent.
                    In Claude Agent SDK, launch subagents from <code style={{ color: "#6ECFCF", background: "#6ECFCF11", padding: "1px 4px", borderRadius: 3 }}>.claude/agents/</code> markdown files.
                    In OpenAI, use <code style={{ color: "#A78BFA", background: "#A78BFA11", padding: "1px 4px", borderRadius: 3 }}>Handoffs</code> to transfer control between agents.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center",
          padding: "16px 0",
          borderTop: "1px solid #ffffff0a",
          marginTop: 8,
        }}>
          <p style={{ fontSize: 10, color: "#555", letterSpacing: "0.1em" }}>
            TAP ANY LAYER TO EXPAND · DATA SOURCED FROM OFFICIAL DOCS AS OF MARCH 2026
          </p>
        </div>
      </div>
    </div>
  );
}
