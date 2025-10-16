-- Create symptom_queries table to store user queries and AI responses
CREATE TABLE IF NOT EXISTS public.symptom_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symptoms TEXT NOT NULL,
  conditions JSONB NOT NULL DEFAULT '[]'::jsonb,
  recommendations JSONB NOT NULL DEFAULT '[]'::jsonb,
  disclaimer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Add index for faster queries by date
CREATE INDEX IF NOT EXISTS idx_symptom_queries_created_at ON public.symptom_queries(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.symptom_queries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read queries (for educational purposes)
CREATE POLICY "Anyone can view symptom queries"
  ON public.symptom_queries
  FOR SELECT
  USING (true);

-- Create policy to allow anyone to insert queries
CREATE POLICY "Anyone can create symptom queries"
  ON public.symptom_queries
  FOR INSERT
  WITH CHECK (true);