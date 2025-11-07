import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { CacheService } from './cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cacheService = inject(CacheService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET' || !this.isWeatherApiRequest(req)) {
      return next.handle(req);
    }

    const cacheKey = this.generateCacheKey(req);
    const cachedResponse = this.cacheService.get(cacheKey);

    if (cachedResponse) {
      return of(new HttpResponse({ body: cachedResponse }));
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cacheService.set(cacheKey, event.body);
        }
      })
    );
  }

  private isWeatherApiRequest(req: HttpRequest<any>): boolean {
    return req.url.includes('api.openweathermap.org');
  }

  private generateCacheKey(req: HttpRequest<any>): string {
    const key = `${req.url}-${JSON.stringify(req.params.toString())}`;
    return btoa(key);
  }
}