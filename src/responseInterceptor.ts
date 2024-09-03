import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface Response<T> {
  message: string;
  success: boolean;
  result: any;
  timeStamp: Date;
  statusCode: number;
  error: null;
}

export class TransformationInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const statusCode = context.switchToHttp().getResponse().statusCode;
    const path = context.switchToHttp().getRequest().url;
    return next.handle().pipe(
      map((data) => ({
        message: data.message,
        success: data.success,
        result: data.result,
        timeStamp: new Date(),
        statusCode,
        path,
        error: null,
      })),
    );
  }
}
