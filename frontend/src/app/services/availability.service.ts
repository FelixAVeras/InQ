import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Availability } from '../models/Aviavility';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  urlApi = '/api/availability';

  constructor(private http: HttpClient) {}

   // Función para obtener el token desde el almacenamiento local (o donde lo guardes)
  getAuthToken(): string | null {
    return localStorage.getItem('token'); // O el método que estés utilizando
  }

  // Función para obtener los headers con el token
  getHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  getAvailability(): Observable<Availability[]> {
    return this.http.get<Availability[]>(this.urlApi, { headers: this.getHeaders() });
  }

  saveAvailability(availability: Availability): Observable<Availability> {
    const headers = this.getHeaders().set('Content-Type', 'application/json');
    return this.http.post<Availability>(this.urlApi, availability, { headers });
  }
  
  

  deleteAvailability(weekday: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/${weekday}`, { headers: this.getHeaders() });
  }
}
