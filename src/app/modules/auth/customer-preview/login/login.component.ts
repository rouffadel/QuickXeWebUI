import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { QuillEditorComponent } from 'ngx-quill';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../../services/data.service';
import { FormControl } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { RegisterComponent } from '../register/register.component';
import { LoginService } from './login.service';
import { OtpService } from 'app/services/otp.service';
import { VerifyLoginOtpComponent } from './verify-login-otp/verify-login-otp.component';
import { VerifyOtpComponent } from '../register/verify-otp/verify-otp.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    QuillEditorComponent,
    MatSelectModule,
    CommonModule,
    MatCardModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './login.component.scss'
})



export class LoginComponent implements OnInit {


  customerDetailsForm: FormGroup;
  phoneNumber: string = '';
  otpType: number = 2;


  file_store: FileList;
  file_list: Array<string> = [];
  display: FormControl = new FormControl("", Validators.required);


  handleFileInputChange(l: FileList): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.display.patchValue(`${f.name}${count}`);
    } else {
      this.display.patchValue("");
    }
  }

  handleSubmit(): void {
    var fd = new FormData();
    this.file_list = [];
    for (let i = 0; i < this.file_store.length; i++) {
      fd.append("files", this.file_store[i], this.file_store[i].name);
      this.file_list.push(this.file_store[i].name);
    }

    // do submit ajax
  }

  /**
   * Constructor
   */
  constructor(
    public matDialogRef: MatDialogRef<LoginComponent>,
    private _formBuilder: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    private dataService: DataService,
    private dialog: MatDialog,
    private loginService: LoginService,
    private otpService: OtpService

  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */

  ngOnInit() {

    this.customerDetailsForm = this._formBuilder.group({
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]]

    });

  }

  onlyNumbers(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  validatePhoneNumber() {
    const phoneControl = this.customerDetailsForm.get('phoneNumber');
    if (phoneControl?.value.length < 10) {
      phoneControl.setErrors({ minlength: true });
    }
  }

  navigateToVerifyOtp(phoneNumber: string) {
    // debugger
    this.otpService.setPhoneNumber(phoneNumber);

    this.dialog.open(VerifyOtpComponent,
      {
        disableClose: true,
      })
  }



  // createCustomerInLogin() {
  //   // debugger;
  //   const phoneNumber = this.customerDetailsForm.value.phoneNumber;

  //   if (!phoneNumber) {
  //     console.error("❌ Phone number is missing in login.");
  //     return;
  //   }

  //   console.log("✅ Storing phone number in OtpService for login:", phoneNumber);

  //   this.otpService.setPhoneNumber(phoneNumber);  // Ensure it's set for login

  //   const data = {
  //     phoneNumber: phoneNumber,
  //     otpType: this.otpType
  //   };

  //   this.loginService.createCustomerInLogin(data).subscribe(
  //     (response) => {
  //       console.log("✅ OTP sent successfully. Navigating to OTP Verification.");
  //       this.navigateToVerifyOtp(phoneNumber);
  //       this.Close();
  //     },
  //     (error) => {
  //       console.error("❌ Error:", error);
  //     }
  //   );
  // }

  createCustomerInLogin() {
    let phoneNumber = this.customerDetailsForm.value.phoneNumber;

    if (!phoneNumber) {
      return;
    }

    // ✅ Ensure country code for WhatsApp
    if (!phoneNumber.startsWith('+')) {
      phoneNumber = '+91' + phoneNumber;
    }

    this.otpService.setPhoneNumber(phoneNumber);

    const data = {
      phoneNumber: phoneNumber,
      otpType: this.otpType
    };

    this.loginService.createCustomerInLogin(data).subscribe(
      () => {
        this.navigateToVerifyOtp(phoneNumber);
        this.Close();
      },
      (error) => {
        console.error(error);
        if (error.status === 404) {
          const msg = error.error?.message || "User not registered. Please sign up first.";
          this.snackBar.open(msg, 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackbar-error']
          });
        }
      }
    );
  }



  openRegisterDialog() {
    this.Close();
    this.dialog.open(RegisterComponent, {
      disableClose: true
    });
  }



  Close(): void {
    this.matDialogRef.close();
  }
}
