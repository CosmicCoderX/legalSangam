import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, ArrowLeft, Video, Calendar, Clock, User, Share2, Copy } from "lucide-react";

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomID, bookingData } = location.state || {};
  const { toast } = useToast();

  useEffect(() => {
    if (!bookingData) {
      navigate("/find");
    }
  }, [bookingData, navigate]);

  if (!bookingData) {
    return null;
  }

  const handleStartVideo = () => {
    if (roomID && bookingData) {
      navigate("/video-call", { state: { roomID, bookingData } });
    }
  };

  const shareUrl = `${window.location.origin}/video-call?roomID=${roomID}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "Share this link with your lawyer to join the consultation.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <Button
            variant="ghost"
            onClick={() => navigate("/find")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Lawyers
          </Button>
          <div className="inline-flex items-center p-4 bg-green-50 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-green-600">Booking Confirmed!</h1>
              <p className="text-muted-foreground">Your consultation has been successfully scheduled</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Details */}
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Consultation Details
              </CardTitle>
              <CardDescription>
                Review your scheduled consultation with the lawyer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">
                    {bookingData.lawyer.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{bookingData.lawyer.name}</h3>
                  <Badge variant="secondary">{bookingData.lawyer.specialty}</Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Date:</span>
                  <span className="text-sm">{bookingData.date}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Time:</span>
                  <span className="text-sm">{bookingData.time}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Video className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Type:</span>
                  <span className="text-sm">Video Consultation (60 minutes)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium">Room ID:</span>
                  <span className="text-sm font-mono bg-muted p-1 rounded">{roomID}</span>
                </div>
              </div>

              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Consultation Fee</span>
                  <span>₹{bookingData.fee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Platform Fee</span>
                  <span>₹{bookingData.platformFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>GST (18%)</span>
                  <span>₹{bookingData.gst}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total Amount</span>
                  <span>₹{bookingData.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="w-5 h-5 mr-2" />
                Ready to Start?
              </CardTitle>
              <CardDescription>
                Click below to begin your video consultation. Make sure you have a stable internet connection and quiet environment.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Ensure your camera and microphone are working</li>
                <li>• The consultation will last 60 minutes</li>
                <li>• Room ID: {roomID}</li>
                <li>• You can end the call anytime from the interface</li>
              </ul>

              <Button
                onClick={handleStartVideo}
                className="w-full"
                size="lg"
              >
                <Video className="w-4 h-4 mr-2" />
                Start Video Conference
              </Button>

              <div className="text-xs text-center text-muted-foreground">
                <p>Payment has been processed securely. You will receive a confirmation email shortly.</p>
              </div>
            </CardContent>
          </Card>

          {/* Share Link */}
          <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                Share Meeting Link
              </CardTitle>
              <CardDescription>
                Share this link with your lawyer so they can join the consultation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="flex space-x-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="flex-1"
                  placeholder="Meeting link will appear here"
                />
                <Button type="button" size="sm" onClick={handleCopyLink}>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Both you and your lawyer can use this link to join the same video room.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
