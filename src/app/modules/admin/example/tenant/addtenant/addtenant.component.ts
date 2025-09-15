import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { QuillEditorComponent } from 'ngx-quill';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../../../services/data.service'
import { NgxCountriesDropdownModule } from 'ngx-countries-dropdown';
import { AuthService } from 'app/core/auth/auth.service';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AddtenantService } from './addtenant.service';

export interface Option {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-addtenant',
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
  ],
  templateUrl: './addtenant.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './addtenant.component.scss'
})

export class AddtenantComponent implements OnInit {

  userId: string = '';
  EmailCode: string = '';


  selectedValue: string;

   options: Option[] = [
      {value: 'Y', viewValue: 'Yes'},
      {value: 'N', viewValue: 'No'},
    ];
  


  alert: { type: FuseAlertType; message: string } = {
          type: 'success',
          message: '',
  };
  showAlert: boolean = false;

  addTenantForm: UntypedFormGroup;
  @ViewChild('addTenantNgForm') addTenantNgForm: NgForm;
  // EmailCode: any;
  


    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<AddtenantComponent>,
        private _formBuilder: UntypedFormBuilder,
        private snackBar: MatSnackBar,
        private dataService: DataService,
        private _authService: AuthService,
        private _router: Router,
        private addtenantService: AddtenantService
    ) {}

  // set EmailCode(code: string) {
  //     sessionStorage.setItem('Email Code', code);
  // }

  // get EmailCode(): string {
  //     return sessionStorage.getItem('Email Code') ?? '';
  // }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */

    ngOnInit() {
      // this.getService();

      // this.userId = sessionStorage.getItem('loggedInUserId') || ''; // Fetch tenantId from local storage

      
      this.addTenantForm = this._formBuilder.group({
        firstName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['Password@123', Validators.required],
        companyName: ['', Validators.required],
        // phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]*$')]],
        mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]*$')]],
        roleId: ['46532A00-C18E-452D-B7E5-C2AD6C6C384D', Validators.required],
        roleName: ['Tenant', Validators.required],
        personalVisitForRegistration: ['', Validators.required],
        isActive: ['Pending', Validators.required],
    });

    }


    
    onlyNumbers(event: KeyboardEvent) {
      const charCode = event.key.charCodeAt(0);
      if (charCode < 48 || charCode > 57) {
        event.preventDefault();
      }
    }
  
    validateMobileNumber() {
      const mobileNumberControl = this.addTenantForm.get('mobileNumber');
      if (mobileNumberControl?.value.length < 10) {
        mobileNumberControl.setErrors({ minlength: true });
      }
    }


    // validateNumberInput(event: KeyboardEvent) {
    //   const charCode = event.charCode;
    //   if (charCode < 48 || charCode > 57) {
    //     event.preventDefault();
    //   }
    // }

    addTenant(): void {
      // debugger
      // Do nothing if the form is invalid
      if (this.addTenantForm.invalid) {
          return;
      }
  
      // Disable the form to prevent multiple submissions
      this.addTenantForm.disable();
  
      // Hide any previous alert
      // this.showAlert = false;
  
      // Sign up
      this._authService.addTenant(this.addTenantForm.value).subscribe(
          (response) => {
              // Show Snackbar Notification
              // this._router.navigate(['welcome'])
              this.snackBar.open('Agent Registered!', '✖', {
                  duration: 3000, // Time in milliseconds
                  verticalPosition: 'top', // Position (top/bottom)
                  horizontalPosition: 'right', // Position (start/center/end/right/left)
                  panelClass: ['snackbar-success'] // Custom styling
              });
              this.dataService.notifyDataChange();
  
              // ✅ Re-enable the form
              // this.addTenantForm.enable();

              this.getEmailCodeByEmail();
  
              // this.sendEmail();
        
              // ✅ Clear the form fields
              this.addTenantNgForm.resetForm();

              this.Close();

          },
          (response) => {
              // Re-enable the form in case of an error
              this.addTenantForm.enable();
  
              // Reset the form (optional if needed)
              this.addTenantNgForm.resetForm();
  
              // Show error alert
              this.alert = {
                  type: 'error',
                  message: 'Something went wrong, please try again.',
              };
  
              // Show the alert
              this.showAlert = true;
          }
      );
  }

  getEmailCodeByEmail() {
    // debugger
    const email = this.addTenantForm.value.email;
    this.addtenantService.getEmailCodeByEmail(email).subscribe(
      
      (result: any) => {
        if (result && result.data) {
          console.log("API Response:", result);
          console.log("Extracted EmailCode:", result.data);

          this.EmailCode = result.data;  // Store the retrieved EmailCode
          console.log("Received EmailCode:", this.EmailCode);

          // this.sendEmail();

        } else {
          console.log("No EmailCode received from API.");
        }
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
