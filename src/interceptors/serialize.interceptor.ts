import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from "@nestjs/common";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

export class SerializeInterceptor implements NestInterceptor{
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    console.log("running", context)
    return next.handle().pipe(
      map((data: any) => {
        console.log("running before response is sent", context)
      })
    );
  }

}