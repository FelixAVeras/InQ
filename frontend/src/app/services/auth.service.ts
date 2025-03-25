import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl = '/api/auth';
    private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoggedIn());
    public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
    private authTokenKey = 'authToken';
    private userRoleKey = 'userRole';
    private userIdKey = 'userId';
  
    constructor(private http: HttpClient, private router: Router) { }
  
    register(userData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/register`, userData);
    }
  
    login(credentials: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
        // Puedes agregar lógica aquí para actualizar isLoggedInSubject al recibir un token
      );
    }
  
    getToken(): string | null {
      return localStorage.getItem(this.authTokenKey);
    }
  
    saveToken(token: string): void {
      localStorage.setItem(this.authTokenKey, token);
      this.isLoggedInSubject.next(true); // Actualizar el estado al guardar el token
    }
  
    removeToken(): void {
      localStorage.removeItem(this.authTokenKey);
      this.isLoggedInSubject.next(false); // Actualizar el estado al eliminar el token
    }
  
    getRole(): string | null {
      return localStorage.getItem(this.userRoleKey);
    }
  
    saveRole(role: string): void {
      localStorage.setItem(this.userRoleKey, role);
    }
  
    removeRole(): void {
      localStorage.removeItem(this.userRoleKey);
    }
  
    getUserId(): string | null {
      return localStorage.getItem(this.userIdKey);
    }
  
    saveUserId(userId: string): void {
      localStorage.setItem(this.userIdKey, userId);
    }
  
    removeUserId(): void {
      localStorage.removeItem(this.userIdKey);
    }
  
    isAuthenticated(): boolean {
      return this.isLoggedInSubject.value;
    }
  
    logout(): void {
      this.removeToken();
      this.removeRole();
      this.removeUserId();
      this.router.navigate(['/login']); // Redirigir al login al cerrar sesión
    }
  
    private checkLoggedIn(): boolean {
      return !!localStorage.getItem(this.authTokenKey);
    }
}
