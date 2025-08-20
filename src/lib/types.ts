import type { FoodRecommendationsOutput as FoodRecs } from "@/ai/flows/food-recommendations";
import type { SymptomPredictionOutput as SymptomPreds } from "@/ai/flows/symptom-prediction";

export interface SymptomLog {
  id: string;
  timestamp: string;
  painLevel: number;
  discomfort: string;
  foodIntake: string;
}

export type FoodRecommendationsOutput = FoodRecs;
export type SymptomPredictionOutput = SymptomPreds;
