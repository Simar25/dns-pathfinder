import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Server } from "lucide-react";
import { AuthServer, QueryType } from "@/types/dns";
import { toast } from "sonner";

interface ServerConfigProps {
  servers: AuthServer[];
  onAddServer: (server: AuthServer) => void;
}

const ServerConfig = ({ servers, onAddServer }: ServerConfigProps) => {
  const [domain, setDomain] = useState("");
  const [ip, setIp] = useState("");
  const [type, setType] = useState<QueryType>("A");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!domain.trim() || !ip.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const server: AuthServer = {
      domain: domain.trim(),
      ip: ip.trim(),
      type,
    };

    onAddServer(server);
    toast.success(`Added ${domain} to authoritative servers`);
    setDomain("");
    setIp("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Server className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">Authoritative Servers ({servers.length})</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="serverDomain" className="text-xs">Domain</Label>
          <Input
            id="serverDomain"
            placeholder="example.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="bg-input border-border font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="serverIp" className="text-xs">IP Address</Label>
          <Input
            id="serverIp"
            placeholder="192.0.2.1"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="bg-input border-border font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="serverType" className="text-xs">Record Type</Label>
          <Select value={type} onValueChange={(value) => setType(value as QueryType)}>
            <SelectTrigger id="serverType" className="bg-input border-border text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="A">A</SelectItem>
              <SelectItem value="AAAA">AAAA</SelectItem>
              <SelectItem value="CNAME">CNAME</SelectItem>
              <SelectItem value="MX">MX</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" size="sm" className="w-full bg-primary hover:bg-primary/90">
          <Plus className="w-3 h-3 mr-2" />
          Add Server
        </Button>
      </form>

      <ScrollArea className="h-[200px] rounded-md border border-border bg-secondary/50 p-2">
        {servers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Server className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-xs">No servers configured</p>
          </div>
        ) : (
          <div className="space-y-2">
            {servers.map((server, index) => (
              <div
                key={index}
                className="p-2 rounded bg-card border border-border"
              >
                <p className="font-mono text-xs font-medium truncate">{server.domain}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="font-mono text-xs text-muted-foreground">{server.ip}</p>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                    {server.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ServerConfig;
