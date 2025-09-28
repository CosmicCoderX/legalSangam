import {
  Scale,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">LegalSangam</span>
            </div>
            <p className="text-background/80 max-w-sm">
              India's most trusted legal marketplace connecting citizens with
              verified legal experts across the nation.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-background/60 hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-background/60 hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-background/60 hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-background/60 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/find"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Find Lawyers
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Legal Services
                </a>
              </li>
              <li>
                <Link
                  to="/ai-legal-assistant"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  AI Legal Assistant
                </Link>
              </li>
              <li>
                <Link
                  to="/document-review"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Document Review
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Legal Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal Areas</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/find"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Family Law
                </Link>
              </li>
              <li>
                <Link
                  to="/find"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Criminal Law
                </Link>
              </li>
              <li>
                <Link
                  to="/find"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Corporate Law
                </Link>
              </li>
              <li>
                <Link
                  to="/find"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Property Law
                </Link>
              </li>
              <li>
                <Link
                  to="/find"
                  className="text-background/80 hover:text-primary transition-colors"
                >
                  Labor Law
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-background/80">
                  support@legalsangam.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-background/80">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-background/80">
                  Mumbai, Delhi, Bangalore
                  <br />& 100+ cities
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/60 text-sm">
            © 2024 LegalSangam. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-background/60 hover:text-primary transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-background/60 hover:text-primary transition-colors text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-background/60 hover:text-primary transition-colors text-sm"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
