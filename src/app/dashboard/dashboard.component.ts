import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface User {
  name: string;
  email: string;
  designation: string;
  department: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedUser:any=null;
  displayedColumns: string[] = ['name', 'email', 'designation', 'dept', 'actions'];
  users: MatTableDataSource<User>;
  isFormVisible: boolean;
  isEditMode: boolean = false;
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    const userData: User[] = [
      { name: 'Zain', email: 'zainmmunir104@gmail.com', designation: 'Front Developer', department: 'IT' },
      { name: 'Jawad Sir', email: 'jawad@gmail.com', designation: 'Designer', department: 'Developer' },
      { name: 'Asad', email: 'asad@gmail.com', designation: 'Manager', department: 'Production' }
    ];


    this.users = new MatTableDataSource(userData);
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: ['',[ Validators.required]],
      department: ['', [Validators.required]]
    });
    this.isFormVisible = false;
  }

  logout() { }

  ngOnInit(): void { }

editUser(user:any){
  this.selectedUser=user
  this.isFormVisible=true;
  this.isEditMode=false;
  this.selectedUser=this.users;

  this.userForm.patchValue({
    name:this.userForm.value,
    email:this.userForm.value,
    designation:this.userForm.value,
    department:this.userForm.value,

  })
  this.userForm.reset();
}


  addUser() {
    console.log('callled');
    this.isFormVisible = true;
    this.isEditMode = false;
    this.userForm.reset();
  }

  saveUser() {
     console.log('Function Call')
    if (this.userForm.valid) {
      const newUser: User = {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        designation: this.userForm.value.designation,
        department: this.userForm.value.department

      };

      this.users.data.push(newUser);
      // this.users=new MatTableDataSource(this.users.data);
      // console.log("tjsss",this.users)
      console.log(newUser);
      this.users._updateChangeSubscription();
      this.cancelForm();

    }
  }

  cancelForm() {
    console.log('Abc');
    this.isFormVisible = false;
    this.userForm.reset();
  }
  selectUser(user:any){
    this.selectedUser=user;
  }
}
