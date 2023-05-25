import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = "";
  password = "";
  passwordVisible = false;
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  constructor(private router: Router, private snackBar: MatSnackBar) { }
  ngOnInit(): void {
  }

  login() {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (emailRegex.test(this.email) && passwordRegex.test(this.password)) {
      this.openSnackBar('Login Successfully');

      this.router.navigate(['dashboard']);
    } else {
      this.openSnackBar('Invalid Credentials');
    }
  }
  isPasswordValid(): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(this.password);
  }
  isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  openSnackBar(message: string) {
    const horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';

    this.snackBar.open(message, '', {
      duration: 1000,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition
    });
  }
}









