import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  parentCategories$: Observable<any[]> | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.categoryForm = this.formBuilder.group({
      parentCategory: [null],
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.parentCategories$ = this.categoryService.getAllCategories().pipe(
      // Filtrar para mostrar solo las categorías principales
      map(categories => categories.filter(cat => cat.parentCategory === null))
    );
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.categoryService.createCategory(this.categoryForm.value).subscribe(
        () => {
          this.snackBar.open('Categoría creada correctamente', 'Cerrar', { duration: 3000 });
          this.categoryForm.reset();
        },
        (error) => {
          this.snackBar.open('Error al crear la categoría', 'Cerrar', { duration: 3000 });
          console.error(error);
        }
      );
    }
  }
}
