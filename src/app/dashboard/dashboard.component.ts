import { Component, OnInit, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

interface User {
  id: number;
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
export class DashboardComponent implements OnInit {
  // showActionsTimer: any;
  selectedRowIndex: number;
  selectedUser: User | null = null;
  displayedColumns: string[] = ['name', 'email', 'designation', 'dept', 'actions'];
  users: MatTableDataSource<User>;
  isFormVisible: boolean;
  isEditMode: boolean = false;
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  )
   {
    const userData: User[] = [
      { id: 1, name: 'Zain', email: 'zainmmunir104@gmail.com', designation: 'Front Developer', department: 'IT' },
      { id: 2, name: 'Jawad Sir', email: 'jawad@gmail.com', designation: 'Designer', department: 'Developer' },
      { id: 3, name: 'Asad', email: 'asad@gmail.com', designation: 'Manager', department: 'Production' }
    ];

    this.selectedRowIndex=-1;
    this.users = new MatTableDataSource(userData);
    this.userForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    designation: ['', Validators.required],
    department: ['', Validators.required]
    });

    this.isFormVisible = false;
  }

  ngOnInit(): void {
      this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: [''],
      department: ['']
    });
  }

  editUser(user: User) {
    console.log("user:", user);
    this.selectedUser = user;
    this.isFormVisible = true;
    this.isEditMode = true;
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      designation: user.designation,
      department: user.department,
    });
  }

  addUser() {
    console.log('called');
    this.isFormVisible = true;
    this.isEditMode = false;
    this.userForm.reset();
  }

  saveUser() {
    console.log('Function Call');
    if (this.userForm.valid) {
      const newUser: User = {
        id: this.isEditMode && this.selectedUser ? this.selectedUser.id : this.getNextUserId(),
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        designation: this.userForm.value.designation,
        department: this.userForm.value.department
      };

      if (this.isEditMode && this.selectedUser) {
        const index = this.users.data.findIndex(user => user.id === newUser.id);
        if (index >= 0) {
          this.users.data[index] = newUser;
        }
      } else {
        this.users.data.push(newUser);
      }

      this.users._updateChangeSubscription();
      this.cancelForm();
    }
  }

  cancelForm() {
    this.isFormVisible = false;
    this.userForm.reset();
    this.selectedUser = null;
  }

  // selectUser(user: User) {
  //   this.selectedUser = user;
  // }

  confirmDelete(userId: number): void {
    const config: MatDialogConfig = {
      width: '250px',
      data: 'Are you Sure  you want to delete this user?'
    }
    // const dialogRef=this.dialog.open(ConfirmationDialogComponent,{
    const dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialog.open(ConfirmationDialogComponent, config);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.users.data.findIndex(user => user.id === userId);
        if (index >= 0) {
          this.deleteUser(index);
          this.users._updateChangeSubscription();
        }
      }
    });
  }

  deleteUser(index: number): void {
    this.users.data.splice(index, 1);
    this.users._updateChangeSubscription();
  }

  private getNextUserId(): number {
    let maxId = 0;
    this.users.data.forEach(user => {
      if (user.id > maxId) {
        maxId = user.id;
      }
    });

    return maxId + 1;

  }
  // showActions(user: User) {
  //   clearTimeout(this.showActionsTimer);
  //   this.showActionsTimer = setTimeout(() => {
  //     this.selectedUser = user;
  //   }, 2000);
  // }
  // hideActions(user: User) {
  //   clearTimeout(this.showActionsTimer);
  //   this.selectedUser = null;
  // }
  selectUser(user: any, rowIndex: number) {
    this.selectedUser = user;
    this.selectedRowIndex = rowIndex;
  }


}
