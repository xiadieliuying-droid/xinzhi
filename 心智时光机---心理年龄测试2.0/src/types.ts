export namespace Type {
  export type Dimension = "Curiosity" | "Stability" | "Social" | "Responsibility" | "Resilience" | "Passion" | "Inclusivity" | "Acceptance" | "A" | "B" | "C" | "D" | "E";

  export interface Option {
    text: string;
    score: number; // 1-4
  }

  export interface Question {
    id: number;
    text: string;
    options: Option[];
    dimensions: Dimension[];
  }

  export interface TestResult {
    id?: number;
    date: string;
    totalScore: number;
    psychologicalAge: number;
    realAge?: number;
    dimensionScores: Record<Dimension, number>;
    personalitySketch: string;
    growthAdvice: string;
    strengths: string[];
    blindSpots: string[];
    tags: string[];
  }

  export interface HistoryRecord {
    id: number;
    date: string;
    psychologicalAge: number;
    realAge?: number;
    dimensionScores: string; // JSON string
  }
}
