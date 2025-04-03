import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    FormGroup,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { FuseValidators } from '@fuse/validators';
import { AuthService } from 'app/core/auth/auth.service';
import { finalize } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordService } from './reset-password.service';

@Component({
    selector: 'auth-reset-password',
    templateUrl: './reset-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        FuseAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        RouterLink,
    ],
})
export class AuthResetPasswordComponent implements OnInit {

    EmailCode: string | null = '';
    userName: string | null = '';


    @ViewChild('resetPasswordNgForm') resetPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    resetPasswordForm: UntypedFormGroup;

    // resetPasswordForm: FormGroup;
    showAlert: boolean = false;
    isActive: string = 'Active';
    today: Date = new Date();
    activationDate: string = `${this.today.getFullYear()}-${String(this.today.getMonth() + 1).padStart(2, '0')}-${String(this.today.getDate()).padStart(2, '0')}`;

//     var today = new Date();
// var formattedDate = today.getFullYear() + "-" + 
//                     String(today.getMonth() + 1).padStart(2, '0') + "-" + 
//                     String(today.getDate()).padStart(2, '0');

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private resetpasswordService: ResetPasswordService,
        private router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.route.paramMap.subscribe(params => {
            this.EmailCode = params.get('EmailCode'); // Get the EmailCode from the URL
            // console.log('Received EmailCode:', this.EmailCode);
          });

          
        // Create the form
        this.resetPasswordForm = this._formBuilder.group(
            {
                // newPassword: ['', [
                //     Validators.required,
                //     Validators.minLength(8),
                //     Validators.pattern('(?=.*\\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}')
                //   ]]
                // password: ['', [
                //     Validators.required,
                //     Validators.minLength(8),
                //     Validators.pattern('(?=.*\\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}'),
                // ]],
                newPassword: ['', [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}')
                ]],                
                confirmPassword: ['', Validators.required],
            },
            {
                validators: FuseValidators.mustMatch(
                    'newPassword',
                    'confirmPassword'
                ),
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    getUserNameFromEmailCodeAndResetPassword(): void {
        this.resetpasswordService.getUserNameFromEmailCode(this.EmailCode).subscribe((res:any) => {
            debugger
            this.userName = res.data;
            this.resetPassword();
          },err=>{
            console.log("Errorr",err)
          }
        );
    }

    changeIsActiveToActive(): void {
        debugger
        const username = this.userName
        const data = {
          // Id : this.Id.toString(),
          isActive: this.isActive,
          activationDate : this.activationDate
        //   activationDate: new Date().getTime();

        };
        this.resetpasswordService.changeIsActiveToActive(username, data).subscribe((resp:any) => {

            if(resp.status=="OK"){
                console.log('IsActive updated to Active:', resp);
                // Show Snackbar Notification
            //     this.snackBar.open('Profile Details Updated!', 'Close', {
            //     duration: 3000, // Time in milliseconds
            //     verticalPosition: 'top', // Position (top/bottom)
            //     horizontalPosition: 'right', // Position (start/center/end/right/left)
            //     panelClass: ['snackbar-success'] // Custom styling
            //   });
            }

        });
    }


    /**
     * Reset password
     */


    resetPassword(): void {
        debugger

        // this.getUserNameFromEmailCodeAndResetPassword();

        // Return if the form is invalid
        if (this.resetPasswordForm.invalid) {
            return;
        }

        const { newPassword, confirmPassword } = this.resetPasswordForm.value;
        const changePasswordRequest = {
          userName: this.userName,
          newPassword,
          confirmPassword,
        };

        // const { newPassword, confirmPassword } = this.resetPasswordForm.value;
        // const changePasswordRequest = {
        //   userName: this.userName,
        //   newPassword,
        //   confirmPassword,
        // };
    
        // this.resetpasswordService.resetPassword(changePasswordRequest).subscribe((res:any) => {
        //     debugger
        //     if(res.status=="OK"){
        //         // Set the alert
        //         this.alert = {
        //             type: 'success',
        //             message: 'Your password has been reset.',
        //         };
        //     }  
        //         },
        //         (response) => {
        //             // Set the alert
        //             this.alert = {
        //                 type: 'error',
        //                 message: 'Something went wrong, please try again.',
        //             };
       

        
        //   },err=>{
        //     console.log("Errorr",err)
        //   }
        // );

        this.resetpasswordService.resetPassword(changePasswordRequest).subscribe({
            next: (res: any) => {
                debugger;
                if(res.status=="OK"){
                    this.changeIsActiveToActive();
                    this.router.navigate(['/success-set-password']);
                }
                this.alert = {
                    type: res.status === "OK" ? 'success' : 'error',
                    message: res.status === "OK" 
                        ? 'Your password has been reset.' 
                        : 'Something went wrong, please try again.',
                };
            },
            error: (err) => {
                this.alert = {
                    type: 'error',
                    message: 'Something went wrong, please try again.',
                };
            }
        });
        


        // Disable the form
        this.resetPasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Send the request to the server
        // this._authService
        //     .resetPassword(this.resetPasswordForm.get('password').value)
        //     .pipe(
        //         finalize(() => {
        //             // Re-enable the form
        //             this.resetPasswordForm.enable();

        //             // Reset the form
        //             this.resetPasswordNgForm.resetForm();

        //             // Show the alert
        //             this.showAlert = true;
        //         })
        //     )
        //     .subscribe(
        //         (response) => {
        //             // Set the alert
        //             this.alert = {
        //                 type: 'success',
        //                 message: 'Your password has been reset.',
        //             };
        //         },
        //         (response) => {
        //             // Set the alert
        //             this.alert = {
        //                 type: 'error',
        //                 message: 'Something went wrong, please try again.',
        //             };
        //         }
        //     );
    }


}
