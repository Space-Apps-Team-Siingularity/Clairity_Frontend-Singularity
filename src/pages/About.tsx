import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Rocket, Target, Users, Award, Heart, Shield, Zap, Globe } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Zap,
      title: "Real-Time Monitoring",
      description: "Instant access to air quality data from NASA's TEMPO satellite, among others",
    },
    {
      icon: Shield,
      title: "Health-First Approach",
      description: "Detailed recommendations to protect you and your loved ones",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Comprehensive data from 25,000+ monitoring stations worldwide, supported across MENA",
    },
    {
      icon: Award,
      title: "Scientific Excellence",
      description: "Built on NASA datasets that were validated by leading atmospheric scientists",
    },
  ];

  const teamMembers = [
    { role: "Data Integration", icon: "🛰️" },
    { role: "AI/ML Development", icon: "🤖" },
    { role: "UX Design", icon: "🎨" },
    { role: "Backend Engineering", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Rocket className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">NASA Space Apps Challenge 2025</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold">
              About <span className="gradient-text">Clairity</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're on a mission to make air quality data accessible, understandable, and actionable for everyone. 
              By leveraging NASA's cutting-edge TEMPO satellite technology, we're helping millions of people breathe easier.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <Card className="p-8 hover-lift bg-gradient-primary text-white">
              <Target className="h-12 w-12 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg opacity-90">
                To provide access to real-time air quality information, empowering individuals and communities 
                to make informed decisions that protect their health and well-being.
              </p>
            </Card>

            <Card className="p-8 hover-lift bg-gradient-aqi-good text-white">
              <Heart className="h-12 w-12 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg opacity-90">
                A world where everyone has the knowledge and tools to avoid harmful air pollution exposure, 
                leading to healthier communities and a more sustainable future for all.
              </p>
            </Card>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose <span className="gradient-text">Clairity</span>?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <Card key={idx} className="p-6 hover-lift bg-card/80 backdrop-blur text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* The Challenge */}
          <Card className="p-8 mb-16 bg-card/80 backdrop-blur">
            <h2 className="text-3xl font-bold mb-6">The Challenge We're Solving</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                According to the World Health Organization, <strong className="text-foreground">outdoor air pollution contributes to millions 
                of deaths every year</strong>, making it one of the biggest global health risks. In addition, 99% of people worldwide 
                breathe air that exceeds WHO pollution guidelines.
              </p>
              <p>
                Many communities are especially vulnerable to poor air quality due to factors including proximity to industrial 
                sources, higher rates of underlying health problems, and lack of access to real-time information.
              </p>
              <p>
                <strong className="text-foreground">Clairity bridges this gap</strong> by integrating NASA's TEMPO satellite data with 
                ground-based monitoring networks and weather information, as well as Physical IOT sensors ( May not be available everywhere) providing accurate, 
                accessible air quality insights for everyone, everywhere.
              </p>
            </div>
          </Card>

          {/* Technology Stack */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              Powered by <span className="gradient-text">Advanced Technology</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-card/80 backdrop-blur">
                <h3 className="font-bold text-xl mb-4">Data Sources</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• NASA TEMPO Satellite</li>
                  <li>• EPA AirNow Network</li>
                  <li>• Pandora Global Network</li>
                  <li>• NOAA Weather Data</li>
                  <li>• OpenAQ Platform</li>
                  <li>• TOLNet LIDAR</li>
                </ul>
              </Card>

              <Card className="p-6 bg-card/80 backdrop-blur">
                <h3 className="font-bold text-xl mb-4">AI & Analytics</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Machine Learning Forecasts</li>
                  <li>• Pattern Recognition</li>
                  <li>• Anomaly Detection</li>
                  <li>• Predictive Modeling</li>
                  <li>• Data Fusion Algorithms</li>
                  <li>• Real-time Processing</li>
                </ul>
              </Card>

              <Card className="p-6 bg-card/80 backdrop-blur">
                <h3 className="font-bold text-xl mb-4">User Experience</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Interactive Visualizations</li>
                  <li>• Mobile-Responsive Design</li>
                  <li>• Personalized Alerts</li>
                  <li>• Multi-Language Support</li>
                  <li>• Accessibility Features</li>
                  <li>• API Access</li>
                </ul>
              </Card>
            </div>
          </div>

          {/* Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-6">Our Team</h2>
            <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              A passionate group of ML developers, Web designers, and IOT experts united by a common goal: 
              making air quality data accessible to everyone.
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              {teamMembers.map((member, idx) => (
                <Card key={idx} className="p-6 text-center hover-lift bg-card/80 backdrop-blur">
                  <div className="text-6xl mb-4">{member.icon}</div>
                  <h3 className="font-semibold">{member.role}</h3>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Start Monitoring?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Be part of the change: help make air quality awareness available to all.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="text-lg px-8 py-6">
                  Launch Dashboard
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
