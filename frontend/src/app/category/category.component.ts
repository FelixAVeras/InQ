import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: any[] = [];
  filtro: string = '';

  userRole: string = '';

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.userRole = this.categoryService.getUserRole();
    
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;

      console.log(this.categories)
    });
  }
}
