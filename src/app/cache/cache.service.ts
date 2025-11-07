import { Injectable } from '@angular/core';
import { CacheConfig, CacheItem } from './cache';

@Injectable()
export class CacheService {
  private defaultTtl = 2 * 60 * 60 * 1000;
  private storageKey = 'weather-app-cache'

  set(key: string, data: any, customTtl?: number): void {
    const cacheItem: CacheItem = {
      data,
      timestamp: Date.now(),
      ttl: customTtl ?? this.defaultTtl
    };

    const cache = this.getCache();
    cache[key] = cacheItem;
    this.saveCache(cache);
  }

  get(key: string) {
    const cache = this.getCache();
    const item = cache[key] as CacheItem | undefined;

    if (!item) return;

    const isExpired = Date.now() - item.timestamp > item.ttl;
    if (isExpired) {
      this.remove(key);
      return;
    }

    return item.data;
  }

  remove(key: string): void {
    const cache = this.getCache();
    delete cache[key];
    this.saveCache(cache);
  }

  clear(): void {
    localStorage.removeItem(this.storageKey);
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  private getCache() {
    const cached = localStorage.getItem(this.storageKey);
    return cached ? JSON.parse(cached) : {};
  }

  private saveCache(cache): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cache));
  }
}