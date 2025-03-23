import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  urlApi = '/api/categories';

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.urlApi);
  }

  createCategory(category: any): Observable<any> {
    return this.http.post<any>(this.urlApi, category);
  }
}
