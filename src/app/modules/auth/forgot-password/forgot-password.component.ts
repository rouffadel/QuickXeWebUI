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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

// import { SignInService } from './sign-in.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'auth-forgot-password',
    templateUrl: './forgot-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        RouterLink,
        FuseAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        FuseAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        RouterLink,
        CommonModule
    ],
})


export class AuthForgotPasswordComponent implements OnInit {
    @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    forgotPasswordForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Send the reset link
     */
    sendResetLink(): void {
        // Return if the form is invalid
        if (this.forgotPasswordForm.invalid) {
            return;
        }

        // Disable the form
        this.forgotPasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Forgot password
        this._authService
            .forgotPassword(this.forgotPasswordForm.get('email').value)
            .pipe(
                finalize(() => {
                    // Re-enable the form
                    this.forgotPasswordForm.enable();

                    // Reset the form
                    this.forgotPasswordNgForm.resetForm();

                    // Show the alert
                    this.showAlert = true;
                })
            )
            .subscribe(
                (response) => {
                    // Set the alert
                    this.alert = {
                        type: 'success',
                        message:
                            "Password reset sent! You'll receive an email if you are registered on our system.",
                    };
                },
                (response) => {
                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message:
                            'Email does not found! Are you sure you are already a member?',
                    };
                }
            );
    }
}













// @Component({
//     selector: 'auth-sign-in',
//     templateUrl: './sign-in.component.html',
//     encapsulation: ViewEncapsulation.None,
//     animations: fuseAnimations,
//     standalone: true,
//     imports: [
//         RouterLink,
//         FuseAlertComponent,
//         FormsModule,
//         ReactiveFormsModule,
//         MatFormFieldModule,
//         MatInputModule,
//         MatButtonModule,
//         MatIconModule,
//         MatCheckboxModule,
//         MatProgressSpinnerModule,
//     ],
// })
// export class AuthSignInComponent implements OnInit {
//     @ViewChild('signInNgForm') signInNgForm: NgForm;
//     @ViewChild('signUpNgForm') signUpNgForm: NgForm;
    
//     alert: { type: FuseAlertType; message: string } = {
//         type: 'success',
//         message: '',
//     };
//     signInForm: UntypedFormGroup;
//     showAlert: boolean = false;


//     signUpForm: UntypedFormGroup;
    

//     /**
//      * Constructor
//      */
//     constructor(
//         private _activatedRoute: ActivatedRoute,
//         private _authService: AuthService,
//         private _formBuilder: UntypedFormBuilder,
//         private _router: Router,
//         private signInService:SignInService,
//         private snackBar: MatSnackBar
//     ) {}

//     /**
//      * On init
//      */
//     ngOnInit(): void {
    
//         this.signInForm = this._formBuilder.group({
//             username: ['', Validators.required], // Add Username field
//             password: ['', Validators.required],
//             rememberMe: [''],
//         });


//         this.signUpForm = this._formBuilder.group({
//             firstName: ['', Validators.required],
//             // lastName: ['', Validators.required],
//             email: ['', [Validators.required, Validators.email]],
//             mobileNumber: [''],
//             password: ['', Validators.required],
//             companyName: [''],
//             roleId: ['46532A00-C18E-452D-B7E5-C2AD6C6C384D'],
//             roleName: ['Tenant'],
       
//         });
//     }

// userRole

// signIn(): void {
//     debugger
//     if (this.signInForm.invalid) {
//         return;
//     }

//     // Disable the form
//     this.signInForm.disable();

//     // Hide the alert
//     this.showAlert = false;

//     // Sign in
//     this._authService.signIn(this.signInForm.value).subscribe(
//         (response) => {
//             debugger
//             // Log the successful response
//             console.log('Sign-in success:', response);
//             this.userRole=response.data.roles[0].roleName;

            

//     const redirectURL =  this._activatedRoute.snapshot.queryParamMap.get(  'redirectURL' ) || '/signed-in-redirect';
//     const redirectURL2 =  this._activatedRoute.snapshot.queryParamMap.get(  'redirectURL' ) || '/signed-in-redirectTenant';

//             // Navigate to the redirect URL
//             if(this.userRole=='Admin'){
//                 this._router.navigate(['main']);
//             }
//             else if(this.userRole=='Tenant'){
//                 this._router.navigateByUrl(redirectURL2);
//             }
           
//         },
//         (response) => {
//             // Log the error response from the backend
//             console.error('Sign-in error:', response);

//             // Re-enable the form
//             this.signInForm.enable();

//             // Reset the form
//             this.signInNgForm.resetForm();

//             // Set the alert
//             this.alert = {
//                 type: 'error',
//                 message: response.error?.errors?.Username?.[0] || 'Wrong username or password',
//             };

//             // Show the alert
//             this.showAlert = true;
//         }
//     );
// }


// signUp(): void {
//     debugger
//     // Do nothing if the form is invalid
//     if (this.signUpForm.invalid) {
//         return;
//     }

//     // Disable the form to prevent multiple submissions
//     this.signUpForm.disable();

//     // Hide any previous alert
//     this.showAlert = false;

//     // Sign up
//     this._authService.signUp(this.signUpForm.value).subscribe(
//         (response) => {
//             // Show Snackbar Notification
//             this._router.navigate(['welcome'])
//             // this.snackBar.open('User Registered!', '✖', {
//             //     duration: 3000, // Time in milliseconds
//             //     verticalPosition: 'top', // Position (top/bottom)
//             //     horizontalPosition: 'right', // Position (start/center/end/right/left)
//             //     panelClass: ['snackbar-success'] // Custom styling
//             // });

//             // ✅ Re-enable the form
//             this.signUpForm.enable();

//             // ✅ Clear the form fields
//             this.signUpNgForm.resetForm();
//         },
//         (response) => {
//             // Re-enable the form in case of an error
//             this.signUpForm.enable();

//             // Reset the form (optional if needed)
//             this.signUpNgForm.resetForm();

//             // Show error alert
//             this.alert = {
//                 type: 'error',
//                 message: 'Something went wrong, please try again.',
//             };

//             // Show the alert
//             this.showAlert = true;
//         }
//     );
// }

// }
