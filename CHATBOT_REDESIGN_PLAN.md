# TechBrahmand Chatbot Redesign — Implementation Plan

> **Goal:** Turn the current Q&A chatbot into an **AI Solution Architect** that recommends a single division, produces a justified, itemized quotation, and lets the client edit the proposal in real time.
>
> **Audience:** Engineering team. This doc is self-contained — you don't need any prior context to act on it.
>
> **Status:** Plan, not yet implemented. Last updated 2026-06-26.

---

## 1. Why we're doing this

### What the chatbot does today
- Lives in `frontend/src/pages/Chatbot.jsx`.
- Sends the conversation to Groq (`llama-3.3-70b-versatile`) and renders the text reply as a chat bubble. That's it.
- On "Connect with us," it **guesses** a budget by running regex over the AI's text (`Chatbot.jsx:174`) and **guesses** a division by keyword `.includes('brahma'/'vishnu'/'mahesh')` (`Chatbot.jsx:199`), then prefills the contact form.

### The three problems we're fixing (in the client's words)
1. **It dumps all three divisions** on every client. That's generic. It must recommend **exactly one** division that fits the client.
2. **It quotes a lump number with no justification.** We need an **itemized breakdown** — every line item with a reason for its cost.
3. **The quote is static.** The client should be able to say *"use PostgreSQL instead of MongoDB"* and watch the bot swap it and re-price live, so the proposal feels customized to them.

### Two blockers in the current code that we must fix regardless
- **The chatbot doesn't work in production.** The `/api/grok` endpoint is a **Vite dev-server proxy** (see `frontend/vite.config.js`). It only exists during `npm run dev`. A production `npm run build` has no such route — the bot breaks.
- **The Groq API key is exposed.** `VITE_GROK_API_KEY` is read in the browser (`Chatbot.jsx:126`) and `VITE_` vars are baked into the public bundle. Anyone can extract and abuse it.

Both are solved by Milestone 0 (a real backend proxy).

---

## 2. The core architectural idea

Everything in this plan hangs on **one decision**:

> **On every turn, the LLM returns structured JSON, not free text.** The JSON contains both the chat reply *and* the complete living project state. We render the reply in the chat and the state in a side panel. We feed the previous state back into the next call so the model **evolves** it instead of regenerating from scratch.

```
        TODAY                                   NEW
  user → prompt → LLM → text          user + previous ProjectState
                                              ↓
                                       LLM (JSON mode)
                                              ↓
                              { reply, projectState }   ← single call
                                       ↙          ↘
                              chat bubble      live proposal panel
```

Groq's `llama-3.3-70b-versatile` supports JSON mode via `response_format: { type: "json_object" }`, so this is **one API call per turn**, not a multi-agent pipeline.

**This single change delivers all of:** structured project state, conversation stages, division scoring, architecture-with-reasons, the itemized cost engine, interactive editing, decision-memory, and the live panel.

### What we are deliberately NOT building
To keep scope sane for a lead-gen bot:
- ❌ A multi-agent / multi-call prompt graph. One sectioned prompt is enough.
- ❌ A custom "diff engine." The model recomputes the state; we just render it.
- ❌ A visual version-comparison UI. We snapshot state for undo/history, but no compare screen.

---

## 3. Corrected division definitions (IMPORTANT — the project bible is wrong)

`techbrahmand_project_bible.md` describes Vishnu as "maintenance" and Mahesh as "SEO/competitor audits." **That is outdated.** Use these definitions everywhere (division scoring, prompt, UI copy):

| Division | Meaning | Trigger signals |
|---|---|---|
| **Brahma** — Creator | Build the client's **net-new innovative idea** from scratch | "I have an idea," "build me a new…," greenfield |
| **Vishnu** — Preserver | Take the client's **existing website/app and upscale it to industrial/enterprise level** (modernize + scale) | "I already have a site/ERP," "scale my current platform," "modernize" |
| **Mahesh** — Transformer | **Growth + build competitive software** to beat a named competitor. If they want to compete with Myntra, we build them a better one. | "compete with X," "better than [platform]," "outgrow my rivals" |

**Rule:** the bot picks **one** division and explains *why*. Internally it scores all three (for the justification) but surfaces a single recommendation.

---

## 4. The data model — `ProjectState`

