import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  ssn?: number
  firstName: string = ''
  middleInitial: string = ''
  lastName: string = ''
  dateOfBirth: string = ''
  address: string = ''

  employee?: Employee
  message: string = ''
  edit: boolean = false

  constructor( private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.ssn = params['ssn'];
      if (this.ssn) {
        this.edit = true
        this.employeeService.getEmployee(this.ssn).subscribe({
          next: (response: Employee) => {
            this.employee = response;
          }
        });
      }
    });
  }

  onSSNChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.ssn = parseFloat(value);
    }
  }

  onFirstNameChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.firstName = value
    }
  }

  onMiddleInitialChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.middleInitial = value
    }
  }

  onLastNameChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.lastName = value
    }
  }

  onDateOfBirthChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.dateOfBirth = value
    }
  }

  onAddressChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.address = value
    }
  }

  addEmployee() {
    this.message = ''
    const numberAsString: string = this.ssn?.toString() || '';
    const ssnCheck = numberAsString.length == 9 || false;
    if(!ssnCheck) {
      this.message = 'SSN must be exactly 9 digits'
    }

    const middleInitialCheck: boolean = this.middleInitial.length == 1
    if(!middleInitialCheck) {
      this.message = 'Middle Initial must be a 1 character'
    }

    const lengthCheck: boolean = this.firstName.length < 20 && this.lastName.length < 20 && this.address.length < 20
    if(!lengthCheck) {
      this.message = 'Only maximum of 20 characters allowed'
    }

    const inputSafe = ssnCheck && middleInitialCheck && lengthCheck;

    if (this.ssn && inputSafe) {
      this.employeeService.createEmployee(this.ssn, this.firstName, this.middleInitial, this.lastName, this.dateOfBirth, this.address).subscribe({
        next: (response) => {
          this.router.navigate(['/']);
        }
      });
    }
  }

  updateEmployee() {
    this.message = ''

    const middleInitialCheck: boolean = this.middleInitial != '' && this.middleInitial.length != 1
    if(middleInitialCheck) {
      this.message = 'Middle Initial must be a 1 character'
    }

    const lengthCheck: boolean = this.firstName.length < 20 && this.lastName.length < 20 && this.address.length < 20
    if(!lengthCheck) {
      this.message = 'Only maximum of 20 characters allowed'
    }

    if(this.firstName == '' && this.employee) {
      this.firstName = this.employee.Fname
    } 

    if(this.middleInitial == '' && this.employee) {
      this.middleInitial = this.employee.Minit
    } 

    if(this.lastName == '' && this.employee) {
      this.lastName = this.employee.Lname
    } 

    if(this.dateOfBirth == '' && this.employee) {
      this.dateOfBirth = this.formatDOB(this.employee.dob);
    } 

    if(this.address == '' && this.employee) {
      this.address = this.employee.address
    } 


    const inputSafe = !middleInitialCheck && lengthCheck;

    if (this.ssn && inputSafe) {
      this.employeeService.updateEmployee(this.ssn, this.firstName, this.middleInitial, this.lastName, this.dateOfBirth, this.address).subscribe({
        next: (response) => {
          this.router.navigate(['/']);
        }
      });
    } 
  }

  deleteEmployee() {
    if (this.ssn) {
      this.employeeService.deleteEmployee(this.ssn).subscribe({
        next: (response) => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.message = 'Unable to delete an employee with dependents'
        }
      });
    }
  }

  addDependent() {
    this.router.navigate(['/dependent'], {
      queryParams: { ssn: this.ssn, name: null }
    });
  }

  formatDOB(dob: string): string {
    let formattedDob: string = ''
    for (let i = 0; i < 10; i++) {
      formattedDob += dob.charAt(i);
    }
    return formattedDob
  }

}
