import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { SymptomPredictionOutput } from "@/lib/types";
import { BrainCircuit, Loader2 } from "lucide-react";

interface SymptomPredictionProps {
  prediction: SymptomPredictionOutput | null;
  onPredict: () => void;
  isLoading: boolean;
}

export function SymptomPrediction({ prediction, onPredict, isLoading }: SymptomPredictionProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <BrainCircuit className="h-5 w-5 text-primary" />
          Symptom Prediction
        </CardTitle>
        <CardDescription>Forecast future symptoms based on your logs.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-8 w-1/2 mt-2" />
          </div>
        ) : prediction ? (
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Predicted Severity:</p>
              <p className="text-sm">{prediction.predictedSeverity}</p>
            </div>
            <div>
              <p className="font-semibold">Confidence Level:</p>
              <Progress value={prediction.confidenceLevel * 100} className="mt-2" />
            </div>
            <div>
              <p className="font-semibold">Recommendations:</p>
              <p className="text-sm text-muted-foreground">{prediction.recommendations}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-center text-muted-foreground">
            <p>Your symptom prediction will appear here. You need at least 2 logs to generate a prediction.</p>
          </div>
        )}
      </CardContent>
      <div className="p-6 pt-0">
        <Button onClick={onPredict} disabled={isLoading} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Predicting..." : "Predict Future Symptoms"}
        </Button>
      </div>
    </Card>
  );
}
