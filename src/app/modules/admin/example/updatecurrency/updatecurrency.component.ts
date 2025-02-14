import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { QuillEditorComponent } from 'ngx-quill';
import { MatSelectModule } from '@angular/material/select';
import { UpdatecurrencyService } from './updatecurrency.service';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../../services/data.service';



@Component({
  selector: 'app-updatecurrency',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    QuillEditorComponent,
    MatSelectModule,
  ],
  templateUrl: './updatecurrency.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './updatecurrency.component.css'
})


export class UpdatecurrencyComponent implements OnInit {

  country: any;
  selcountryCode: string = '';
  selcurrencyName: string = '';
  selcountryName: string = '';
  inputBuyRate: number = 0;
  inputSellRate: number = 0;


  currency = [
    { countryName: 'Canada', countryCode: 'CA', currencyName: 'Canadian Dollar' },
    { countryName: 'HKD', countryCode: 'HK', currencyName: 'Hong Kong Dollar' },
    { countryName: 'IDR', countryCode: 'ID', currencyName: 'Indonesian Dollar' },
  ];
  countryId: number;
  tenantId: string = '';

  constructor(
    public matDialogRef: MatDialogRef<UpdatecurrencyComponent>,
    private updatecurrencyService: UpdatecurrencyService, 
    @Inject(MAT_DIALOG_DATA) public data: any, // Inject received data
    private snackBar: MatSnackBar,
    private dataService: DataService
  ) {}

  ngOnInit() {
    debugger
    // Fetch tenantId from session storage
    this.tenantId = sessionStorage.getItem('loggedInUserId') || '';

    // Pre-fill fields if data exists
    if (this.data) {
      // Set selected country if data is passed
      
    //  this.country = this.currency.find(item => item.countryCode === this.data.countryCode) || null;
      this.countryId = Number(this.data.countryId) || 0;
      this.selcountryCode = this.data.countryCode?.toLowerCase() || '';
      this.selcurrencyName = this.data.currencyName || '';
      this.selcountryName = this.data.countryName || '';
      this.inputBuyRate = Number(this.data.buyRate) || 0;
      this.inputSellRate = Number(this.data.sellRate) || 0;
    }
  }

    Change(event){
    debugger
      this.country = event.value;
      this.selcountryCode = event.value.countryCode.toLowerCase()
      this.selcurrencyName = event.value.currencyName
      this.selcountryName = event.value.countryName
      this.inputBuyRate = Number(event.value.buyRate)
      this.inputSellRate = Number(event.value.sellRate)
    }

  updateCurrency() {
    debugger;
    const countryId = this.countryId.toString()
    const currencyData = {
      countryId : this.countryId.toString(),
      countryName: this.selcountryName,
      countryCode: this.selcountryCode.toUpperCase(),
      currencyName: this.selcurrencyName,
      buyRate: this.inputBuyRate,
      sellRate: this.inputSellRate,
      tenantId: this.tenantId, // Include tenantId
    };

    // Call update service
    this.updatecurrencyService.updateCurrency(countryId, currencyData).subscribe((response) => {
      debugger
      console.log('Currency updated:', response);
      // Show Snackbar Notification
      this.snackBar.open('Currency Updated!', 'Close', {
      duration: 3000, // Time in milliseconds
      verticalPosition: 'top', // Position (top/bottom)
      horizontalPosition: 'right', // Position (start/center/end/right/left)
      panelClass: ['snackbar-success'] // Custom styling
    });
    this.dataService.notifyDataChange();

      this.matDialogRef.close(true); // Close dialog after update
    });
  }

  Close(): void {
    this.matDialogRef.close();
  }
}


