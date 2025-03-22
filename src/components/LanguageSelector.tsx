import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { cn } from "../lib/utils";

interface LanguageSelectorProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onLanguageSelect?: (language: "amharic" | "english") => void;
}

const LanguageSelector = ({
  open = true,
  onOpenChange,
  onLanguageSelect = () => {},
}: LanguageSelectorProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<
    "amharic" | "english"
  >("english");

  const handleLanguageSelect = () => {
    onLanguageSelect(selectedLanguage);
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90%] w-[350px] bg-white rounded-lg p-4">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-center text-lg font-bold">
            Choose Your Language
          </DialogTitle>
          <DialogDescription className="text-center text-sm">
            ቋንቋዎን ይምረጡ
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup
            value={selectedLanguage}
            onValueChange={(value) =>
              setSelectedLanguage(value as "amharic" | "english")
            }
            className="flex flex-col space-y-3"
          >
            <div
              className={cn(
                "flex items-center space-x-3 rounded-md border p-3",
                selectedLanguage === "english"
                  ? "border-[#7CCD7C] bg-green-50"
                  : "border-gray-200",
              )}
            >
              <RadioGroupItem value="english" id="english" />
              <Label
                htmlFor="english"
                className="flex-1 cursor-pointer font-medium"
              >
                English
              </Label>
            </div>
            <div
              className={cn(
                "flex items-center space-x-3 rounded-md border p-3",
                selectedLanguage === "amharic"
                  ? "border-[#7CCD7C] bg-green-50"
                  : "border-gray-200",
              )}
            >
              <RadioGroupItem value="amharic" id="amharic" />
              <Label
                htmlFor="amharic"
                className="flex-1 cursor-pointer font-medium"
              >
                አማርኛ (Amharic)
              </Label>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button
            onClick={handleLanguageSelect}
            className="w-full bg-[#7CCD7C] hover:bg-[#6BBE6B] text-white font-medium"
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageSelector;
