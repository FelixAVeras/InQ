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
        tap((response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('role', JSON.stringify(response.user.role))
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
    this.isLoggedInSubject.next(true);
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
    
  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');

    this.userSubject.next(null);
    this.isLoggedInSubject.next(false);

    this.router.navigate(['/login']);
  }

  private checkLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return user && user.role ? user : null;
  }

  getUserRole(): string {
    const user = this.getUser();

    return user ? user.role : '';
  }

  getUserName(): string {
    const user = this.getUser();
    
    return user ? user.username : '';
  }

  getFullName(): string {
    const user = this.getUser();

    return user ? user.fullname : '';
  }
}
