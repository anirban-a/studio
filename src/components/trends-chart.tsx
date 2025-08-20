"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { SymptomLog } from "@/lib/types";
import { TrendingUp } from "lucide-react";

interface TrendsChartProps {
  data: SymptomLog[];
}

export function TrendsChart({ data }: TrendsChartProps) {
  const chartData = data.map((log) => ({
    name: new Date(log.timestamp).toLocaleDateString([], { month: "short", day: "numeric" }),
    painLevel: log.painLevel,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <TrendingUp className="h-5 w-5 text-primary" />
          Symptom Trends
        </CardTitle>
        <CardDescription>Visualize your pain level over time.</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis allowDecimals={false} domain={[0, 10]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: "hsl(var(--accent))" }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="painLevel" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex h-[250px] items-center justify-center text-center text-muted-foreground">
            <p>Your symptom trend chart will appear here once you have some logs.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
