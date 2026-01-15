import { AfterViewChecked, Component, ViewChild } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { CommonModule, I18nPluralPipe } from '@angular/common';
import { OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxCountriesDropdownModule } from 'ngx-countries-dropdown';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { OtpService } from 'app/services/otp.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { finalize, Subject, takeUntil, takeWhile, tap, timer } from 'rxjs';
import { RegisterService } from '../register.service';
import { VerifyOtpService } from './verify-otp.service';
import { LoginComponent } from '../../login/login.component';
import { RegisterComponent } from '../register.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    NgxCountriesDropdownModule,
    MatCardModule,
    NgOtpInputModule,
    RouterLink,
    I18nPluralPipe
  ],
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {
  otpForm: FormGroup;
  otp: string = '';
  phoneNumberForSignUp: string = '';
  phoneNumberForSignIn: string = '';
  invalidOTP: string = '';
  newOTP: string = '';
  countdown: number = 180;

  countdownMapping: any = {
    '=1': '# second',
    other: '# seconds',
  };

  showOtpComponent = true;

  // private _authenticated: boolean = false;



  private _unsubscribeAll: Subject<any> = new Subject<any>();

  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;

  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: true,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '30px',
      height: '30px'
    }
  };

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private otpService: OtpService,
    public matDialogRef: MatDialogRef<VerifyOtpComponent>,
    private verifyOtpService: VerifyOtpService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { onOtpSuccess?: () => void },
    private registerService: RegisterService
  ) {
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.phoneNumberForSignUp = this.otpService.getOtp();
    this.phoneNumberForSignIn = this.otpService.getPhoneNumber();

    if (!this.phoneNumberForSignUp && !this.phoneNumberForSignIn) {
      console.error('❌ Phone number is missing in VerifyOtpComponent!');
    }

    this.countDown();
  }

  // countDown(): void {
  //   timer(1000, 1000)
  //     .pipe(
  //       takeWhile(() => this.countdown > 0),
  //       takeUntil(this._unsubscribeAll),
  //       tap(() => this.countdown--)
  //     )
  //     .subscribe();
  // }


  countDown() {
    this._unsubscribeAll = new Subject<any>(); // Ensure a new subject for each countdown

    timer(1000, 1000)
      .pipe(
        takeWhile(() => this.countdown > 0),
        takeUntil(this._unsubscribeAll),
        tap(() => this.countdown--)
      )
      .subscribe({
        complete: () => console.log("Countdown finished!"),
      });
  }


  onOtpChange(otp: string): void {
    this.otpForm.get('otp')?.setValue(otp);
    this.otpForm.get('otp')?.updateValueAndValidity();
    this.otp = otp;
  }

  recreateCustomerOTP(): void {
    const isSignUp = !!this.phoneNumberForSignUp && !this.phoneNumberForSignIn;
    const phoneNumber = isSignUp ? this.phoneNumberForSignUp : this.phoneNumberForSignIn;
    // const otpType = isSignUp ? 1 : 2;

    enum OtpType {
      SignUp = 1,
      Login = 2,
    }

    const otpType = isSignUp ? OtpType.SignUp : OtpType.Login;

    if (!phoneNumber) {
      console.error('❌ Missing phone number for OTP recreation.');
      return;
    }

    const requestData = { phoneNumber, otpType };

    this.registerService.createCustomerOTP(requestData).subscribe(
      () => {
        console.log("✅ OTP re-sent successfully.");

        this.newOTP = "A new OTP code has been sent to you!";

        this.snackBar.open('A new OTP has been sent to your WhatsApp', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success'],
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });

        // 🛑 Reset the countdown
        this.resetCountdown();
      },
      (error) => console.error('Error:', error)
    );
  }


  // recreateCustomerOTP() {
  //   debugger;

  //   const dataForSignUp = {
  //     phoneNumber: this.phoneNumberForSignUp,
  //     otpType: this.otpForSignUp
  //   };

  //   const dataForSignIn = {
  //     phoneNumber: this.phoneNumberForSignIn,
  //     otpType: this.otpForSignIn
  //   };

  //   const requestData = this.phoneNumberForSignUp ? dataForSignUp : dataForSignIn;

  //   if (!requestData.phoneNumber) {
  //     console.error("❌ Phone number is missing!");
  //     return;
  //   }

  //   this.registerService.createCustomerOTP(requestData).subscribe(
  //     (response) => {
  //       console.log("✅ OTP re-sent successfully.");

  //       this.newOTP = "A new OTP code has been sent to you!";

  //       // 🛑 Reset the countdown
  //       this.resetCountdown();
  //     },
  //     (error) => {
  //       console.error("Error:", error);
  //     }
  //   );
  // }


  resetCountdown() {
    this.countdown = 180; // Reset timer

    if (!this._unsubscribeAll.closed) {
      this._unsubscribeAll.next(null); // Unsubscribe from previous countdown
    }

    this.countDown(); // Restart the countdown
  }



  sendPhoneNumberWithOTP(): void {
    // debugger
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      return;
    }

    const isSignUp = !!this.phoneNumberForSignUp && !this.phoneNumberForSignIn;
    let phoneNumber = isSignUp ? this.phoneNumberForSignUp : this.phoneNumberForSignIn;

    if (!phoneNumber) {
      console.warn('⚠️ Phone number is empty, trying to fetch again...');
      phoneNumber = this.otpService.getPhoneNumber();
    }

    if (!phoneNumber) {
      console.error('❌ Phone number is missing! Unable to verify OTP.');
      return;
    }

    const data = { phoneNumber, otp: this.otp };

    let apiCall;
    if (isSignUp) {
      console.log("📌 Calling Sign-Up OTP Validation API");
      apiCall = this.verifyOtpService.validateSignUpOTP(data);
    } else {
      console.log("📌 Calling Login OTP Validation API");
      apiCall = this.verifyOtpService.validateLoginOTP(data);
    }

    apiCall.subscribe(
      (response) => {
        // debugger
        if (response.status === 'OK') {
          // debugger
          if (isSignUp == true) {
            this.handleOtpSuccess();
          }
          else if (isSignUp == false) {
            sessionStorage.setItem('Id', response.data.customerId);
            sessionStorage.setItem('Name', response.data.name);
            sessionStorage.setItem('Email', response.data.email);
            // this._authenticated = true;
            this.redirectToDashboard();
          }
          // isSignUp ? this.handleOtpSuccess() : 

          // sessionStorage.setItem('Id', response.data.customerId);
          // sessionStorage.setItem('Name', response.data.name);
          // sessionStorage.setItem('Email', response.data.email);
          // // this._authenticated = true;
          // this.redirectToDashboard();

        } else if (response.message === 'Phone number found.') {
          this.handlePhoneNumberFound();
        } else {
          console.error('Unexpected response:', response);
        }
      },
      (error) => this.handleError(error)
    );
  }

  // signOut() {
  //     // Remove the access token from the local storage
  //     // localStorage.removeItem('accessToken');

  //     // sessionStorage.removeItem('accessToken');

  //     // Set the authenticated flag to false
  //     this._authenticated = false;

  //     // Return the observable
  //     return (true);
  // }

  handlePhoneNumberNotFound(): void {
    this.snackBar.open('You have not Signed Up. Please Sign Up', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['snackbar-success']
    });

    this.Close();
    this.dialog.open(RegisterComponent, { disableClose: true });
  }

  handlePhoneNumberFound(): void {
    this.snackBar.open('You have already Signed Up. Please Login', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['snackbar-success']
    });

    this.Close();
    this.dialog.open(LoginComponent, { disableClose: true });
  }

  handleOtpSuccess(): void {
    this.data?.onOtpSuccess?.();
    this.Close();
  }

  redirectToDashboard(): void {
    this.Close();
    this.router.navigate(['/dashboard']);


  }

  handleError(error: any): void {
    console.error('API Error:', error);

    if (error.error?.message === 'Phone number not found.') {
      this.handlePhoneNumberNotFound();
    } else if (error.error?.message === 'Invalid OTP.') {
      this.invalidOTP = 'OTP code is invalid';
    }
    // else {
    //   this.snackBar.open(`Error: ${error.status} - ${error.message || 'Unexpected error'}`, 'Close', {
    //     duration: 4000,
    //     verticalPosition: 'top',
    //     horizontalPosition: 'right',
    //     panelClass: ['snackbar-error']
    //   });
    // }
  }

  Close(): void {
    this.matDialogRef.close();
  }
}
