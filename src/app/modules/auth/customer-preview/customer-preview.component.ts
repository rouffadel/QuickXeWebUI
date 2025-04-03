import {Inject, ViewChild, ViewEncapsulation,HostListener, AfterViewInit} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { Subject } from 'rxjs';
import { NgZone } from '@angular/core';
import {  ElementRef } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatOptionModule } from '@angular/material/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { CustomerOrderBookingComponent } from './customer-order-booking/customer-order-booking.component';
 import{NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
 import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 import { MatMenuModule } from '@angular/material/menu';
 import { MatDividerModule } from '@angular/material/divider';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component,OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CurrencyService } from 'app/modules/admin/example/currency/currency.service';
import { GenericSearchFilterPipe } from 'app/modules/admin/example/custom/generic-search-filter.pipe';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { countries } from 'app/mock-api/apps/contacts/data';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseConfirmationService } from '@fuse/services/confirmation';

import { auto } from '@popperjs/core';
import { UpdatecurrencyComponent } from 'app/modules/admin/example/updatecurrency/updatecurrency.component';
import { UpdatecurrencyService } from 'app/modules/admin/example/updatecurrency/updatecurrency.service';
import { DataService } from 'app/services/data.service';
// import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginator } from '@angular/material/paginator';
import { OwlOptions } from 'ngx-owl-carousel-o';




export interface Currency {
  countryId: number;
  countryName: string;
  countryCode: string;
  currencyName: string;
  buyRate: number;
  sellRate: number;
  // action: string;
}

@Component({
  selector: 'app-customer-preview',
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
    MatPaginator,
    MatTableModule,MatDialogModule,MatIconModule,CommonModule,GenericSearchFilterPipe,FormsModule,MatFormField,MatInputModule,MatSelectModule,MatButtonModule
  ],
  templateUrl: './customer-preview.component.html',
  styleUrl: './customer-preview.component.scss',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})



