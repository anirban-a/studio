"use client";

import { useState, useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { SymptomLog } from "@/lib/types";
import type { FoodRecommendationsOutput, SymptomPredictionOutput } from "@/lib/types";
import { getFoodRecommendationsAction, predictSymptomSeverityAction } from "@/lib/actions";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SymptomForm } from "@/components/symptom-form";
import { FoodRecommendation } from "@/components/food-recommendation";
import { SymptomPrediction } from "@/components/symptom-prediction";
import { TrendsChart } from "@/components/trends-chart";
import { Reminders } from "@/components/reminders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [symptomLogs, setSymptomLogs] = useLocalStorage<SymptomLog[]>("symptomLogs", []);
  const [recommendations, setRecommendations] = useState<FoodRecommendationsOutput | null>(null);
  const [prediction, setPrediction] = useState<SymptomPredictionOutput | null>(null);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isPredictionLoading, setIsPredictionLoading] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (data: Omit<SymptomLog, "id" | "timestamp">) => {
    setIsFormLoading(true);
    try {
      const newLog: SymptomLog = {
        ...data,
        id: new Date().toISOString(),
        timestamp: new Date().toISOString(),
      };

      const aiInput = {
        symptoms: `Pain Level: ${data.painLevel}/10. Discomfort: ${data.discomfort}`,
        foodIntake: data.foodIntake,
      };
      const result = await getFoodRecommendationsAction(aiInput);
      setRecommendations(result);
      setSymptomLogs([...symptomLogs, newLog]);
      toast({
        title: "Log Saved",
        description: "Your symptom and food intake have been logged successfully.",
      });
    } catch (error) {
      console.error("Failed to get food recommendations:", error);
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Could not fetch recommendations. Please try again later.",
      });
    } finally {
      setIsFormLoading(false);
    }
  };

  const handlePrediction = async () => {
    if (symptomLogs.length < 2) {
      toast({
        variant: "default",
        title: "Not Enough Data",
        description: "Please log at least two entries to predict symptom severity.",
      });
      return;
    }
    setIsPredictionLoading(true);
    try {
      const historicalData = symptomLogs
        .map(
          (log) =>
            `On ${new Date(log.timestamp).toLocaleString()}, pain was ${log.painLevel}/10 with discomfort of "${log.discomfort}" after eating "${log.foodIntake}".`
        )
        .join("\n");

      const result = await predictSymptomSeverityAction({ historicalData });
      setPrediction(result);
    } catch (error) {
      console.error("Failed to predict symptom severity:", error);
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Could not generate prediction. Please try again later.",
      });
    } finally {
      setIsPredictionLoading(false);
    }
  };

  const recentLogs = useMemo(() => {
    return [...symptomLogs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5);
  }, [symptomLogs]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-background px-4 py-8 md:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1 flex flex-col gap-8">
            <SymptomForm onSubmit={handleFormSubmit} isLoading={isFormLoading} />
            <Reminders />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="grid gap-8 md:grid-cols-2">
              <FoodRecommendation recommendation={recommendations} isLoading={isFormLoading} />
              <SymptomPrediction prediction={prediction} onPredict={handlePrediction} isLoading={isPredictionLoading} />
            </div>
            <TrendsChart data={symptomLogs} />
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <Utensils className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {symptomLogs.length > 0 ? (
                  <ul className="space-y-4">
                    {recentLogs.map((log) => (
                      <li key={log.id} className="flex items-start gap-4">
                        <div className="text-sm text-muted-foreground w-28 shrink-0">
                          {new Date(log.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          <br/>
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="border-l-2 border-accent pl-4">
                          <p className="font-semibold">Pain: {log.painLevel}/10</p>
                          <p className="text-muted-foreground text-sm">{log.discomfort}</p>
                          <p className="text-muted-foreground text-sm mt-1">
                            <span className="font-medium text-foreground">Ate:</span> {log.foodIntake}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No activity logged yet. Use the form to get started.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
