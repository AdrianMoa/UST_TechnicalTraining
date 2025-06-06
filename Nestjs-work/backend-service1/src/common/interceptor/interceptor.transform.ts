import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { instanceToPlain } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext, 
        next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
            console.log("\n **************** INTERCEPTOR(START) ****************");
            return next.handle().pipe(map((data) => {
                console.log('RAW data: ');
                console.log(data);
                let transf = instanceToPlain(data);
                console.log('Data transformed: ');
                console.log(transf);
                console.log("\n **************** INTERCEPTOR(END) ****************");
                return transf;
            }));
    }
}