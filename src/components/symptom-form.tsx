"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HeartPulse, Loader2 } from "lucide-react";
import type { SymptomLog } from "@/lib/types";

const formSchema = z.object({
  painLevel: z.number().min(0).max(10),
  discomfort: z.string().min(3, {
    message: "Please describe your discomfort in a few words.",
  }).max(200, { message: "Description is too long." }),
  foodIntake: z.string().min(3, {
    message: "Please list the food you consumed.",
  }).max(200, { message: "Food list is too long." }),
});

type SymptomFormValues = Omit<SymptomLog, "id" | "timestamp">;

interface SymptomFormProps {
  onSubmit: (data: SymptomFormValues) => void;
  isLoading: boolean;
}

export function SymptomForm({ onSubmit, isLoading }: SymptomFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      painLevel: 3,
      discomfort: "",
      foodIntake: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <HeartPulse className="h-5 w-5 text-primary" />
          How are you feeling?
        </CardTitle>
        <CardDescription>Log your symptoms and food intake for the last hour.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="painLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pain Level: {field.value}</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={10}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discomfort"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discomfort Details</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., burning sensation, frequent urination..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foodIntake"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food Intake (last hour)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., water, cranberry juice, chicken sandwich..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Analyzing..." : "Log & Get Recommendation"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
