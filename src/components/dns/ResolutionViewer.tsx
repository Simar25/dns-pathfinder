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
        <Info className="w-12 h-12 mb-3 opacity-50" />
        <p className="text-sm">No resolution steps to display</p>
        <p className="text-xs mt-1">Submit a query to see the resolution path</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
          <div className={cn(
            "p-4 rounded-lg border-2 transition-all",
            getStatusColor(step.status)
          )}>
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {getStatusIcon(step.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm">{step.step}</h3>
                  <span className="text-xs text-muted-foreground">({step.time}ms)</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">Result:</span>
                  <code className="text-xs font-mono px-2 py-1 rounded bg-secondary border border-border">
                    {step.result}
                  </code>
                </div>
              </div>
            </div>
          </div>
          
          {index < steps.length - 1 && (
            <div className="flex justify-center py-2">
              <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
            </div>
          )}
        </div>
      ))}

      <div className="mt-6 p-4 rounded-lg bg-card border border-primary/30">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Total Resolution Time:</span>
          <span className="text-lg font-bold text-primary font-mono">
            {steps.reduce((acc, step) => acc + step.time, 0)}ms
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResolutionViewer;
