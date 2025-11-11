import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Phone, Globe, Filter, Search, Navigation } from "lucide-react";

const MapView = () => {
  const [searchLocation, setSearchLocation] = useState("Delhi, India");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  
  const lawyers = [
    {
      id: 1,
      name: "Adv. Rajesh Kumar",
      specialty: "Criminal Law",
      rating: 4.8,
      reviews: 156,
      experience: "15 years",
      location: "Connaught Place, Delhi",
      distance: "2.1 km",
      phone: "+91 98765 43210",
      website: "rajeshlaw.com",
      verified: true,
      fees: "₹2,500/consultation",
      languages: ["Hindi", "English"],
      coordinates: { lat: 28.6315, lng: 77.2167 }
    },
    {
      id: 2,
      name: "Adv. Priya Sharma",
      specialty: "Family Law",
      rating: 4.9,
      reviews: 203,
      experience: "12 years",
      location: "Lajpat Nagar, Delhi",
      distance: "3.8 km",
      phone: "+91 98765 43211",
      website: "priyalaw.com",
      verified: true,
      fees: "₹3,000/consultation",
      languages: ["Hindi", "English", "Punjabi"],
      coordinates: { lat: 28.5677, lng: 77.2434 }
    },
    {
      id: 3,
      name: "Adv. Vikram Singh",
      specialty: "Corporate Law",
      rating: 4.7,
      reviews: 89,
      experience: "18 years",
      location: "Karol Bagh, Delhi",
      distance: "4.2 km",
      phone: "+91 98765 43212",
      website: "vikramcorp.com",
      verified: true,
      fees: "₹5,000/consultation",
      languages: ["Hindi", "English"],
      coordinates: { lat: 28.6517, lng: 77.1910 }
    },
    {
      id: 4,
      name: "Adv. Meera Patel",
      specialty: "Property Law",
      rating: 4.6,
      reviews: 142,
      experience: "10 years",
      location: "Khan Market, Delhi",
      distance: "5.1 km",
      phone: "+91 98765 43213",
      website: "meeralaw.com",
      verified: true,
      fees: "₹2,800/consultation",
      languages: ["Hindi", "English", "Gujarati"],
      coordinates: { lat: 28.5984, lng: 77.2319 }
    }
  ];

  const specialties = [
    "Criminal Law", "Family Law", "Corporate Law", "Property Law", 
    "Labor Law", "Consumer Protection", "Tax Law", "Immigration Law"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Find Lawyers Near You</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover verified legal professionals in your area with our geo-location feature. Connect with experienced lawyers based on proximity and expertise.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Search & Filter
            </CardTitle>
            <CardDescription>
              Find lawyers by location, specialty, and other preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <div className="relative">
                  <Input 
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="Enter city or area"
                    className="pl-10"
                  />
                  <Navigation className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Legal Specialty</label>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty.toLowerCase()}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end space-x-2">
                <Button className="flex-1">
                  <Filter className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
                <Button variant="outline">
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map Placeholder and Results */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Map View</CardTitle>
              <CardDescription>Interactive map showing lawyer locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="w-16 h-16 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Interactive Map</h3>
                    <p className="text-muted-foreground text-sm">
                      Map integration coming soon.<br/>
                      Currently showing list view of nearby lawyers.
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Use My Location
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Nearby Lawyers ({lawyers.length})</h2>
              <Button variant="outline" size="sm">
                Sort by Distance
              </Button>
            </div>

            <div className="space-y-4">
              {lawyers.map((lawyer, index) => (
                <Card key={lawyer.id} className="hover:shadow-medium transition-all duration-300 animate-slide-up cursor-pointer" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-xl font-semibold">{lawyer.name}</h3>
                            {lawyer.verified && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                              {lawyer.rating} ({lawyer.reviews} reviews)
                            </span>
                            <span>{lawyer.experience} experience</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-primary">{lawyer.fees}</div>
                          <div className="text-sm text-muted-foreground">{lawyer.distance} away</div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Badge variant="outline" className="mr-2">{lawyer.specialty}</Badge>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-1" />
                            {lawyer.location}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {lawyer.languages.map((lang) => (
                              <Badge key={lang} variant="secondary" className="text-xs">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <Button size="sm" className="w-full">
                            Book Consultation
                          </Button>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Phone className="w-4 h-4 mr-1" />
                              Call
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Globe className="w-4 h-4 mr-1" />
                              Website
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 animate-fade-in">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">2.5k+</div>
              <div className="text-sm text-muted-foreground">Verified Lawyers</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Cities Covered</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Available Support</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">4.8★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapView;