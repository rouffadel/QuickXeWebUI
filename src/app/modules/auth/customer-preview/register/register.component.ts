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
import { NgxCountriesDropdownModule } from 'ngx-countries-dropdown';
import { FormControl } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { RegisterService } from './register.service';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { Router } from '@angular/router';
import { OtpService } from 'app/services/otp.service'; // Adjust path accordingly
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-register',
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
  ],
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './register.component.css'
})


export class RegisterComponent implements OnInit {

  customerDetailsForm: FormGroup;
  name: string = '';
  phoneNumber: string = '';
  email: string = '';
  address: string = '';
  otpType: number = 1;

  code: string = '';


  /**
   * Constructor
   */
  constructor(
    public matDialogRef: MatDialogRef<RegisterComponent>,
    private _formBuilder: UntypedFormBuilder,
    private snackBar: MatSnackBar,
    private dataService: DataService,
    private registerService: RegisterService,
    private dialog: MatDialog,
    private _router: Router,
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
      name: ['', [Validators.required]],
      // email: ['', Validators.required, Validators.email],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
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


  openLoginDialog() {
    this.Close();
    this.dialog.open(LoginComponent, {
      disableClose: true
    });
  }


  navigateToOtpService(phoneNumber: string) {
    // debugger
    this.otpService.setOtp(phoneNumber);

  }

  register() {
    let rawNumber = this.customerDetailsForm.get('phoneNumber')?.value;
    if (rawNumber && !rawNumber.startsWith('+')) {
      this.phoneNumber = '+91' + rawNumber;
    } else {
      this.phoneNumber = rawNumber;
    }
    this.navigateToOtpService(this.phoneNumber);
    this.addCustomer();
  }

  openVerifyOtpDialog() {
    console.log('Opening Verify OTP Dialog for:', this.phoneNumber);
    const dialogRef = this.dialog.open(VerifyOtpComponent, {
      disableClose: true,
      data: { onOtpSuccess: () => this.onFinalRegistrationSuccess() }
    });

    this.Close();
  }

  onFinalRegistrationSuccess() {
    // This is now handled by VerifyOtpComponent direct redirect
  }

  addCustomer() {
    const customerData = {
      name: this.customerDetailsForm.get('name').value,
      phoneNumber: this.phoneNumber,
      email: this.customerDetailsForm.get('email').value,
      address: this.customerDetailsForm.get('address').value,
    };

    console.log('Adding customer with data:', customerData);

    this.registerService.createCustomer(customerData).subscribe(
      (response) => {
        console.log('Customer added successfully:', response);
        // OTP process starts only AFTER customer is saved in table
        this.createCustomerOTP();
      },
      (error) => {
        console.error('Error adding customer:', error);
        const errorMessage = error.error?.message || 'Failed to add customer. Please try again.';
        this.snackBar.open(errorMessage, 'Close', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['snackbar-error']
        });
      }
    );
  }

  createCustomerOTP() {
    if (!this.phoneNumber || this.phoneNumber.replace('+91', '').length !== 10) {
      this.snackBar.open('Please enter exactly 10 digits', 'Close', { duration: 3000 });
      return;
    }

    const data = {
      phoneNumber: this.phoneNumber,
      otpType: this.otpType
    };

    console.log('Sending OTP request to backend:', data);

    this.registerService.createCustomerOTP(data).subscribe(
      (response) => {
        console.log('OTP request successful:', response);
        this.openVerifyOtpDialog();
      },
      (error) => {
        console.error('OTP request failed:', error);
      }
    );
  }

  Close(): void {
    this.matDialogRef.close();
  }
}
