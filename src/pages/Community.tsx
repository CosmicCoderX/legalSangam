import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MessageCircle, ThumbsUp, User } from "lucide-react";

const Community = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Property Laws in India: A Complete Guide",
      excerpt: "Comprehensive overview of property registration, documentation, and legal procedures for property transactions in India.",
      author: "Adv. Priya Sharma",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Property Law",
      likes: 156,
      comments: 23,
    },
    {
      id: 2,
      title: "Consumer Rights and Online Shopping Protection",
      excerpt: "Know your rights as a consumer and how to protect yourself from online fraud and defective products.",
      author: "Adv. Rajesh Kumar",
      date: "2024-01-12",
      readTime: "5 min read",
      category: "Consumer Law",
      likes: 89,
      comments: 12,
    },
    {
      id: 3,
      title: "Labour Law Updates 2024: What Employees Need to Know",
      excerpt: "Recent amendments in labour laws and their impact on employee rights, wages, and workplace policies.",
      author: "Adv. Meera Patel",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Labour Law",
      likes: 134,
      comments: 28,
    }
  ];

  const legalNews = [
    {
      id: 1,
      title: "Supreme Court Verdict on Digital Privacy Rights",
      date: "2024-01-16",
      source: "Legal Today"
    },
    {
      id: 2,
      title: "New Guidelines for Start-up Registration Process",
      date: "2024-01-14",
      source: "Business Law Weekly"
    },
    {
      id: 3,
      title: "Amendment in Cybercrime Investigation Procedures",
      date: "2024-01-13",
      source: "Tech Law Bulletin"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground">Legal Community Hub</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest legal insights, expert articles, and community discussions from verified legal professionals.
          </p>
        </div>

        {/* Featured Blog Posts */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Expert Articles</h2>
            <Button variant="outline">View All Articles</Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <Card key={post.id} className="hover:shadow-medium transition-all duration-300 animate-slide-up cursor-pointer group" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {post.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Read More</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Legal News Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Latest Legal News</h2>
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Breaking Legal Updates</CardTitle>
              <CardDescription>Stay updated with the latest developments in Indian legal system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {legalNews.map((news, index) => (
                  <div key={news.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer" style={{ animationDelay: `${index * 150}ms` }}>
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">{news.title}</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{news.source}</span>
                        <span className="mx-2">•</span>
                        <span>{news.date}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Read</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Community Stats */}
        <section className="grid md:grid-cols-4 gap-6 animate-fade-in">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
              <div className="text-sm text-muted-foreground">Legal Articles</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">45,000+</div>
              <div className="text-sm text-muted-foreground">Community Members</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">1,200+</div>
              <div className="text-sm text-muted-foreground">Expert Contributors</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Community;