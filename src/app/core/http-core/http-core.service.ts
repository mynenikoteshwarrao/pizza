import { Base } from 'src/app/models/base-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injector } from '@angular/core';
import { HttpBaseService } from '../http-base/http-base.service';

export class HttpCoreService<T extends Base<T>>
 extends HttpBaseService {
  
  constructor(injector: Injector, protected url: string) {
    super(injector, url)
   }

  public create(entity: Partial<T>): Observable<T> {
    return this.httpCreate<T>(entity).pipe(map (resp=> resp as T));
  }

  public update(entity: Partial<T>): Observable<T> {
    return this.httpUpdate<T>(entity).pipe(map (resp=> resp as T));
  }

  public read(id: number): Observable<T> {
    return this.httpRead(id).pipe(map (resp=> resp as T));
  }

  public list(): Observable<T[]> {
    return this.httpList<T>().pipe(map (resp=> resp as T[]));
  }

  public delete(entity: Partial<T>) {
    return this.httpDelete<T>(entity).pipe(map (resp=> resp as T));
  }

}
