import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { CustomerComponent } from './customer/customer.component';
import { ProfessionalComponent } from './professional/professional.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UsersByCategoryComponent } from './users-by-category/users-by-category.component';
import { ProfessionalScheduleComponent } from './professional-schedule/professional-schedule.component';

const routes: Routes = [
  { path:'', redirectTo:'/login', pathMatch:'full' },
  { path:'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:'dashboard', component: DashboardComponent },
  { path:'appointments', component: AppointmentComponent },
  { path:'customers', component: CustomerComponent },
  { path:'professionals', component: ProfessionalComponent },
  { path:'categories', component: CategoryComponent },
  { path:'add-category', component: AddCategoryComponent },
  { path:'category/:id/users', component: UsersByCategoryComponent },
  { path:'aviavilities', component: ProfessionalScheduleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
