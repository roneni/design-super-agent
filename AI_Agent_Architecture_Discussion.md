# AI Agent Architecture Discussion

## Planner Agents, Guardrails, and Hallucination Detection

---

# 1. Introduction

This document summarizes a technical discussion about **AI agent architectures**, focusing on the role of a **Planner Agent**, methods for **detecting hallucinations**, and strategies for building **reliable guardrails systems**.

Modern AI systems increasingly use **multi-agent architectures**, where several specialized agents collaborate to accomplish complex tasks. In these systems, a supervising component often decomposes a high-level goal into smaller tasks and distributes them across specialized agents. ([Wikipedia](https://en.wikipedia.org/wiki/Agentic_Artificial_Intelligence))

This document explains:

* Why a Planner Agent is powerful
* How planners are implemented
* How hallucinations occur in agent systems
* How guardrails monitor AI agents
* How to detect unreliable planning behavior
* How production AI systems mitigate hallucinations

---

# 2. Why a Planner Agent is Powerful

A **Planner Agent** improves system performance because it introduces structured reasoning before execution.

Key benefits include:

### Task Decomposition

Complex goals are broken into smaller tasks.

Example:

```
Goal: Redesign homepage
```

Planner output:

```
1 analyze layout
2 generate UI proposal
3 evaluate typography
4 optimize spacing
5 send for review
```

This technique is known as **task decomposition**, which improves reliability by turning complex problems into manageable steps.

---

### Dynamic Routing

The planner determines which agent should execute each task.

Example:

```
planner
↓
design_agent
↓
code_agent
↓
review_agent
```

This routing mechanism is a common orchestration pattern in agent systems. ([Wikipedia](https://en.wikipedia.org/wiki/AI_agent))

---

### Parallel Work

Multiple agents can operate simultaneously.

Example:

```
planner
↓
design_agent_A
design_agent_B
research_agent
```

Parallel execution increases speed and scalability.

---

### Iteration Loops

The planner can request another improvement cycle if the output quality is insufficient.

Example:

```
generate
↓
review
↓
improve
↓
review again
```

This iterative workflow is often called a **planner-critic loop**.

---

# 3. Example Planner Output

Example structured planner output:

```json
{
 "task": "homepage redesign",
 "steps": [
  "analyze current HTML layout",
  "generate 2 layout proposals",
  "compare typography hierarchy",
  "improve spacing and responsiveness",
  "submit for code review"
 ]
}
```

The **super-agent** or orchestrator simply executes these steps sequentially or in parallel.

---

# 4. Why Advanced AI Systems Use This Structure

Many production-grade AI systems use planner-based architectures because they provide:

* increased stability
* fewer hallucinations
* clearer task structure
* improved coordination between agents

Large agent systems frequently separate **planning, execution, and evaluation roles** across different agents to maintain reliability. ([Wikipedia](https://en.wikipedia.org/wiki/AI_agent))

---

# 5. Memory Agents

If a system already contains a **Planner Agent** and a **Reviewer Agent**, introducing a **Memory Agent** can significantly improve performance.

The Memory Agent stores:

* previous design decisions
* repeated mistakes
* user preferences
* successful solutions

Example memory record:

```
memory:
user prefers dark cinematic UI
avoid small fonts
prefer minimal layout
```

Each generation becomes more accurate because the system learns from previous interactions.

---

# 6. Is the Planner Pre-Built or Custom?

In most cases:

**The Planner Agent is built as part of the system architecture.**

It is not usually a standalone product.

Instead, it is an **architectural pattern**.

Typical structure:

```
User Request
↓
Planner
↓
Plan
↓
Executor Agents
```

Responsibilities of the planner:

* break down goals into tasks
* select execution order
* choose which agents should execute tasks

---

# 7. How a Planner Is Implemented

A basic planner is often implemented using a structured prompt.

Example system prompt:

```
You are a planning agent.

Your job is to break complex tasks into structured steps.

Rules:
- do not execute tasks
- only generate steps
- keep steps atomic
- maximum 10 steps

Return JSON.
```

Example output:

```json
{
 "goal": "homepage redesign",
 "steps": [
  "analyze current layout",
  "generate 2 UI proposals",
  "compare typography",
  "improve spacing",
  "send to reviewer"
 ]
}
```

The **super-agent** then executes the plan.

---

# 8. The Core Problem: Hallucinations

The main challenge in agent systems is **hallucination**.

A hallucination occurs when the model produces:

* incorrect information
* fabricated tools
* nonexistent APIs
* plausible but false reasoning

This behavior arises because large language models generate text probabilistically rather than verifying facts. ([DEV Community](https://dev.to/dextralabs/building-hallucination-resistant-ai-systems-5ak8))

Example hallucination:

```
step: call API getUserHistory
```

But the API does not exist.

---

# 9. Guardrails for Planner Monitoring

Developers typically deploy **four layers of protection**.

---

## 9.1 Guardrails

Guardrails are rule-based validation systems that check model output.

They can verify:

* whether steps are valid
* whether tools exist
* whether outputs follow policy

Guardrails act as middleware that validates model input and output before execution. ([Datadog](https://www.datadoghq.com/blog/llm-guardrails-best-practices/))

---

## 9.2 Schema Validation

The planner must return a strict structure.

Example:

```json
{
 "steps": [
  {
   "task": "",
   "agent": "",
   "expected_output": ""
  }
 ]
}
```

If the structure is incorrect → reject.

Structured outputs significantly reduce hallucination rates.

---

## 9.3 Tool Whitelists

The planner is restricted to predefined tools.

Example:

```
allowed_tools:
- code_agent
- design_agent
- research_agent
```

If the planner invents a tool → reject.

---

## 9.4 Critic / LLM-Judge

Another agent reviews the plan.

Architecture:

```
planner → plan
↓
critic agent
↓
approve / reject
```

Many guardrail systems use a second LLM to judge the validity of the output. ([ml6.eu](https://www.ml6.eu/en/blog/the-landscape-of-llm-guardrails-intervention-levels-and-techniques))

---

# 10. Detecting Hallucinations in Real Time

Common signs include:

### Sign 1

Planner references tools that do not exist.

---

### Sign 2

Steps are unrelated to the task.

Example:

```
task: redesign UI
step: analyze market trends
```

---

### Sign 3

Excessive planning.

Good planner:

```
5–8 steps
```

Bad planner:

```
35 steps
```

Over-planning increases system latency and cost.

---

# 11. Typical Production Architecture

A common architecture used in multi-agent systems:

```
User
↓
Planner
↓
Plan Validation
↓
Executor Agents
↓
Critic
↓
Memory Update
```

Memory stores:

```
successful plans
failed plans
user preferences
```

The system improves over time.

---

# 12. Critical Rule for Planner Design

Never allow the planner to execute code.

Planner responsibilities:

```
think
plan
structure
```

Execution must be handled by a separate **executor agent**.

Typical separation:

```
Planner
Executor
Reviewer
```

This separation is a common pattern in multi-agent architectures. ([Wikipedia](https://en.wikipedia.org/wiki/AI_agent))

---

# 13. A Larger Problem: Over-Planning

A frequent failure mode is **over-planning**.

The planner creates overly complex plans.

This causes:

* latency
* increased cost
* cascading execution failures

Many systems limit planning depth.

Example:

```
max_steps = 8
```

---

# 14. Guardrails Can Also Be Wrong

Guardrails themselves can hallucinate.

Therefore production systems rely on **multi-layer verification**.

Example pipeline:

```
Agent Output
↓
Schema Validation
↓
Rule Validation
↓
LLM Critic
↓
Tool Verification
↓
Execution
```

Multiple layers reduce risk.

---

# 15. Cross-Model Validation

A robust architecture uses different models for different roles.

Example:

```
Planner (Model A)
↓
Guardrail (Model B)
↓
Critic (Model C)
```

If multiple models agree, the probability of hallucination decreases.

---

# 16. Grounding

Another important technique is **grounding outputs in real data**.

Example:

```
claim: redesign layout improves readability
source: CSS layout analysis
```

Grounded outputs rely on external evidence rather than internal model guesses.

---

# 17. Execution Verification

One of the strongest protections is **verifying actions against reality**.

Example:

Planner suggests:

```
call API getUserData
```

System checks:

```
Does API exist?
Is response valid?
```

If not → reject.

---

# 18. Guardrail Failure Indicators

Signs that guardrails themselves may be unreliable:

1. Approving invalid outputs
2. Rejecting correct outputs
3. Failing to explain rejection

A good guardrail returns:

```
decision
confidence
reason
```

---

# 19. Evaluation (Evals)

To measure system reliability, developers create evaluation datasets.

Example:

```
50 test tasks
```

Metrics tracked:

```
planner accuracy
critic accuracy
guardrail false positives
guardrail false negatives
```

Reliable evaluation frameworks monitor hallucination frequency and output correctness across system traces. ([Patronus AI](https://www.patronus.ai/ai-agent-development/ai-agent-architecture))

---

# 20. The Golden Rule

Never trust a single model or guardrail.

Trust **system architecture**.

Example:

```
Planner
↓
Validator
↓
Executor
↓
Critic
↓
Memory
```

Multiple layers increase reliability.

---

# 21. The Most Dangerous Failure Mode

The most serious failure mode is:

**Self-reinforcing hallucination**

Example:

```
planner hallucination
↓
executor follows it
↓
critic approves it
```

All agents agree on something incorrect.

---

# 22. External Reality Checks

To prevent systemic hallucinations, systems often integrate external verification.

Examples:

* real API validation
* code execution tests
* document retrieval

Grounding outputs in real systems dramatically reduces hallucination risk. ([DEV Community](https://dev.to/dextralabs/building-hallucination-resistant-ai-systems-5ak8))
