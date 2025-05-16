
interface ElementScore {
  code: string;
  value: number;
}

const elementDifficultyValues: Record<string, number> = {
  // These are example values - real trampoline scoring would need complete values
  "801<": 0.8,
  "803/": 0.9,
  "811o": 1.0,
  "821<": 1.1,
  "831,": 1.2,
};

export const calculateElementDifficulty = (code: string): number => {
  // This is a simplified version of the calculation
  // In a real app, you would implement the full FIG scoring rules
  return elementDifficultyValues[code] || 0;
};

export const calculatePassDifficulty = (elements: ElementScore[], discipline: "trampoline" | "doubleMini"): number => {
  // Sum all element values
  const total = elements.reduce((sum, element) => sum + element.value, 0);
  
  // Apply discipline-specific rules
  if (discipline === "trampoline") {
    // Add any trampoline-specific rules here
    return parseFloat(total.toFixed(1));
  } else {
    // Double mini rules
    return parseFloat(total.toFixed(1));
  }
};

export const quickExamples = [
  { code: "801<", description: "Triple somersault pike" },
  { code: "803/", description: "Triple somersault with half twist" },
  { code: "811o", description: "Triple somersault tuck with full twist" },
  { code: "821<", description: "Triple somersault pike with double twist" },
  { code: "831,", description: "Triple somersault with triple twist" }
];
