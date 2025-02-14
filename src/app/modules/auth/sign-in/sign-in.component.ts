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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { SignInService } from './sign-in.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
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
    ],
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;
    
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;


    signUpForm: UntypedFormGroup;
    

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private signInService:SignInService,
        private snackBar: MatSnackBar
    ) {}

    /**
     * On init
     */
    ngOnInit(): void {
    
        this.signInForm = this._formBuilder.group({
            username: ['', Validators.required], // Add Username field
            password: ['', Validators.required],
            rememberMe: [''],
        });


        this.signUpForm = this._formBuilder.group({
            firstName: ['', Validators.required],
            // lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            companyName: [''],
            roleId: ['46532A00-C18E-452D-B7E5-C2AD6C6C384D'],
            roleName: ['Tenant'],
       
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
//     signIn(): void {
//         debugger
//         // Return if the form is invalid
//         if (this.signInForm.invalid) {
//             return;
//         }

//         // Disable the form
//         this.signInForm.disable();

//         // Hide the alert
//         this.showAlert = false;

//   debugger
//         // Sign in
//         this._authService.signIn(this.signInForm.value).subscribe(
//             () => {
//                 // Set the redirect url.
//                 // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
//                 // to the correct page after a successful sign in. This way, that url can be set via
//                 // routing file and we don't have to touch here.
//                 debugger
//                 // this._router.navigateByUrl('/main');

//                 const redirectURL =
//                     this._activatedRoute.snapshot.queryParamMap.get(
//                         'redirectURL'
//                     ) || '/signed-in-redirect';

//                 // Navigate to the redirect url
//                 this._router.navigateByUrl(redirectURL);
//             },
//             (response) => {
//                 // Re-enable the form
//                 this.signInForm.enable();

//                 // Reset the form
//                 this.signInNgForm.resetForm();

//                 // Set the alert
//                 this.alert = {
//                     type: 'error',
//                     message: 'Wrong email or password',
//                 };

//                 // Show the alert
//                 this.showAlert = true;
//             }
//         );
//     }
userRole

signIn(): void {
    debugger
    if (this.signInForm.invalid) {
        return;
    }

    // Disable the form
    this.signInForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Sign in
    this._authService.signIn(this.signInForm.value).subscribe(
        (response) => {
            debugger
            // Log the successful response
            console.log('Sign-in success:', response);
            this.userRole=response.data.roles[0].roleName;

            

    const redirectURL =  this._activatedRoute.snapshot.queryParamMap.get(  'redirectURL' ) || '/signed-in-redirect';
    const redirectURL2 =  this._activatedRoute.snapshot.queryParamMap.get(  'redirectURL' ) || '/signed-in-redirectTenant';

            // Navigate to the redirect URL
            if(this.userRole=='Admin'){
                this._router.navigate(['main']);
            }
            else if(this.userRole=='Tenant'){
                this._router.navigateByUrl(redirectURL2);
            }
           
        },
        (response) => {
            // Log the error response from the backend
            console.error('Sign-in error:', response);

            // Re-enable the form
            this.signInForm.enable();

            // Reset the form
            this.signInNgForm.resetForm();

            // Set the alert
            this.alert = {
                type: 'error',
                message: response.error?.errors?.Username?.[0] || 'Wrong username or password',
            };

            // Show the alert
            this.showAlert = true;
        }
    );
}


signUp(): void {
    debugger
    // Do nothing if the form is invalid
    if (this.signUpForm.invalid) {
        return;
    }

    // Disable the form to prevent multiple submissions
    this.signUpForm.disable();

    // Hide any previous alert
    this.showAlert = false;

    // Sign up
    this._authService.signUp(this.signUpForm.value).subscribe(
        (response) => {
            // Show Snackbar Notification
            this.snackBar.open('User Registered!', '✖', {
                duration: 3000, // Time in milliseconds
                verticalPosition: 'top', // Position (top/bottom)
                horizontalPosition: 'right', // Position (start/center/end/right/left)
                panelClass: ['snackbar-success'] // Custom styling
            });

            // ✅ Re-enable the form
            this.signUpForm.enable();

            // ✅ Clear the form fields
            this.signUpNgForm.resetForm();
        },
        (response) => {
            // Re-enable the form in case of an error
            this.signUpForm.enable();

            // Reset the form (optional if needed)
            this.signUpNgForm.resetForm();

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

}
