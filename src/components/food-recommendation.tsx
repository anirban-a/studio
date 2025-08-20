import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { FoodRecommendationsOutput } from "@/lib/types";
import { Lightbulb } from "lucide-react";

interface FoodRecommendationProps {
  recommendation: FoodRecommendationsOutput | null;
  isLoading: boolean;
}

export function FoodRecommendation({ recommendation, isLoading }: FoodRecommendationProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <Lightbulb className="h-5 w-5 text-primary" />
          AI Food Insights
        </CardTitle>
        <CardDescription>Personalized recommendations based on your input.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-10 w-full mt-4" />
          </div>
        ) : recommendation ? (
          <div className="space-y-4">
            <p className="text-sm">{recommendation.recommendations}</p>
            <div className="text-xs text-muted-foreground bg-accent/50 p-3 rounded-lg">
              <p className="font-semibold">Disclaimer</p>
              <p>{recommendation.disclaimer}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-center text-muted-foreground">
            <p>Your food recommendations will appear here after you log your symptoms.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
