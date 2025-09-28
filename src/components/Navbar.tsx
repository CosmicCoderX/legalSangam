import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Menu, X, Scale, Globe, User } from "lucide-react";
import {
  useLanguage,
  languageNames,
  Language,
} from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentLanguage, setLanguage, t } = useLanguage();
  const { isLoggedIn, username } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Scale className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">
              LegalSangam
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/services"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t("services")}
            </Link>
            <Link
              to="/find"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t("findLawyers")}
            </Link>
            <Link
              to="/about"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t("about")}
            </Link>
            <Link
              to="/contact"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t("contact")}
            </Link>
          </div>

          {/* Language Selector & CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Select
              value={currentLanguage}
              onValueChange={(value) => setLanguage(value as Language)}
            >
              <SelectTrigger className="w-auto border-0 bg-transparent hover:bg-muted/50 transition-colors">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="min-w-[120px]">
                {Object.entries(languageNames).map(([code, name]) => (
                  <SelectItem key={code} value={code}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isLoggedIn ? (
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
                onClick={() => navigate("/profile")}
              >
                <User className="h-4 w-4" />
                <span>{username}</span>
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/signup")}
                >
                  {t("Sign Up") || "Sign Up"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>
              </>
            )}
            <Button
              size="sm"
              className="bg-gradient-hero shadow-soft hover:shadow-medium transition-all"
              onClick={() => navigate("/services")}
            >
              {t("getStarted")}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t">
              <Link
                to="/services"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
              >
                {t("services")}
              </Link>
              <Link
                to="/find"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
              >
                {t("findLawyers")}
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
              >
                {t("about")}
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
              >
                {t("contact")}
              </Link>
              <div className="pt-4 space-y-2">
                <Select
                  value={currentLanguage}
                  onValueChange={(value) => setLanguage(value as Language)}
                >
                  <SelectTrigger className="w-full bg-transparent border border-input">
                    <Globe className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(languageNames).map(([code, name]) => (
                      <SelectItem key={code} value={code}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!isLoggedIn && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => navigate("/signup")}
                  >
                    {t("signUp") || "Sign Up"}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>
                <Button
                  className="w-full bg-gradient-hero shadow-soft"
                  onClick={() => navigate("/services")}
                >
                  {t("getStarted")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
