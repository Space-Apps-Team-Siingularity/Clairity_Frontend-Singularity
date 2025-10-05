import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AQIBadge from "@/components/AQIBadge";
import { Calendar, TrendingUp, AlertCircle, Cloud, Wind, Droplets, Sun } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useMemo, useState } from "react";
import { getBrowserCoordinates, estimateMenaCity } from "@/lib/geo";
import { fetchOpenMeteoDaily } from "@/lib/openmeteo";
import { callPredict7 } from "@/lib/hf";
import { getForecastBoxes, getFallbackForecastBoxes } from "@/lib/llm";

const Forecast = () => {
  const [city, setCity] = useState<string>("Other");
  const [tableHeaders, setTableHeaders] = useState<string[]>([]);
  const [tableRows, setTableRows] = useState<(string | number)[][]>([]);
  const [insights, setInsights] = useState<{ daysToWatch: string; goodDays: string; otherInfo: string } | null>(null);

  useEffect(() => {
    (async () => {
      const coords = await getBrowserCoordinates();
      if (!coords) return;
      const est = estimateMenaCity({ latitude: coords.latitude, longitude: coords.longitude });
      setCity(est);
      try {
        const seven = await callPredict7(est);
        setTableHeaders(seven.table.headers);
        setTableRows(seven.table.data);
        try {
          const boxes = await getForecastBoxes(est, seven.table.data);
          setInsights(boxes);
        } catch {
          setInsights(getFallbackForecastBoxes(seven.table.data));
        }
      } catch {}
      // Also fetch Open-Meteo 7 days to show temps/humidity if needed downstream
      try {
        await fetchOpenMeteoDaily({ latitude: coords.latitude, longitude: coords.longitude });
      } catch {}
    })();
  }, []);

  const chartData = useMemo(() => {
    // Expect headers include: Date, AQI, Score, Category, Temp (°C), Humidity (%), Pressure (hPa)
    const h = tableHeaders;
    const idxDate = h.indexOf("Date");
    const idxAqi = h.indexOf("AQI");
    const idxTemp = h.indexOf("Temp (°C)");
    return tableRows.map((r) => ({
      date: String(r[idxDate] ?? ""),
      aqi: Number(r[idxAqi] ?? 0),
      temp: Number(r[idxTemp] ?? 0),
    }));
  }, [tableHeaders, tableRows]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-5 w-5" />
              <span>7-Day Forecast</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Air Quality <span className="gradient-text">Forecast</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Plan ahead with accurate air quality predictions powered by NASA TEMPO data and advanced AI forecasting models. (There may be inconsistencies between the 7 day forecast and the current Air Quality Rating, as they use slightly different models.)
            </p>
          </div>

          {/* 7-Day Forecast Cards */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">7-Day Outlook</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
              {chartData.slice(0, 7).map((row, idx) => (
                <Card key={idx} className="p-5 hover-lift bg-card/80 backdrop-blur border-border text-center">
                  <div className="font-semibold text-sm mb-1">{new Date(`${row.date}T00:00:00Z`).toLocaleDateString(undefined, { weekday: 'long', timeZone: 'UTC' })}</div>
                  <div className="text-xs text-muted-foreground mb-4">{row.date}</div>
                  
                  <AQIBadge aqi={Number(row.aqi)} size="md" showLabel={false} className="mb-4 justify-center" />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <Sun className="h-4 w-4 text-warning" />
                      <span>{Math.round(Number(row.temp))}°C</span>
                    </div>
                    {/* Humidity/Wind omitted here to keep UI concise; available from Open-Meteo */}
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">{city}</div>
                </Card>
              ))}
            </div>
          </div>

          {/* Remove 24-hour section per requirements */}

          {/* Remove extended 14-day section per requirements */}

          {/* Forecast Insights */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-card/80 backdrop-blur">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-warning" />
                <h3 className="text-xl font-semibold">Forecast Insights</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="font-semibold text-warning mb-1">Days to Watch</div>
                  <p className="text-sm text-muted-foreground">{insights?.daysToWatch ?? "Loading..."}</p>
                </div>
                <div className="p-4 rounded-lg bg-aqi-good/10 border border-aqi-good/20">
                  <div className="font-semibold text-aqi-good mb-1">Good Days</div>
                  <p className="text-sm text-muted-foreground">{insights?.goodDays ?? "Loading..."}</p>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="font-semibold text-primary mb-1">Other Info</div>
                  <p className="text-sm text-muted-foreground">{insights?.otherInfo ?? "Loading..."}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/80 backdrop-blur">
              <div className="flex items-center gap-2 mb-4">
                <Cloud className="h-5 w-5 text-accent" />
                <h3 className="text-xl font-semibold">Forecast Accuracy</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Current AQI (Inside MENA)</span>
                    <span className="text-sm font-bold text-accent">99.25% Accurate</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[99%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Current AQI (Outside MENA)</span>
                    <span className="text-sm font-bold text-secondary">80.4% Accurate</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[80%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">7-Day (Inside MENA)</span>
                    <span className="text-sm font-bold text-primary">84.6% Accurate</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[85%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">7-Day (Outside MENA)</span>
                    <span className="text-sm font-bold text-accent">61.4% Accurate</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[61%]" />
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold mb-2">Forecast Models Used:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• NASA TEMPO (NO₂, O₃, aerosols)</li>
                    <li>• NASA MERRA-2 reanalysis</li>
                    <li>• NASA OMI ozone metrics</li>
                    <li>• Open-Meteo weather forecasts</li>
                  </ul>
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

export default Forecast;
