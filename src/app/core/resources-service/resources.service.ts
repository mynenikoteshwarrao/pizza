import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { flatMap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'
import { Base } from 'src/app/models/base-model';
import { HttpCoreService } from '../http-core/http-core.service';

export abstract class ResourcesService<T extends Base<T>>  {
  private url = environment.baseUrl;
  private httpCore: HttpCoreService<T>;

  constructor(injector: Injector, protected actionUrl:string){
    this.url = `${environment.baseUrl}/${actionUrl}`;
    this.httpCore = new HttpCoreService(injector, this.url)
  }

  public create(entity: Partial<T>): Observable<T> {
    return this.httpCore.create(entity).pipe(map (resp=> resp as T));
  }

  public update(entity: Partial<T>): Observable<T> {
    return this.httpCore.update(entity).pipe(map (resp=> resp as T));
  }

  public read(id: number): Observable<T> {
    return this.httpCore.read(id).pipe(map (resp=> resp as T));
  }

  public list(): Observable<T[]> {
    return this.httpCore.list().pipe(map (resp=> resp as T[]));
  }

  public delete(entity: Partial<T>) {
    return this.httpCore.delete(entity).pipe(map (resp=> resp as T))
  }
  
} 
