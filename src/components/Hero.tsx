import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Scale, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="hero-section relative min-h-screen flex items-center bg-background group">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-10 brightness-50 group-hover:brightness-10 transition-all duration-300"
        autoPlay
        loop
        muted
        src="/1.mp4"
      ></video>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-80 transition-opacity duration-300 z-15 pointer-events-none"></div>
      {/* Content */}
      <div className="home-content relative container mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main headline */}
          <h1 className="hero-text text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {t('heroTitle')} {t('heroTitleHighlight')} {t('heroTitleEnd')}
          </h1>

          {/* Description */}
          <div className="mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            <p className="hero-text text-xl md:text-2xl text-[#fae057] font-bold">
              Connecting You to Trusted Legal Experts.
            </p>
            <p className="hero-text text-lg md:text-xl text-white/95">
              {t('heroDescription')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/find">
              <Button
                size="lg"
                className="bg-gradient-hero shadow-large hover:shadow-xl transition-all transform hover:scale-105 text-lg px-8 py-6"
              >
                {t('findLegalHelp')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/find">
              <Button
                variant="outline"
                size="lg"
                className="border-white bg-black/30 text-white hover:bg-white hover:text-black transition-all text-lg px-8 py-6 backdrop-blur-sm"
              >
                {t('browseLawyers')}
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-[#1a1a1a] shadow-soft backdrop-blur-sm">
              <Users className="w-8 h-8 text-yellow-400" />
              <div className="text-left">
                <div className="font-semibold text-yellow-400">{t('lawyersCount')}</div>
                <div className="text-sm text-white">{t('verifiedProfessionals')}</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-[#1a1a1a] shadow-soft backdrop-blur-sm">
              <Scale className="w-8 h-8 text-yellow-400" />
              <div className="text-left">
                <div className="font-semibold text-yellow-400">{t('legalAreas')}</div>
                <div className="text-sm text-white">{t('expertCoverage')}</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-[#1a1a1a] shadow-soft backdrop-blur-sm">
              <CheckCircle className="w-8 h-8 text-yellow-400" />
              <div className="text-left">
                <div className="font-semibold text-yellow-400">{t('successRate')}</div>
                <div className="text-sm text-white">{t('clientSatisfaction')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
