import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProfessionalService } from 'src/app/services/professional.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  roles = ['client', 'professional'];
  categories: any[] = [];
  filteredCategories: Observable<any[]> | undefined;
  isProfessional = false;

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private professionalService: ProfessionalService
  ) {
      this.registerForm = this.fb.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
          role: ['client', Validators.required],
          name: ['', Validators.required],
          category: [''] // Para profesionales
      });
  }

  ngOnInit(): void {
      this.professionalService.getCategories().subscribe(cats => {
          this.categories = cats;
      });

      this.registerForm.get('role')?.valueChanges.subscribe(role => {
          this.isProfessional = role === 'professional';
          this.registerForm.get('category')?.clearValidators();
          if (this.isProfessional) {
              this.registerForm.get('category')?.addValidators(Validators.required);
              this.filteredCategories = this.registerForm.get('category')!.valueChanges.pipe(
                  startWith(''),
                  map(value => this._filter(value || ''))
              );
          }
          this.registerForm.get('category')?.updateValueAndValidity();
      });
  }

  private _filter(value: string): any[] {
      const filterValue = value.toLowerCase();
      return this.categories.filter(category => category.name.toLowerCase().includes(filterValue));
  }

  onSubmit(): void {
      if (this.registerForm.valid) {
          this.authService.register(this.registerForm.value).subscribe(
              response => {
                  console.log('Registro exitoso', response);
                  this.router.navigate(['/login']); // Redirigir al login
              },
              error => {
                  console.error('Error durante el registro', error);
                  // Mostrar mensaje de error al usuario
              }
          );
      }
  }
}
