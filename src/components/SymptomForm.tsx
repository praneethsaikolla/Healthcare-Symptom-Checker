import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Stethoscope } from "lucide-react";

interface SymptomFormProps {
  onSubmit: (symptoms: string) => Promise<void>;
  isLoading: boolean;
}

export function SymptomForm({ onSubmit, isLoading }: SymptomFormProps) {
  const [symptoms, setSymptoms] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (symptoms.trim()) {
      await onSubmit(symptoms);
    }
  };

  return (
    <Card className="w-full max-w-2xl shadow-[var(--shadow-medium)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Stethoscope className="h-6 w-6 text-primary" />
          Describe Your Symptoms
        </CardTitle>
        <CardDescription>
          Tell us what symptoms you're experiencing. Be as detailed as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Example: I've been experiencing a headache, fatigue, and a slight fever for the past 2 days..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="min-h-[150px] resize-none"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
            disabled={isLoading || !symptoms.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Symptoms...
              </>
            ) : (
              "Analyze Symptoms"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}