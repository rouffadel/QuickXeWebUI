import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormGroup,
  FormsModule,
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
import { DataService } from '../../../../services/data.service';
import { NgxCountriesDropdownModule } from 'ngx-countries-dropdown';
import { FormControl} from "@angular/forms";
import { MatCardModule } from "@angular/material/card";




export interface Countries {
  country: string;
  countryName: string;
  countryCode: string;
  currencyName: string;
  buyRate: number;
  sellRate: number;
  tenantName: string;
  // action: string;
}

@Component({
  selector: 'app-customer-order-booking',
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
    MatCardModule,
    FormsModule
  ],
  templateUrl: './customer-order-booking.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './customer-order-booking.component.scss'
})


export class CustomerOrderBookingComponent implements OnInit {

    customerDetailsForm: FormGroup;
  

  countries: Countries[] = [];



  country: any;
  selcountryCode: string = '';
  selcurrencyName: string = '';
  selcountryName: string = '';
  inputBuyRate: number = 0;
  inputSellRate: number = 0;
  tenantId: string = '';

  file_store: FileList;
  file_list: Array<string> = [];
  display: FormControl = new FormControl("", Validators.required);


  handleFileInputChange(l: FileList): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.display.patchValue(`${f.name}${count}`);
    } else {
      this.display.patchValue("");
    }
  }

  handleSubmit(): void {
    var fd = new FormData();
    this.file_list = [];
    for (let i = 0; i < this.file_store.length; i++) {
      fd.append("files", this.file_store[i], this.file_store[i].name);
      this.file_list.push(this.file_store[i].name);
    }

    // do submit ajax
  }

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<CustomerOrderBookingComponent>,
        private _formBuilder: UntypedFormBuilder,
        private snackBar: MatSnackBar,
        private dataService: DataService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */

    ngOnInit() {
      this.getService();
      this.tenantId = sessionStorage.getItem('loggedInUserId') || ''; // Fetch tenantId from local storage
      
      this.customerDetailsForm = this._formBuilder.group({
        name: ['', [Validators.required]],
        email: ['', Validators.required],
        address: ['', Validators.required],
        phoneNumber: ['', Validators.required]
      });

    }


  Change(event){
    // debugger
      this.selcountryCode = event.value.countryCode.toLowerCase()
      this.selcurrencyName = event.value.currencyName
      this.selcountryName = event.value.countryName
      this.inputBuyRate = Number(event.value.buyRate)
      this.inputSellRate = Number(event.value.sellRate)
    }

    buyRate
    sellRate
    addCurrency() {
      // debugger
      const currencyData = {
        countryName: this.selcountryName,
        countryCode: this.selcountryCode.toUpperCase(),
        currencyName: this.selcurrencyName,
        buyRate: this.buyRate,
        sellRate: this.sellRate,
        tenantId: this.tenantId, // Include tenantId
      };

      // this.addcurrencyService.createCurrency(currencyData).subscribe(
      //   (response) => {
      //     console.log('Currency added:', response);

      //     // Show Snackbar Notification
      //     this.snackBar.open('Currency Added!', 'Close', {
      //     duration: 3000, // Time in milliseconds
      //     verticalPosition: 'top', // Position (top/bottom)
      //     horizontalPosition: 'right', // Position (start/center/end/right/left)
      //     panelClass: ['snackbar-success'] // Custom styling
      //     });
      //     this.dataService.notifyDataChange();

      //     this.Close();

      //   },
      //   (error) => {
      //     console.error('Error:', error);
      //   }
      // );
    }


      getService() {
        // this.addcurrencyService.getData().subscribe((resp: Countries[]) => {
        //   if (resp) {
        //     this.countries = resp;
        //   }
        // });
      }
  
    Close(): void {
        this.matDialogRef.close();
    }
}
