import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Availability } from '../models/Aviavility';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  urlApi = '/api/availability';

  constructor(private http: HttpClient) {}

  getAvailability(): Observable<Availability[]> {
    return this.http.get<Availability[]>(this.urlApi);
  }

  saveAvailability(availability: Availability): Observable<Availability> {
    return this.http.post<Availability>(this.urlApi, availability);
  }

  deleteAvailability(weekday: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/${weekday}`);
  }
}
