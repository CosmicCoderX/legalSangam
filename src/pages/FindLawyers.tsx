import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Star,
  MapPin,
  Phone,
  Globe,
  Search,
  Filter,
  Calendar,
  Video,
  Users,
  Award,
} from "lucide-react";
import Rating from "@/pages/Rating";

const FindLawyers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [priceRange, setPriceRange] = useState([1000, 10000]);
  const [selectedRating, setSelectedRating] = useState("");

  const lawyers = [
    {
      id: 1,
      name: "Advocate Rajesh",
      specialty: "Family Law",
      rating: 4.7,
      reviews: 120,
      experience: "19 years",
      location: "Bangalore",
      fees: "₹2,000/consultation",
      languages: ["English", "Kannada", "Hindi"],
      verified: true,
      available: true,
      image: "/Advocates/advocate-rajesh-ks.jpg",
      consultations: 450,
      successRate: 95,
      description:
        "Experienced family lawyer specializing in divorce and matrimonial disputes in Bangalore courts.",
    },
    {
      id: 2,
      name: "Advocate Chopra",
      specialty: "Criminal Law",
      rating: 4.5,
      reviews: 75,
      experience: "24 years",
      location: "Gurgaon",
      fees: "₹3,500/consultation",
      languages: ["Hindi", "English"],
      verified: true,
      available: false,
      image: "/Advocates/advocate-ricky-chopra.webp",
      consultations: 320,
      successRate: 92,
      description:
        "Senior criminal advocate handling high-profile cases in Gurgaon and Delhi NCR.",
    },
    {
      id: 3,
      name: "Adv. Vikram",
      specialty: "Civil Law",
      rating: 4.8,
      reviews: 45,
      experience: "23 years",
      location: "Delhi",
      fees: "₹4,000/consultation",
      languages: ["Hindi", "English"],
      verified: true,
      available: true,
      image: "/Advocates/advocate-ajit-kakkar.webp",
      consultations: 280,
      successRate: 96,
      description:
        "Expert in civil litigation and dispute resolution in Delhi High Court.",
    },
    {
      id: 4,
      name: "Adv. H Gour",
      specialty: "Property Law",
      rating: 4.6,
      reviews: 80,
      experience: "25 years",
      location: "Hyderabad",
      fees: "₹2,800/consultation",
      languages: ["Telugu", "English", "Hindi"],
      verified: true,
      available: true,
      image: "/Advocates/advocate-gouri-shankar.webp",
      consultations: 410,
      successRate: 93,
      description:
        "Property and real estate law specialist in Hyderabad with extensive court experience.",
    },
    {
      id: 5,
      name: "Advocate Suksham Aggarwal",
      specialty: "Divorce Law",
      rating: 4.3,
      reviews: 25,
      experience: "12 years",
      location: "Ambala",
      fees: "₹1,800/consultation",
      languages: ["Hindi", "Punjabi"],
      verified: true,
      available: true,
      image: "/Advocates/advocate-suksham-aggarwal.webp",
      consultations: 150,
      successRate: 88,
      description:
        "Family and divorce lawyer serving clients in Ambala and nearby districts.",
    },
    {
      id: 6,
      name: "Advocate Balanjan",
      specialty: "District Court Practice",
      rating: 4.1,
      reviews: 35,
      experience: "40 years",
      location: "Chennai",
      fees: "₹3,000/consultation",
      languages: ["Tamil", "English"],
      verified: true,
      available: false,
      image: "/Advocates/advocate-bala-janaki.webp",
      consultations: 600,
      successRate: 90,
      description:
        "Veteran lawyer with decades of experience in Chennai district courts.",
    },
    {
      id: 7,
      name: "Advocate Raj Jadhav",
      specialty: "Criminal Law",
      rating: 4.7,
      reviews: 112,
      experience: "17 years",
      location: "Pune",
      fees: "₹2,500/consultation",
      languages: ["Marathi", "Hindi", "English"],
      verified: true,
      available: true,
      image: "/Advocates/advocate-ravi-jadhav.webp",
      consultations: 380,
      successRate: 94,
      description:
        "Criminal law expert handling cases in Pune sessions and high courts.",
    },
    {
      id: 8,
      name: "Adv. J Rinwa",
      specialty: "Supreme Court Practice",
      rating: 4.2,
      reviews: 67,
      experience: "24 years",
      location: "Jaipur",
      fees: "₹4,500/consultation",
      languages: ["Hindi", "English"],
      verified: true,
      available: true,
      image: "/Advocates/advocate-j-p-rinwa.webp",
      consultations: 290,
      successRate: 91,
      description:
        "Supreme Court advocate based in Jaipur with national practice.",
    },
    {
      id: 9,
      name: "Advocate Atul",
      specialty: "Labor Law",
      rating: 4.5,
      reviews: 50,
      experience: "17 years",
      location: "Jaipur",
      fees: "₹2,200/consultation",
      languages: ["Hindi", "Rajasthani"],
      verified: true,
      available: true,
      image: "/Advocates/advocate-atulay-nehra.webp",
      consultations: 220,
      successRate: 89,
      description:
        "Labor and employment law specialist in Jaipur industrial areas.",
    },
    {
      id: 10,
      name: "Adv. Priya Singh",
      specialty: "Corporate Law",
      rating: 4.9,
      reviews: 200,
      experience: "14 years",
      location: "Mumbai",
      fees: "₹5,000/consultation",
      languages: ["English", "Hindi", "Marathi"],
      verified: true,
      available: true,
      image: "/placeholder.svg",
      consultations: 750,
      successRate: 97,
      description:
        "Corporate lawyer focusing on business law and contracts in Mumbai.",
    },
  ];

  const specialties = [
    "Criminal Law",
    "Family Law",
    "Corporate Law",
    "Property Law",
    "Labor Law",
    "Consumer Protection",
    "Tax Law",
    "Immigration Law",
    "Intellectual Property",
    "Banking Law",
    "Environmental Law",
    "Cyber Law",
  ];

  const cities = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Ahmedabad",
    "Pune",
    "Surat",
    "Jaipur",
    "Lucknow",
    "Kanpur",
  ];

  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesSearch =
      searchQuery === "" ||
      lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity =
      selectedCity === "" ||
      selectedCity === "all" ||
      lawyer.location.toLowerCase() === selectedCity.toLowerCase();

    const matchesSpecialty =
      selectedSpecialty === "" ||
      selectedSpecialty === "all" ||
      lawyer.specialty.toLowerCase() === selectedSpecialty.toLowerCase();

    const matchesRating =
      selectedRating === "" || lawyer.rating >= parseFloat(selectedRating);

    const feeMatch = lawyer.fees.match(/₹([\d,]+)/);
    const fee = feeMatch ? parseInt(feeMatch[1].replace(/,/g, "")) : 0;
    const matchesPrice = fee >= priceRange[0] && fee <= priceRange[1];

    return (
      matchesSearch &&
      matchesCity &&
      matchesSpecialty &&
      matchesRating &&
      matchesPrice
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground">
            Find Expert Lawyers
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with verified legal professionals across India. Filter by
            location, specialty, ratings, and consultation fees to find the
            perfect lawyer for your needs.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Search & Filter Lawyers
            </CardTitle>
            <CardDescription>
              Find the right legal expert based on your specific requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, specialty, or keywords..."
                className="pl-10"
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            </div>

            {/* Filter Options */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city.toLowerCase()}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Legal Specialty</label>
                <Select
                  value={selectedSpecialty}
                  onValueChange={setSelectedSpecialty}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    {specialties.map((specialty) => (
                      <SelectItem
                        key={specialty}
                        value={specialty.toLowerCase()}
                      >
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum Rating</label>
                <Select
                  value={selectedRating}
                  onValueChange={setSelectedRating}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    <SelectItem value="4.0">4.0+ Stars</SelectItem>
                    <SelectItem value="3.5">3.5+ Stars</SelectItem>
                    <SelectItem value="3.0">3.0+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Consultation Fee Range
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={15000}
                  min={500}
                  step={500}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
              <Button>Apply Filters</Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Available Lawyers ({filteredLawyers.length})
            </h2>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6">
            {filteredLawyers.map((lawyer, index) => (
              <Card
                key={lawyer.id}
                className="hover:shadow-medium transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    {/* Profile Image and Basic Info */}
                    <div className="space-y-4">
                      <div className="relative">
                        <img
                          src={lawyer.image}
                          alt={lawyer.name}
                          className="w-32 h-32 rounded-full mx-auto object-cover"
                        />
                        {lawyer.verified && (
                          <Badge className="absolute -top-2 -right-2 bg-green-600">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="text-center space-y-1">
                        <h3 className="text-xl font-semibold">{lawyer.name}</h3>
                        <Badge variant="secondary">{lawyer.specialty}</Badge>
                        <div className="flex items-center justify-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-1" />
                          {lawyer.location}
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="md:col-span-2 space-y-4">
                      <div className="space-y-3">
                        <p className="text-muted-foreground text-sm">
                          {lawyer.description}
                        </p>

                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <Rating value={lawyer.rating} />
                          </div>
                          <span className="text-muted-foreground">
                            ({lawyer.reviews} reviews)
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Experience:{" "}
                            </span>
                            <span className="font-medium">
                              {lawyer.experience}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Success Rate:{" "}
                            </span>
                            <span className="font-medium text-green-600">
                              {lawyer.successRate}%
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Consultations:{" "}
                            </span>
                            <span className="font-medium">
                              {lawyer.consultations}
                            </span>
                          </div>
                          <div
                            className={`font-medium ${
                              lawyer.available
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {lawyer.available ? "Available Now" : "Busy"}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {lawyer.languages.map((lang) => (
                            <Badge
                              key={lang}
                              variant="outline"
                              className="text-xs"
                            >
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Pricing and Actions */}
                    <div className="space-y-4">
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-bold text-primary">
                          {lawyer.fees}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Per consultation
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Button
                          className="w-full"
                          disabled={!lawyer.available}
                          onClick={() =>
                            navigate("/booking", { state: { lawyer } })
                          }
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Consultation
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Video className="w-4 h-4 mr-2" />
                          Video Call
                        </Button>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="flex-1">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1">
                          <Globe className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1">
                          <Award className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center animate-fade-in">
          <Button variant="outline" size="lg">
            Load More Lawyers
          </Button>
        </div>

        {/* Embedded Map with Lawyer Locations */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Lawyer Locations Across India
              </CardTitle>
              <CardDescription>
                Interactive map showing locations of available lawyers. Click on
                pins for more details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3854014.758!2d78.9629!3d20.5937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDM1JzM4LjciTiA3OMKwNTcnNDcuMiJF!5e0!3m2!1sen!2sin!4v1720000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lawyer Locations Map"
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Map shows approximate locations of lawyers across India. Zoom
                  in for details.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FindLawyers;
