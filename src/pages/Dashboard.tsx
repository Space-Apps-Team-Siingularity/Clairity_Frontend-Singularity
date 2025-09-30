import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AQIBadge from "@/components/AQIBadge";
import { MapPin, Wind, Droplets, Thermometer, Eye, Activity, TrendingUp, AlertTriangle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  // Mock data for charts
  const hourlyData = [
    { time: "00:00", aqi: 45, no2: 12, pm25: 8, o3: 15 },
    { time: "03:00", aqi: 38, no2: 10, pm25: 7, o3: 12 },
    { time: "06:00", aqi: 52, no2: 15, pm25: 11, o3: 18 },
    { time: "09:00", aqi: 68, no2: 22, pm25: 15, o3: 25 },
    { time: "12:00", aqi: 75, no2: 25, pm25: 18, o3: 28 },
    { time: "15:00", aqi: 72, no2: 23, pm25: 16, o3: 27 },
    { time: "18:00", aqi: 58, no2: 18, pm25: 12, o3: 21 },
    { time: "21:00", aqi: 48, no2: 14, pm25: 9, o3: 16 },
  ];

  const weeklyForecast = [
    { day: "Mon", aqi: 42, temp: 72 },
    { day: "Tue", aqi: 55, temp: 75 },
    { day: "Wed", aqi: 68, temp: 78 },
    { day: "Thu", aqi: 52, temp: 76 },
    { day: "Fri", aqi: 45, temp: 73 },
    { day: "Sat", aqi: 38, temp: 70 },
    { day: "Sun", aqi: 41, temp: 71 },
  ];

  const pollutantDistribution = [
    { name: "PM2.5", value: 35, color: "#3b82f6" },
    { name: "NO₂", value: 25, color: "#06b6d4" },
    { name: "O₃", value: 20, color: "#8b5cf6" },
    { name: "PM10", value: 15, color: "#ec4899" },
    { name: "Others", value: 5, color: "#f59e0b" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span>New York, NY 10001 • Last updated: 2 minutes ago</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Air Quality <span className="gradient-text">Dashboard</span>
            </h1>
          </div>

          {/* Current Conditions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 hover-lift bg-gradient-aqi-good">
              <div className="flex items-center justify-between mb-4">
                <div className="text-white/80 text-sm font-medium">Air Quality Index</div>
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">42</div>
              <div className="text-white/80 text-sm">Good - Air quality is satisfactory</div>
            </Card>

            <Card className="p-6 hover-lift bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="text-muted-foreground text-sm font-medium">Temperature</div>
                <Thermometer className="h-5 w-5 text-primary" />
              </div>
              <div className="text-4xl font-bold mb-2">72°F</div>
              <div className="text-muted-foreground text-sm">Feels like 70°F</div>
            </Card>

            <Card className="p-6 hover-lift bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="text-muted-foreground text-sm font-medium">Wind Speed</div>
                <Wind className="h-5 w-5 text-accent" />
              </div>
              <div className="text-4xl font-bold mb-2">8 mph</div>
              <div className="text-muted-foreground text-sm">NE • Gusts up to 12 mph</div>
            </Card>

            <Card className="p-6 hover-lift bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="text-muted-foreground text-sm font-medium">Humidity</div>
                <Droplets className="h-5 w-5 text-secondary" />
              </div>
              <div className="text-4xl font-bold mb-2">65%</div>
              <div className="text-muted-foreground text-sm">Dew point: 58°F</div>
            </Card>
          </div>

          {/* Main Charts */}
          <Tabs defaultValue="hourly" className="mb-8">
            <TabsList className="grid w-full md:w-auto grid-cols-3 mb-6">
              <TabsTrigger value="hourly">24-Hour Trends</TabsTrigger>
              <TabsTrigger value="pollutants">Pollutant Breakdown</TabsTrigger>
              <TabsTrigger value="forecast">7-Day Forecast</TabsTrigger>
            </TabsList>

            <TabsContent value="hourly">
              <Card className="p-6 bg-card/80 backdrop-blur">
                <h3 className="text-xl font-semibold mb-6">24-Hour Air Quality Trends</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={hourlyData}>
                    <defs>
                      <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(210, 100%, 50%)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(210, 100%, 50%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Area type="monotone" dataKey="aqi" stroke="hsl(210, 100%, 50%)" fillOpacity={1} fill="url(#colorAqi)" name="AQI" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>

            <TabsContent value="pollutants">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-card/80 backdrop-blur">
                  <h3 className="text-xl font-semibold mb-6">Pollutant Composition</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={pollutantDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pollutantDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6 bg-card/80 backdrop-blur">
                  <h3 className="text-xl font-semibold mb-6">Pollutant Levels (µg/m³)</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="no2" fill="hsl(210, 100%, 50%)" name="NO₂" />
                      <Bar dataKey="pm25" fill="hsl(187, 85%, 48%)" name="PM2.5" />
                      <Bar dataKey="o3" fill="hsl(142, 76%, 36%)" name="O₃" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </TabsContent>

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
                    <Line yAxisId="right" type="monotone" dataKey="temp" stroke="hsl(14, 91%, 51%)" strokeWidth={2} name="Temperature (°F)" />
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
                  { name: "NASA TEMPO", status: "Active", updated: "2 min ago", quality: "100%" },
                  { name: "EPA AirNow", status: "Active", updated: "5 min ago", quality: "98%" },
                  { name: "NOAA Weather", status: "Active", updated: "1 min ago", quality: "100%" },
                  { name: "Pandora Network", status: "Active", updated: "10 min ago", quality: "95%" },
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
                <div className="p-4 rounded-lg bg-aqi-good/10 border border-aqi-good/20">
                  <div className="font-semibold text-aqi-good mb-1">✓ Excellent for Outdoor Activities</div>
                  <p className="text-sm text-muted-foreground">
                    Air quality is ideal for outdoor activities. Great time for exercise and recreation.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="font-semibold text-primary mb-1">💧 Stay Hydrated</div>
                  <p className="text-sm text-muted-foreground">
                    Current temperature is 72°F. Remember to drink water during outdoor activities.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="font-semibold text-accent mb-1">🌤️ UV Index: Moderate</div>
                  <p className="text-sm text-muted-foreground">
                    Consider sunscreen if spending extended time outdoors.
                  </p>
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
