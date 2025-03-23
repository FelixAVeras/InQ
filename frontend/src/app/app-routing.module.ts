import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { CustomerComponent } from './customer/customer.component';
import { ProfessionalComponent } from './professional/professional.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';

const routes: Routes = [
  { path:'', redirectTo:'dashboard', pathMatch:'full' },
  { path:'dashboard', component: DashboardComponent },
  { path:'appointments', component: AppointmentComponent },
  { path:'customers', component: CustomerComponent },
  { path:'professionals', component: ProfessionalComponent },
  { path:'categories', component: CategoryComponent },
  { path:'add-category', component: AddCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
