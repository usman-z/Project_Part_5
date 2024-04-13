import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dependent } from 'src/app/models/dependent.model';
import { DependentService } from 'src/app/services/dependent.service';

@Component({
  selector: 'app-dependent',
  templateUrl: './dependent.component.html',
  styleUrls: ['./dependent.component.scss']
})
export class DependentComponent implements OnInit {


  ssn?: number
  name: string = ''
  relationship: string = ''

  dependent?: Dependent
  message: string = ''
  edit: boolean = false

  constructor( private route: ActivatedRoute, private dependentService: DependentService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.ssn = params['ssn'];
      this.name = params['name'];
      this.edit = this.name !== undefined
      
      if (this.ssn ) {
        this.dependentService.getDependent(this.ssn, this.name).subscribe({
          next: (response: Dependent) => {
            this.dependent = response;
          }
        });
      }
    });
  }

  onNameChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.name = value
    }
  }

  onRelationshipChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.relationship = value
    }
  }


  addDependent() {
    this.message = ''

    const numberAsString: string = this.ssn?.toString() || '';
    const ssnCheck = numberAsString.length == 9 || false;
    if(!ssnCheck) {
      this.message = 'SSN must be exactly 9 digits'
    }

    const lengthCheck: boolean = this.name.length < 20 && this.relationship.length < 20
    if(!lengthCheck) {
      this.message = 'Only maximum of 20 characters allowed'
    }

    const inputSafe = ssnCheck && lengthCheck;

    if (this.ssn && inputSafe) {
      this.dependentService.createDependent(this.ssn, this.name, this.relationship).subscribe({
        next: () => {
          this.router.navigate(['/']);
        }
      });
    }
  }

  updateDependent() {
    this.message = ''

    const lengthCheck: boolean = this.relationship.length < 20
    if(!lengthCheck) {
      this.message = 'Only maximum of 20 characters allowed'
    }

    if(this.name == '' && this.dependent) {
      this.name = this.dependent.name
    } 

    if(this.relationship == '' && this.dependent) {
      this.name = this.dependent.relationship
    } 

    if (this.ssn && lengthCheck) {
      this.dependentService.updateDependent(this.ssn, this.name, this.relationship).subscribe({
        next: () => {
          this.router.navigate(['/']);
        }
      });
    } 
  }

  deleteDependent() {
    if (this.ssn) {
      this.dependentService.deleteDependent(this.ssn, this.name).subscribe({
        next: () => {
          this.router.navigate(['/']);
        }
      });
    }
  }

}
