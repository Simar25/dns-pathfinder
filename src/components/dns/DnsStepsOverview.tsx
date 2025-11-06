import { Search, Database, Globe, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const DnsStepsOverview = () => {
  const steps = [
    {
      icon: Search,
      title: "Query DNS",
      description: "Submit domain name query",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      icon: Database,
      title: "Check Cache",
      description: "Search local DNS cache",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
    },
    {
      icon: Globe,
      title: "Recursive Resolver",
      description: "Query DNS resolver",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
    },
    {
      icon: CheckCircle,
      title: "Get Answer",
      description: "Receive IP address",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div
            key={index}
            className="relative group animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={cn(
                "relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl",
                step.bgColor,
                step.borderColor
              )}
            >
              {/* Step number badge */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className={cn(
                  "p-4 rounded-2xl bg-gradient-to-br shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                  step.color
                )}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center space-y-2">
                <h3 className="font-bold text-lg">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connecting arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-primary/50" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DnsStepsOverview;
