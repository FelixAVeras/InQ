import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {

  private apiUrl = '/api/professionals';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>('/api/categories');
  }

  getProfessionalById(id: number) {
    return this.http.get(this.apiUrl + id);
  }

  createProfessional(professionalData: any): Observable<any> {
    return this.http.post(this.apiUrl, professionalData);
  }
}
