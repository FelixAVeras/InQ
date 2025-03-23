import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  categoryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });
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
