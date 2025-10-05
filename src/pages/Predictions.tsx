import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { callPredict, parseScoreFromMarkdown } from "@/lib/hf";
import { Loader2, Wind, Droplets, Gauge, Thermometer } from "lucide-react";
import AQIBadge from "@/components/AQIBadge";

const predictionSchema = z.object({
  city: z.string().min(1, "Please select a city"),
  pm25: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0 && num <= 500;
  }, "PM2.5 must be between 0 and 500"),
  temperature: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= -50 && num <= 60;
  }, "Temperature must be between -50°C and 60°C"),
  humidity: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0 && num <= 100;
  }, "Humidity must be between 0% and 100%"),
  pressure: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 800 && num <= 1200;
  }, "Pressure must be between 800 and 1200 hPa"),
});

type PredictionFormData = z.infer<typeof predictionSchema>;

const cities = [
  "Abu Dhabi",
  "Dubai",
  "Riyadh",
  "Doha",
  "Kuwait City",
  "Muscat",
  "Manama",
  "Cairo",
  "Amman",
  "Beirut"
];

const Predictions = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PredictionFormData>({
    resolver: zodResolver(predictionSchema),
    defaultValues: {
      city: "Abu Dhabi",
      pm25: "0",
      temperature: "0",
      humidity: "0",
      pressure: "0",
    },
  });

  const selectedCity = watch("city");

  const onSubmit = async (data: PredictionFormData) => {
    setIsLoading(true);
    setPrediction(null);

    try {
      const res = await callPredict(data.city);
      const parsed = parseScoreFromMarkdown(res.raw);
      setPrediction({ markdown: res.raw, parsed });

      toast({
        title: "Prediction Complete",
        description: "Air quality prediction has been generated successfully.",
      });
    } catch (error) {
      console.error("Error getting prediction:", error);
      toast({
        title: "Error",
        description: "Failed to get air quality prediction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Air Quality Predictions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Predict air quality using sensor data combined with atmospheric measurements
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Form */}
          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle>Input Sensor Data</CardTitle>
              <CardDescription>
                Enter sensor measurements or leave blank to use dataset values
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* City Selection */}
                <div className="space-y-2">
                  <Label htmlFor="city">Select City</Label>
                  <Select
                    value={selectedCity}
                    onValueChange={(value) => setValue("city", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.city && (
                    <p className="text-sm text-destructive">{errors.city.message}</p>
                  )}
                </div>

                {/* PM2.5 */}
                <div className="space-y-2">
                  <Label htmlFor="pm25" className="flex items-center gap-2">
                    <Wind className="h-4 w-4" />
                    PM2.5 (μg/m³)
                  </Label>
                  <Input
                    id="pm25"
                    type="number"
                    step="0.1"
                    placeholder="0"
                    {...register("pm25")}
                  />
                  {errors.pm25 && (
                    <p className="text-sm text-destructive">{errors.pm25.message}</p>
                  )}
                </div>

                {/* Temperature */}
                <div className="space-y-2">
                  <Label htmlFor="temperature" className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4" />
                    Temperature (°C)
                  </Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    placeholder="0"
                    {...register("temperature")}
                  />
                  {errors.temperature && (
                    <p className="text-sm text-destructive">{errors.temperature.message}</p>
                  )}
                </div>

                {/* Humidity */}
                <div className="space-y-2">
                  <Label htmlFor="humidity" className="flex items-center gap-2">
                    <Droplets className="h-4 w-4" />
                    Humidity (%)
                  </Label>
                  <Input
                    id="humidity"
                    type="number"
                    step="0.1"
                    placeholder="0"
                    {...register("humidity")}
                  />
                  {errors.humidity && (
                    <p className="text-sm text-destructive">{errors.humidity.message}</p>
                  )}
                </div>

                {/* Pressure */}
                <div className="space-y-2">
                  <Label htmlFor="pressure" className="flex items-center gap-2">
                    <Gauge className="h-4 w-4" />
                    Pressure (hPa)
                  </Label>
                  <Input
                    id="pressure"
                    type="number"
                    step="0.1"
                    placeholder="0"
                    {...register("pressure")}
                  />
                  {errors.pressure && (
                    <p className="text-sm text-destructive">{errors.pressure.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Predicting...
                    </>
                  ) : (
                    "Predict Air Quality"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle>Prediction Results</CardTitle>
              <CardDescription>
                AI-powered air quality prediction based on your inputs
              </CardDescription>
            </CardHeader>
            <CardContent>
              {prediction ? (
                <div className="space-y-4">
                  <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Predicted Score & Category</h3>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-bold">{prediction.parsed?.score ?? "--"}</div>
                      <div className="text-sm">{prediction.parsed?.category ?? "--"}</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold">Raw Output</h3>
                    <pre className="p-4 rounded-lg bg-muted text-sm overflow-auto max-h-96">{prediction.markdown}</pre>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Wind className="h-16 w-16 mx-auto mb-4 opacity-20" />
                  <p>Enter sensor data and click predict to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-8 max-w-6xl mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle>About This Prediction System</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              This air quality prediction system combines real-time sensor data with satellite
              and atmospheric measurements to provide accurate forecasts for cities across the
              MENA region. The AI model has been trained on historical data from multiple sources
              including the TEMPO satellite system.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Note: Leave sensor fields blank to use only dataset values for prediction.
            </p>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Predictions;
