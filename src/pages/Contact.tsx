import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MessageSquare, Github, Twitter, Send, MapPin, Phone, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you soon!",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Get in Touch</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold">
              Contact <span className="gradient-text">Us</span>
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Have questions, feedback, or need support? We'd love to hear from you!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 bg-card/80 backdrop-blur">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" placeholder="What's this about?" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select 
                      id="category" 
                      className="w-full p-2 rounded-md bg-background border border-input"
                    >
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Data Question</option>
                      <option>Partnership Opportunity</option>
                      <option>Media Inquiry</option>
                      <option>Bug Report</option>
                      <option>Feature Request</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us more about your inquiry..." 
                      className="min-h-[150px]"
                      required 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-primary text-white">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Email</div>
                      <a href="mailto:contact@tempoairwatch.com" className="text-sm opacity-90 hover:opacity-100">
                        contact@tempoairwatch.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Address</div>
                      <div className="text-sm opacity-90">
                        NASA Space Apps Challenge<br />
                        Virtual Team
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Response Time</div>
                      <div className="text-sm opacity-90">
                        Usually within 24 hours
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/80 backdrop-blur">
                <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-5 w-5 mr-2" />
                      Twitter
                    </a>
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-card/80 backdrop-blur">
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <div className="space-y-2 text-sm">
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    Frequently Asked Questions
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    Technical Documentation
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    API Documentation
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </div>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <Card className="p-8 bg-card/80 backdrop-blur">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">How accurate is your air quality data?</h3>
                <p className="text-sm text-muted-foreground">
                  Our forecasts achieve 95%+ accuracy by integrating NASA TEMPO satellite data with ground-based 
                  monitoring networks and advanced AI models.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How often is data updated?</h3>
                <p className="text-sm text-muted-foreground">
                  Air quality measurements are updated hourly from NASA's TEMPO satellite, with near real-time 
                  updates from ground stations every 15-30 minutes.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is TEMPO AirWatch free to use?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes! Our core features are completely free. We believe everyone deserves access to air quality 
                  information to protect their health.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I access historical data?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we provide access to historical air quality data going back several years, useful for 
                  research and trend analysis.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
