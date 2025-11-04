import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { DnsQuery } from "@/types/dns";
import { cn } from "@/lib/utils";

interface QueryTreeProps {
  queries: DnsQuery[];
}

const QueryTree = ({ queries }: QueryTreeProps) => {
  if (queries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <Clock className="w-12 h-12 mb-3 opacity-50" />
        <p className="text-sm">No queries yet</p>
        <p className="text-xs mt-1">Submit a query to see it appear here</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-3">
        {queries.map((query, index) => {
          const isResolved = query.steps?.some(step => step.status === "success");
          const isFailed = query.steps?.some(step => step.status === "error");
          
          return (
            <div 
              key={index} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={cn(
                "p-4 rounded-lg border-2 transition-all",
                isResolved && "border-success/50 bg-success/5",
                isFailed && "border-destructive/50 bg-destructive/5",
                !isResolved && !isFailed && "border-border bg-card"
              )}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {isResolved && <CheckCircle2 className="w-4 h-4 text-success" />}
                    {isFailed && <XCircle className="w-4 h-4 text-destructive" />}
                    <div>
                      <p className="font-mono font-medium text-sm">{query.domain}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary">
                          {query.type}
                        </span>
                        {query.totalTime && (
                          <span className="text-xs text-muted-foreground">
                            {query.totalTime}ms
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(query.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                {query.steps && query.steps.length > 0 && (
                  <div className="ml-6 space-y-2 border-l-2 border-border pl-4">
                    {query.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="text-xs">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            step.status === "success" && "bg-success",
                            step.status === "error" && "bg-destructive",
                            step.status === "warning" && "bg-warning",
                            step.status === "info" && "bg-primary"
                          )} />
                          <span className="text-muted-foreground">{step.step}</span>
                          <span className="text-muted-foreground">→</span>
                          <code className="font-mono">{step.result}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default QueryTree;
