import { Card } from "@/components/ui/card";
import { Activity, Target, Zap, Clock } from "lucide-react";
import { Stats } from "@/types/dns";

interface StatsDashboardProps {
  stats: Stats;
}

const StatsDashboard = ({ stats }: StatsDashboardProps) => {
  const hitRate = stats.totalQueries > 0 
    ? ((stats.hits / stats.totalQueries) * 100).toFixed(1) 
    : "0.0";

  const statCards = [
    {
      icon: Activity,
      label: "Total Queries",
      value: stats.totalQueries.toString(),
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Target,
      label: "Cache Hits",
      value: stats.hits.toString(),
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      icon: Zap,
      label: "Cache Misses",
      value: stats.misses.toString(),
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      icon: Clock,
      label: "Avg Time",
      value: `${stats.avgTime.toFixed(1)}ms`,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card 
          key={index} 
          className="glass-card p-5 hover:scale-105 hover:shadow-lg transition-all duration-300 group animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{stat.label}</p>
              <p className="text-3xl font-bold font-mono bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">{stat.value}</p>
              {stat.label === "Cache Hits" && stats.totalQueries > 0 && (
                <p className="text-xs text-success font-semibold mt-1 flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  {hitRate}% hit rate
                </p>
              )}
            </div>
            <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsDashboard;
