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

  userFullname: string | null = null;
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
    
    // const user = this.authService.getUser();

    this.authService.user$.subscribe(user => {
      if (user) {
        this.userRole = this.authService.getUserRole();
        this.userName = this.authService.getUserName();
        this.userFullname = this.authService.getFullName();

        console.log('Rol del usuario:', this.userRole);
        console.log('Nombre del usuario:', this.userName);
        console.log('Nombre:', this.userFullname);
      } else {
        this.userRole = null;
        this.userName = null;
        this.userFullname = null
      }
    });
  }

  logout(): void {
    this.authService.logout();

    this.isUserLogged = false;
    this.showSidenav = false; 
    this.router.navigate(['/login']);
  }
}