One object, evolved every turn. This is the contract between the LLM, the chat, the panel, and the handoff.

```js
ProjectState {
  // --- where we are in the consultation ---
  stage,                  // 'greeting' | 'discovery' | 'analysis' | 'recommendation'
                          // | 'architecture' | 'quotation' | 'refinement' | 'handoff'

  // --- the division decision ---
  recommendedDivision,    // 'brahma' | 'vishnu' | 'mahesh'   (exactly ONE, or null early on)
  divisionScores,         // { brahma: 20, vishnu: 92, mahesh: 38 }  (internal, drives the "why")
  divisionReason,         // 1–2 sentence justification shown to the client

  // --- discovery facts ---
  businessGoal,           // "Compete with Myntra"
  industry,               // "Fashion / D2C"
  targetAudience,         // "Fashion buyers, 18–35"
  competitor,             // "Myntra" | null
  currentPlatform,        // "Existing Shopify store" | null

  // --- scope: every feature is a priced, toggleable line ---
  features: [
    { name: "Wishlist", included: true,  cost: 1500, reason: "User-saved items + persistence" },
    { name: "AI Recommendations", included: false, cost: 4000, reason: "Embedding-based suggestions" }
  ],

  // --- architecture: every choice carries a justification + swap options ---
  techStack: [
    { layer: "Frontend",      choice: "Next.js",    cost: 0,    reason: "SEO + SSR for product pages", alternatives: ["React SPA"] },
    { layer: "Database",      choice: "MongoDB",    cost: 2000, reason: "Flexible product catalog",     alternatives: ["PostgreSQL"] },
    { layer: "Authentication",choice: "Clerk",      cost: 1500, reason: "Faster + more secure than DIY", alternatives: ["JWT (custom)"] }
  ],

  // --- the itemized quote ---
  costBreakdown: [
    { item: "UI Design",      cost: 2500, reason: "Wireframes + responsive design" },
    { item: "Frontend",       cost: 5000, reason: "Dashboard, components, animations" },
    { item: "Authentication", cost: 1500, reason: "Clerk integration" },
    { item: "Database",       cost: 2000, reason: "Schema, indexes, API integration" },
    { item: "Deployment",     cost: 1500, reason: "Production hosting + CI" },
    { item: "Testing/QA",     cost: 2000, reason: "Cross-browser + functional QA" }
  ],
  totalCost,               // 14500  (sum — model computes, frontend re-verifies)
  timeline,                // "8 weeks"

  // --- consultant context ---
  assumptions: [ "Client provides product images and copy" ],
  risks:       [ "AI recommendations need ~500 SKUs to be useful" ]
}
```

### LLM response envelope
Every call returns:
```js
{
  reply: "string — the conversational markdown shown in the chat bubble",
  projectState: { ...full object above... }
}
```

The frontend keeps `projectState` in React state, renders `reply` in chat, renders `projectState` in the panel, and sends `projectState` back on the next turn.

---

## 5. Interactive editing — how the "use Postgres" flow works

No special machinery. **The client's message is the edit instruction.**

1. Client types: *"use PostgreSQL instead of MongoDB."*
2. We send: system prompt + conversation history + **current `projectState` JSON**.
3. Model returns the same state with the `Database` entry swapped, its `cost`/`reason` updated, `costBreakdown` + `totalCost` recomputed, plus a `reply`:
   > *"Done — switched to PostgreSQL for better relational reporting. That's +₹800, new total ₹18,800."*
4. Panel re-renders. Chat shows the one-line confirmation.

Same mechanism handles *"remove the chatbot feature"* (−₹4,000), *"add Razorpay"* (+₹3,000), etc. Pricing isn't invented — the **rate card lives in the system prompt** (Section 6).

**Versioning (lightweight):** on every state change, push a snapshot into a `versions[]` array. Powers an "undo" and a revision history on the final proposal. No compare-UI.

```js
versions: [ {label, projectState, timestamp}, ... ]
```

---

## 6. System prompt design

Keep it as **one prompt** (single Groq call concatenates everything anyway), but organize it into clear sections. Store it in a dedicated file, e.g. `frontend/src/lib/systemPrompt.js`, exporting a string (or a builder that injects the rate card).

Sections, in order:

