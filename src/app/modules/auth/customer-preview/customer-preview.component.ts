import { Inject, ViewChild, ViewEncapsulation, HostListener, AfterViewInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { Subject } from 'rxjs';
import { NgZone } from '@angular/core';
import { ElementRef } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatOptionModule } from '@angular/material/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { CustomerOrderBookingComponent } from './customer-order-booking/customer-order-booking.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
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
import { AddcurrencyService } from 'app/modules/admin/example/addcurrency/addcurrency.service';




export interface Currency {
  countryId: number;
  countryName: string;
  countryCode: string;
  currencyName: string;
  buyRate: number;
  sellRate: number;
  // action: string;
}


interface Countries {
  country: string;
  countryName: string;
  countryCode: string;
  currencyName: string;
  buyRate: number;
  sellRate: number;
  tenantName: string;
  // action: string;
}

interface Exchange {
  value: string;
  viewValue: string;
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
    MatIconModule, NgbCarouselModule,
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
    MatTableModule, MatDialogModule, MatIconModule, CommonModule, GenericSearchFilterPipe, FormsModule, MatFormField, MatInputModule, MatSelectModule, MatButtonModule
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

  countries: Countries[] = [];
  countries1: Countries[] = [];
  countries2: Countries[] = [];

  country: any;
  selcountryCode: string = '';
  selcurrencyName: string = '';
  selcountryName: string = '';
  inputBuyRate: number = 0;
  inputSellRate: number = 0;


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

