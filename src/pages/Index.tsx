import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Wind, Satellite, TrendingUp, Bell, MapPin, Sparkles, Activity, Cloud } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AQIBadge from "@/components/AQIBadge";
import heroEarth from "@/assets/hero-earth.jpg";
import monitoringStation from "@/assets/monitoring-station.jpg";
import tempoSatellite from "@/assets/tempo-satellite.jpg";
import cleanAir from "@/assets/clean-air.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroEarth})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8 stagger-children">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-pulse-glow">
              <Satellite className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by NASA TEMPO Satellite</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Breathe Easy with{" "}
              <span className="gradient-text">Real-Time</span>
              <br />
              Air Quality Data
            </h1>

            <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto">
              Monitor air pollution in real-time, get accurate forecasts, and receive alerts 
              to protect your health with NASA's cutting-edge satellite technology.
            </p>

            {/* Glowing AQI Circle */}
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>Your Location: New York, NY</span>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-secondary/30 rounded-full blur-3xl animate-pulse-glow" />
                <div className="relative bg-card/50 backdrop-blur-sm border-4 border-secondary rounded-full w-72 h-72 flex flex-col items-center justify-center shadow-glow">
                  <div className="text-8xl font-bold text-foreground">42</div>
                  <div className="text-2xl text-muted-foreground mb-2">AQI</div>
                  <div className="px-6 py-2 bg-secondary rounded-full text-white font-semibold text-lg">
                    Good
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="text-lg px-8 py-6 shadow-glow hover:shadow-glow-accent transition-all duration-300">
                  <Activity className="mr-2 h-5 w-5" />
                  View Live Dashboard
                </Button>
              </Link>
              <Link to="/forecast">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 hover:bg-primary/10 transition-all duration-300">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Check Forecast
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
              {[
                { label: "Monitoring Stations", value: "10,000+" },
                { label: "Data Points/Hour", value: "2.5M" },
                { label: "Countries Covered", value: "195" },
                { label: "Users Protected", value: "500K+" },
              ].map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-card/50 backdrop-blur border border-border hover-lift">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Comprehensive Air Quality <span className="gradient-text">Intelligence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Integrating multiple data sources for the most accurate and actionable air quality information
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Satellite,
                title: "NASA TEMPO Data",
                description: "Real-time satellite measurements of NO₂, formaldehyde, ozone, and particulate matter",
                color: "text-primary",
              },
              {
                icon: TrendingUp,
                title: "AI-Powered Forecasts",
                description: "Machine learning models predict air quality up to 7 days ahead with 90%+ accuracy",
                color: "text-accent",
              },
              {
                icon: Bell,
                title: "Smart Alerts",
                description: "Personalized notifications when air quality may affect your health or outdoor activities",
                color: "text-warning",
              },
              {
                icon: Cloud,
                title: "Weather Integration",
                description: "Combines meteorological data to understand how weather affects pollution levels",
                color: "text-secondary",
              },
            ].map((feature, idx) => (
              <Card key={idx} className="p-6 hover-lift bg-card/80 backdrop-blur border-border">
                <div className={`w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sources Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Trusted Data Sources</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Powered by <span className="gradient-text">World-Class</span> Networks
            </h2>
          </div>

          {/* Featured Images */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="relative overflow-hidden rounded-xl shadow-xl hover-lift group">
              <img src={tempoSatellite} alt="NASA TEMPO Satellite" className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-foreground mb-1">NASA TEMPO</h3>
                <p className="text-sm text-muted-foreground">Satellite Monitoring</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl shadow-xl hover-lift group">
              <img src={monitoringStation} alt="Ground Monitoring Station" className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-foreground mb-1">Ground Stations</h3>
                <p className="text-sm text-muted-foreground">Real-time Sensors</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl shadow-xl hover-lift group">
              <img src={cleanAir} alt="Clean Air Quality" className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-foreground mb-1">Weather Data</h3>
                <p className="text-sm text-muted-foreground">Atmospheric Analysis</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "NASA TEMPO",
                description: "Hourly air quality measurements across North America",
                metrics: "NO₂, HCHO, O₃, Aerosols",
              },
              {
                name: "EPA AirNow",
                description: "Ground-based air quality monitoring network",
                metrics: "PM2.5, PM10, O₃, CO, SO₂",
              },
              {
                name: "Pandora Network",
                description: "Spectroscopic measurements of atmospheric composition",
                metrics: "168 Global Sites",
              },
              {
                name: "NOAA Weather",
                description: "Meteorological data for pollution forecasting",
                metrics: "Wind, Temperature, Humidity",
              },
              {
                name: "OpenAQ",
                description: "Global open-source air quality data platform",
                metrics: "10,000+ Stations Worldwide",
              },
              {
                name: "TOLNet",
                description: "Tropospheric ozone measurements via LIDAR",
                metrics: "12 Sites (3 Fixed, 9 Mobile)",
              },
            ].map((source, idx) => (
              <Card key={idx} className="p-6 hover-lift bg-gradient-card backdrop-blur border-border">
                <h3 className="text-lg font-bold mb-2">{source.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{source.description}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {source.metrics}
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/data-sources">
              <Button size="lg" variant="outline" className="hover-lift border-primary/50 hover:bg-primary/10">
                Explore All Data Sources
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${cleanAir})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Monitor Your Air Quality?
            </h2>
            <p className="text-xl text-white/80">
              Join thousands of users who trust TEMPO AirWatch for accurate, real-time air quality information
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 hover-lift">
                  Get Started Now
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 hover-lift">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