1. **Persona** — warm, consultative senior architect. "We" language. (Reuse the good tone from the current prompt at `Chatbot.jsx:80`.)
2. **Conversation stages** — define the 8 stages and tell the model to always set `stage`.
3. **Division-selection rules** — the corrected definitions from Section 3 + scoring guidance. Must output ONE `recommendedDivision`.
4. **Architecture rules** — for each layer, give a `choice`, `reason`, and `alternatives`.
5. **Pricing rate card** — concrete ₹ ranges per component (migrate the numbers from `Chatbot.jsx:94-102`). This is what keeps costs believable and stable across edits.
6. **Editing rules** — when the user requests a change, mutate the relevant fields, recompute `costBreakdown`/`totalCost`, and confirm the delta in `reply`.
7. **Output contract** — the exact JSON schema from Section 4 + a worked example. Emphasize: *return valid JSON only, always include the full `projectState`, never drop fields.*

> Tip: include one full example `{reply, projectState}` in the prompt. Few-shot examples dramatically improve JSON reliability on Llama.

---

## 7. Backend proxy (Milestone 0 — do this first)

**Problem:** key is exposed + the dev proxy doesn't exist in prod.

**Solution:** a single server endpoint that holds the key and forwards to Groq. The browser calls *our* endpoint.

Pick ONE based on deployment (open decision — see Section 11):

**Option A — Serverless function (Vercel/Netlify).** Easiest. One file:
```js
// api/chat.js  (runs server-side; key never reaches the browser)
export default async function handler(req, res) {
  // optional: rate-limit by IP here
  const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, // server-only env, no VITE_ prefix
    },
    body: JSON.stringify({
      ...req.body,
      response_format: { type: "json_object" }, // enforce JSON mode here
    }),
  });
  const data = await r.json();
  res.status(r.status).json(data);
}
```

