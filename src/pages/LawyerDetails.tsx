import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Phone,
  Globe,
  Calendar,
  Video,
  Users,
  Award,
  ArrowLeft,
} from "lucide-react";
import Rating from "@/pages/Rating";

const LawyerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lawyer = location.state?.lawyer;

  // Generate AI description for Advocate Rajesh
  const getDescription = (lawyer) => {
    if (lawyer.name === "Advocate Rajesh") {
      return "With 19 years of dedicated experience in Family Law, Advocate Rajesh specializes in divorce, matrimonial disputes, and family-related legal matters in Bangalore courts. He has successfully handled over 450 consultations with a 95% success rate, earning a 4.7-star rating from 120 reviews. Fluent in English, Kannada, and Hindi, he is committed to providing compassionate and effective legal solutions.";
    }
    return lawyer.description;
  };

  if (!lawyer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lawyer not found</h1>
          <Button onClick={() => navigate("/find")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Find Lawyers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/find")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Find Lawyers
        </Button>

        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground">Lawyer Details</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Detailed information about {lawyer.name}
          </p>
        </div>

        {/* Lawyer Profile Card */}
        <Card className="animate-slide-up">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Profile Image and Basic Info */}
              <div className="space-y-6">
                <div className="relative">
                  <img
                    src={lawyer.image}
                    alt={lawyer.name}
                    className="w-48 h-48 rounded-full mx-auto object-cover"
                  />
                  {lawyer.verified && (
                    <Badge className="absolute -top-2 -right-2 bg-green-600">
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold">{lawyer.name}</h2>
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {lawyer.specialty}
                  </Badge>
                  <div className="flex items-center justify-center text-lg text-muted-foreground">
                    <MapPin className="w-5 h-5 mr-2" />
                    {lawyer.location}
                  </div>
                  <div className="flex items-center justify-center">
                    <Rating value={lawyer.rating} />
                    <span className="ml-2 text-lg">
                      ({lawyer.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">About</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {getDescription(lawyer)}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {lawyer.experience}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Experience
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {lawyer.successRate}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Success Rate
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {lawyer.consultations}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Consultations
                    </div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div
                      className={`text-2xl font-bold ${
                        lawyer.available ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {lawyer.available ? "Available" : "Busy"}
                    </div>
                    <div className="text-sm text-muted-foreground">Status</div>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {lawyer.languages.map((lang) => (
                      <Badge
                        key={lang}
                        variant="outline"
                        className="text-sm px-3 py-1"
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-primary/5 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">
                    Consultation Fee
                  </h3>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {lawyer.fees}
                  </div>
                  <p className="text-muted-foreground">Per consultation</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button
                      size="lg"
                      disabled={!lawyer.available}
                      onClick={() =>
                        navigate("/booking", { state: { lawyer } })
                      }
                      className="w-full"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Consultation
                    </Button>
                    <Button variant="outline" size="lg" className="w-full">
                      <Video className="w-5 h-5 mr-2" />
                      Video Call
                    </Button>
                  </div>
                  <div className="flex space-x-2 justify-center">
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Globe className="w-4 h-4 mr-2" />
                      Website
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Award className="w-4 h-4 mr-2" />
                      Awards
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LawyerDetails;
