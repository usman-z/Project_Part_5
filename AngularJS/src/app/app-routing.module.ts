import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { DependentComponent } from './pages/dependent/dependent.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'dependent', component: DependentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
