import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          this.authService.saveToken(response.token);
          
          console.log('Login exitoso', response);
          console.log('rol: ', response.user.role);
          
          if (response.user.role === "client") {
            this.router.navigate(['/appointments']);
          }

          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Error durante el login', error);
          this.errorMessage = 'Credenciales inválidas.';
        }
      );
    }
  }
}
