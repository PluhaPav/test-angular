import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IPost } from '../interfaces/post';

const API = 'http://jsonplaceholder.typicode.com/posts';

@Injectable({
  providedIn: 'root',
})
export class GetPostsService {
  constructor(private http: HttpClient) { }

  public getPosts(): Observable<string | IPost[]> {
    return this.http
      .get<IPost[]>(`${API}`)
      .pipe(catchError((err) => throwError('Error throw from ' + err)));
  }

  public getPostById(id: number): Observable<string | IPost> {
    return this.http
      .get<IPost>(`${API}/${id}`)
      .pipe(catchError((err) => throwError('Error throw from ' + err)));
  }
}
