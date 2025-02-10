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

    // isCreatedSuccessfully = false;


    signUpForm: UntypedFormGroup;

    // signInArray: Details[] = [];
    

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private signInService:SignInService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        // this.signInForm = this._formBuilder.group({
        //     emailAddressOrPhoneNumber: [
        //         '',
        //         [Validators.required, Validators.email],
        //     ],
        //     password: ['', Validators.required],
        // });

        // this.signInForm = this._formBuilder.group({
        //     email: [
        //         // 'hughes.brian@company.com',
        //         [Validators.required, Validators.email],
        //     ],
        //     password: [ Validators.required],
        //     rememberMe: [''],
        // });


        this.signInForm = this._formBuilder.group({
            username: ['', Validators.required], // Add Username field
            password: ['', Validators.required],
            rememberMe: [''],
        });
        

        // this.signUpForm = this._formBuilder.group({
        //     name: ['', Validators.required],
        //     email: ['', [Validators.required, Validators.email]],
        //     password: ['', Validators.required],
        //     company: [''],
        //     agreements: ['', Validators.requiredTrue],
        // });


        this.signUpForm = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            companyName: [''],
            roleId: ['46532A00-C18E-452D-B7E5-C2AD6C6C384D'],
            roleName: ['Tenant'],
            agreements: ['', Validators.requiredTrue],
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


signIn(): void {
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
            // Log the successful response
            console.log('Sign-in success:', response);

            const redirectURL =
                this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

            // Navigate to the redirect URL
            this._router.navigateByUrl(redirectURL);
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
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // this.isCreatedSuccessfully = true;


        // Sign up
        this._authService.signUp(this.signUpForm.value).subscribe(
            (response) => {
                // Navigate to the confirmation required page
                
                this._router.navigateByUrl('/confirmation-required');
            },
            (response) => {
                // Re-enable the form
                this.signUpForm.enable();

                // Reset the form
                this.signUpNgForm.resetForm();

                // Set the alert
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
