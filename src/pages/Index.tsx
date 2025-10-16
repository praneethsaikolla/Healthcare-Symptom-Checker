import { useState } from "react";
import { SymptomForm } from "@/components/SymptomForm";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Activity, Heart } from "lucide-react";

interface AnalysisResult {
  conditions: string[];
  recommendations: string[];
  disclaimer: string;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (symptoms: string) => {
    setIsLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('check-symptoms', {
        body: { symptoms }
      });

      if (error) {
        console.error('Function invocation error:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to analyze symptoms. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      setResult(data);
      toast({
        title: "Analysis Complete",
        description: "Your symptoms have been analyzed successfully.",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-[var(--shadow-medium)]">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Healthcare Symptom Checker</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Educational Health Analysis</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Hero Section */}
          {!result && (
            <div className="text-center space-y-4 max-w-2xl">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <Activity className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                Get Instant Health Insights
              </h2>
              <p className="text-lg text-muted-foreground">
                Describe your symptoms and receive AI-powered analysis with possible conditions and recommendations.
                Remember, this is for educational purposes only.
              </p>
            </div>
          )}

          {/* Symptom Form */}
          <SymptomForm onSubmit={handleSubmit} isLoading={isLoading} />

          {/* Results */}
          {result && (
            <ResultsDisplay
              conditions={result.conditions}
              recommendations={result.recommendations}
              disclaimer={result.disclaimer}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>
            Built with Lovable Cloud & AI • For Educational Purposes Only • Not Medical Advice
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;