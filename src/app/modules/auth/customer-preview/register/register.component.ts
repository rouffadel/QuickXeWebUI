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
import { FormControl} from "@angular/forms";
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
        private dialog:MatDialog,
        private _router:Router,
        private otpService: OtpService
        
    ) {}

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
        phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]*$')]],
        // phoneNumber: ['', Validators.required]
        // otpType: ['SignUp', Validators.required]

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


      this.createCustomerOTP();

      this.navigateToOtpService(this.phoneNumber);

      this.openVerifyOtpDialog();

      
  }

  openVerifyOtpDialog() {
    const dialogRef = this.dialog.open(VerifyOtpComponent, {
      // width: '400px',
      disableClose: true,
      data: { onOtpSuccess: () => this.addCustomer() }  // ✅ Pass function
    });

    this.Close();

  }



  addCustomer() {
    // debugger;
    const customerData = {
      name:this.name,
      phoneNumber:this.phoneNumber,
      email: this.email,
      address: this.address,
    };

    this.registerService.createCustomer(customerData).subscribe(
      (response) => {

         console.log('You are registered successfully!');

      // Show Snackbar Notification
      this.snackBar.open('You are registered successfully! Please Login', 'Close', {
      duration: 3000, // Time in milliseconds
      verticalPosition: 'top', // Position (top/bottom)
      horizontalPosition: 'right', // Position (start/center/end/right/left)
      panelClass: ['snackbar-success'] // Custom styling
      });

      this.Close();
      
              this.dialog.open(LoginComponent,
              {
            disableClose: true,
              })

      },
      (error) => {
          console.error('Error:', error);
      }
  );
  }

  createCustomerOTP() {
    // debugger;
    const data = {
        phoneNumber: this.phoneNumber,
        otpType: this.otpType
    };

  
    this.registerService.createCustomerOTP(data).subscribe(
        (response) => {
            
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
