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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!domain.trim()) {
      toast.error("Please enter a domain name");
      return;
    }

    const query: DnsQuery = {
      domain: domain.trim(),
      type: queryType,
      timestamp: Date.now(),
    };

    onQuery(query);
    toast.success(`Querying ${domain}...`);
    setDomain("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="domain" className="text-sm font-medium">Domain Name</Label>
        <Input
          id="domain"
          placeholder="example.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="bg-input border-border font-mono"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="queryType" className="text-sm font-medium">Query Type</Label>
        <Select value={queryType} onValueChange={(value) => setQueryType(value as QueryType)}>
          <SelectTrigger id="queryType" className="bg-input border-border">
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
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Search className="w-4 h-4 mr-2" />
        Resolve Domain
      </Button>
    </form>
  );
};

export default QueryInput;
