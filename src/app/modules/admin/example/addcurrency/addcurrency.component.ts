import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
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
import { AddcurrencyService } from './addcurrency.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


import { DataService } from '../../../../services/data.service';



@Component({
  selector: 'app-addcurrency',
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
  ],
  templateUrl: './addcurrency.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './addcurrency.component.scss'
})

export class AddcurrencyComponent implements OnInit {

      currency = [
        { countryName: 'Canada', countryCode: 'CA', currencyName: 'Canadian Dollar' },
        { countryName: 'HKD', countryCode: 'HK', currencyName: 'Hong Kong Dollar' },
        { countryName: 'IDR', countryCode: 'ID', currencyName: 'Indonesian Dollar' },
      ];


  country: any;
  selcountryCode: string = '';
  selcurrencyName: string = '';
  selcountryName: string = '';
  inputBuyRate: number = 0;
  inputSellRate: number = 0;
  tenantId: string = '';

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<AddcurrencyComponent>,
        private _formBuilder: UntypedFormBuilder,
        private addcurrencyService: AddcurrencyService,
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
      this.tenantId = sessionStorage.getItem('loggedInUserId') || ''; // Fetch tenantId from local storage

    }


  Change(event){
    debugger
      this.selcountryCode = event.value.countryCode.toLowerCase()
      this.selcurrencyName = event.value.currencyName
      this.selcountryName = event.value.countryName
      this.inputBuyRate = Number(event.value.buyRate)
      this.inputSellRate = Number(event.value.sellRate)
    }

    buyRate
    sellRate
    addCurrency() {
      debugger
      const currencyData = {
        countryName: this.selcountryName,
        countryCode: this.selcountryCode.toUpperCase(),
        currencyName: this.selcurrencyName,
        buyRate: this.buyRate,
        sellRate: this.sellRate,
        tenantId: this.tenantId, // Include tenantId
      };

      this.addcurrencyService.createCurrency(currencyData).subscribe(
        (response) => {
          console.log('Currency added:', response);

          // Show Snackbar Notification
          this.snackBar.open('Currency Added!', 'Close', {
          duration: 3000, // Time in milliseconds
          verticalPosition: 'top', // Position (top/bottom)
          horizontalPosition: 'right', // Position (start/center/end/right/left)
          panelClass: ['snackbar-success'] // Custom styling
          });
          this.dataService.notifyDataChange();

          this.Close();

        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }

  
    Close(): void {
        this.matDialogRef.close();
    }
}
