import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IPost } from '../interfaces/post';

const API = 'http://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root',
})
export class GetPostsService {
  private urlApi = `${API}/posts`;

  constructor(private http: HttpClient) { }

  public getPosts(): Observable<string | IPost[]> {
    return this.http
      .get<IPost[]>(this.urlApi)
      .pipe(catchError((err) => throwError('Error throw from ' + err)));
  }

  public getPostById(id: number): Observable<string | IPost> {
    return this.http
      .get<IPost>(`${this.urlApi}/${id}`)
      .pipe(catchError((err) => throwError('Error throw from ' + err)));
  }
}
