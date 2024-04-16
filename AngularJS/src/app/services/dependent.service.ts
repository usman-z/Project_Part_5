import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dependent } from '../models/dependent.model';

@Injectable({
  providedIn: 'root'
})
export class DependentService {

  constructor(private http: HttpClient) { }

  allDependents(){
    const url = 'http://localhost:8080/dependents';
    return this.http.get<Dependent[]>(url);

  };

  getDependent(ssn: number, name: string){
    const url = 'http://localhost:8080/dependent';
    const request ={
      "ssn": ssn,
      "name": name
    }
    return this.http.post<Dependent>(url, request);
  };

  createDependent(ssn: number, name: string, relationship: string){
    const url = 'http://localhost:8080/createDependent';
    const request ={
      "ssn": ssn,
      "name": name,
      "relationship": relationship
    }
    return this.http.post(url, request);
  };

  updateDependent(ssn: number, name: string, relationship: string){
    const url = 'http://localhost:8080/updateDependent';
    const request ={
      "ssn": ssn,
      "name": name,
      "relationship": relationship
    }
    return this.http.post(url, request);
  };

  deleteDependent(ssn: number, name: string){
    const url = 'http://localhost:8080/deleteDependent';
    const request ={
      "ssn": ssn,
      "name": name
    }
    return this.http.post(url, request);
  };

  searchDependent(ssn: string){
    const url = 'http://localhost:8080/searchDependent';
    const request ={
      "ssn": ssn
    }
    return this.http.post<Dependent[]>(url, request);
  };
  
}
