import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  allEmployees(){
    const url = 'http://localhost:8080/employees';
    return this.http.get<Employee[]>(url);

  };

  getEmployee(ssn: number){
    const url = 'http://localhost:8080/employee';
    const request ={
      "ssn": ssn
    }
    return this.http.post<Employee>(url, request);
  };

  createEmployee(ssn: number, Fname: string, Minit: string, Lname: string, dob: string, address: string){
    const url = 'http://localhost:8080/createEmployee';
    const request ={
      "ssn": ssn,
      "Fname": Fname,
      "Minit": Minit,
      "Lname": Lname,
      "dob": dob,
      "address": address
    }
    return this.http.post(url, request);
  };

  updateEmployee(ssn: number, Fname: string, Minit: string, Lname: string, dob: string, address: string){
    const url = 'http://localhost:8080/updateEmployee';
    const request ={
      "ssn": ssn,
      "Fname": Fname,
      "Minit": Minit,
      "Lname": Lname,
      "dob": dob,
      "address": address
    }
    return this.http.post(url, request);
  };

  deleteEmployee(ssn: number){
    const url = 'http://localhost:8080/deleteEmployee';
    const request ={
      "ssn": ssn
    }
    return this.http.post(url, request);
  };
  
}
