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
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          this.authService.saveToken(response.token);
          this.authService.saveRole(response.role);
          this.authService.saveUserId(response.userId);
          console.log('Login exitoso', response);
          // Redirigir según el rol
          /*if (response.role === 'admin') {
            this.router.navigate(['/admin']); // Reemplaza '/admin' con tu ruta de administrador
          } else if (response.role === 'professional') {
            this.router.navigate(['/dashboard']); // Reemplaza '/professional' con tu ruta de profesional
          } else {
            this.router.navigate(['/dashboard']); // Reemplaza '/client' con tu ruta de cliente
          }*/

          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Error durante el login', error);
          this.errorMessage = 'Credenciales inválidas.'; // Muestra un mensaje de error al usuario
        }
      );
    }
  }
}
