import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AQIBadge from "@/components/AQIBadge";
import { Calendar, TrendingUp, AlertCircle, Cloud, Wind, Droplets, Sun } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Forecast = () => {
  const dailyForecast = [
    { day: "Monday", date: "Jan 15", aqi: 42, temp: 72, humidity: 65, wind: 8, condition: "Clear" },
    { day: "Tuesday", date: "Jan 16", aqi: 55, temp: 75, humidity: 70, wind: 10, condition: "Partly Cloudy" },
    { day: "Wednesday", date: "Jan 17", aqi: 68, temp: 78, humidity: 72, wind: 12, condition: "Cloudy" },
    { day: "Thursday", date: "Jan 18", aqi: 82, temp: 76, humidity: 68, wind: 9, condition: "Hazy" },
    { day: "Friday", date: "Jan 19", aqi: 95, temp: 73, humidity: 75, wind: 7, condition: "Unhealthy" },
    { day: "Saturday", date: "Jan 20", aqi: 65, temp: 70, humidity: 65, wind: 11, condition: "Improving" },
    { day: "Sunday", date: "Jan 21", aqi: 45, temp: 71, humidity: 62, wind: 10, condition: "Clear" },
  ];

  const hourlyForecast = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    aqi: 42 + Math.sin(i / 4) * 20 + Math.random() * 10,
    no2: 10 + Math.sin(i / 3) * 5 + Math.random() * 3,
    pm25: 8 + Math.sin(i / 5) * 4 + Math.random() * 2,
    o3: 15 + Math.sin(i / 4) * 8 + Math.random() * 4,
  }));

  const extendedForecast = Array.from({ length: 14 }, (_, i) => ({
    day: i + 1,
    aqi: 42 + Math.sin(i / 3) * 30 + Math.random() * 15,
    temp: 70 + Math.sin(i / 4) * 8,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-5 w-5" />
              <span>7-Day and Extended Forecast</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Air Quality <span className="gradient-text">Forecast</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Plan ahead with accurate air quality predictions powered by NASA TEMPO data and advanced AI forecasting models
            </p>
          </div>

          {/* 7-Day Forecast Cards */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">7-Day Outlook</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
              {dailyForecast.map((day, idx) => (
                <Card key={idx} className="p-5 hover-lift bg-card/80 backdrop-blur border-border text-center">
                  <div className="font-semibold text-sm mb-1">{day.day}</div>
                  <div className="text-xs text-muted-foreground mb-4">{day.date}</div>
                  
                  <AQIBadge aqi={day.aqi} size="md" showLabel={false} className="mb-4 justify-center" />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <Sun className="h-4 w-4 text-warning" />
                      <span>{day.temp}°F</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Droplets className="h-4 w-4 text-primary" />
                      <span>{day.humidity}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Wind className="h-4 w-4 text-accent" />
                      <span>{day.wind} mph</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                    {day.condition}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Hourly Forecast Chart */}
          <Card className="p-6 bg-card/80 backdrop-blur mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">24-Hour Detailed Forecast</h2>
              <Button variant="outline" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
            
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={hourlyForecast}>
                <defs>
                  <linearGradient id="colorAqiForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(210, 100%, 50%)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(210, 100%, 50%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="hour" 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                  interval={2}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="aqi" 
                  stroke="hsl(210, 100%, 50%)" 
                  fillOpacity={1} 
                  fill="url(#colorAqiForecast)" 
                  name="AQI" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Extended 14-Day Forecast */}
          <Card className="p-6 bg-card/80 backdrop-blur mb-8">
            <h2 className="text-2xl font-bold mb-6">Extended 14-Day Forecast</h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={extendedForecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))"
                  label={{ value: 'Days from Now', position: 'insideBottom', offset: -5 }}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="aqi" 
                  stroke="hsl(210, 100%, 50%)" 
                  strokeWidth={3} 
                  name="Predicted AQI"
                  dot={{ fill: 'hsl(210, 100%, 50%)', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Forecast Insights */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-card/80 backdrop-blur">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-warning" />
                <h3 className="text-xl font-semibold">Forecast Insights</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="font-semibold text-warning mb-1">⚠️ Thursday-Friday Alert</div>
                  <p className="text-sm text-muted-foreground">
                    Air quality expected to decline Thursday through Friday due to stagnant atmospheric conditions. 
                    Sensitive groups should limit outdoor exposure.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-aqi-good/10 border border-aqi-good/20">
                  <div className="font-semibold text-aqi-good mb-1">✓ Weekend Improvement</div>
                  <p className="text-sm text-muted-foreground">
                    Strong winds forecasted for Saturday will help disperse pollutants, improving air quality 
                    significantly for the weekend.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="font-semibold text-primary mb-1">🌤️ Weather Influence</div>
                  <p className="text-sm text-muted-foreground">
                    Partly cloudy conditions mid-week may trap pollutants. Clear skies returning by weekend 
                    will improve dispersion.
                  </p>
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
                    <span className="text-sm font-medium">24-Hour Forecast</span>
                    <span className="text-sm font-bold text-primary">95% Accurate</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[95%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">3-Day Forecast</span>
                    <span className="text-sm font-bold text-accent">90% Accurate</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[90%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">7-Day Forecast</span>
                    <span className="text-sm font-bold text-secondary">85% Accurate</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[85%]" />
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold mb-2">Forecast Models Used:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• NASA TEMPO Real-Time Data</li>
                    <li>• NOAA Weather Integration</li>
                    <li>• AI/ML Prediction Algorithms</li>
                    <li>• Historical Pattern Analysis</li>
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
