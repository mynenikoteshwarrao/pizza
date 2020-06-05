import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Base } from 'src/app/models/base-model';

export class HttpBaseService { 
  private http: HttpClient;
  constructor(injector: Injector, protected url: string) {
    this.http = injector.get(HttpClient);
  }

  protected httpCreate<T>(entity: Partial<T>): Observable<T> {
    return this.http.post<T>(`${this.url}`, entity);
  }

  protected httpUpdate <T extends Base<T>>(entity: Partial<T>): Observable<T> {
    return this.http
      .put<T>(`${this.url}/${entity.id}`, entity)
  }

  protected httpRead<T>(id: number | string): Observable<T> {
    return this.http
      .get<T>(`${this.url}/${id}`)
  }

  protected httpList<T>(): Observable<T[]> {
    return this.http
      .get<T[]>(`${this.url}/`)
  }

  protected httpDelete<T extends Base<T>, type extends number | string = number>(entity: Partial<T>): Observable<T> {
    return this.http.delete<T>(`${this.url}/${entity.id}`);
  }
}
