import { Inject, ViewChild, HostListener, NgZone, ElementRef } from '@angular/core';
declare var google: any;
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
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
import { CurrencyService } from 'app/modules/admin/example/currency/currency.service';



interface Exchange {
  value: string;
  viewValue: string;
  code: string;
  symbol: string;
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
isCustomer: boolean;
  name: string = '';
  selectedValue: any;
  selectedValue1: any;
  amount: string;

  orderForm: FormGroup;
  

  exchanges: Exchange[] = [
    {value: 'aud', viewValue: 'Australia', code: 'AU', symbol: '$'},
    {value: 'inr', viewValue: 'India', code: 'IN', symbol: '₹'},
    {value: 'cad', viewValue: 'Canada', code: 'CA', symbol: '$'},
    {value: 'usd', viewValue: 'USA', code: 'US', symbol: '$'},
  ];
  
    isMenuOpen: boolean;
  
    windowWidth: number = window.innerWidth;
    resizeObserver!: ResizeObserver;
  userName: string;

      // Hover effect for menu items
      hoverStyle(event: any, isHover: boolean) {
        event.target.style.backgroundColor = isHover ? '#ffb300' : '';
      }

      // Live Location Properties
      isBooking: boolean = false;
      liveCity: string = '';
      livePincode: string = '';
      liveLatitude: number | null = null;
      liveLongitude: number | null = null;
      liveAddress: string = '';

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
        private snackBar: MatSnackBar,
        private currencyService: CurrencyService
        
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
      // debugger
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



//     signOut(): void {
//       // debugger;
//       const confirmation = this._fuseConfirmationService.open({
//         title: 'Confirm Sign Out',
//         message: 
//             'Are you sure you want to Sign Out',
//         actions: {
//           confirm: {
//             label: 'Confirm',
//         },
//         cancel: {
//           show: true,
//           label: 'Cancel',
//       },
//             // confirm: { label: 'Yes' }
//         },
//     });

//     confirmation.afterClosed().subscribe((result) => {
    
//       // If the confirm button pressed...
  
//       if (result === 'confirmed') {
  
//             // Sign Out
//             localStorage.clear();
//             sessionStorage.clear();
//             this._router.navigate(['/index'], { replaceUrl: true });
            
//             // Show Snackbar Notification
//             this.snackBar.open('You have been Sign Out Successfully!', 'Close', {
//             duration: 3000, // Time in milliseconds
//             verticalPosition: 'top', // Position (top/bottom)
//             horizontalPosition: 'right', // Position (start/center/end/right/left)
//             panelClass: ['snackbar-success'] // Custom styling
//             });
            
        
//       }
//   });
// }


