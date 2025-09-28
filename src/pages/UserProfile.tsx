import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, LogOut, Shield, Mail, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const joinDate = user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown';

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold">
              Welcome, {user.displayName || user.email}!
            </CardTitle>
            <p className="text-muted-foreground">
              Manage your account and legal services
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-medium">Account Status</span>
                </div>
                <p className="text-sm text-muted-foreground">Active Member</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-primary" />
                  <span className="font-medium">Full Name</span>
                </div>
                <p className="text-sm text-muted-foreground">{user.displayName || 'Not set'}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="font-medium">Email</span>
                </div>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="font-medium">Join Date</span>
                </div>
                <p className="text-sm text-muted-foreground">{joinDate}</p>
              </div>
            </div>
            <div className="pt-6 border-t">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/find")}
                >
                  Find Lawyers
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/services")}
                >
                  View Services
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/ai-legal-assistant")}
                >
                  AI Assistant
                </Button>
              </div>
            </div>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
