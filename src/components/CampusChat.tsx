import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, BookOpen, MapPin, Utensils, Clock, Settings } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  query: string;
}

const quickActions: QuickAction[] = [
  { icon: <Clock className="w-4 h-4" />, label: "Class Schedule", query: "What's my class schedule today?" },
  { icon: <Utensils className="w-4 h-4" />, label: "Dining Hours", query: "What are the dining hall hours?" },
  { icon: <BookOpen className="w-4 h-4" />, label: "Library Info", query: "When is the library open?" },
  { icon: <MapPin className="w-4 h-4" />, label: "Campus Map", query: "Where is the student center?" },
  { icon: <Settings className="w-4 h-4" />, label: "Admin Help", query: "How do I register for classes?" },
];

const campusKnowledge = {
  schedule: "Classes run Monday-Friday from 8:00 AM to 10:00 PM. Weekend classes are available for some programs.",
  dining: "Main dining hall: 7:00 AM - 9:00 PM weekdays, 8:00 AM - 8:00 PM weekends. Coffee shop: 6:30 AM - 11:00 PM daily.",
  library: "Main library: 24/7 during semester, 8:00 AM - 10:00 PM during breaks. Study rooms available for reservation.",
  facilities: "Campus includes gym (5:00 AM - 11:00 PM), pool (6:00 AM - 10:00 PM), and recreation center with gaming and activities.",
  admin: "Registration opens 2 weeks before semester. Visit Student Services in the main building or use the online portal."
};

function getCampusResponse(query: string): string {
  const lowercaseQuery = query.toLowerCase();
  
  if (lowercaseQuery.includes("schedule") || lowercaseQuery.includes("class")) {
    return campusKnowledge.schedule;
  }
  if (lowercaseQuery.includes("dining") || lowercaseQuery.includes("food") || lowercaseQuery.includes("eat")) {
    return campusKnowledge.dining;
  }
  if (lowercaseQuery.includes("library") || lowercaseQuery.includes("study")) {
    return campusKnowledge.library;
  }
  if (lowercaseQuery.includes("gym") || lowercaseQuery.includes("pool") || lowercaseQuery.includes("recreation")) {
    return campusKnowledge.facilities;
  }
  if (lowercaseQuery.includes("register") || lowercaseQuery.includes("admin") || lowercaseQuery.includes("enrollment")) {
    return campusKnowledge.admin;
  }
  if (lowercaseQuery.includes("student center") || lowercaseQuery.includes("where")) {
    return "The Student Center is located in the heart of campus, next to the main library. It houses dining options, student services, and meeting spaces.";
  }
  
  return "I'm here to help with campus information! Ask me about class schedules, dining hours, library services, campus facilities, or administrative procedures.";
}

export default function CampusChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Smart Campus Assistant. I can help you with information about schedules, facilities, dining, library services, and administrative procedures. What would you like to know?",
      sender: "assistant",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getCampusResponse(content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "assistant",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-card shadow-elevated border-0">
      <div className="flex flex-col h-[600px]">
        {/* Header */}
        <div className="bg-gradient-primary p-4 rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Smart Campus Assistant</h2>
              <p className="text-white/80 text-sm">Your guide to campus life</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b bg-campus-light-blue">
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.query)}
                className="flex items-center gap-2 text-campus-blue border-campus-blue hover:bg-campus-blue hover:text-white transition-smooth"
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'assistant' && (
                  <div className="bg-gradient-primary p-2 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] p-3 rounded-lg shadow-chat ${
                    message.sender === 'user'
                      ? 'bg-gradient-secondary text-white ml-auto'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-2 opacity-70 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <div className="bg-gradient-secondary p-2 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="bg-gradient-primary p-2 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-muted p-3 rounded-lg shadow-chat">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t bg-background">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about campus schedules, facilities, dining, or services..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              className="flex-1"
            />
            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-secondary hover:opacity-90 transition-smooth"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}