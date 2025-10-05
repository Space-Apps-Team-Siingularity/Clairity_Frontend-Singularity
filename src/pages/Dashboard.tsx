import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AQIBadge from "@/components/AQIBadge";
import { MapPin, Wind, Droplets, Thermometer, Eye, Activity, AlertTriangle } from "lucide-react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useMemo, useState } from "react";
import { getBrowserCoordinates, estimateMenaCity } from "@/lib/geo";
import { fetchOpenMeteoCurrent } from "@/lib/openmeteo";
import { callPredict, callPredict7, parseScoreFromMarkdown } from "@/lib/hf";
import { getHealthBoxes, getFallbackHealthBoxes } from "@/lib/llm";

const Dashboard = () => {
  const [locationLabel, setLocationLabel] = useState<string>("Detecting location...");
  const [city, setCity] = useState<string>("Other");
  const [score, setScore] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [temperatureC, setTemperatureC] = useState<number | null>(null);
  const [windKph, setWindKph] = useState<number | null>(null);
  const [humidityPct, setHumidityPct] = useState<number | null>(null);
  const [healthBoxes, setHealthBoxes] = useState<{ category: string; general: string; sensitiveGroups: string } | null>(null);

  const [weeklyRows, setWeeklyRows] = useState<(string | number)[][]>([]);
  const weekdayFromISO = (d: string) => {
    const dt = new Date(`${d}T00:00:00Z`);
    return dt.toLocaleDateString(undefined, { weekday: "short", timeZone: "UTC" });
  };
  const weeklyForecast = useMemo(() => {
    // Expect headers: Date, AQI, Score, Category, Temp (°C)
    return weeklyRows.slice(0, 7).map((r) => ({
      day: weekdayFromISO(String(r[0] ?? "")),
      aqi: Number(r[1] ?? 0),
      temp: Number(r[4] ?? 0),
    }));
  }, [weeklyRows]);

  // pollutant composition removed

  useEffect(() => {
    (async () => {
      const coords = await getBrowserCoordinates();
      if (!coords) return;
      try {
        const rev = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`).then((r) => r.json());
        const locCity = rev.address?.city || rev.address?.town || rev.address?.village || "Unknown Location";
        const country = rev.address?.country || "";
        setLocationLabel(`${locCity}, ${country}`);
      } catch {
        setLocationLabel(`${coords.latitude.toFixed(2)}°, ${coords.longitude.toFixed(2)}°`);
      }

      const est = estimateMenaCity({ latitude: coords.latitude, longitude: coords.longitude });
      setCity(est);

      try {
        const current = await fetchOpenMeteoCurrent({ latitude: coords.latitude, longitude: coords.longitude });
        setTemperatureC(current.temperatureC);
        setWindKph(current.windSpeedKph);
        setHumidityPct(current.humidityPct);
      } catch {}

      try {
        const pred = await callPredict(est);
        const parsed = parseScoreFromMarkdown(pred.raw);
        setScore(parsed.score);
        setCategory(parsed.category);
        try {
          const llm = await getHealthBoxes(est, parsed.score, parsed.category);
          setHealthBoxes(llm);
        } catch {
          setHealthBoxes(getFallbackHealthBoxes(est, parsed.score, parsed.category));
        }
      } catch {}

      try {
        const seven = await callPredict7(est);
        setWeeklyRows(seven.table.data);
      } catch {}
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span>{locationLabel}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Air Quality <span className="gradient-text">Dashboard</span>
            </h1>
          </div>

          {/* Current Conditions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 hover-lift bg-gradient-aqi-good">
              <div className="flex items-center justify-between mb-4">
                <div className="text-white/80 text-sm font-medium">Air Quality Score</div>
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{score !== null ? Math.round(score) : "--"}</div>
              <div className="text-white/80 text-sm">{category ?? "Loading..."}</div>
            </Card>

            <Card className="p-6 hover-lift bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="text-muted-foreground text-sm font-medium">Temperature</div>
                <Thermometer className="h-5 w-5 text-primary" />
              </div>
              <div className="text-4xl font-bold mb-2">{temperatureC !== null ? `${Math.round(temperatureC)}°C` : "--"}</div>
              <div className="text-muted-foreground text-sm">Celsius</div>
            </Card>

            <Card className="p-6 hover-lift bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="text-muted-foreground text-sm font-medium">Wind Speed</div>
                <Wind className="h-5 w-5 text-accent" />
              </div>
              <div className="text-4xl font-bold mb-2">{windKph !== null ? `${Math.round(windKph)} km/h` : "--"}</div>
              <div className="text-muted-foreground text-sm">10 m @ 10m height</div>
            </Card>

            <Card className="p-6 hover-lift bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="text-muted-foreground text-sm font-medium">Humidity</div>
                <Droplets className="h-5 w-5 text-secondary" />
              </div>
              <div className="text-4xl font-bold mb-2">{humidityPct !== null ? `${Math.round(humidityPct)}%` : "--"}</div>
              <div className="text-muted-foreground text-sm">Relative humidity</div>
            </Card>
          </div>

          {/* 7-Day Forecast */}
          <Tabs defaultValue="forecast" className="mb-8">
            <TabsList className="grid w-full md:w-auto grid-cols-1 mb-6">
              <TabsTrigger value="forecast">7-Day Forecast</TabsTrigger>
            </TabsList>

            <TabsContent value="forecast">
              <Card className="p-6 bg-card/80 backdrop-blur">
                <h3 className="text-xl font-semibold mb-6">7-Day Air Quality Forecast</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={weeklyForecast}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                    <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="aqi" stroke="hsl(210, 100%, 50%)" strokeWidth={3} name="AQI" />
                    <Line yAxisId="right" type="monotone" dataKey="temp" stroke="hsl(14, 91%, 51%)" strokeWidth={2} name="Temperature (°C)" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Data Sources & Alerts */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-card/80 backdrop-blur">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Active Data Sources</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: "NASA TEMPO", status: "Active", updated: "Oct 1", quality: "Realtime" },
                  { name: "NASA MERRA-2", status: "Active", updated: "Oct 1", quality: "Reanalysis" },
                  { name: "Open-Meteo", status: "Active", updated: "now", quality: "Forecast" },
                  { name: "NASA OMI", status: "Active", updated: "Oct 1", quality: "Ozone" },
                ].map((source, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div>
                      <div className="font-medium">{source.name}</div>
                      <div className="text-xs text-muted-foreground">Updated {source.updated}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-secondary">{source.quality}</div>
                      <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-card/80 backdrop-blur">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <h3 className="text-xl font-semibold">Health Recommendations</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="font-semibold mb-1">{healthBoxes?.category ?? "Health Advisory"}</div>
                  <p className="text-sm text-muted-foreground">{healthBoxes?.general ?? "Loading..."}</p>
                </div>
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="font-semibold mb-1">Sensitive Groups</div>
                  <p className="text-sm text-muted-foreground">{healthBoxes?.sensitiveGroups ?? "Loading..."}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
