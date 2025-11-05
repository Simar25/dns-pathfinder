import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "lucide-react";
import drSwaminathan from "@/assets/dr-swaminathan.jpg";

interface DevelopedByModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DevelopedByModal = ({ open, onOpenChange }: DevelopedByModalProps) => {
  const teamMembers = [
    { name: "Simarjot Singh Anand", regNo: "24BCE5218", photo: null },
    { name: "Shashank Poddar", regNo: "24BCE5241", photo: null },
    { name: "Dr. A.Swaminathan", regNo: "Guided by", photo: drSwaminathan },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Developed by</DialogTitle>
          <DialogDescription>
            Meet the team behind this DNS Simulator
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-lg border border-border bg-secondary/50"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-primary" />
                )}
              </div>
              <div>
                <p className="font-semibold text-lg">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.regNo}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DevelopedByModal;
