import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Satellite, Database, Globe, Activity, ExternalLink, CheckCircle, TrendingUp } from "lucide-react";

const DataSources = () => {
  const satelliteSources = [
    {
      name: "NASA TEMPO",
      description: "Tropospheric Emissions: Monitoring of Pollution mission provides hourly air quality measurements across North America",
      parameters: ["NO₂", "Formaldehyde (HCHO)", "Ozone (O₃)", "Aerosol Index", "PM2.5"],
      coverage: "North America",
      resolution: "High Resolution (2.1 km x 4.7 km)",
      frequency: "Hourly",
      status: "Active",
      url: "https://tempo.si.edu",
    },
    {
      name: "NASA MERRA-2",
      description: "Modern-Era Retrospective analysis providing comprehensive atmospheric data since 1980",
      parameters: ["Temperature", "Humidity", "Wind", "PBL Height", "Historical Data"],
      coverage: "Global",
      resolution: "0.5° x 0.625°",
      frequency: "Hourly to 6-hourly",
      status: "Active",
      url: "https://gmao.gsfc.nasa.gov/reanalysis/MERRA-2/",
    },
  ];

  const groundStations = [
    {
      name: "EPA AirNow",
      description: "Partnership providing real-time air quality data from thousands of monitoring stations",
      stations: "10,000+",
      parameters: ["PM2.5", "PM10", "O₃", "CO", "SO₂", "NO₂"],
      coverage: "United States",
      url: "https://www.airnow.gov",
    },
    {
      name: "Pandora Network",
      description: "Spectroscopic measurements of atmospheric composition with high precision",
      stations: "168 Sites",
      parameters: ["Column NO₂", "Column O₃", "HCHO", "SO₂"],
      coverage: "Global",
      url: "https://www.pandonia-global-network.org",
    },
    {
      name: "NASA TOLNet",
      description: "Tropospheric Ozone Lidar Network providing high spatio-temporal ozone observations",
      stations: "12 Sites (3 Fixed, 9 Mobile)",
      parameters: ["Tropospheric Ozone Profiles"],
      coverage: "United States",
      url: "https://tolnet.larc.nasa.gov",
    },
    {
      name: "OpenAQ",
      description: "Open-source platform aggregating real-time and historical air quality data globally",
      stations: "15,000+ Stations",
      parameters: ["PM2.5", "PM10", "O₃", "NO₂", "SO₂", "CO"],
      coverage: "Global (195+ Countries)",
      url: "https://openaq.org",
    },
  ];

  const weatherData = [
    {
      name: "NOAA Weather Service",
      description: "Comprehensive meteorological data including wind, temperature, humidity, and precipitation",
      parameters: ["Wind Speed & Direction", "Temperature", "Humidity", "Precipitation", "Atmospheric Pressure"],
      coverage: "United States",
    },
    {
      name: "NASA Daymet",
      description: "Long-term gridded daily weather and climatology estimates",
      parameters: ["Temperature", "Precipitation", "Humidity", "Solar Radiation"],
      coverage: "North America",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Database className="h-5 w-5" />
              <span>Trusted Scientific Data Sources</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Our <span className="gradient-text">Data Sources</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              TEMPO AirWatch integrates data from NASA satellites, global monitoring networks, and meteorological services 
              to provide the most comprehensive and accurate air quality information available
            </p>
          </div>

          {/* Overview Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <Card className="p-6 text-center hover-lift bg-gradient-primary text-white">
              <Satellite className="h-8 w-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">5+</div>
              <div className="text-sm opacity-90">Satellite Sources</div>
            </Card>
            <Card className="p-6 text-center hover-lift bg-gradient-aqi-good text-white">
              <Activity className="h-8 w-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">25,000+</div>
              <div className="text-sm opacity-90">Ground Stations</div>
            </Card>
            <Card className="p-6 text-center hover-lift bg-gradient-aqi-moderate text-white">
              <Globe className="h-8 w-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">195+</div>
              <div className="text-sm opacity-90">Countries Covered</div>
            </Card>
            <Card className="p-6 text-center hover-lift bg-card border-primary border-2">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-3xl font-bold">Hourly</div>
              <div className="text-sm text-muted-foreground">Update Frequency</div>
            </Card>
          </div>

          {/* Data Sources Tabs */}
          <Tabs defaultValue="satellite" className="mb-12">
            <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
              <TabsTrigger value="satellite">Satellite Data</TabsTrigger>
              <TabsTrigger value="ground">Ground Stations</TabsTrigger>
              <TabsTrigger value="weather">Weather Data</TabsTrigger>
            </TabsList>

            <TabsContent value="satellite" className="space-y-6">
              {satelliteSources.map((source, idx) => (
                <Card key={idx} className="p-6 hover-lift bg-card/80 backdrop-blur">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                        <Satellite className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{source.name}</h3>
                        <span className="inline-flex items-center gap-1 text-xs text-aqi-good">
                          <CheckCircle className="h-3 w-3" />
                          {source.status}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        Visit <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  </div>

                  <p className="text-muted-foreground mb-4">{source.description}</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Parameters Measured:</h4>
                      <div className="flex flex-wrap gap-2">
                        {source.parameters.map((param, i) => (
                          <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            {param}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Coverage:</span>
                        <span className="font-medium">{source.coverage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Resolution:</span>
                        <span className="font-medium">{source.resolution}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Update Frequency:</span>
                        <span className="font-medium">{source.frequency}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="ground" className="space-y-6">
              {groundStations.map((source, idx) => (
                <Card key={idx} className="p-6 hover-lift bg-card/80 backdrop-blur">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-aqi-good flex items-center justify-center">
                        <Activity className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{source.name}</h3>
                        <span className="text-sm text-muted-foreground">{source.stations}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        Visit <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  </div>

                  <p className="text-muted-foreground mb-4">{source.description}</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Parameters Measured:</h4>
                      <div className="flex flex-wrap gap-2">
                        {source.parameters.map((param, i) => (
                          <span key={i} className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium">
                            {param}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Coverage:</span>
                        <span className="font-medium">{source.coverage}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="weather" className="space-y-6">
              {weatherData.map((source, idx) => (
                <Card key={idx} className="p-6 hover-lift bg-card/80 backdrop-blur">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-aqi-moderate flex items-center justify-center flex-shrink-0">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{source.name}</h3>
                      <p className="text-muted-foreground mb-4">{source.description}</p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Parameters:</h4>
                          <div className="flex flex-wrap gap-2">
                            {source.parameters.map((param, i) => (
                              <span key={i} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                                {param}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Coverage: </span>
                          <span className="font-medium">{source.coverage}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          {/* Data Quality & Reliability */}
          <Card className="p-8 bg-gradient-primary text-white">
            <h2 className="text-3xl font-bold mb-4">Data Quality & Reliability</h2>
            <p className="text-lg mb-6 opacity-90">
              All data sources are validated and cross-referenced to ensure the highest level of accuracy and reliability
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="opacity-90">Data Uptime</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">95%+</div>
                <div className="opacity-90">Forecast Accuracy</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">&lt;2min</div>
                <div className="opacity-90">Update Latency</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DataSources;