**Option B — Express route (Hostinger VPS, matches the bible's Node server).** Same logic in an `Express` handler at `POST /api/chat`.

**Frontend change:** `Chatbot.jsx` calls `fetch("/api/chat", …)` with **no Authorization header**. Delete the Groq key from the frontend entirely. Remove the `/api/grok` proxy from `vite.config.js` (or repoint it at the local server in dev).

---

## 8. UI changes — split the screen

Today `Chatbot.jsx`'s `<main>` is chat-only. Make it two panes:

```
┌────────────────────────────┬──────────────────────────────┐
│  CHAT (existing)           │  LIVE PROPOSAL PANEL (new)    │
│                            │   Division:  Vishnu  ⓘ        │
│   [messages…]              │   Timeline:  8 weeks          │
│                            │   Total:     ₹82,000          │
│                            │   Stack:     Next · Node · PG │
│   [input]                  │   Features:  ✔ Cart ✔ Wishlist│
│                            │   Breakdown: line items + ₹   │
└────────────────────────────┴──────────────────────────────┘
```

- New component: `frontend/src/components/ProposalPanel.jsx` — a **pure render of `projectState`**. Re-renders after every AI turn.
- Sections: recommended division + reason, timeline, total, tech stack (with swap hints), feature checklist, itemized cost breakdown.
- **Mobile:** collapsible bottom-sheet / drawer (use the existing Framer Motion already in the project).
- The current bottom info-cards (Messages / Time / Status, `Chatbot.jsx:450`) get folded into or replaced by the panel.

### Handoff rewrite (`handleConnectWithUs`, `Chatbot.jsx:164`)
Delete the regex budget detection (`Chatbot.jsx:174-194`) and keyword division detection (`Chatbot.jsx:199-205`) **entirely**. We now have real structured data:
- `target` ← map `recommendedDivision` to the contact form's enum (`TechCreator`/`TechPreserver`/`TechTransformer`).
- `budget` ← `totalCost`.
- `description` ← a generated proposal: division, goal, stack, feature list, itemized quote, timeline, assumptions, risks.

The contact form (`Contactus.jsx`) already accepts a `prefill` via router state — no change needed there beyond richer content.

---

## 9. File-by-file change map

| File | Change |
|---|---|
| `api/chat.js` *(new)* or Express route | Server-side Groq proxy, holds key, forces JSON mode. **M0** |
| `frontend/vite.config.js` | Remove/repoint the `/api/grok` dev proxy. **M0** |
| `frontend/src/lib/systemPrompt.js` *(new)* | Sectioned system prompt + rate card + JSON contract + example. **M1** |
| `frontend/src/lib/projectState.js` *(new)* | Empty-state factory, `versions` push helper, total re-verify. **M1** |
| `frontend/src/pages/Chatbot.jsx` | Call `/api/chat`; parse `{reply, projectState}`; store state; render `reply`; rewrite handoff. **M1–M6** |
| `frontend/src/components/ProposalPanel.jsx` *(new)* | Live render of `projectState`; mobile drawer. **M3** |
| `techbrahmand_project_bible.md` | Fix the stale Vishnu/Mahesh definitions (Section 3). **any time** |

---

## 10. Build order & milestones

Each milestone is shippable and has an acceptance check. Sizes: S ≈ half-day, M ≈ 1–2 days.

| # | Milestone | Acceptance criteria | Size |
|---|---|---|---|
| **0** | **Backend proxy + key moved server-side** | Chatbot works in a production build; no `VITE_GROK_API_KEY` in the bundle; key only in server env. | S |
| **1** | **JSON-mode call returning `{reply, projectState}`** | Every turn parses valid JSON; `reply` renders as today; `projectState` logged in console. Graceful fallback if JSON parse fails. | M |
| **2** | **One-division recommendation** | Bot picks exactly one division with a reason; the 3-way dump is gone; uses corrected definitions. | S |
| **3** | **Live proposal side-panel** | Panel renders division, total, stack, features, breakdown; updates after each turn; mobile drawer works. | M |
| **4** | **Itemized cost breakdown w/ reasons** | Quote shows line items each with a ₹ and a reason; total = sum; numbers come from the rate card. | M |
| **5** | **Interactive edit + re-price + versions** | "Use PostgreSQL" / "remove X" / "add Razorpay" swap the line and update the total; `versions[]` grows; reply states the delta. | M |
| **6** | **Real proposal into handoff** | "Connect with us" prefills the contact form from `projectState` (division→target, total→budget, full proposal→description). Regex code deleted. | S |
| **7** | **Hardening** | `localStorage` persistence of sessions+state; IP rate-limit on the proxy; prompt-injection guard; input length cap. | M |

**Milestones 0–2** already fix the client's loudest complaint (one division, no generic dump).
**3–5** deliver the "feels custom" magic.
**6–7** close the sales loop and make it production-grade.

---

## 11. Open decisions (need answers before M0)

1. **Deployment target** — Vercel/Netlify serverless function (Option A, easiest) **or** Express on the Hostinger VPS (Option B, matches the bible)? Determines where the proxy code lives.
2. **Model** — stay on Groq `llama-3.3-70b-versatile` (recommended; fast, cheap, JSON mode works) or switch to Claude? The redesign is model-agnostic, so this can be decided later by testing reasoning quality.
3. **Persistence depth** — `localStorage` only (M7) or a real DB (the bible mentions MongoDB) so the sales team can see past conversations server-side?

---

## 12. Mapping back to the original 13-phase brief

For reference, this plan covers the original phases but consolidated:

| Original phase | Where it lives here |
|---|---|
| 1 Project state, 8 Decision-memory | `ProjectState` (§4) |
| 2 Conversation stages | `stage` field (§4) |
| 3 Division recommendation | §3 + `recommendedDivision` (M2) |
| 4 Architecture engine | `techStack[]` with reasons (§4) |
| 5 Cost engine | `costBreakdown[]` (§4, M4) |
| 6 Interactive editing | §5 (M5) |
| 7 Versioning | `versions[]`, lightweight (§5) |
| 9 Smart recommendations | Prompt behavior (§6) |
| 10 Proposal panel | `ProposalPanel.jsx` (§8) |
| 11 Final deliverable | Handoff rewrite (§8, M6) |
| 12 Prompt refactor | Sectioned single prompt (§6) |
| 13 Security/persistence | Proxy (§7, M0) + hardening (M7) |

**Dropped as over-engineering for our scale:** multi-agent prompt graph, custom diff engine, version-comparison UI.

---

## 13. Guiding principle

> The chatbot should never feel like it's generating a fresh answer from scratch. It should feel like it's continuously evolving **one** project proposal — recommending a single division, justifying every rupee, and adapting live to the client's edits.
