import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HelpCircle, Play, ArrowRight, BarChart3, Settings } from "lucide-react";

interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpModal = ({ open, onOpenChange }: HelpModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <HelpCircle className="w-6 h-6" />
            How to Use DNS Simulator
          </DialogTitle>
          <DialogDescription>
            Complete guide to using this DNS resolution simulator
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            {/* Project Overview */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-primary">About This Simulator</h3>
              <p className="text-sm">
                This DNS Simulator demonstrates how domain names are resolved to IP addresses
                through a hierarchical query process. It simulates local cache, recursive resolution,
                and authoritative server responses.
              </p>
            </section>

            {/* Input Instructions */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <Settings className="w-5 h-5" />
                How to Give Input
              </h3>
              <div className="space-y-2 text-sm">
                <div className="p-3 rounded-lg bg-secondary border border-border">
                  <p className="font-medium mb-1">1. Configure DNS Servers (Optional)</p>
                  <p className="text-muted-foreground">
                    Add authoritative servers with domain-to-IP mappings in the "DNS Servers" panel.
                    Example: Domain: example.com, IP: 93.184.216.34, Type: A
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-secondary border border-border">
                  <p className="font-medium mb-1">2. Add Cache Entries (Optional)</p>
                  <p className="text-muted-foreground">
                    Pre-populate the local DNS cache to simulate cached lookups.
                    Example: Domain: google.com, IP: 142.250.185.46, TTL: 300
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-secondary border border-border">
                  <p className="font-medium mb-1">3. Enter Domain Query</p>
                  <p className="text-muted-foreground">
                    Type a domain name (e.g., example.com, google.com) and select query type
                    (A, AAAA, CNAME, MX). Click "Resolve Domain" to start.
                  </p>
                </div>
              </div>
            </section>

            {/* Execution Flow */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <ArrowRight className="w-5 h-5" />
                Execution Flow
              </h3>
              <div className="space-y-1 text-sm">
                <p><strong>Step 1:</strong> Check local DNS cache for existing entries</p>
                <p><strong>Step 2:</strong> If cache miss, query recursive DNS server</p>
                <p><strong>Step 3:</strong> Recursive server queries authoritative server</p>
                <p><strong>Step 4:</strong> Result is returned and cached with TTL</p>
              </div>
            </section>

            {/* Processing */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <Play className="w-5 h-5" />
                What Gets Processed
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Domain name validation and normalization</li>
                <li>Cache lookup with TTL verification</li>
                <li>Recursive query simulation with timing</li>
                <li>Authoritative server response matching</li>
                <li>Cache update with new entries</li>
                <li>Statistics tracking (hits, misses, avg time)</li>
              </ul>
            </section>

            {/* Results Interpretation */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-primary">Interpreting Results</h3>
              <div className="space-y-2 text-sm">
                <p className="font-medium">Resolution Viewer:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><span className="text-success">Green:</span> Successful step</li>
                  <li><span className="text-destructive">Red:</span> Error or failure</li>
                  <li><span className="text-warning">Yellow:</span> Warning or cache miss</li>
                  <li><span className="text-primary">Blue:</span> Information step</li>
                </ul>
                <p className="mt-2">Each step shows the action taken, time elapsed, and result obtained.</p>
              </div>
            </section>

            {/* Graph Explanation */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Understanding Statistics
              </h3>
              <div className="space-y-1 text-sm">
                <p><strong>Cache Hits:</strong> Number of queries resolved from cache (faster)</p>
                <p><strong>Cache Misses:</strong> Number of queries requiring full resolution</p>
                <p><strong>Total Queries:</strong> All DNS lookups performed</p>
                <p><strong>Hit Rate:</strong> Percentage of cache hits (higher is better)</p>
                <p><strong>Avg Time:</strong> Average resolution time in milliseconds</p>
              </div>
            </section>

            {/* Tips */}
            <section className="space-y-3">
              <h3 className="text-lg font-semibold text-primary">Pro Tips</h3>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Query the same domain multiple times to see cache hit behavior</li>
                <li>Watch TTL counters decrease in real-time</li>
                <li>Compare resolution times for cache hits vs. misses</li>
                <li>Use the query tree to visualize resolution history</li>
                <li>Clear cache to simulate fresh DNS lookups</li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default HelpModal;
