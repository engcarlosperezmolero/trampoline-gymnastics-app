
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DraggableElement } from "@/components/DraggableElement";
import { calculateElementDifficulty, calculatePassDifficulty } from "@/utils/scoringUtils";

interface Element {
  id: string;
  code: string;
  value: number;
}

const PassCalculator = () => {
  const { t } = useTranslation();
  const [discipline, setDiscipline] = useState<"trampoline" | "doubleMini">("trampoline");
  const [elements, setElements] = useState<Element[]>([]);
  const [newElement, setNewElement] = useState("");
  const [totalScore, setTotalScore] = useState(0);

  const getMaxElements = () => discipline === "trampoline" ? 10 : 2;

  const handleAddElement = () => {
    if (!newElement.trim() || elements.length >= getMaxElements()) return;
    
    const value = calculateElementDifficulty(newElement);
    const newElementObj = {
      id: `${Date.now()}`,
      code: newElement,
      value,
    };
    
    setElements([...elements, newElementObj]);
    setNewElement("");
    updateTotalScore([...elements, newElementObj], discipline);
  };

  const handleRemoveElement = (id: string) => {
    const updatedElements = elements.filter((element) => element.id !== id);
    setElements(updatedElements);
    updateTotalScore(updatedElements, discipline);
  };

  const moveElement = useCallback((dragIndex: number, hoverIndex: number) => {
    setElements((prevElements) => {
      const updatedElements = [...prevElements];
      const [draggedItem] = updatedElements.splice(dragIndex, 1);
      updatedElements.splice(hoverIndex, 0, draggedItem);
      return updatedElements;
    });
  }, []);

  const updateTotalScore = (elementsList: Element[], currentDiscipline: string) => {
    const score = calculatePassDifficulty(
      elementsList,
      currentDiscipline as "trampoline" | "doubleMini"
    );
    setTotalScore(score);
  };

  const handleReset = () => {
    setElements([]);
    setNewElement("");
    setTotalScore(0);
  };

  const handleDisciplineChange = (value: string) => {
    const newDiscipline = value as "trampoline" | "doubleMini";
    setDiscipline(newDiscipline);
    
    // If switching to double mini and we have more than 2 elements, trim the list
    if (newDiscipline === "doubleMini" && elements.length > 2) {
      const trimmedElements = elements.slice(0, 2);
      setElements(trimmedElements);
      updateTotalScore(trimmedElements, newDiscipline);
    } else {
      updateTotalScore(elements, newDiscipline);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-6">{t("passCalculator")}</h2>
      
      <div className="bg-card rounded-lg shadow-sm overflow-hidden">
        <Tabs 
          defaultValue="trampoline" 
          onValueChange={handleDisciplineChange}
        >
          <TabsList className="grid grid-cols-2 w-full rounded-none">
            <TabsTrigger className="py-3" value="trampoline">{t("trampoline")}</TabsTrigger>
            <TabsTrigger className="py-3" value="doubleMini">{t("doubleMini")}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder={t("enterElement")}
            value={newElement}
            onChange={(e) => setNewElement(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={handleAddElement}
            disabled={elements.length >= getMaxElements()}
          >
            Add
          </Button>
        </div>
        
        <div className="space-y-2">
          {elements.length > 0 ? (
            elements.map((element, index) => (
              <DraggableElement 
                key={element.id}
                id={element.id}
                index={index}
                moveElement={moveElement}
              >
                <div className="bg-card p-3 rounded-md flex justify-between items-center border">
                  <div className="flex items-center gap-3">
                    <div className="text-muted-foreground">
                      {index + 1}.
                    </div>
                    <div className="font-medium">{element.code}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-primary font-semibold">{element.value.toFixed(1)}</div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveElement(element.id)}
                    >
                      ✕
                    </Button>
                  </div>
                </div>
              </DraggableElement>
            ))
          ) : (
            <div className="text-center p-6 bg-muted/50 rounded-md text-muted-foreground">
              {t("enterElement")}
            </div>
          )}
        </div>
        
        <div className="bg-accent p-4 rounded-lg">
          <div className="text-primary text-xl font-semibold">{t("totalScore")}: {totalScore.toFixed(1)}</div>
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
        
        <Button onClick={handleReset} variant="outline" className="w-full">
          {t("reset")}
        </Button>
      </div>
    </div>
  );
};

export default PassCalculator;
