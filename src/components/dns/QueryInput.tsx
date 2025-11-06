import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { DnsQuery, QueryType } from "@/types/dns";
import { toast } from "sonner";

interface QueryInputProps {
  onQuery: (query: DnsQuery) => void;
}

const QueryInput = ({ onQuery }: QueryInputProps) => {
  const [domain, setDomain] = useState("");
  const [queryType, setQueryType] = useState<QueryType>("A");

  // Extract domain from URL or return as-is if already just a domain
  const extractDomain = (input: string): string => {
    try {
      // Remove protocol if present
      let cleaned = input.trim().replace(/^https?:\/\//, '');
      
      // Remove path, query parameters, and hash
      cleaned = cleaned.split('/')[0].split('?')[0].split('#')[0];
      
      // Remove port if present
      cleaned = cleaned.split(':')[0];
      
      return cleaned;
    } catch {
      return input.trim();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!domain.trim()) {
      toast.error("Please enter a domain name or URL");
      return;
    }

    const extractedDomain = extractDomain(domain);

    const query: DnsQuery = {
      domain: extractedDomain,
      type: queryType,
      timestamp: Date.now(),
    };

    onQuery(query);
    toast.success(`Querying ${extractedDomain}...`);
    setDomain("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="domain" className="text-sm font-semibold">Domain Name or URL</Label>
        <Input
          id="domain"
          placeholder="example.com or https://example.com/path"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="bg-input/50 border-border font-mono h-11 focus:ring-2 focus:ring-primary/30 transition-all"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Accepts full URLs - the domain will be automatically extracted
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="queryType" className="text-sm font-semibold">Query Type</Label>
        <Select value={queryType} onValueChange={(value) => setQueryType(value as QueryType)}>
          <SelectTrigger id="queryType" className="bg-input/50 border-border h-11 focus:ring-2 focus:ring-primary/30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="A">A (IPv4 Address)</SelectItem>
            <SelectItem value="AAAA">AAAA (IPv6 Address)</SelectItem>
            <SelectItem value="CNAME">CNAME (Canonical Name)</SelectItem>
            <SelectItem value="MX">MX (Mail Exchange)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:shadow-primary/50 text-primary-foreground h-11 font-semibold transition-all duration-300 hover:scale-[1.02]"
      >
        <Search className="w-4 h-4 mr-2" />
        Resolve Domain
      </Button>
    </form>
  );
};

export default QueryInput;
