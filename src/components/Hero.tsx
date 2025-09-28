import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Users, Scale, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6 shadow-soft">
            <Shield className="w-4 h-4 mr-2" />
            {t("trustBadge")}
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t("heroTitle")}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              {" "}
              {t("heroTitleHighlight")}
            </span>
            <br />
            {t("heroTitleEnd")}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            {t("heroDescription")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/find">
              <Button
                size="lg"
                className="bg-gradient-hero shadow-large hover:shadow-xl transition-all transform hover:scale-105 text-lg px-8 py-6"
              >
                {t("findLegalHelp")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/find">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all text-lg px-8 py-6"
              >
                {t("browseLawyers")}
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-gradient-card shadow-soft">
              <Users className="w-8 h-8 text-primary" />
              <div className="text-left">
                <div className="font-semibold text-foreground">
                  {t("lawyersCount")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("verifiedProfessionals")}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-gradient-card shadow-soft">
              <Scale className="w-8 h-8 text-primary" />
              <div className="text-left">
                <div className="font-semibold text-foreground">
                  {t("legalAreas")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("expertCoverage")}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-gradient-card shadow-soft">
              <CheckCircle className="w-8 h-8 text-primary" />
              <div className="text-left">
                <div className="font-semibold text-foreground">
                  {t("successRate")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("clientSatisfaction")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
