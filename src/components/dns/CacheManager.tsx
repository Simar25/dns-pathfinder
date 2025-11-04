import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Clock, Database } from "lucide-react";
import { CacheEntry } from "@/types/dns";
import { toast } from "sonner";

interface CacheManagerProps {
  cache: CacheEntry[];
  onClearCache: () => void;
  onRemoveEntry: (domain: string) => void;
}

const CacheManager = ({ cache, onClearCache, onRemoveEntry }: CacheManagerProps) => {
  const handleClear = () => {
    onClearCache();
    toast.success("Cache cleared");
  };

  const handleRemove = (domain: string) => {
    onRemoveEntry(domain);
    toast.success(`Removed ${domain} from cache`);
  };

  const getTTLRemaining = (entry: CacheEntry) => {
    const elapsed = Math.floor((Date.now() - entry.timestamp) / 1000);
    const remaining = entry.ttl - elapsed;
    return Math.max(0, remaining);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Cache Entries ({cache.length})</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          disabled={cache.length === 0}
          className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <Trash2 className="w-3 h-3 mr-1" />
          Clear All
        </Button>
      </div>

      <ScrollArea className="h-[300px] rounded-md border border-border bg-secondary/50 p-2">
        {cache.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Database className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">Cache is empty</p>
          </div>
        ) : (
          <div className="space-y-2">
            {cache.map((entry, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-card border border-border hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm font-medium truncate">{entry.domain}</p>
                    <p className="font-mono text-xs text-muted-foreground">{entry.ip}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary">
                        {entry.type}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>TTL: {getTTLRemaining(entry)}s</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(entry.domain)}
                    className="hover:bg-destructive/20 hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default CacheManager;
