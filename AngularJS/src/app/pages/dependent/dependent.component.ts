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

    if(this.name == '' || this.relationship == '') {
      this.message = "All information is required"
      return;
    }

    const inputSafe = this.isInputValid(this.name, this.relationship);

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

    if(this.relationship == '') {
      if(this.dependent){
        this.name = this.dependent.relationship
      }
    } 
    else {
      const alphabetRegex: RegExp = /^[A-Za-z]+$/;
      const isRelationshipValid: boolean = alphabetRegex.test(this.relationship);
      if(!isRelationshipValid) {
        this.message = "Relationship can only have english alphabets";
        return;
      }
    }

    if (this.ssn) {
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

  isInputValid(name: string, relationship: string): boolean {
    const alphabetRegex: RegExp = /^[A-Za-z]+$/;

    const isNameValid: boolean = alphabetRegex.test(name);
    if(!isNameValid) {
      this.message = "Name can only have english alphabets";
      return false;
    }

    const isRelationshipValid: boolean = alphabetRegex.test(relationship);
    if(!isRelationshipValid) {
      this.message = "Relationship can only have english alphabets";
      return false;
    }

    return true;
  }

}
