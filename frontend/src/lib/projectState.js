// The single living object the chatbot evolves every turn.
export function emptyProjectState() {
  return {
    stage: "greeting", // greeting|discovery|analysis|recommendation|architecture|quotation|refinement|handoff
    recommendedDivision: null, // 'brahma' | 'vishnu' | 'mahesh'
    divisionScores: { brahma: 0, vishnu: 0, mahesh: 0 },
    divisionReason: "",
    businessGoal: "",
    industry: "",
    targetAudience: "",
    competitor: null,
    currentPlatform: null,
    features: [],      // { name, included, cost, reason }
    techStack: [],     // { layer, choice, cost, reason, alternatives: [] }
    costBreakdown: [], // { item, cost, reason }
    totalCost: 0,
    timeline: "",
    assumptions: [],
    risks: [],
  };
}

// Recompute total from line items (don't trust the model's arithmetic blindly).
export function recomputeTotal(state) {
  const total = (state.costBreakdown || []).reduce((sum, l) => sum + (Number(l.cost) || 0), 0);
  return { ...state, totalCost: total };
}

// Push a snapshot for undo / revision history (Phase 7 uses this).
export function pushVersion(versions, state, label) {
  return [...(versions || []), { label, state, timestamp: Date.now() }];
}
