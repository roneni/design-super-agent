export const verdictSchema = {
  type: 'object' as const,
  properties: {
    verdict: {
      type: 'string' as const,
      enum: ['approve', 'reject', 'escalate'],
      description: 'Binary judgment on the final design output',
    },
    summary: {
      type: 'string' as const,
      description: 'One-paragraph summary of what was accomplished',
    },
    iterations: {
      type: 'number' as const,
      description: 'How many review cycles were needed',
    },
    failures_fixed: {
      type: 'array' as const,
      items: {
        type: 'object' as const,
        properties: {
          rule: { type: 'string' as const, description: 'Knowledge base rule that was violated' },
          description: { type: 'string' as const, description: 'What was wrong' },
          fix_applied: { type: 'string' as const, description: 'What the sub-agent changed' },
        },
        required: ['rule', 'description', 'fix_applied'],
      },
    },
    remaining_failures: {
      type: 'array' as const,
      items: {
        type: 'object' as const,
        properties: {
          rule: { type: 'string' as const },
          description: { type: 'string' as const },
          reason_unresolved: { type: 'string' as const },
        },
        required: ['rule', 'description', 'reason_unresolved'],
      },
    },
  },
  required: ['verdict', 'summary', 'iterations', 'failures_fixed', 'remaining_failures'],
};

export interface Verdict {
  verdict: 'approve' | 'reject' | 'escalate';
  summary: string;
  iterations: number;
  failures_fixed: Array<{
    rule: string;
    description: string;
    fix_applied: string;
  }>;
  remaining_failures: Array<{
    rule: string;
    description: string;
    reason_unresolved: string;
  }>;
}
