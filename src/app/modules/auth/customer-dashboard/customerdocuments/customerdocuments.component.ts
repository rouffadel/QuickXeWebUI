import { Component, ElementRef, HostListener, Input, NgZone } from '@angular/core';

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
// import { FileManagerService } from 'app/modules/admin/apps/file-manager/file-manager.service';
// import {
//   Item,
//   Items,
// } from 'app/modules/admin/apps/file-manager/file-manager.types';
import { Subject, takeUntil } from 'rxjs';
import { FuseCardComponent } from '@fuse/components/card';
import { CommonModule, NgClass } from '@angular/common';
import { FormGroup, FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { FuseFullscreenComponent } from '@fuse/components/fullscreen';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateprofileComponent } from 'app/modules/admin/example/updateprofile/updateprofile.component';
import { BooleanInput } from '@angular/cdk/coercion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Food } from 'app/modules/admin/example/example.component';
import { UpdateprofileService } from 'app/modules/admin/example/updateprofile/updateprofile.service';

@Component({
  selector: 'app-customerdocuments',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  templateUrl: './customerdocuments.component.html',
  styleUrl: './customerdocuments.component.scss'
})



export class CustomerdocumentsComponent {

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
  fileName: string;
  
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
      documentsForm: UntypedFormGroup;
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

          this.documentsForm = this._formBuilder.group({
            passportFront: ['', Validators.required],
            passportBack: ['', Validators.required],
            validVisa: ['', Validators.required],
            airTicket: ['', Validators.required],
            aadharCard: ['', Validators.required],
            panCard: ['', Validators.required],
            ToS_PP: [false, Validators.requiredTrue]

          //   name: ['', [Validators.required]],
          //  // email: ['', Validators.required, Validators.email],
          //  email: ['', [Validators.required, Validators.email]],
          //   address: ['', Validators.required],
          //   phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]*$')]],
            // phoneNumber: ['', Validators.required]
            // otpType: ['SignUp', Validators.required]
    
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
  

    fileUrls: { [key: string]: string | null } = {};
isDragging: { [key: string]: boolean } = {};

onFileSelected(event: Event, field: string) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.handleFile(input.files[0], field);
  }
}

onDragOver(event: DragEvent, field: string) {
  event.preventDefault();
  this.isDragging[field] = true;
}

onDragLeave(event: DragEvent, field: string) {
  event.preventDefault();
  this.isDragging[field] = false;
}

onDrop(event: DragEvent, field: string) {
  event.preventDefault();
  this.isDragging[field] = false;

  if (event.dataTransfer?.files.length) {
    this.handleFile(event.dataTransfer.files[0], field);
  }
}

handleFile(file: File, field: string) {
  this.fileUrls[field] = URL.createObjectURL(file);
  console.log(`Selected file for ${field}:`, file);
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
        // debugger;
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
