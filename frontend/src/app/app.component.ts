import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, MediaMatcher, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isUserLogged: boolean = false;
  showSidenav: boolean = false;

  userRole: string | null = null;
  userName: string | null = null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private media: MediaMatcher
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isUserLogged = this.authService.isAuthenticated();
        this.showSidenav = this.isUserLogged && this.router.url !== '/login' && this.router.url !== '/register';
      }
    });
    
    this.isUserLogged = this.authService.isAuthenticated();
    this.showSidenav = this.isUserLogged && this.router.url !== '/login' && this.router.url !== '/register';

    const user = this.authService.getUser();
    
    if (user) {
      this.userRole = this.authService.getUserRole();
      this.userName = this.authService.getUserName();

      console.log(this.userRole);
      console.log(this.userName);
    }

    console.log('Rol del usuario:', this.userRole);

    
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}'); // Obtiene el usuario desde el localStorage
  }

  logout(): void {
    this.authService.removeToken();
    //this.authService.removeRole();
    this.authService.removeUserId();
    this.isUserLogged = false;
    this.showSidenav = false;
    this.router.navigate(['/login']);
  }
}