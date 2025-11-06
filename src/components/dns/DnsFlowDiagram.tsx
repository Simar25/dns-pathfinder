import { Monitor, Server, Globe, Shield, ArrowRight, Zap } from "lucide-react";

const DnsFlowDiagram = () => {
  const flowSteps = [
    {
      icon: Monitor,
      label: "Your Computer",
      sublabel: "example.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      label: "DNS Resolver",
      sublabel: "8.8.8.8",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Globe,
      label: "Root Server",
      sublabel: ".com TLD",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Server,
      label: "Auth Server",
      sublabel: "IP: 93.184.216.34",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="mb-8 p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 border-2 border-primary/20">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gradient mb-2">DNS Resolution Flow</h3>
        <p className="text-muted-foreground">Visual path of how domain names are converted to IP addresses</p>
      </div>

      {/* Desktop Flow - Horizontal */}
      <div className="hidden md:flex items-center justify-between gap-4 px-4">
        {flowSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="flex items-center flex-1">
              {/* Step Node */}
              <div className="flex-1 flex flex-col items-center animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="relative group">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-20 blur-xl rounded-full animate-pulse`} />
                  
                  {/* Icon container */}
                  <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} p-4 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                </div>
                
                {/* Labels */}
                <div className="mt-4 text-center">
                  <p className="font-bold text-sm">{step.label}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">{step.sublabel}</p>
                </div>
              </div>

              {/* Arrow between steps */}
              {index < flowSteps.length - 1 && (
                <div className="flex flex-col items-center px-2 animate-fade-in" style={{ animationDelay: `${index * 150 + 75}ms` }}>
                  <div className="relative flex items-center">
                    {/* Forward arrow */}
                    <div className="flex flex-col items-center">
                      <ArrowRight className="w-8 h-8 text-primary mb-1 animate-pulse" />
                      <span className="text-[10px] text-primary font-semibold">Query</span>
                    </div>
                  </div>
                  <div className="relative flex items-center mt-2">
                    {/* Return arrow */}
                    <div className="flex flex-col items-center">
                      <ArrowRight className="w-8 h-8 text-success rotate-180 mt-1 animate-pulse" style={{ animationDelay: "500ms" }} />
                      <span className="text-[10px] text-success font-semibold">Response</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Flow - Vertical */}
      <div className="md:hidden space-y-6">
        {flowSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index}>
              {/* Step Node */}
              <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-20 blur-xl rounded-full animate-pulse`} />
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-3 shadow-lg`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                </div>
                
                <div>
                  <p className="font-bold">{step.label}</p>
                  <p className="text-xs text-muted-foreground font-mono">{step.sublabel}</p>
                </div>
              </div>

              {/* Vertical arrows */}
              {index < flowSteps.length - 1 && (
                <div className="flex justify-center gap-8 my-3 ml-8">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-0.5 bg-primary animate-pulse" />
                    <ArrowRight className="w-5 h-5 text-primary rotate-90" />
                    <span className="text-[10px] text-primary font-semibold mt-1">Query</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-success font-semibold mb-1">Response</span>
                    <ArrowRight className="w-5 h-5 text-success -rotate-90 animate-pulse" style={{ animationDelay: "500ms" }} />
                    <div className="h-8 w-0.5 bg-success" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info box */}
      <div className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/30 flex items-start gap-3">
        <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-primary mb-1">How it works:</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            When you enter a domain, your computer queries the DNS resolver, which contacts the root server to find the TLD server, 
            then queries the authoritative server to get the actual IP address, which is then returned back to your computer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DnsFlowDiagram;
