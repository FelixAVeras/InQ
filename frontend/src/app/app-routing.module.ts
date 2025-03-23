import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { CustomerComponent } from './customer/customer.component';
import { ProfessionalComponent } from './professional/professional.component';

const routes: Routes = [
  { path:'', redirectTo:'dashboard', pathMatch:'full' },
  { path:'dashboard', component: DashboardComponent },
  { path:'appointments', component: AppointmentComponent },
  { path:'customers', component: CustomerComponent },
  { path:'professionals', component: ProfessionalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
