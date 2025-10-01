import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  CreditCard,
  Lock,
  CheckCircle,
  AlertCircle,
  Calendar,
  FileText,
  IndianRupee,
  AlertTriangle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getDatabase, ref, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const Payments = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const { username } = useAuth();

  // Lawyers data (same as in FindLawyers)
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

  // Get selected lawyer from URL params
  const lawyerId = searchParams.get("lawyer");
  const selectedLawyer = lawyers.find(
    (l) => l.id === parseInt(lawyerId || "1")
  );

  // Calculate fees dynamically
  const consultationFee = selectedLawyer
    ? parseInt(selectedLawyer.fees.replace(/[^\d]/g, ""))
    : 3000;
  const platformFee = 100; // Fixed platform fee
  const gst = Math.round((consultationFee + platformFee) * 0.18); // 18% GST
  const total = consultationFee + platformFee + gst;

  const consultationDetails = {
    lawyer: selectedLawyer ? selectedLawyer.name : "Adv. Priya Sharma",
    specialty: selectedLawyer ? selectedLawyer.specialty : "Family Law",
    type: "Video Consultation",
    duration: "60 minutes",
    date: "Jan 20, 2024",
    time: "3:00 PM - 4:00 PM",
    fee: consultationFee,
    platformFee,
    gst,
    total,
  };

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard, popular: true },
    { id: "upi", name: "UPI", icon: IndianRupee, popular: true },
    { id: "wallet", name: "Digital Wallet", icon: Shield, popular: false },
    { id: "netbanking", name: "Net Banking", icon: Shield, popular: false },
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(async () => {
      setIsProcessing(false);
      // Generate roomID and navigate to success
      const roomID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      // Assuming bookingData is passed via state or from URL
      const bookingData = {
        lawyer: selectedLawyer,
        date: consultationDetails.date,
        time: consultationDetails.time,
        duration: consultationDetails.duration,
        type: consultationDetails.type,
        fee: consultationDetails.fee,
        platformFee: consultationDetails.platformFee,
        gst: consultationDetails.gst,
        total: consultationDetails.total,
      };

      // Store booking data in Firebase
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const db = getDatabase();
          const bookingRef = ref(db, `bookings/${user.uid}`);
          const newBookingRef = push(bookingRef);
          await set(newBookingRef, {
            lawyerId: selectedLawyer?.id,
            date: consultationDetails.date,
            time: consultationDetails.time,
            roomID,
            status: 'confirmed',
            createdAt: new Date().toISOString(),
          });
        }
      } catch (error) {
        console.error('Error storing booking:', error);
        // Continue with navigation even if storage fails
      }

      // Navigate to booking success
      navigate("/booking-success", { state: { roomID, bookingData } });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Secure Payment</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete your consultation booking with our secure payment gateway.
            Your data is encrypted and protected.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="space-y-6">
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Payment Details
                </CardTitle>
                <CardDescription>
                  Choose your preferred payment method and complete the
                  transaction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Methods */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Payment Method</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {paymentMethods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <div
                          key={method.id}
                          className={`relative p-4 rounded-lg border cursor-pointer transition-all ${
                            paymentMethod === method.id
                              ? "border-primary bg-primary/5"
                              : "border-input hover:border-primary/50"
                          }`}
                          onClick={() => setPaymentMethod(method.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent className="w-5 h-5" />
                            <div className="flex-1">
                              <div className="text-sm font-medium">
                                {method.name}
                              </div>
                            </div>
                          </div>
                          {method.popular && (
                            <Badge className="absolute -top-2 -right-2 text-xs">
                              Popular
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Card Details */}
                {paymentMethod === "card" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input id="cardName" placeholder="John Doe" />
                    </div>
                  </div>
                )}

                {/* UPI Details */}
                {paymentMethod === "upi" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input id="upiId" placeholder="yourname@paytm" />
                    </div>
                  </div>
                )}

                {/* Security Features */}
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 mr-2" />
                    256-bit SSL encryption
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Lock className="w-4 h-4 mr-2" />
                    PCI DSS compliant
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Refund protection
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? (
                    <>Processing Payment...</>
                  ) : (
                    <>Pay ₹{total}</>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card
              className="animate-slide-up"
              style={{ animationDelay: "100ms" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Consultation Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lawyer</span>
                    <span className="font-medium">
                      {consultationDetails.lawyer}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Specialty</span>
                    <Badge variant="secondary">
                      {consultationDetails.specialty}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span>{consultationDetails.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span>{consultationDetails.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Schedule</span>
                    <div className="text-right">
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {consultationDetails.date}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {consultationDetails.time}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Consultation Fee</span>
                    <span>₹{consultationFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span>₹{platformFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹{gst}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{total}</span>
                </div>
              </CardContent>
            </Card>

            {/* Refund Policy */}
            <Card
              className="animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Refund Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Full refund if cancelled 24 hours before consultation</p>
                <p>• 50% refund if cancelled 2 hours before consultation</p>
                <p>• No refund for no-shows or last-minute cancellations</p>
                <p>• Technical issues will be resolved with full refund</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust Indicators */}
        <div
          className="grid md:grid-cols-3 gap-6 animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">
                Bank-grade security for all transactions
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Guaranteed Service</h3>
              <p className="text-sm text-muted-foreground">
                Quality consultation or money back
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Lock className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Data Protection</h3>
              <p className="text-sm text-muted-foreground">
                Your information is encrypted and safe
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payments;
