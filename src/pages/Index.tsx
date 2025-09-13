import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import CampusChat from "@/components/CampusChat";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  const handleStartChat = () => {
    setShowChat(true);
  };

  return (
    <div className="min-h-screen">
      {!showChat ? (
        <HeroSection onStartChat={handleStartChat} />
      ) : (
        <div className="min-h-screen bg-gradient-background py-8">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <button 
                onClick={() => setShowChat(false)}
                className="text-primary hover:text-primary-dark transition-smooth text-sm font-medium"
              >
                ← Back to Home
              </button>
            </div>
            <CampusChat />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
