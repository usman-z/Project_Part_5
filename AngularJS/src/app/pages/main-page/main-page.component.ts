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

  constructor(private router: Router, private employeeService: EmployeeService, private dependentService: DependentService) { }

  ngOnInit(): void {
    this.employeeService.allEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      }
    )

    this.dependentService.allDependents().subscribe(
      (response: Dependent[]) => {
        this.dependents = response;
      }
    )
  }

}
