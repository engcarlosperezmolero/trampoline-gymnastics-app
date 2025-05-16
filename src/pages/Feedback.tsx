
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

type FeedbackType = "difficulty" | "execution" | "notation";

const Feedback = () => {
  const { t } = useTranslation();
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("difficulty");
  const [feedbackText, setFeedbackText] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedbackText.trim()) {
      toast({
        title: "Error",
        description: "Please provide feedback before submitting",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you'd submit this to your backend
    console.log({
      type: feedbackType,
      feedback: feedbackText,
      email,
    });
    
    toast({
      title: "Feedback Sent",
      description: "Thank you for your feedback!",
    });
    
    setFeedbackText("");
    setEmail("");
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-6">{t("sendFeedback")}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card rounded-lg shadow-sm overflow-hidden inline-block">
          <Tabs defaultValue="difficulty" onValueChange={(value) => setFeedbackType(value as FeedbackType)}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="difficulty">{t("difficulty")}</TabsTrigger>
              <TabsTrigger value="execution">{t("execution")}</TabsTrigger>
              <TabsTrigger value="notation">{t("notation")}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <Textarea
          placeholder={t("describeYourFeedback")}
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          className="min-h-[150px]"
        />
        
        <div className="flex items-center space-x-2">
          <Input
            type="email"
            placeholder={t("yourEmail")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <Button type="submit" className="w-full">
          {t("sendFeedback")}
        </Button>
      </form>
    </div>
  );
};

export default Feedback;
