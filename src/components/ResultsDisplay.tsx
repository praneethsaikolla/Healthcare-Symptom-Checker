import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

interface ResultsDisplayProps {
  conditions: string[];
  recommendations: string[];
  disclaimer: string;
}

export function ResultsDisplay({ conditions, recommendations, disclaimer }: ResultsDisplayProps) {
  return (
    <div className="w-full max-w-2xl space-y-6 animate-in fade-in-50 duration-500">
      {/* Disclaimer Alert */}
      <Alert className="border-destructive/50 bg-destructive/10">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        <AlertDescription className="text-sm font-medium text-foreground">
          {disclaimer}
        </AlertDescription>
      </Alert>

      {/* Possible Conditions */}
      <Card className="shadow-[var(--shadow-medium)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Possible Conditions
          </CardTitle>
          <CardDescription>
            Based on your symptoms, here are some potential conditions to consider:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {conditions.map((condition, index) => (
              <li key={index} className="flex items-start gap-3">
                <Badge variant="outline" className="mt-0.5 shrink-0">
                  {index + 1}
                </Badge>
                <span className="text-foreground">{condition}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="shadow-[var(--shadow-medium)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-secondary" />
            Recommended Next Steps
          </CardTitle>
          <CardDescription>
            Here's what you should consider doing:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                  <CheckCircle2 className="h-4 w-4 text-secondary" />
                </div>
                <span className="text-foreground">{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}