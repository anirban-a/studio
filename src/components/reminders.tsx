"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Reminders() {
  const { toast } = useToast();

  const handleReminderChange = (enabled: boolean) => {
    if (enabled) {
      toast({
        title: "Reminders Enabled",
        description: "We'll remind you to log your symptoms. (This is a demo feature)",
      });
    } else {
      toast({
        title: "Reminders Disabled",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <Bell className="h-5 w-5 text-primary" />
          Reminders
        </CardTitle>
        <CardDescription>Set reminders to log your daily intake and symptoms.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
          <Label htmlFor="reminder-switch" className="flex flex-col space-y-1">
            <span>Hourly Reminders</span>
            <span className="font-normal leading-snug text-muted-foreground">
              Get notified to log your data every hour.
            </span>
          </Label>
          <Switch 
            id="reminder-switch" 
            onCheckedChange={handleReminderChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
