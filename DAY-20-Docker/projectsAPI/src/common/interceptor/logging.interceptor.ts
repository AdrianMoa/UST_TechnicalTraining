import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('[Log Interceptor] Before...');
    const request = context.switchToHttp().getRequest();
    console.log('Request:', {
      method: request.method,
      url: request.url,
      headers: request.headers,
      body: request.body
    });

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`[Log Interceptor] After... ${Date.now() - now}ms`)),
      );
  }
}