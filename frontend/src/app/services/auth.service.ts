import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl = '/api/auth';
    private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoggedIn());
    public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
    //private authTokenKey = 'authToken';
    private userRoleKey = 'userRole';
    private userIdKey = 'userId';

    userSubject = new BehaviorSubject<any>(null);
    user$ = this.userSubject.asObservable();
  
    constructor(private http: HttpClient, private router: Router) { 
      this.loadUserFromStorage();
    }
  
    register(userData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/register`, userData);
    }
  
    login(credentials: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
        // Puedes agregar lógica aquí para actualizar isLoggedInSubject al recibir un token
        tap((response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));

          this.userSubject.next(response.user); 
        })
      );
    }

  loadUserFromStorage() {
    const userStorage = localStorage.getItem('user');

    if (userStorage) {
      this.userSubject.next(JSON.parse(userStorage));
    }
  }
  
    getToken(): string | null {
      return localStorage.getItem('token');
    }
  
    saveToken(token: string): void {
      //localStorage.setItem(this.authTokenKey, token);
      this.isLoggedInSubject.next(true); // Actualizar el estado al guardar el token
    }
  
    removeToken(): void {
      localStorage.removeItem('token');
      this.isLoggedInSubject.next(false); // Actualizar el estado al eliminar el token
    }
  
    /*getRole(): string | null {
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
    }*/
  
    removeUserId(): void {
      localStorage.removeItem('user');
    }
  
    isAuthenticated(): boolean {
      return this.isLoggedInSubject.value;
    }
  
    logout(): void {
      this.removeToken();
      //this.removeRole();
      this.removeUserId();

      this.userSubject.next(null);

      this.router.navigate(['/login']); // Redirigir al login al cerrar sesión
    }
  
    private checkLoggedIn(): boolean {
      return !!localStorage.getItem('token');
    }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  getUserRole(): string {
    const user = this.getUser();
    return user?.role || '';
  }

  getUserName(): string {
    const user = this.getUser();
    return user?.username || 'Usuario';
  }
}
