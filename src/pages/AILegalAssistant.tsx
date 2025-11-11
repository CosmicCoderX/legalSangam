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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bot,
  MessageSquare,
  FileText,
  Search,
  Lightbulb,
  Shield,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AILegalAssistant = () => {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [legalArea, setLegalArea] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI Legal Assistant. How can I help you with your legal questions today?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const legalAreas = [
    "Criminal Law",
    "Family Law",
    "Corporate Law",
    "Property Law",
    "Labor Law",
    "Consumer Protection",
    "Tax Law",
    "Immigration Law",
  ];

  const handleSendMessage = async () => {
    if (!query.trim()) return;

    const userMessage = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: "assistant",
        content: `Thank you for your question about ${
          legalArea || "general legal matters"
        }. Based on Indian law, here's some general information: [This is a simulated response. In a real implementation, this would connect to an AI service for accurate legal advice.] Please note that this is not a substitute for professional legal counsel. I recommend consulting with a qualified lawyer for your specific situation.`,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const features = [
    {
      icon: MessageSquare,
      title: "Legal Chatbot",
      description:
        "Get instant answers to your legal questions through our AI-powered chatbot.",
    },
    {
      icon: FileText,
      title: "Document Analysis",
      description:
        "Upload legal documents for AI-powered analysis and insights.",
    },
    {
      icon: Search,
      title: "Legal Research",
      description:
        "Search through legal precedents and case laws relevant to your query.",
    },
    {
      icon: Lightbulb,
      title: "Legal Guidance",
      description: "Receive step-by-step guidance for common legal procedures.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Bot className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            AI Legal Assistant
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get instant legal guidance with our advanced AI-powered assistant.
            Ask questions, analyze documents, and receive preliminary legal
            advice 24/7.
          </p>
          <div className="flex justify-center">
            <Badge variant="secondary" className="px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              AI-Powered Legal Support
            </Badge>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-medium transition-all"
            >
              <CardHeader>
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chat Interface */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Legal Consultation Chat
            </CardTitle>
            <CardDescription>
              Ask your legal questions and get AI-powered responses. Remember,
              this is preliminary advice.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Legal Area Selector */}
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium">Legal Area:</label>
              <Select value={legalArea} onValueChange={setLegalArea}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select legal area" />
                </SelectTrigger>
                <SelectContent>
                  {legalAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto border rounded-lg p-4 space-y-4 bg-muted/20">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-background border px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="flex space-x-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your legal question here..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!query.trim()}>
                Send
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Legal Advice Form */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Detailed Legal Consultation Request</CardTitle>
            <CardDescription>
              For complex legal matters, submit a detailed request and we'll
              connect you with human experts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input placeholder="Your full name" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="your.email@example.com" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Legal Area</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select the relevant legal area" />
                </SelectTrigger>
                <SelectContent>
                  {legalAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">
                Describe Your Legal Issue
              </label>
              <Textarea
                placeholder="Please provide details about your legal situation..."
                rows={4}
              />
            </div>
            <Button className="w-full">Submit Consultation Request</Button>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800">
                  Important Disclaimer
                </h3>
                <p className="text-yellow-700 text-sm mt-1">
                  The AI Legal Assistant provides general information and
                  preliminary guidance based on Indian laws. This is not a
                  substitute for professional legal advice. Always consult with
                  qualified legal professionals for your specific circumstances.
                  LegalSangam is not liable for any actions taken based on AI
                  responses.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AILegalAssistant;
