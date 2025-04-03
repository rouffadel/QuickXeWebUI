import { Inject, ViewChild,HostListener} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { NgZone } from '@angular/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import {  ElementRef } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
 import{NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
 import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FuseFullscreenComponent } from '@fuse/components/fullscreen';

import { BooleanInput } from '@angular/cdk/coercion';
import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UpdateprofileComponent } from 'app/modules/admin/example/updateprofile/updateprofile.component';
import { UpdateprofileService } from 'app/modules/admin/example/updateprofile/updateprofile.service';
import { MatSnackBar } from '@angular/material/snack-bar';



interface Food {
  value: string;
  viewValue: string;
}




@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    FuseAlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FuseFullscreenComponent,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatIconModule,NgbCarouselModule,
    CommonModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggle,
    MatDialogModule,
    NgbModule, 
    NgbCarouselModule,
    CommonModule,
    MatMenuModule,
    MatDividerModule,
      MatButtonModule,
      MatMenuModule,
      MatIconModule,
      NgClass,
      MatDividerModule,
      UpdateprofileComponent,
  ], 
  templateUrl: './customer-dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  styleUrl: './customer-dashboard.component.scss'
})




export class CustomerDashboardComponent implements OnInit {
  
          /* eslint-disable @typescript-eslint/naming-convention */
          static ngAcceptInputType_showAvatar: BooleanInput;
          /* eslint-enable @typescript-eslint/naming-convention */
      
          @Input() showAvatar: boolean = true;
          user: User;
      
          private _unsubscribeAll: Subject<any> = new Subject<any>();
          Id: string;

  name: string = '';
  selectedValue: string;
  selectedValue1: string;
  amount: string;

  orderForm: FormGroup;
  

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Australia'},
    {value: 'pizza-1', viewValue: 'India'},
    {value: 'tacos-2', viewValue: 'Canada'},
  ];
  
    isMenuOpen: boolean;
  
    windowWidth: number = window.innerWidth;
    resizeObserver!: ResizeObserver;
  userName: string;

      // Hover effect for menu items
      hoverStyle(event: any, isHover: boolean) {
        event.target.style.backgroundColor = isHover ? '#ffb300' : '';
      }

      @HostListener('window:resize', ['$event'])
      onResize(event: any) {
        this.windowWidth = event.target.innerWidth;
      }
    @ViewChild('contactUsSection') contactUsSection!: ElementRef;
    @ViewChild('aboutUsSection') aboutUsSection!: ElementRef;
    @ViewChild('Servicessection') Servicessection!: ElementRef;

    scrollToContactUs() {
      this.contactUsSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    scrollToAboutUs() {
      this.aboutUsSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    scrollToServices() {
      this.Servicessection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    goToSignIn(): void {
      this._router.navigate(['/sign-in']);
  }
  
    allsetting: any;
    jobTitle: any;
    LinkValidity: any;
    availability: any;
    numberremainder: any;
    remaiderinterval: any;
    reapply: any;
    applyjd: any;
    candidate: any;
    builtin: any;
    self: any;
    interview: any;
    inerviewradio: any;
    remainderradio: any;
    candidateradio: any;
    orgid: string;
    id: any;
    getorg: any;
    organizationId: any
    update: boolean = false;
    save: boolean = true;
    accountId = "";
    username = "";
    public lat;
    public lng;
    ipaddress: string = '';
    latitude: string = '';
    longitude: string = '';
    currency: string = '';
    currencysymbol: string = '';
    isp: string = '';
    city: string = '';
    country: string = '';
    province: string = '';
    @ViewChild('signInNgForm') signInNgForm: NgForm;
    loginDisplay = false;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;
    showbtn: boolean = true;
    private readonly _destroying$ = new Subject<void>();
    dataSource: { id: number; claim: string; value: any; }[];

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _dailog: MatDialog,
        private zone: NgZone,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _userService: UserService,
        private dialog: MatDialog,
        private updateprofileService: UpdateprofileService,
        private snackBar: MatSnackBar
        
    ) {
        
       
    }
    currentYear: number;

    ngOnInit(): void {
      
      this.name = sessionStorage.getItem('Name')
        
        this.currentYear = new Date().getFullYear();

        this.signInForm = this._formBuilder.group({
            email: ['',],
            password: ['',],
            rememberMe: ['']
        });
        this.isMenuOpen = false;

        this.orderForm = this._formBuilder.group({
          amount: ['', [Validators.required]],
          selectedValue: ['', Validators.required],
          selectedValue1: ['', Validators.required],
        });

        // Subscribe to the user service
                this._userService.user$
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((user: User) => {
                        this.user = user;
                    });

                    // Subscribe to user changes
        this.userName=sessionStorage.getItem('userName')
        this.Id = sessionStorage.getItem('loggedInUserId')
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
                    
    }


    ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  }


 


    signIn(): void {
        if (this.signInForm.invalid) {
            return;
        }
        this.signInForm.disable();
        this.showAlert = false;
        this._authService.signIn(this.signInForm.value)
            .subscribe(
                () => {
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
                    this._router.navigateByUrl(redirectURL);
                },
                (response) => {
                    this.signInForm.enable();
                    this.signInNgForm.resetForm();
                    this.alert = {
                        type: 'error',
                        message: 'Wrong email or password'
                    };
                    this.showAlert = true;
                }
            );
    }

    openMyDocuments(): void {
      debugger
      this._router.navigate(['/mydocuments']);
    }
  
    updateUserStatus(status: string): void {
        // Return if user is not available
        if (!this.user) {
            return;
        }

        // Update the user
        this._userService
            .update({
                ...this.user,
                status,
            })
            .subscribe();
    }



      changePassword() {
        this._router.navigate(['changepassword'])
        }      


openUpdateProfileForm(): void {
    if (!this.Id) {
      console.error("User ID not found in sessionStorage.");
      return;
    }
  
    this.updateprofileService.getUserById(this.Id).subscribe(
      (resp: any) => {
        if (resp) {
          this._router.navigate(['updateprofile'], {
            state: { userData: resp } // Passing data to the next component
          });
        }
      },
      (error) => {
        console.error("Error fetching user data:", error);
      }
    );
  }



    signOut(): void {
      debugger;
      const confirmation = this._fuseConfirmationService.open({
        title: 'Confirm Sign Out',
        message: 
            'Are you sure you want to Sign Out',
        actions: {
          confirm: {
            label: 'Confirm',
        },
        cancel: {
          show: true,
          label: 'Cancel',
      },
            // confirm: { label: 'Yes' }
        },
    });

    confirmation.afterClosed().subscribe((result) => {
    
      // If the confirm button pressed...
  
      if (result === 'confirmed') {
  
            // Sign Out
            localStorage.clear();
            sessionStorage.clear();
            this._router.navigate(['/index']);
            
            // Show Snackbar Notification
            this.snackBar.open('You have been Sign Out Successfully!', 'Close', {
            duration: 3000, // Time in milliseconds
            verticalPosition: 'top', // Position (top/bottom)
            horizontalPosition: 'right', // Position (start/center/end/right/left)
            panelClass: ['snackbar-success'] // Custom styling
            });
            
        
      }
  });
}

}


























