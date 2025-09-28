import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, Award, Globe, Heart, Scale } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="flex justify-center">
            <Scale className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            About LegalSangam
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Bridging the gap between citizens and legal professionals through
            technology, making justice accessible, transparent, and efficient
            for everyone in India.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="animate-slide-up">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Our Mission</CardTitle>
            <CardDescription>
              Democratizing access to legal services across India
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              LegalSangam was founded with the vision to revolutionize how
              people access legal services in India. We believe that quality
              legal assistance should be available to everyone, regardless of
              their location, financial status, or legal knowledge.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-medium transition-all duration-300 animate-slide-up">
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Expert Lawyers</CardTitle>
              <CardDescription>
                Connect with verified legal professionals across all practice
                areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our platform features thousands of experienced lawyers
                specializing in criminal law, family law, corporate law,
                property law, and more.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300 animate-slide-up">
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Verified & Secure</CardTitle>
              <CardDescription>
                All lawyers are thoroughly verified with secure communication
                channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We maintain the highest standards of verification and data
                security to ensure your legal matters are handled with complete
                confidentiality and trust.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300 animate-slide-up">
            <CardHeader>
              <Globe className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Pan-India Coverage</CardTitle>
              <CardDescription>
                Legal services available across all major cities and regions in
                India
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                From Delhi to Bangalore, Mumbai to Kolkata, our network covers
                all major metropolitan areas and is expanding to tier-2 and
                tier-3 cities.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300 animate-slide-up">
            <CardHeader>
              <Award className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Quality Assurance</CardTitle>
              <CardDescription>
                Rigorous quality checks and client feedback system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Every lawyer on our platform maintains high success rates and
                receives regular quality assessments based on client
                satisfaction.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300 animate-slide-up">
            <CardHeader>
              <Heart className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Client-Centric</CardTitle>
              <CardDescription>
                Designed with users in mind for the best possible experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our platform is built to make legal consultations simple,
                affordable, and accessible to everyone who needs legal
                assistance.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300 animate-slide-up">
            <CardHeader>
              <Scale className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Justice for All</CardTitle>
              <CardDescription>
                Making legal services affordable and transparent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We believe in transparent pricing and clear communication to
                ensure clients get the best value for their legal investments.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">5000+</div>
            <div className="text-muted-foreground">Verified Lawyers</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">50,000+</div>
            <div className="text-muted-foreground">Happy Clients</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">25</div>
            <div className="text-muted-foreground">Cities Covered</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">95%</div>
            <div className="text-muted-foreground">Client Satisfaction</div>
          </div>
        </div>

        {/* Languages */}
        <Card className="animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Multilingual Support</CardTitle>
            <CardDescription>
              Serving clients in their preferred language
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Hindi",
                "English",
                "Bengali",
                "Telugu",
                "Marathi",
                "Tamil",
                "Urdu",
                "Gujarati",
                "Kannada",
                "Odia",
                "Punjabi",
                "Malayalam",
              ].map((lang) => (
                <Badge key={lang} variant="secondary" className="text-sm">
                  {lang}
                </Badge>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-4">
              Our platform supports multiple Indian languages to ensure clear
              communication between clients and legal professionals.
            </p>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 animate-fade-in">
          <CardContent className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Connect with experienced lawyers today and get the legal help you
              need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => (window.location.href = "/find")}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Find a Lawyer
              </button>
              <button
                onClick={() => (window.location.href = "/contact")}
                className="border border-primary text-primary px-6 py-3 rounded-md font-medium hover:bg-primary/10 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
