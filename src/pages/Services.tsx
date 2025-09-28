import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Scale,
  Users,
  FileText,
  Phone,
  Video,
  Calendar,
  Shield,
  Award,
  Clock,
  CheckCircle,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Criminal Law",
      description:
        "Expert legal assistance for criminal defense, bail applications, and criminal litigation.",
      icon: Shield,
      features: [
        "Bail Applications",
        "Criminal Defense",
        "Appeals",
        "White Collar Crimes",
      ],
      startingPrice: "₹2,500",
    },
    {
      id: 2,
      title: "Family Law",
      description:
        "Comprehensive support for divorce, custody, matrimonial disputes, and family matters.",
      icon: Users,
      features: [
        "Divorce Proceedings",
        "Child Custody",
        "Alimony",
        "Domestic Violence",
      ],
      startingPrice: "₹3,000",
    },
    {
      id: 3,
      title: "Corporate Law",
      description:
        "Business law expertise including mergers, acquisitions, contracts, and compliance.",
      icon: FileText,
      features: ["M&A", "Contract Drafting", "Company Formation", "Compliance"],
      startingPrice: "₹5,000",
    },
    {
      id: 4,
      title: "Property Law",
      description:
        "Real estate transactions, property disputes, and land acquisition matters.",
      icon: Scale,
      features: [
        "Property Disputes",
        "Title Verification",
        "Land Acquisition",
        "Real Estate",
      ],
      startingPrice: "₹2,800",
    },
    {
      id: 5,
      title: "Labour Law",
      description:
        "Employment disputes, workplace harassment, and labour compliance issues.",
      icon: Award,
      features: [
        "Employment Disputes",
        "Workplace Harassment",
        "Labour Compliance",
        "Termination",
      ],
      startingPrice: "₹3,500",
    },
    {
      id: 6,
      title: "Consumer Protection",
      description:
        "Consumer rights, product liability, and service quality disputes.",
      icon: CheckCircle,
      features: [
        "Consumer Complaints",
        "Product Liability",
        "Service Disputes",
        "Refund Claims",
      ],
      startingPrice: "₹2,000",
    },
  ];

  const consultationTypes = [
    {
      type: "Phone Consultation",
      icon: Phone,
      duration: "30 minutes",
      price: "₹500 - ₹1,500",
      description: "Quick legal advice over phone call",
    },
    {
      type: "Video Consultation",
      icon: Video,
      duration: "45 minutes",
      price: "₹800 - ₹2,500",
      description: "Face-to-face consultation via video call",
    },
    {
      type: "In-Person Meeting",
      icon: Calendar,
      duration: "60 minutes",
      price: "₹1,500 - ₹5,000",
      description: "Personal meeting at lawyer's office",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="flex justify-center">
            <Scale className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Our Legal Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive legal solutions across all practice areas. Connect
            with experienced lawyers specializing in your specific legal needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className="hover:shadow-medium transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <service.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <Badge
                      key={feature}
                      variant="secondary"
                      className="text-xs"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Starting from
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {service.startingPrice}
                    </div>
                  </div>
                  <Button
                    onClick={() => (window.location.href = "/find")}
                    size="sm"
                  >
                    Find Lawyer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Consultation Types */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Consultation Options</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the consultation method that works best for you. All
              consultations include detailed legal advice and documentation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {consultationTypes.map((consultation, index) => (
              <Card
                key={consultation.type}
                className="text-center hover:shadow-medium transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <consultation.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">{consultation.type}</CardTitle>
                  <CardDescription>{consultation.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{consultation.duration}</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {consultation.price}
                  </div>
                  <Button
                    onClick={() => (window.location.href = "/find")}
                    className="w-full"
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <Card className="animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">How It Works</CardTitle>
            <CardDescription>
              Simple steps to get the legal help you need
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary-foreground font-bold">1</span>
                </div>
                <h3 className="font-semibold">Choose Service</h3>
                <p className="text-sm text-muted-foreground">
                  Select the legal service area that matches your needs
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary-foreground font-bold">2</span>
                </div>
                <h3 className="font-semibold">Find Lawyer</h3>
                <p className="text-sm text-muted-foreground">
                  Browse and select from verified legal professionals
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary-foreground font-bold">3</span>
                </div>
                <h3 className="font-semibold">Book Consultation</h3>
                <p className="text-sm text-muted-foreground">
                  Schedule your consultation at your preferred time
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary-foreground font-bold">4</span>
                </div>
                <h3 className="font-semibold">Get Legal Help</h3>
                <p className="text-sm text-muted-foreground">
                  Receive expert legal advice and guidance
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 animate-fade-in">
          <CardContent className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">Need Legal Assistance?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Our expert lawyers are ready to help you with any legal matter.
              Get started today and find the right legal professional for your
              needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => (window.location.href = "/find")}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Find a Lawyer Now
              </Button>
              <Button
                onClick={() => (window.location.href = "/signin")}
                variant="outline"
                size="lg"
              >
                Sign In to Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Services;
