import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import {empform} from "./employees/empform/empform.component";
export const routes: Routes = [
    {
        path:"",
        component:EmployeesComponent

    }
    ,{
        path:"employees",
        component:EmployeesComponent

    },{
        path:"employees/add",
        component:empform

    },{
        path:"employees/edit/:id",
        component:empform

    }
];
