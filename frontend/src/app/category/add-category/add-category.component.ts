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
          this.snackBar.open('Category create successfully', 'Close', { duration: 3000 });
          this.categoryForm.reset();
        },
        (error) => {
          this.snackBar.open('Error creating the category', 'Close', { duration: 3000 });
          console.error(error);
        }
      );
    }
  }
}