  signOut(): void {
    const confirmation = this._fuseConfirmationService.open({
      title: 'Confirm Sign Out',
      message: 'Are you sure you want to Sign Out?',
      actions: {
        confirm: {
          label: 'Confirm',
          color: 'primary',
        },
        cancel: {
          show: true,
          label: 'Cancel',
        },
      },
    });

    confirmation.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        const redirectUrl = this.isCustomer ? '/index' : '/sign-out';
        localStorage.clear();
        sessionStorage.clear();
        this._router.navigate([redirectUrl], { replaceUrl: true });
      }
    });
  }

  async bookExchange(): Promise<void> {
    if (!this.amount || !this.selectedValue || !this.selectedValue1 || this.isBooking) {
        this.snackBar.open('Please fill all fields', 'Close', { duration: 3000, panelClass: ['snackbar-error'] });
        return;
    }

    const customerId = sessionStorage.getItem('loggedInUserId');
    if (!customerId) {
         this.snackBar.open('User details missing. Please login again.', 'Close', { duration: 3000, panelClass: ['snackbar-error'] });
         return;
    }

    this.isBooking = true;

    try {
        // 1. Try to get Live Location
        await this.captureLiveLocation();

        const data = {
            CustomerId: customerId,
            Amount: parseFloat(this.amount),
            FromCurrency: this.selectedValue.code,
            ToCurrency: this.selectedValue1.code,
            Location: this.liveAddress || 'Customer Dashboard',
            City: this.liveCity,
            Pincode: this.livePincode,
            Latitude: this.liveLatitude,
            Longitude: this.liveLongitude
        };
        
        this.currencyService.bookExchange(data).subscribe({
            next: (res) => {
                this.snackBar.open('Exchange Booking Successful! Location Captured.', 'Close', { 
                    duration: 5000, 
                    panelClass: ['snackbar-success'], 
                    verticalPosition: 'top', 
                    horizontalPosition: 'right' 
                });
                this.amount = '';
                this.selectedValue = null;
                this.selectedValue1 = null;
                this.isBooking = false;
            },
            error: (err) => {
                console.error(err);
                this.snackBar.open('Booking Failed. Please try again.', 'Close', { 
                    duration: 3000, 
                    panelClass: ['snackbar-error'], 
                    verticalPosition: 'top', 
                    horizontalPosition: 'right' 
                });
                this.isBooking = false;
            }
        });
    } catch (error) {
        console.error('Location capture failed:', error);
        this.isBooking = false;
        // Proceed with a simple booking fallback if needed
        this.bookExchangeWithDefault(customerId);
    }
  }

  private captureLiveLocation(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return resolve();
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          if (typeof google !== 'undefined' && google.maps) {
            const geocoder = new google.maps.Geocoder();
            const latlng = { lat, lng };

            geocoder.geocode({ location: latlng }, (results: any, status: any) => {
              // Ensure UI updates run inside Angular zone
              this.zone.run(() => {
                this.liveLatitude = lat;
                this.liveLongitude = lng;

                if (status === 'OK' && results && results.length) {
                  this.liveAddress = results[0].formatted_address || '';

                  const cityCandidates: string[] = [];
                  let pincodeCandidate: string | null = null;

                  for (const res of results) {
                    for (const component of res.address_components || []) {
                      const types = component.types || [];
                      if (types.includes('locality') || types.includes('postal_town') || types.includes('sublocality') || types.includes('neighborhood') || types.includes('administrative_area_level_2')) {
                        cityCandidates.push(component.long_name);
                      }
                      if (!pincodeCandidate && types.includes('postal_code')) {
                        pincodeCandidate = component.long_name;
                      }
                    }
                  }

                  this.liveCity = cityCandidates.find(c => !!c) || this.liveCity || '';
                  this.livePincode = pincodeCandidate || this.livePincode || '';
                  console.log('Geocoder results:', { resultsCount: results.length, cityCandidates, pincodeCandidate });
                }
                resolve();
              });
            });
          } else {
            this.zone.run(() => {
              this.liveLatitude = lat;
              this.liveLongitude = lng;
            });
            resolve();
          }
        },
        (error) => {
          this.zone.run(() => console.warn('Geolocation error:', error));
          resolve();
        },
        { timeout: 5000 }
      );
    });
  }

  // Public helper to trigger location capture with user feedback
  public async takeCurrentLocation(): Promise<void> {
    this.snackBar.open('Capturing current location...', 'Close', { duration: 2000 });
    try {
      await this.captureLiveLocation();
      if (this.liveLatitude && this.liveLongitude) {
        this.snackBar.open('✅ Current location captured', 'Close', { duration: 3000, panelClass: ['snackbar-success'] });
      } else {
        this.snackBar.open('❌ Unable to capture location', 'Close', { duration: 3000, panelClass: ['snackbar-error'] });
      }
    } catch (err) {
      console.error('takeCurrentLocation error:', err);
      this.snackBar.open('❌ Error capturing location', 'Close', { duration: 3000, panelClass: ['snackbar-error'] });
    }
  }

  private bookExchangeWithDefault(customerId: string) {
    const data = {
        CustomerId: customerId,
        Amount: parseFloat(this.amount),
        FromCurrency: this.selectedValue.code,
        ToCurrency: this.selectedValue1.code,
        Location: 'Dashboard (Location Failed)'
    };
    this.currencyService.bookExchange(data).subscribe({
        next: () => {
            this.snackBar.open('Booking Successful (No Location).', 'Close', { duration: 3000 });
            this.amount = '';
        },
        error: () => this.snackBar.open('Booking Failed.', 'Close', { duration: 3000 })
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
