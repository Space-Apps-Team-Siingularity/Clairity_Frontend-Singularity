import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { city, pm25, temperature, humidity, pressure } = await req.json();

    console.log('Prediction request:', { city, pm25, temperature, humidity, pressure });

    // Prepare the form data for the Gradio API
    const formData = new FormData();
    formData.append('city', city || 'Abu Dhabi');
    formData.append('pm25', pm25?.toString() || '0');
    formData.append('temperature', temperature?.toString() || '0');
    formData.append('humidity', humidity?.toString() || '0');
    formData.append('pressure', pressure?.toString() || '0');

    // Call the Hugging Face Gradio API
    const response = await fetch('https://shauryac-mena-air-quality-predictor.hf.space/api/predict', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error:', response.status, errorText);
      throw new Error(`API request failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('Prediction result:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in predict-air-quality function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