export class CustomerPreviewComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['countryName', 'buyRate', 'sellRate'];
  searchText: string = '';
  currentDate: Date = new Date();
  displayedData: Currency[] = [];
  filteredData = new MatTableDataSource<Currency>([]);

  tenantId: string = '';
  currencies = [];
  countryId: string;

  // p: number = 1;
  // size: number = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

    // carousel settings

    customOptions: OwlOptions = {
      loop: true,
      autoplay: true,
      center: true,
      dots: false,
      autoHeight: true,
      autoWidth: true,
      navText: ['<', '>'],
      responsive: {
          0: {
              items: 1,
          },
          400: {
              items: 2,
          },
          740: {
              items: 1,
          },
          940: {
              items: 3,
          },
      },
      nav: true,
  };

  getService(){
    this.currencyService.getData().subscribe((resp:any)=>{
      if(resp){
       this.currencies = resp; 
      this.displayedData = this.currencies;
      }
      this.updateFilteredData();
    });
  }


  applyFilter() {
    const searchTerm = this.searchText.trim().toLowerCase();
    this.filteredData.data = this.displayedData.filter(item =>
      item.countryName?.toLowerCase().includes(searchTerm) ||
      item.countryCode?.toLowerCase().includes(searchTerm) ||
      item.currencyName?.toLowerCase().includes(searchTerm) ||
      item.buyRate?.toString().includes(searchTerm) ||
      item.sellRate?.toString().includes(searchTerm)
    );
  }

  updateFilteredData() {
    this.filteredData.data = this.displayedData;
  }

      dialogBoxSettings = {
        height: auto,
        width: '700px',
        margin: '0 auto',
        disableClose: true,
        hasBackdrop: true
      };


  openUpdateCurrencyDialog(countryId: string): void {
    debugger
    this.updatecurrencyService.getCurrencyByCountryId(countryId).subscribe((resp: any) => {
      if (resp) {
        this.dialog.open(UpdatecurrencyComponent, {
          disableClose: true,
          data: resp, // Pass fetched currency data to dialog
        });
      }
    });
  }



  deleteCurrency(countryId: string): void {
  const confirmation = this._fuseConfirmationService.open({
    title: 'Delete Currency',
    message: 
        'Are you sure you want to delete this currency?',
    actions: {
        confirm: {
            label: 'Delete',
        },
        cancel: {
          show: true,
          label: 'Cancel',
      },
    },
});

// Subscribe to the confirmation dialog closed action
confirmation.afterClosed().subscribe((result) => {

    // If the confirm button pressed...

    if (result === 'confirmed') {
        // var CreatedBy = parseInt(localStorage.getItem("LoginId"))
        // var data = {
        //     ClientId: Id,
        //     UpdatedBy: parseInt(localStorage.getItem("LoginId"))
        // }

        // Delete the currency
     this.currencyService.deleteCurrencyByCountryId(countryId).subscribe(() => {
      console.log('Deleted Successfully.');
          // Show Snackbar Notification
          this.snackBar.open('Currency Deleted!', 'Close', {
          duration: 3000, // Time in milliseconds
          verticalPosition: 'top', // Position (top/bottom)
          horizontalPosition: 'right', // Position (start/center/end/right/left)
          panelClass: ['snackbar-success'] // Custom styling
          });
          this.getService();
    }, (error) => {
      console.log('Failed to delete');
    });
    }
});

  // deleteCurrency(countryId: string): void {
  //   this.currencyService.deleteCurrencyByCountryId(countryId).subscribe(() => {
  //     console.log('Deleted Successfully.');
  //         // Show Snackbar Notification
  //         this.snackBar.open('Currency Deleted!', 'Close', {
  //         duration: 3000, // Time in milliseconds
  //         verticalPosition: 'top', // Position (top/bottom)
  //         horizontalPosition: 'right', // Position (start/center/end/right/left)
  //         panelClass: ['snackbar-success'] // Custom styling
  //         });
  //         this.getService();
  //   }, (error) => {
  //     console.log('Failed to delete');
  //   });
  // }



  // updateCurrency(countryId: number): void {
  //   this.currencyService.getCurrencyByCountryId(this.countryId).subscribe((resp: any) => {
  //     if (resp) {
  //       const dialogRef = this.dialog.open(UpdatecurrencyComponent, {
  //         disableClose: true,
  //         data: resp, // Pass the fetched data to the dialog
  //       });
  //     }
  //   });
  // }
  



  // getCurrencyByCountryId(countryId: number) {
  //   this.http.get<Customer>(this.apiUrl+ "customers/" + customerId)
  //     .subscribe(res => {
  //       this.customer = res;
  //       this.isEdit = true;
  //     });
  // }

}
    isMenuOpen: boolean;
  //  windowWidth: number;
  
    windowWidth: number = window.innerWidth;
    resizeObserver!: ResizeObserver;


  //  Hover effect for menu items
      hoverStyle(event: any, isHover: boolean) {
        event.target.style.backgroundColor = isHover ? '#ffb300' : '';
      }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = window.innerWidth;
  }


  @ViewChild('contactUsSection') contactUsSection!: ElementRef;
  @ViewChild('aboutUsSection') aboutUsSection!: ElementRef;
  @ViewChild('Servicessection') Servicessection!: ElementRef;

  scrollToAboutUs() {
    document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToServices() {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToContactUs() {
    document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' });
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
        private _router: Router,
        private _dailog: MatDialog,
        private zone: NgZone,
        private _fuseConfirmationService: FuseConfirmationService,
        private dialog:MatDialog,
        private breakpointObserver: BreakpointObserver, 
    private currencyService: CurrencyService,
    private updatecurrencyService: UpdatecurrencyService,
    private snackBar: MatSnackBar,
    private dataService: DataService,
    ) {
           // Generate Mock Data
    const currencies_list: Currency[] = [];
    for (let i = 1; i <= 50; i++) {
      currencies_list.push({ countryId: i, countryName: `${i}`, countryCode: `${i}`, currencyName: `${i}`,buyRate: i,sellRate: i });
    }
    this.filteredData.data = currencies_list;
       
    }

    ngAfterViewInit() {
      this.filteredData.paginator = this.paginator;
    }

    currentYear: number;

    ngOnInit(): void {
        this.getService();

        
        this.currentYear = new Date().getFullYear();

        this.signInForm = this._formBuilder.group({
            email: ['',],
            password: ['',],
            rememberMe: ['']
        });
        this.isMenuOpen = false;
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
  

    //  addCurrency()
    //   {
    //     this.dialog.open(CustomerOrderBookingComponent,
    //     {
    //   disableClose: true,
    //     })
    //   }

      openLogin()
      {
        this.dialog.open(LoginComponent,
        {
      disableClose: true,
        })
      }

      openRegister()
      {
        this.dialog.open(RegisterComponent,
        {
      disableClose: true,
        })
      }
}
