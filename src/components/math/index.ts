// Export math utility functions and constants

export const MathEntities = {
  gt: '&gt;',      // >
  lt: '&lt;',      // <
  gte: '&ge;',     // ≥
  lte: '&le;',     // ≤
  plusmn: '&plusmn;', // ±
  times: '&times;',   // ×
  divide: '&divide;', // ÷
} as const;

export const formatComparison = (operator: keyof typeof MathEntities, value: string | number) => {
  return `${MathEntities[operator]} ${value}`;
};

// Common patterns
export const mathPatterns = {
  greaterThan: (value: string | number) => `&gt; ${value}`,
  lessThan: (value: string | number) => `&lt; ${value}`,
  greaterEqual: (value: string | number) => `&ge; ${value}`,
  lessEqual: (value: string | number) => `&le; ${value}`,
  range: (min: string | number, max: string | number) => `${min} - ${max}`,
  percentage: (value: string | number, operator: 'gt' | 'lt' | 'gte' | 'lte' = 'gt') => 
    `${MathEntities[operator]} ${value}%`,
};
