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
  search: string = ''

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

    this.dependentService.allDependents().subscribe(
      (response: Dependent[]) => {
        this.dependents = response;
      },
      (error) => {
        this.showErrorMessage(error);
      }
    )
  }

  showErrorMessage(error: any) {
    if (error.message == 'Http failure response for http://localhost:8080/dependents: 0 Unknown Error') {
      this.message = 'ExpressJS backend must be runnning on localhost:8080'
    } 
    else if (error.error == "ECONNREFUSED") {
      this.message = 'XAMPP servers must be running'
    }
    else if (error.error == "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
      this.message = 'Unresponsive ExpressJS backend on localhost:8080'
    }
    else {
      this.message = 'More Errors'
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
    this.employeeService.searchEmployee(this.search).subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
        this.search = '';
      }
    });
  }

  searchDependent() {
    this.dependentService.searchDependent(this.search).subscribe({
      next: (response: Dependent[]) => {
        this.dependents = response;
        this.search = '';
      }
    });
  }

  onChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.search = value
    }
  }

}
