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
          className="p-4 bg-card border-border shadow-lg hover:border-primary transition-all"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold font-mono">{stat.value}</p>
              {stat.label === "Cache Hits" && stats.totalQueries > 0 && (
                <p className="text-xs text-success mt-1">{hitRate}% hit rate</p>
              )}
            </div>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsDashboard;
