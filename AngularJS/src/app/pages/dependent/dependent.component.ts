import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dependent } from 'src/app/models/dependent.model';
import { DependentService } from 'src/app/services/dependent.service';

@Component({
  selector: 'app-dependent',
  templateUrl: './dependent.component.html',
  styleUrls: ['./dependent.component.scss']
})
export class DependentComponent implements OnInit {

  add: boolean = false
  ssn?: number
  dependent?: Dependent

  constructor(private route: ActivatedRoute, private dependentService: DependentService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.add = params['add'];
      this.ssn = params['ssn'];
    })

    if(this.ssn) {
      this.dependentService.getDependent(this.ssn).subscribe(
        (response: Dependent) => {
          this.dependent = response;
        }
      )
    }
  }

}
