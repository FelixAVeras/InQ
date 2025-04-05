import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-users-by-category',
  templateUrl: './users-by-category.component.html',
  styleUrls: ['./users-by-category.component.css']
})
export class UsersByCategoryComponent implements OnInit {

  categoryId!: string;
  users: any[] = [];

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id')!;

    console.log(this.categoryId)

    this.loadUsers();
  }

  loadUsers() {
    this.categoryService.getUsersByCategory(this.categoryId).subscribe(users => {
      this.users = users;

      console.log(this.users)
    });
  }
}
