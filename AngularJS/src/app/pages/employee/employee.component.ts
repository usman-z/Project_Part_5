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

    if(this.firstName == '' || this.middleInitial == '' || this.lastName == '' || this.dateOfBirth == '' || this.address == '') {
      this.message = "All information is required"
      return;
    }

    const numberAsString: string = this.ssn?.toString() || '';
    const ssnCheck = numberAsString.length == 9 || false;
    if(!ssnCheck) {
      this.message = 'SSN must be exactly 9 digits'
      return;
    }

    const inputSafe = this.isInputValid(this.firstName, this.middleInitial, this.lastName, this.dateOfBirth, this.address);

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

    if(this.firstName == '') {
      if(this.employee) {
        this.firstName = this.employee.Fname
      }
    } 
    else {
      if(!this.isValid(this.firstName)){
        this.message = "First Name can only have english alphabets";
        return;
      }
    }

    if(this.middleInitial == '' && this.employee) {
      this.middleInitial = this.employee.Minit
    }
    else {
      if(!this.isValid(this.middleInitial)){
        this.message = "Middle Initial can only be an english alphabet";
        return;
      }
    } 

    if(this.lastName == '' && this.employee) {
      this.lastName = this.employee.Lname
    } 
    else {
      if(!this.isValid(this.lastName)){
        this.message = "Last Name can only have english alphabets";
        return;
      }
    } 

    if(this.dateOfBirth == '' && this.employee) {
      this.dateOfBirth = this.formatDOB(this.employee.dob);
    } 

    if(this.address == '' && this.employee) {
      this.address = this.employee.address
    } 
    else {
      const addressRegex: RegExp = /^[A-Za-z0-9\s]+$/;
      if(!addressRegex.test(this.address)){
        this.message = "Address can only have numerical values and english alphabets";
        return;
      }
    } 

    if (this.ssn) {
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
          this.message = "Cascade deleting Employee and Employee's dependents";
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
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

  isInputValid(firstName: string, middleInitial: string, lastName: string, dateOfBirth: string, address: string): boolean {
    const addressRegex: RegExp = /^[A-Za-z0-9\s]+$/;
    const nameRegex: RegExp = /^[A-Za-z]+$/;

    const isFirstNameValid: boolean = nameRegex.test(firstName);
    if(!isFirstNameValid) {
      this.message = "First Name can only have english alphabets";
      return false;
    }

    const isMiddleInitialValid: boolean = nameRegex.test(middleInitial);
    if(!isMiddleInitialValid) {
      this.message = "Middle Initial has to be an english alphabet";
      return false;
    }

    const isLastNameValid: boolean = nameRegex.test(lastName);
    if(!isLastNameValid) {
      this.message = "Last Name can only have english alphabets";
      return false;
    }

    const isAddressValid: boolean = addressRegex.test(address);
    if(!isAddressValid) {
      this.message = "Address can only have numerical values and english alphabets";
      return false;
    }

    return true;
  }

  isValid(str: string): boolean {
    const alphabetRegex: RegExp = /^[A-Za-z]+$/;

    const isStringValid: boolean = alphabetRegex.test(str);
    if(!isStringValid) {
      return false;
    }

    return true;
  }

}
