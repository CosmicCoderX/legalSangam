import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  HelpCircle,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: ["+91 1800-XXX-XXXX", "+91 98765-43210"],
      description: "Mon-Fri 9AM-6PM IST",
    },
    {
      icon: Mail,
      title: "Email Support",
      details: ["support@legalsangam.com", "help@legalsangam.com"],
      description: "We respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Office Address",
      details: ["123 Legal Street", "New Delhi, India - 110001"],
      description: "Visit us for in-person consultations",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 4:00 PM",
      ],
      description: "Sunday: Closed",
    },
  ];

  const faqs = [
    {
      question: "How do I find a lawyer?",
      answer:
        "Use our Find Lawyers page to search by specialty, location, and ratings. You can book consultations directly through our platform.",
    },
    {
      question: "Are all lawyers verified?",
      answer:
        "Yes, all lawyers on our platform undergo thorough verification including license checks, background verification, and client reviews.",
    },
    {
      question: "What languages do you support?",
      answer:
        "We support multiple Indian languages including Hindi, English, Bengali, Telugu, Marathi, Tamil, and more.",
    },
    {
      question: "How much does a consultation cost?",
      answer:
        "Consultation fees vary by lawyer and service type, starting from ₹500 for phone consultations to ₹5,000 for in-person meetings.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="flex justify-center">
            <MessageSquare className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions or need assistance? We're here to help. Reach out to
            us through any of the channels below or send us a message.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <Card
              key={info.title}
              className="text-center hover:shadow-medium transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <info.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">{info.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-sm font-medium">
                    {detail}
                  </p>
                ))}
                <p className="text-xs text-muted-foreground">
                  {info.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as
                possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        handleInputChange("subject", e.target.value)
                      }
                      placeholder="Brief subject line"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleInputChange("category", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">
                          Technical Support
                        </SelectItem>
                        <SelectItem value="legal">Legal Question</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    placeholder="Please describe your inquiry in detail..."
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <div className="space-y-6">
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Quick answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border-b border-border pb-4 last:border-b-0"
                  >
                    <h4 className="font-semibold mb-2">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 animate-fade-in">
              <CardContent className="text-center py-8">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Need Immediate Help?</h3>
                <p className="text-muted-foreground mb-4">
                  For urgent legal matters, our emergency hotline is available
                  24/7.
                </p>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Emergency Line
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl">Visit Our Office</CardTitle>
            <CardDescription>
              Located in the heart of New Delhi, easily accessible by metro and
              road.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.984!2d77.209021315!3d28.631475682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0287b0a3f5f9%3A0x4c7e7e7e7e7e7e7e!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1690000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Legal Sangam Office Location"
              ></iframe>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                123 Legal Street, Connaught Place, New Delhi - 110001
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
