import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bell, BellRing, AlertTriangle, CheckCircle, XCircle, Mail, Smartphone, Clock, MapPin } from "lucide-react";

const Alerts = () => {
  const recentAlerts = [
    {
      id: 1,
      type: "warning",
      severity: "Moderate",
      title: "Air Quality Declining",
      message: "PM2.5 levels are rising in your area. Consider limiting outdoor activities.",
      time: "5 minutes ago",
      location: "New York, NY",
      read: false,
    },
    {
      id: 2,
      type: "info",
      severity: "Good",
      title: "Air Quality Improved",
      message: "Conditions have returned to healthy levels. Safe for all outdoor activities.",
      time: "2 hours ago",
      location: "New York, NY",
      read: true,
    },
    {
      id: 3,
      type: "alert",
      severity: "Unhealthy",
      title: "High Pollution Alert",
      message: "Ozone levels are unhealthy. Sensitive groups should avoid prolonged outdoor exposure.",
      time: "Yesterday at 3:45 PM",
      location: "New York, NY",
      read: true,
    },
    {
      id: 4,
      type: "success",
      severity: "Good",
      title: "Weekend Forecast Positive",
      message: "Air quality expected to be excellent this weekend. Perfect for outdoor plans!",
      time: "Yesterday at 10:00 AM",
      location: "New York, NY",
      read: true,
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
              <Bell className="h-5 w-5" />
              <span>Smart Air Quality Notifications</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Your <span className="gradient-text">Alerts</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Stay informed with real-time notifications about air quality changes that may affect your health
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Alert Settings */}
            <div className="lg:col-span-1">
              <Card className="p-6 bg-card/80 backdrop-blur sticky top-24">
                <h2 className="text-xl font-bold mb-6">Alert Preferences</h2>
                
                <div className="space-y-6">
                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">Your Location</Label>
                    <div className="flex gap-2">
                      <Input id="location" placeholder="Enter ZIP code" defaultValue="10001" />
                      <Button variant="outline" size="icon">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Alert Types */}
                  <div className="space-y-4">
                    <Label>Alert Types</Label>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-warning" />
                        <span className="text-sm">Health Alerts</span>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BellRing className="h-4 w-4 text-primary" />
                        <span className="text-sm">Daily Forecast</span>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-accent" />
                        <span className="text-sm">Rapid Changes</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  {/* Notification Methods */}
                  <div className="space-y-4">
                    <Label>Notification Method</Label>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-primary" />
                        <span className="text-sm">Push Notifications</span>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-accent" />
                        <span className="text-sm">Email Alerts</span>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  {/* Sensitivity Level */}
                  <div className="space-y-2">
                    <Label>Alert Sensitivity</Label>
                    <select className="w-full p-2 rounded-md bg-muted border border-border">
                      <option>All Changes</option>
                      <option selected>Moderate+ Only</option>
                      <option>Unhealthy+ Only</option>
                      <option>Critical Only</option>
                    </select>
                  </div>

                  <Button className="w-full">
                    Save Preferences
                  </Button>
                </div>
              </Card>
            </div>

            {/* Alert Feed */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Recent Alerts</h2>
                <Button variant="outline" size="sm">
                  Mark All as Read
                </Button>
              </div>

              {recentAlerts.map((alert) => (
                <Card 
                  key={alert.id} 
                  className={`p-6 hover-lift transition-all duration-300 ${
                    !alert.read ? 'bg-primary/5 border-l-4 border-l-primary' : 'bg-card/80 backdrop-blur'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      alert.type === 'warning' ? 'bg-warning/10' :
                      alert.type === 'alert' ? 'bg-destructive/10' :
                      alert.type === 'success' ? 'bg-aqi-good/10' :
                      'bg-primary/10'
                    }`}>
                      {alert.type === 'warning' && <AlertTriangle className="h-6 w-6 text-warning" />}
                      {alert.type === 'alert' && <XCircle className="h-6 w-6 text-destructive" />}
                      {alert.type === 'success' && <CheckCircle className="h-6 w-6 text-aqi-good" />}
                      {alert.type === 'info' && <Bell className="h-6 w-6 text-primary" />}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{alert.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3" />
                            <span>{alert.location}</span>
                            <span>•</span>
                            <Clock className="h-3 w-3" />
                            <span>{alert.time}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          alert.severity === 'Unhealthy' ? 'bg-destructive/10 text-destructive' :
                          alert.severity === 'Moderate' ? 'bg-warning/10 text-warning' :
                          'bg-aqi-good/10 text-aqi-good'
                        }`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4">{alert.message}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {!alert.read && (
                          <Button variant="ghost" size="sm">
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Alert Statistics */}
          <Card className="p-6 bg-card/80 backdrop-blur">
            <h2 className="text-2xl font-bold mb-6">Alert History & Statistics</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">127</div>
                <div className="text-sm text-muted-foreground">Total Alerts</div>
                <div className="text-xs text-muted-foreground mt-1">Last 30 days</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-warning mb-2">18</div>
                <div className="text-sm text-muted-foreground">Warning Alerts</div>
                <div className="text-xs text-muted-foreground mt-1">Moderate+ levels</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-destructive mb-2">3</div>
                <div className="text-sm text-muted-foreground">Critical Alerts</div>
                <div className="text-xs text-muted-foreground mt-1">Unhealthy levels</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-aqi-good mb-2">92%</div>
                <div className="text-sm text-muted-foreground">Good Days</div>
                <div className="text-xs text-muted-foreground mt-1">Healthy air quality</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Alerts;
