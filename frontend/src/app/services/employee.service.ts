import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Employee from '../types/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrl="http://localhost:3000/employee";
  // httpClient=inject(HttpClient);
  constructor(public httpClient: HttpClient) { }
  getEmployees(){
    return this.httpClient.get<Employee[]>(this.apiUrl+"/data");
  }
  addEmployee(model:Employee){
    return this.httpClient.post(this.apiUrl+"/add",model);
  }
  getEmployee(id:string){
    return this.httpClient.get<Employee>(this.apiUrl+"/data/"+id);
  }
  editEmployee(id:string,model:Employee){
    return this.httpClient.put<Employee>(this.apiUrl+"/edit/"+id,model);
  }
  deleteEmployee(id:string){
    return this.httpClient.delete<Employee>(this.apiUrl+"/delete/"+id);
  }
}
