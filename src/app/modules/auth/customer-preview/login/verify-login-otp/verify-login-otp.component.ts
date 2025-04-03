import { Component, ViewChild } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { CommonModule } from '@angular/common';
import { OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { QuillEditorComponent } from 'ngx-quill';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { DataService } from '../../../';
import { NgxCountriesDropdownModule } from 'ngx-countries-dropdown';
import { FormControl} from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OtpService } from 'app/services/otp.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VerifyLoginOtpService } from './verify-login-otp.service';
import { LoginComponent } from '../../login/login.component';
import { RegisterComponent } from '../../register/register.component';
import { finalize, Subject, takeUntil, takeWhile, tap, timer } from 'rxjs';
import { RegisterService } from '../../register/register.service';



@Component({
  selector: 'app-verify-login-otp',
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
    NgxCountriesDropdownModule,
    MatCardModule,
    FormsModule,
    NgOtpInputModule
  ],
  templateUrl: './verify-login-otp.component.html',
  styleUrl: './verify-login-otp.component.scss'
})


export class VerifyLoginOtpComponent {
  otpForm: FormGroup;
  otp: string;
  code: string;
  phoneNumber: string;
  otpForSignIn: number = 2;
  invalidOTP: string = ''; // Initialize with an empty string
  newOTP: string = '';

  countdown: number = 180;
      countdownMapping: any = {
          '=1': '# second',
          other: '# seconds',
      };
      private _unsubscribeAll: Subject<any> = new Subject<any>();

  showOtpComponent = true;
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: true,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '30px',
      'height': '30px'
    }
  };

    constructor(
          private _formBuilder: UntypedFormBuilder,
          private snackBar: MatSnackBar,
          private _router: Router,
          private route: ActivatedRoute,
          private otpService: OtpService,
          public matDialogRef: MatDialogRef<VerifyLoginOtpComponent>,
          private verifyloginotpService: VerifyLoginOtpService,
          private dialog:MatDialog,
          private fb: FormBuilder,
          private registerService: RegisterService
      ) {
        this.otpForm = this.fb.group({
          otp: ['', Validators.required]
        });
      }


  onOtpChange(otp: string) {
    this.otpForm.get('otp')?.setValue(otp);
    this.otpForm.get('otp')?.updateValueAndValidity(); // Ensure form updates its validity
    this.otp = otp;
  }


  sendPhoneNumberWithOTP() {
    debugger
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched(); // Show validation errors
      return;
    }
    const data = {
      phoneNumber: this.phoneNumber,
      otp: this.otp
    };

    // this.verifyloginotpService.sendPhoneNumberWithOTP(data).subscribe(
    //   (response) => {
    //     if (response.status=="OK")
    //       {
  
    //         this.Close();
    
    //         this._router.navigate(['/dashboard']);
  
    //       }
    //   },
    //   (error) => {
    //     console.log("API Error:", error); // Log the full error response
  
    //     // Handle the 400 Bad Request error properly
    //     if (error.error?.message === "Invalid OTP.")
    //       {
    //         this.invalidOTP = "OTP code is invalid"; // Show error message
    //       }
    //       // else if (error.error?.message === "OTP has expired.") {
    //       //   this.otpExpired = "OTP code expired";
    //       // }
    //     else if (error.error?.message === "Phone number not found.")
    //       {
    //       // Show Snackbar Notification
    //       this.snackBar.open('You have not Signed Up. Please Sign Up', 'Close', {
    //       duration: 3000, // Time in milliseconds
    //       verticalPosition: 'top', // Position (top/bottom)
    //       horizontalPosition: 'right', // Position (start/center/end/right/left)
    //       panelClass: ['snackbar-success'] // Custom styling
    //       });
  
    //       this.Close();

    //               this.dialog.open(RegisterComponent,
    //               {
    //             disableClose: true,
    //               })
                
    //       }
    //   }
    // );
  }


  ngOnInit(): void {
    this.phoneNumber = this.otpService.getPhoneNumber();
    console.log('Received PhoneNumber:', this.phoneNumber);
    this.countDown();
    debugger
  }

  countDown() {
    // Countdown
    timer(1000, 1000)
    .pipe(
        finalize(() => {
            // this._router.navigate(['sign-in']);
        }),
        takeWhile(() => this.countdown > 0),
        takeUntil(this._unsubscribeAll),
        tap(() => this.countdown--)
    )
    .subscribe();
  }

  recreateCustomerOTP() {
    debugger;
    const data = {
        phoneNumber: this.phoneNumber,
        otpType: this.otpForSignIn
    };

    this.registerService.createCustomerOTP(data).subscribe(
      (response) => {

        this.countdown = 180;
        
        this.newOTP = "A new OTP code has been send to you!";
      },
      (error) => {
          console.error('Error:', error);
      }
  );
}

  Close(): void {
    this.matDialogRef.close();
  }

}