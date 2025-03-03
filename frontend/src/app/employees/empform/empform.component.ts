import { Component,inject } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import Employee from '../../types/employee';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'empform',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,MatButton],
  templateUrl: './empform.component.html',
  styleUrl: './empform.component.css'
})
export class empform{
  bool:boolean=false;
  editId:string="";
  route=inject(ActivatedRoute)
  formBuilder=inject(FormBuilder);
  EmpService=inject(EmployeeService);
  constructor(private router:Router){}
  ngOnInit(){
    const id=this.route.snapshot.params["id"];

    this.editId=id;
    if(this.editId){
      this.bool=true;

      this.EmpService.getEmployee(this.editId).subscribe((data)=>{
        this.form.patchValue(data);
        
      })
    }
  }
  form:FormGroup=this.formBuilder.group({
    emp_name:['',[Validators.required,Validators.minLength(3)]],
    emp_id:['',Validators.required],
    emp_email:['',[Validators.required,Validators.email]],
    emp_phone:['',Validators.required],
    emp_dept:['',Validators.required],
    emp_salary:['',Validators.required]
  })
  // idsarr: number[] = [];
  addemp(){
    if(this.form.invalid){
      alert('Please fill all the fields correctly');
      return;
    }      
    for (let i = 0; i < localStorage.length; i++) {
      let keyy = localStorage.key(i);
       if (keyy !== null) {
         // console.log(`Key: ${keyy}, Value: ${localStorage.getItem(keyy)}`);
         const storedValue = localStorage.getItem(keyy);
         if(storedValue !== null && this.form.value.emp_id == parseInt(storedValue)){
           alert('Employee id already exists');
           return;
         }
       }
     }
    const model:Employee=this.form.value;
    this.EmpService.addEmployee(model).subscribe((data:any)=>{
      alert('Employee added successfully');

      
      localStorage.setItem(model.emp_name,(model.emp_id).toString());
      // if(this.idsarr.includes(model.emp_id)){
      //   alert('Employee id already exists');
      //   return;
      // }
      // this.idsarr.push(model.emp_id);
      // console.log(model);
      this.router.navigate(['/employees']);

      });
    // console.log(this.form.value); 
  }
  Reset(){
    
    this.EmpService.getEmployee(this.editId).subscribe((data)=>{
      this.form.patchValue(data);
      
    })
  }
  Home(){
    this.router.navigate(['/employees']);
  }
  updateemp(){
    if(this.form.invalid){
      alert('Please fill all the fields correctly');
      return;
    }
    const model:Employee=this.form.value;
    this.EmpService.editEmployee(this.editId,model).subscribe((data:any)=>{
      alert('Employee updated successfully');
      // console.log(data);
      this.router.navigate(['/employees']);

      });


  }
}
// const model:Employee={
//   'emp_name' :"Kevin Shah",
//   emp_id :101,
//   emp_email :"shahkevin033@gmail.com",
//   emp_phone: 8866474078,
//   emp_dept :"Development",
//   emp_salary: 80000};
/*for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  console.log(`Key: ${key}, Value: ${localStorage.getItem(key)}`);
}
*/ 