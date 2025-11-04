export type QueryType = "A" | "AAAA" | "CNAME" | "MX";

export interface DnsQuery {
  domain: string;
  type: QueryType;
  timestamp: number;
  steps?: ResolutionStep[];
  totalTime?: number;
}

export interface CacheEntry {
  domain: string;
  ip: string;
  type: QueryType;
  ttl: number;
  timestamp: number;
}

export interface AuthServer {
  domain: string;
  ip: string;
  type: QueryType;
}

export interface ResolutionStep {
  step: string;
  description: string;
  result: string;
  status: "success" | "error" | "warning" | "info";
  time: number;
}

export interface Stats {
  hits: number;
  misses: number;
  totalQueries: number;
  avgTime: number;
}
