import { Button } from "@/components/ui/button";
import { Download, HelpCircle, BookOpen, Users } from "lucide-react";
import DevelopedByModal from "./modals/DevelopedByModal";
import LearnModal from "./modals/LearnModal";
import HelpModal from "./modals/HelpModal";
import { useState } from "react";

interface HeaderProps {
  onDownload: () => void;
}

const Header = ({ onDownload }: HeaderProps) => {
  const [developedByOpen, setDevelopedByOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 right-0 z-50 p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onDownload}
            className="gap-2 backdrop-blur-sm bg-card/80 border-border hover:bg-card hover:border-primary/50 transition-all duration-300 hover:scale-105"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setHelpOpen(true)}
            className="gap-2 backdrop-blur-sm bg-card/80 border-border hover:bg-card hover:border-primary/50 transition-all duration-300 hover:scale-105"
          >
            <HelpCircle className="w-4 h-4" />
            Help
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLearnOpen(true)}
            className="gap-2 backdrop-blur-sm bg-card/80 border-border hover:bg-card hover:border-primary/50 transition-all duration-300 hover:scale-105"
          >
            <BookOpen className="w-4 h-4" />
            Learn
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDevelopedByOpen(true)}
            className="gap-2 backdrop-blur-sm bg-card/80 border-border hover:bg-card hover:border-primary/50 transition-all duration-300 hover:scale-105"
          >
            <Users className="w-4 h-4" />
            Developed by
          </Button>
        </div>
      </header>

      <DevelopedByModal open={developedByOpen} onOpenChange={setDevelopedByOpen} />
      <LearnModal open={learnOpen} onOpenChange={setLearnOpen} />
      <HelpModal open={helpOpen} onOpenChange={setHelpOpen} />
    </>
  );
};

export default Header;
