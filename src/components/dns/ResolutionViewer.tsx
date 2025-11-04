import { CheckCircle2, XCircle, AlertCircle, Info, ArrowRight } from "lucide-react";
import { ResolutionStep } from "@/types/dns";
import { cn } from "@/lib/utils";

interface ResolutionViewerProps {
  steps: ResolutionStep[];
}

const ResolutionViewer = ({ steps }: ResolutionViewerProps) => {
  const getStatusIcon = (status: ResolutionStep["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "error":
        return <XCircle className="w-5 h-5 text-destructive" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-warning" />;
      case "info":
        return <Info className="w-5 h-5 text-primary" />;
    }
  };

  const getStatusColor = (status: ResolutionStep["status"]) => {
    switch (status) {
      case "success":
        return "border-success/50 bg-success/10";
      case "error":
        return "border-destructive/50 bg-destructive/10";
      case "warning":
        return "border-warning/50 bg-warning/10";
      case "info":
        return "border-primary/50 bg-primary/10";
    }
  };

  if (steps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <div className="relative">
          <Info className="w-16 h-16 mb-4 opacity-30" />
          <div className="absolute inset-0 w-16 h-16 bg-primary/10 rounded-full blur-xl animate-pulse" />
        </div>
        <p className="text-base font-medium">No resolution steps to display</p>
        <p className="text-sm mt-2 text-center max-w-xs">Submit a query to see the resolution path</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
          <div className={cn(
            "p-5 rounded-xl border-2 transition-all hover:scale-[1.02] duration-300",
            getStatusColor(step.status)
          )}>
            <div className="flex items-start gap-4">
              <div className="mt-1 p-2 rounded-lg bg-background/50">
                {getStatusIcon(step.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-base">{step.step}</h3>
                  <span className="text-xs font-mono px-2 py-1 rounded-full bg-background/50 text-muted-foreground">
                    {step.time}ms
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{step.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Result:</span>
                  <code className="text-sm font-mono px-3 py-1.5 rounded-lg bg-background/70 border border-border font-semibold">
                    {step.result}
                  </code>
                </div>
              </div>
            </div>
          </div>
          
          {index < steps.length - 1 && (
            <div className="flex justify-center py-3">
              <ArrowRight className="w-5 h-5 text-primary/50 rotate-90 animate-pulse" />
            </div>
          )}
        </div>
      ))}

      <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-primary/10 to-primary-glow/10 border-2 border-primary/30">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold uppercase tracking-wide">Total Resolution Time:</span>
          <span className="text-2xl font-bold text-gradient font-mono">
            {steps.reduce((acc, step) => acc + step.time, 0)}ms
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResolutionViewer;
