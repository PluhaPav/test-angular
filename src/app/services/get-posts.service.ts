import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IPost } from '../interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class GetPostsService {
  private urlApi = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<string | IPost[]> {
    return this.http
      .get<IPost[]>(this.urlApi)
      .pipe(catchError((err) => throwError('Error throw from ' + err)));
  }

  getPostById(id: number): Observable<string | IPost> {
    return this.http
      .get<IPost>(this.urlApi + `/${id}`)
      .pipe(catchError((err) => throwError('Error throw from ' + err)));
  }
}
