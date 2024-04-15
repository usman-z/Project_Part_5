import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dependent } from 'src/app/models/dependent.model';
import { Employee } from 'src/app/models/employee.model';
import { DependentService } from 'src/app/services/dependent.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  employees: Employee[] = []
  dependents: Dependent[] = []
  message: string = ''

  reloaded: boolean = false;
  searchEmp: string = ''
  searchDep: string = ''

  constructor(private router: Router, private employeeService: EmployeeService, private dependentService: DependentService) { }

  ngOnInit(): void {

    this.employeeService.allEmployees().subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
      },
      error: (error) => {
        this.showErrorMessage(error);
      }
    });

    this.dependentService.allDependents().subscribe({
      next: (response: Dependent[]) => {
        this.dependents = response;
      },
      error: (error) => {
        this.showErrorMessage(error);
      }
    });
  }

  showErrorMessage(error: any) {
    if (error.message == 'Http failure response for http://localhost:8080/dependents: 0 Unknown Error') {
      this.message = 'Please start ExpressJS backend on localhost:8080'
    } 
    else if (error.error == "ECONNREFUSED") {
      this.message = 'XAMPP servers must be running'
    }
    else if (error.error == "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
      this.message = 'Please restart ExpressJS backend on localhost:8080'
    }
    else {
      this.message = 'Error'
    }
  }

  formatDob(dob: string): string {
    let formattedDob: string = ''
    for (let i = 0; i < 10; i++) {
      formattedDob += dob.charAt(i);
    }
    return formattedDob
  }

  addEmployee() {
    this.router.navigate(['/employee'], {
      queryParams: { ssn: null }
    });
  }

  editEmployee(ssn: number) {
    this.router.navigate(['/employee'], {
      queryParams: { ssn: ssn }
    });
  }

  editDependent(ssn: number, name: string) {
    this.router.navigate(['/dependent'], {
      queryParams: { ssn: ssn, name: name }
    });
  }

  searchEmployee() {
    this.employeeService.searchEmployee(this.searchEmp).subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
      }
    });
  }

  searchDependent() {
    this.dependentService.searchDependent(this.searchDep).subscribe({
      next: (response: Dependent[]) => {
        this.dependents = response;
      }
    });
  }

  onChangeEmployee(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.searchEmp = value
    }
  }

  onChangeDependent(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.searchDep = value
    }
  }

  resetEmployee() {
    this.employeeService.allEmployees().subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
        this.searchEmp = '';
        const searchTextEmpInput = document.getElementById("searchTextEmp") as HTMLInputElement;;
        if (searchTextEmpInput) {
          searchTextEmpInput.value = '';
        }
      }
    });
  }

  resetDependent() {
    this.dependentService.allDependents().subscribe({
      next: (response: Dependent[]) => {
        this.dependents = response;
        this.searchDep = '';
        const searchTextDepInput = document.getElementById("searchTextDep") as HTMLInputElement;;
        if (searchTextDepInput) {
          searchTextDepInput.value = '';
        }
      }
    });
  }

}
