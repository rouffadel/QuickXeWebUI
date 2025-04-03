import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ChangepasswordService } from './changepassword.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [
      MatButtonModule,
      MatIconModule,
      CommonModule,
      MatOptionModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
  ],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent implements OnInit{

  resetPasswordForm: FormGroup;
  userName: string = '';

  constructor(
      private _formBuilder: FormBuilder,
      private changepasswordService: ChangepasswordService,
      private snackBar: MatSnackBar,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('userName') || '';

    this.resetPasswordForm = this._formBuilder.group({
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*\\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}')
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.confirmPasswordValidator
    });
  }

  resetPassword() {
    debugger
    if (this.resetPasswordForm.invalid) {
      return;
    }

    const { newPassword, confirmPassword } = this.resetPasswordForm.value;
    const changePasswordRequest = {
      userName: this.userName,
      newPassword,
      confirmPassword,
    };

    this.changepasswordService.changePassword(changePasswordRequest).subscribe((res:any) => {
        debugger
        if(res.status=="OK"){
          this.router.navigate(['/success-password']);
        }
      },err=>{
        console.log("Errorr",err)
      }
    );
  }

  confirmPasswordValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (newPassword !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ confirmPasswordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

}
