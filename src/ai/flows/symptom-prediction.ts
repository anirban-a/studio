'use server';

/**
 * @fileOverview A UTI symptom prediction AI agent.
 *
 * - predictSymptomSeverity - A function that predicts future UTI symptom severity based on historical data.
 * - SymptomPredictionInput - The input type for the predictSymptomSeverity function.
 * - SymptomPredictionOutput - The return type for the predictSymptomSeverity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomPredictionInputSchema = z.object({
  historicalData: z
    .string()
    .describe(
      'A string containing the user historical data, including hourly feedback on UTI symptoms (pain level, discomfort) and food intake.'
    ),
});
export type SymptomPredictionInput = z.infer<typeof SymptomPredictionInputSchema>;

const SymptomPredictionOutputSchema = z.object({
  predictedSeverity: z
    .string()
    .describe(
      'The predicted severity of future UTI symptoms, including pain level and discomfort, based on historical data.'
    ),
  confidenceLevel: z
    .number()
    .describe('A numerical value representing the confidence level of the prediction (0-1).'),
  recommendations: z
    .string()
    .describe(
      'Personalized recommendations for managing potential discomfort or pain based on predicted symptom severity and food intake.'
    ),
});
export type SymptomPredictionOutput = z.infer<typeof SymptomPredictionOutputSchema>;

export async function predictSymptomSeverity(
  input: SymptomPredictionInput
): Promise<SymptomPredictionOutput> {
  return symptomPredictionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'symptomPredictionPrompt',
  input: {schema: SymptomPredictionInputSchema},
  output: {schema: SymptomPredictionOutputSchema},
  prompt: `You are a medical assistant specializing in predicting UTI symptom severity.

You will use the provided historical data to predict the severity of future UTI symptoms, including pain level and discomfort. Provide a confidence level for the prediction (0-1). Also, give personalized recommendations for managing potential discomfort or pain based on predicted symptom severity and food intake.

Historical Data: {{{historicalData}}}`,
});

const symptomPredictionFlow = ai.defineFlow(
  {
    name: 'symptomPredictionFlow',
    inputSchema: SymptomPredictionInputSchema,
    outputSchema: SymptomPredictionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
