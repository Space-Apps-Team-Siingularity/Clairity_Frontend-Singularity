import { Link } from "react-router-dom";
import { Wind, Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Wind className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">TEMPO AirWatch</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Real-time air quality monitoring powered by NASA's TEMPO satellite and advanced forecasting technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/forecast" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Forecast
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Alerts
                </Link>
              </li>
              <li>
                <Link to="/data-sources" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Data Sources
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="https://tempo.si.edu" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  NASA TEMPO
                </a>
              </li>
              <li>
                <a href="https://www.epa.gov/air-quality" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  EPA Air Quality
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:contact@tempoairwatch.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 TEMPO AirWatch. Built for NASA Space Apps Challenge. All rights reserved.</p>
          <p className="mt-2">Data sources: NASA TEMPO, EPA AirNow, NOAA Weather, Pandora Network, OpenAQ</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