  getService() {
    this.currencyService.getData().subscribe((resp: any) => {
      if (resp) {
        this.currencies = resp;
        // Filter out India for the Exchange Rates table display
        this.displayedData = this.currencies.filter(c =>
          c.countryName && c.countryName.toLowerCase().trim() !== 'india' &&
          c.countryCode && c.countryCode.toLowerCase().trim() !== 'in'
        );
        // Use the same Countries API data for both Exchange Currency dropdowns (India remains here)
        this.countries = resp;

        // Set default value for "Currency I have" to India
        const india = this.countries.find(c =>
          (c.countryName && c.countryName.toLowerCase().trim() === 'india') ||
          (c.countryCode && c.countryCode.toLowerCase().trim() === 'in')
        );
        if (india) {
          this.selectedValue = india;
          if (this.orderForm) {
            this.orderForm.get('selectedValue').setValue(india);
          }
        }
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

  get filteredCountries() {
    return this.filteredData?.data || [];
  }


  dialogBoxSettings = {
    height: auto,
    width: '700px',
    margin: '0 auto',
    disableClose: true,
    hasBackdrop: true
  };


  openUpdateCurrencyDialog(countryId: string): void {
    // debugger
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
  // isMenuOpen: boolean;
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
  @ViewChild('ExchangeRatesSection') ExchangeRatesSection!: ElementRef;
  @ViewChild('ExchangeCurrencySection') ExchangeCurrencySection!: ElementRef;


  scrollToExchangeRates() {
    document.getElementById('exchange-rates')?.scrollIntoView({ behavior: 'smooth' });
  }


  scrollToExchangeCurrency() {
    document.getElementById('exchange-currency')?.scrollIntoView({ behavior: 'smooth' });
  }

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
  province: string = '';
  orderForm: FormGroup;
  name: string = '';
  selectedValue: any;
  selectedValue1: any;
  amount: string;
  phoneNumber: string = '';
  email: string = '';

  exchanges: Exchange[] = [
    { value: 'aud', viewValue: 'Australia' },
    { value: 'inr', viewValue: 'India' },
    { value: 'cad', viewValue: 'Canada' },
  ];

  getCurrencySymbol(countryCode: string): string {
    const symbolMap: { [key: string]: string } = {
      'us': '$', 'au': '$', 'ca': '$', 'nz': '$', 'sg': '$',
      'gb': '£',
      'eu': '€', 'at': '€', 'be': '€', 'cy': '€', 'ee': '€', 'fi': '€',
      'fr': '€', 'de': '€', 'gr': '€', 'ie': '€', 'it': '€', 'lv': '€',
      'lt': '€', 'lu': '€', 'mt': '€', 'nl': '€', 'pt': '€', 'sk': '€',
      'si': '€', 'es': '€',
      'jp': '¥', 'cn': '¥',
      'in': '₹',
      'ru': '₽',
      'kr': '₩',
      'ch': 'Fr',
      'se': 'kr', 'no': 'kr', 'dk': 'kr',
      'br': 'R$',
      'za': 'R',
      'th': '฿',
      'my': 'RM',
      'ph': '₱',
      'id': 'Rp',
      'vn': '₫',
      'ng': '₦',
      'tr': '₺',
    };
    return symbolMap[countryCode?.toLowerCase()] || '';
  }

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
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private currencyService: CurrencyService,
    private updatecurrencyService: UpdatecurrencyService,
    private snackBar: MatSnackBar,
    private dataService: DataService,
    private addcurrencyService: AddcurrencyService,
  ) {
    // Generate Mock Data
    const currencies_list: Currency[] = [];
    for (let i = 1; i <= 50; i++) {
      currencies_list.push({ countryId: i, countryName: `${i}`, countryCode: `${i}`, currencyName: `${i}`, buyRate: i, sellRate: i });
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

    this.orderForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      amount: ['', [Validators.required]],
      selectedValue: ['', Validators.required],
      selectedValue1: ['', Validators.required],
    });
  }

  isMenuOpen = false;


  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Change(event){
  //   debugger
  //     this.name = event.value.name
  //     this.email = event.value.email
  //     this.phoneNumber = event.value.phoneNumber
  //     this.amount = event.value.amount
  //     this.selectedValue = event.value.selectedValue
  //     this.selectedValue1 = event.value.selectedValue1
  //     this.countries = this.countries.filter(country => 
  //       country.countryName.toLowerCase() !== event.value.countryName.toLowerCase()
  //     );
  //     this.inputBuyRate = Number(event.value.buyRate)
  //     this.inputSellRate = Number(event.value.sellRate)
  //   }

  onlyNumbers(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  validatePhoneNumber() {
    const phoneControl = this.orderForm.get('phoneNumber');
    if (phoneControl?.value.length < 10) {
      phoneControl.setErrors({ minlength: true });
    }
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

  openLogin() {
    this.dialog.open(LoginComponent,
      {
        disableClose: true,
      })
  }

  openRegister() {
    this.dialog.open(RegisterComponent,
      {
        disableClose: true,
      })
  }

  getCurrencyCode(countryCode: string): string {
    const codeMap: { [key: string]: string } = {
      'us': 'USD', 'au': 'AUD', 'ca': 'CAD', 'nz': 'NZD', 'sg': 'SGD',
      'gb': 'GBP',
      'eu': 'EUR', 'at': 'EUR', 'be': 'EUR', 'cy': 'EUR', 'ee': 'EUR', 'fi': 'EUR',
      'fr': 'EUR', 'de': 'EUR', 'gr': 'EUR', 'ie': 'EUR', 'it': 'EUR', 'lv': 'EUR',
      'lt': 'EUR', 'lu': 'EUR', 'mt': 'EUR', 'nl': 'EUR', 'pt': 'EUR', 'sk': 'EUR',
      'si': 'EUR', 'es': 'EUR',
      'jp': 'JPY', 'cn': 'CNY',
      'in': 'INR',
      'ru': 'RUB',
      'kr': 'KRW',
      'ch': 'CHF',
      'se': 'SEK', 'no': 'NOK', 'dk': 'DKK',
      'br': 'BRL',
      'za': 'ZAR',
      'th': 'THB',
      'my': 'MYR',
      'ph': 'PHP',
      'id': 'IDR',
      'vn': 'VND',
      'ng': 'NGN',
      'tr': 'TRY',
      'qa': 'QAR',
      'sa': 'SAR',
      'ae': 'AED',
      'om': 'OMR',
      'kw': 'KWD',
      'bh': 'BHD',
      'hk': 'HKD',
    };
    return codeMap[countryCode?.toLowerCase()] || countryCode?.toUpperCase();
  }

  allowOnlyNumbers(event: any) {
    let input = event.target.value;
    // Allow numbers and one decimal point
    input = input.replace(/[^0-9.]/g, '');

    // Prevent multiple decimal points
    const parts = input.split('.');
    if (parts.length > 2) {
      input = parts[0] + '.' + parts.slice(1).join('');
    }

    event.target.value = input;
    this.orderForm.get('amount')?.setValue(input);
  }

  clearFields() {
    this.orderForm.reset();
    this.name = '';
    this.email = '';
    this.phoneNumber = '';
    this.amount = '';
    this.selectedValue = null;
    this.selectedValue1 = null;

    // Restore India as default for "Currency I have" if available
    const india = this.countries.find(c =>
      (c.countryName && c.countryName.toLowerCase().trim() === 'india') ||
      (c.countryCode && c.countryCode.toLowerCase().trim() === 'in')
    );
    if (india) {
      this.selectedValue = india;
      this.orderForm.get('selectedValue').setValue(india);
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) {
      return o1.countryCode === o2.countryCode || o1.countryName === o2.countryName;
    }
    return o1 === o2;
  }

  swapCurrencies(): void {
    const temp = this.selectedValue;
    this.selectedValue = this.selectedValue1;
    this.selectedValue1 = temp;

    // Also update the form values to keep them in sync
    this.orderForm.patchValue({
      selectedValue: this.selectedValue,
      selectedValue1: this.selectedValue1
    });
  }
}