// @Component({
//     selector: 'user',
//     templateUrl: './user.component.html',
//     encapsulation: ViewEncapsulation.None,
//     changeDetection: ChangeDetectionStrategy.OnPush,
//     exportAs: 'user',
//     standalone: true,
//     imports: [
//         MatButtonModule,
//         MatMenuModule,
//         MatIconModule,
//         NgClass,
//         MatDividerModule,
//         UpdateprofileComponent,
//     ],
// })
// export class UserComponent implements OnInit, OnDestroy {
//     /* eslint-disable @typescript-eslint/naming-convention */
//     static ngAcceptInputType_showAvatar: BooleanInput;
//     /* eslint-enable @typescript-eslint/naming-convention */

//     @Input() showAvatar: boolean = true;
//     user: User;

//     private _unsubscribeAll: Subject<any> = new Subject<any>();
//     Id: string;

//     /**
//      * Constructor
//      */
//     constructor(
//         private _changeDetectorRef: ChangeDetectorRef,
//         private _router: Router,
//         private _userService: UserService,
//         private dialog: MatDialog,
//         private updateprofileService: UpdateprofileService,
//     ) {}

//     // -----------------------------------------------------------------------------------------------------
//     // @ Lifecycle hooks
//     // -----------------------------------------------------------------------------------------------------

//     /**
//      * On init
//      */
//     userName
//     ngOnInit(): void {
//         // Subscribe to user changes
//         this.userName=sessionStorage.getItem('userName')
//         this.Id = sessionStorage.getItem('loggedInUserId')
//         this._userService.user$
//             .pipe(takeUntil(this._unsubscribeAll))
//             .subscribe((user: User) => {
//                 this.user = user;

//                 // Mark for check
//                 this._changeDetectorRef.markForCheck();
//             });
//     }

//     /**
//      * On destroy
//      */
//     ngOnDestroy(): void {
//         // Unsubscribe from all subscriptions
//         this._unsubscribeAll.next(null);
//         this._unsubscribeAll.complete();
//     }

//     // -----------------------------------------------------------------------------------------------------
//     // @ Public methods
//     // -----------------------------------------------------------------------------------------------------

//     /**
//      * Update the user status
//      *
//      * @param status
//      */
//     updateUserStatus(status: string): void {
//         // Return if user is not available
//         if (!this.user) {
//             return;
//         }

//         // Update the user
//         this._userService
//             .update({
//                 ...this.user,
//                 status,
//             })
//             .subscribe();
//     }

// //     updateProfileDetails() {
// // this._router.navigate(['updateprofile'])
// //       }

//       changePassword() {
//         this._router.navigate(['changepassword'])
//         }

// //   openUpdateProfileForm(Id: string): void {
// //     debugger
// //     this.updateprofileService.getUserById(Id).subscribe((resp: any) => {
// //       if (resp) {
// //         this._router.navigate(['updateprofile'], {
// //             state: { userData: resp } // Passing data to the next component
// //           });
// //         }
// //     });
// //   }        


// openUpdateProfileForm(): void {
//     if (!this.Id) {
//       console.error("User ID not found in sessionStorage.");
//       return;
//     }
  
//     this.updateprofileService.getUserById(this.Id).subscribe(
//       (resp: any) => {
//         if (resp) {
//           this._router.navigate(['updateprofile'], {
//             state: { userData: resp } // Passing data to the next component
//           });
//         }
//       },
//       (error) => {
//         console.error("Error fetching user data:", error);
//       }
//     );
//   }

//     /**
//      * Sign out
//      */
//     signOut(): void {
//         this._router.navigate(['/sign-out']);
//         localStorage.clear();
//         sessionStorage.clear();
//     }
// }
