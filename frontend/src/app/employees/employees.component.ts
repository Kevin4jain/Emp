import { Component,inject } from '@angular/core';
import Employee from '../types/employee';
import { EmployeeService } from '../services/employee.service';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButton} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatToolbarModule, MatSlideToggleModule, MatButton,CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  Employees:Employee[]=[];
  EmployeeService=inject(EmployeeService);
  ngOnInit(){

    this.EmployeeService.getEmployees().subscribe((data:any)=>{
      this.Employees=data;
      // console.log(this.Employees);
    });
  }
  deleteEmployee(id:string,name:string){
    const ok=confirm('Are you sure you want to delete this employee?');
    if(ok){
      localStorage.removeItem(name);
      this.EmployeeService.deleteEmployee(id).subscribe((data:any)=>{
        alert('Employee deleted successfully');
        this.Employees=this.Employees.filter((emp)=>emp._id!==id);
      });
  }
}
}