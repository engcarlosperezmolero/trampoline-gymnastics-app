import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { calculateElementDifficulty, quickExamples } from "@/utils/scoringUtils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const DifficultyCalculator = () => {
  const { t } = useTranslation();
  const [discipline, setDiscipline] = useState<"trampoline" | "doubleMini">("trampoline");
  const [elementCode, setElementCode] = useState("");
  const [currentScore, setCurrentScore] = useState(0);

  const handleCalculate = () => {
    const score = calculateElementDifficulty(elementCode);
    setCurrentScore(score);
  };

  const handleReset = () => {
    setElementCode("");
    setCurrentScore(0);
  };

  const handleQuickExample = (code: string) => {
    setElementCode(code);
    const score = calculateElementDifficulty(code);
    setCurrentScore(score);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-6">{t("difficultyCalculator")}</h2>
      
      <div className="bg-card rounded-lg shadow-sm overflow-hidden">
        <Tabs defaultValue="trampoline" onValueChange={(value) => setDiscipline(value as "trampoline" | "doubleMini")}>
          <TabsList className="grid grid-cols-2 w-full rounded-none">
            <TabsTrigger className="py-3" value="trampoline">{t("trampoline")}</TabsTrigger>
            <TabsTrigger className="py-3" value="doubleMini">{t("doubleMini")}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="space-y-4">
        <Input
          placeholder={t("elementCode")}
          value={elementCode}
          onChange={(e) => setElementCode(e.target.value)}
          className="text-lg"
        />
        
        <div className="bg-accent p-4 rounded-lg">
          <div className="text-primary text-xl font-semibold">{t("currentScore")}: {currentScore.toFixed(1)}</div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">{t("quickExamples")}</h3>
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {quickExamples.map((example) => (
                  <CarouselItem key={example.code} className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                    <Button
                      variant="outline"
                      onClick={() => handleQuickExample(example.code)}
                      className="bg-accent hover:bg-accent/80 w-full"
                    >
                      {example.code}
                    </Button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 h-8 w-8" />
              <CarouselNext className="-right-4 h-8 w-8" />
            </Carousel>
          </div>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="notation-guide">
            <AccordionTrigger className="text-lg">
              <div className="flex items-center">
                <span>{t("numericNotationGuide")}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-4 bg-card rounded-md" dangerouslySetInnerHTML={{ __html: t("notationGuideContent") }}></div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="flex gap-4 pt-4">
          <Button onClick={handleCalculate} className="w-full">{t("calculate")}</Button>
          <Button onClick={handleReset} variant="outline" className="w-full">{t("reset")}</Button>
        </div>
      </div>
    </div>
  );
};

export default DifficultyCalculator;
