import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Users, Scale, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section className="hero-section relative min-h-screen flex items-center overflow-hidden">
      <video
        className="video-background"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/5636967-uhd_3840_2160_24fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-overlay"></div>
      {/* Content */}
      <div className="home-content relative container mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/90 text-accent-foreground text-sm font-medium mb-6 shadow-soft backdrop-blur-sm">
            <Shield className="w-4 h-4 mr-2" />
            {t("trustBadge")}
          </div>

          {/* Main headline */}
          <h1 className="hero-text text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {t("heroTitle")}
            <span className="hero-text text-primary font-bold drop-shadow-lg">
              {" "}
              {t("heroTitleHighlight")}
            </span>
            <br />
            {t("heroTitleEnd")}
          </h1>

          {/* Description */}
          <p className="hero-text text-lg md:text-xl text-white/95 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
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
                  className="border-white bg-black/30 text-white hover:bg-white hover:text-black transition-all text-lg px-8 py-6 backdrop-blur-sm"
                >
                  {t("browseLawyers")}
                </Button>
              </Link>
            </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-white/95 shadow-soft backdrop-blur-sm">
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
            <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-white/95 shadow-soft backdrop-blur-sm">
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
            <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-white/95 shadow-soft backdrop-blur-sm">
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
