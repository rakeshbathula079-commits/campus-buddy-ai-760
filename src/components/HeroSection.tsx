import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Clock, MapPin, BookOpen, Utensils, GraduationCap } from "lucide-react";
import heroImage from "@/assets/campus-hero.jpg";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-elevated transition-smooth">
      <div className="flex items-center gap-4 mb-3">
        <div className="bg-gradient-primary p-3 rounded-lg">
          <div className="text-white">
            {icon}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </Card>
  );
}

interface HeroSectionProps {
  onStartChat: () => void;
}

export default function HeroSection({ onStartChat }: HeroSectionProps) {
  const features = [
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Class Schedules",
      description: "Get real-time information about class times, room locations, and schedule changes."
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Campus Navigation",
      description: "Find buildings, facilities, and services across campus with detailed directions."
    },
    {
      icon: <Utensils className="w-5 h-5" />,
      title: "Dining Services",
      description: "Discover dining hall hours, menus, and food options available on campus."
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Library Resources",
      description: "Access library hours, study spaces, and academic resources for your studies."
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: "Academic Support",
      description: "Get help with registration, academic policies, and student services."
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "24/7 Assistance",
      description: "Available around the clock to answer your campus-related questions."
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Modern university campus" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Smart Campus
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary-light to-secondary">
                Assistant
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Your intelligent guide to campus life. Get instant answers about schedules, facilities, 
              dining, library services, and administrative procedures.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onStartChat}
                size="lg"
                className="bg-gradient-secondary hover:opacity-90 text-white px-8 py-6 text-lg font-semibold shadow-elevated transition-bounce"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Chatting
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-6 text-lg font-semibold backdrop-blur-sm bg-white/10 transition-bounce"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Know
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI assistant provides comprehensive support for all aspects of campus life
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who use our Smart Campus Assistant daily for quick, accurate campus information.
          </p>
          <Button 
            onClick={onStartChat}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold shadow-elevated transition-bounce"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Ask Your First Question
          </Button>
        </div>
      </section>
    </div>
  );
}