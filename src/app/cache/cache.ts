export interface CacheConfig {
  defaultTtl: number;
  storageKey: string;
}

export interface CacheItem {
  data: any;
  timestamp: number;
  ttl: number;
}