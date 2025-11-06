import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Network, Database, Activity, TreePine } from "lucide-react";
import QueryInput from "@/components/dns/QueryInput";
import CacheManager from "@/components/dns/CacheManager";
import ResolutionViewer from "@/components/dns/ResolutionViewer";
import StatsDashboard from "@/components/dns/StatsDashboard";
import QueryTree from "@/components/dns/QueryTree";
import ServerConfig from "@/components/dns/ServerConfig";
import DnsFlowDiagram from "@/components/dns/DnsFlowDiagram";
import Header from "@/components/Header";
import { DnsQuery, CacheEntry, AuthServer, ResolutionStep } from "@/types/dns";
import { toast } from "sonner";

const Index = () => {
  const [queries, setQueries] = useState<DnsQuery[]>([]);
  const [cache, setCache] = useState<CacheEntry[]>([
    { domain: "google.com", ip: "142.250.185.46", type: "A", ttl: 300, timestamp: Date.now() },
    { domain: "github.com", ip: "140.82.121.4", type: "A", ttl: 60, timestamp: Date.now() },
  ]);
  const [servers, setServers] = useState<AuthServer[]>([
    { domain: "google.com", ip: "142.250.185.46", type: "A" },
    { domain: "example.com", ip: "93.184.216.34", type: "A" },
    { domain: "github.com", ip: "140.82.121.4", type: "A" },
    { domain: "cloudflare.com", ip: "104.16.132.229", type: "A" },
  ]);
  const [resolutions, setResolutions] = useState<ResolutionStep[]>([]);
  const [stats, setStats] = useState({ hits: 0, misses: 0, totalQueries: 0, avgTime: 0 });

  const handleQuery = (query: DnsQuery) => {
    const startTime = Date.now();
    const steps: ResolutionStep[] = [];
    
    // Check local cache
    const cached = cache.find(
      (entry) => 
        entry.domain === query.domain && 
        entry.type === query.type &&
        Date.now() - entry.timestamp < entry.ttl * 1000
    );

    if (cached) {
      steps.push({
        step: "Local Cache",
        description: `Found ${query.domain} in local cache`,
        result: cached.ip,
        status: "success",
        time: 2,
      });
      
      setStats((prev) => ({
        ...prev,
        hits: prev.hits + 1,
        totalQueries: prev.totalQueries + 1,
        avgTime: ((prev.avgTime * prev.totalQueries) + 2) / (prev.totalQueries + 1),
      }));
    } else {
      steps.push({
        step: "Local Cache",
        description: `${query.domain} not found in cache`,
        result: "MISS",
        status: "warning",
        time: 1,
      });

      steps.push({
        step: "Recursive Resolver",
        description: "Querying recursive DNS resolver",
        result: "8.8.8.8",
        status: "info",
        time: 15,
      });

      const authServer = servers.find(
        (server) => server.domain === query.domain && server.type === query.type
      );

      if (authServer) {
        steps.push({
          step: "Authoritative Server",
          description: `Resolved ${query.domain} from authoritative server`,
          result: authServer.ip,
          status: "success",
          time: 25,
        });

        // Add to cache
        const newCacheEntry: CacheEntry = {
          domain: query.domain,
          ip: authServer.ip,
          type: query.type,
          ttl: 300,
          timestamp: Date.now(),
        };
        setCache((prev) => [...prev, newCacheEntry]);
      } else {
        steps.push({
          step: "Authoritative Server",
          description: `No authoritative server found for ${query.domain}`,
          result: "NXDOMAIN",
          status: "error",
          time: 30,
        });
      }

      setStats((prev) => ({
        ...prev,
        misses: prev.misses + 1,
        totalQueries: prev.totalQueries + 1,
        avgTime: ((prev.avgTime * prev.totalQueries) + 43) / (prev.totalQueries + 1),
      }));
    }

    const totalTime = steps.reduce((acc, step) => acc + step.time, 0);
    const completedQuery = { ...query, steps, totalTime, timestamp: Date.now() };
    
    setQueries((prev) => [completedQuery, ...prev]);
    setResolutions(steps);
  };

  const handleClearCache = () => {
    setCache([]);
  };

  const handleAddServer = (server: AuthServer) => {
    setServers((prev) => [...prev, server]);
  };

  const handleDownload = () => {
    if (queries.length === 0) {
      toast.error("No query data to download. Please perform a DNS query first.");
      return;
    }

    const latestQuery = queries[0];
    const downloadData = {
      domain: latestQuery.domain,
      queryType: latestQuery.type,
      timestamp: new Date(latestQuery.timestamp).toLocaleString(),
      totalResolutionTime: `${latestQuery.totalTime}ms`,
      steps: latestQuery.steps?.map((step, index) => ({
        stepNumber: index + 1,
        step: step.step,
        description: step.description,
        result: step.result,
        status: step.status,
        time: `${step.time}ms`,
      })),
      statistics: {
        totalQueries: stats.totalQueries,
        cacheHits: stats.hits,
        cacheMisses: stats.misses,
        hitRate: stats.totalQueries > 0 ? `${((stats.hits / stats.totalQueries) * 100).toFixed(1)}%` : "0%",
        averageTime: `${stats.avgTime.toFixed(2)}ms`,
      },
    };

    const blob = new Blob([JSON.stringify(downloadData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dns-query-${latestQuery.domain}-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Query data downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card p-4 md:p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
      </div>
      
      <Header onDownload={handleDownload} />
      <div className="max-w-7xl mx-auto space-y-8 animate-slide-up pt-16 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 pb-8">
          <div className="flex items-center justify-center gap-3 animate-scale-in">
            <div className="relative">
              <Network className="w-12 h-12 text-primary animate-float" />
              <div className="absolute inset-0 w-12 h-12 bg-primary/20 rounded-full blur-xl animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gradient drop-shadow-lg">
              DNS Simulator
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Simulate and visualize Domain Name System resolution with cache management, 
            authoritative servers, and detailed query analytics
          </p>
        </div>

        {/* Stats Dashboard */}
        <StatsDashboard stats={stats} />

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Input & Config */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="glass-card p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <Tabs defaultValue="query" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-secondary/50 p-1">
                  <TabsTrigger 
                    value="query" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all"
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    Query
                  </TabsTrigger>
                  <TabsTrigger 
                    value="cache" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all"
                  >
                    <Database className="w-4 h-4 mr-2" />
                    Cache
                  </TabsTrigger>
                  <TabsTrigger 
                    value="servers" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all"
                  >
                    <Network className="w-4 h-4 mr-2" />
                    Servers
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="query" className="mt-6">
                  <QueryInput onQuery={handleQuery} />
                </TabsContent>

                <TabsContent value="cache" className="mt-6">
                  <CacheManager 
                    cache={cache} 
                    onClearCache={handleClearCache}
                    onRemoveEntry={(domain) => setCache(prev => prev.filter(e => e.domain !== domain))}
                  />
                </TabsContent>

                <TabsContent value="servers" className="mt-6">
                  <ServerConfig servers={servers} onAddServer={handleAddServer} />
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Right Column - Visualization */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TreePine className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Resolution Path</h2>
              </div>
              <DnsFlowDiagram />
              <ResolutionViewer steps={resolutions} />
            </Card>

            <Card className="glass-card p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Network className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Query History Tree</h2>
              </div>
              <QueryTree queries={queries} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
