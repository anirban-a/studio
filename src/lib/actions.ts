"use server";

import { getFoodRecommendations, type FoodRecommendationsInput } from "@/ai/flows/food-recommendations";
import { predictSymptomSeverity, type SymptomPredictionInput } from "@/ai/flows/symptom-prediction";

export async function getFoodRecommendationsAction(input: FoodRecommendationsInput) {
  const result = await getFoodRecommendations(input);
  return result;
}

export async function predictSymptomSeverityAction(input: SymptomPredictionInput) {
  const result = await predictSymptomSeverity(input);
  return result;
}
