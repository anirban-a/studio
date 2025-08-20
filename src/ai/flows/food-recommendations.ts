'use server';

/**
 * @fileOverview A food recommendation AI agent.
 *
 * - getFoodRecommendations - A function that handles the food recommendation process.
 * - FoodRecommendationsInput - The input type for the getFoodRecommendations function.
 * - FoodRecommendationsOutput - The return type for the getFoodRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FoodRecommendationsInputSchema = z.object({
  symptoms: z
    .string()
    .describe('Description of current UTI symptoms, including pain level and discomfort.'),
  foodIntake: z
    .string()
    .describe('List of foods consumed in the last hour.'),
});
export type FoodRecommendationsInput = z.infer<typeof FoodRecommendationsInputSchema>;

const FoodRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('Personalized food recommendations based on symptoms and food intake.'),
  disclaimer:
    z.string()
    .describe('A disclaimer stating that the app\'s suggestions should not replace medical advice from a healthcare professional.'),
});
export type FoodRecommendationsOutput = z.infer<typeof FoodRecommendationsOutputSchema>;

export async function getFoodRecommendations(input: FoodRecommendationsInput): Promise<FoodRecommendationsOutput> {
  return foodRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'foodRecommendationsPrompt',
  input: {schema: FoodRecommendationsInputSchema},
  output: {schema: FoodRecommendationsOutputSchema},
  prompt: `You are a nutritionist specializing in UTI dietary management. Based on the user's symptoms and food intake, provide personalized food recommendations. 

Symptoms: {{{symptoms}}}
Food Intake: {{{foodIntake}}}

Include a disclaimer stating that the app's suggestions should not replace medical advice from a healthcare professional.`, 
});

const foodRecommendationsFlow = ai.defineFlow(
  {
    name: 'foodRecommendationsFlow',
    inputSchema: FoodRecommendationsInputSchema,
    outputSchema: FoodRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
