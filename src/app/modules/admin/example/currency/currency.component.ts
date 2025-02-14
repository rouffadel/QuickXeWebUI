import { Component,OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CurrencyService } from './currency.service';
import { GenericSearchFilterPipe } from '../custom/generic-search-filter.pipe';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { countries } from 'app/mock-api/apps/contacts/data';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddcurrencyComponent } from '../addcurrency/addcurrency.component';
import { UpdatecurrencyComponent } from '../updatecurrency/updatecurrency.component';
import { UpdatecurrencyService } from '../updatecurrency/updatecurrency.service';
import { MatSnackBar } from '@angular/material/snack-bar';


import { DataService } from '../../../../services/data.service';


export interface Currency {
  countryId: number;
  countryName: string;
  countryCode: string;
  currencyName: string;
  buyRate: number;
  sellRate: number;
  action: string;
}

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [MatTableModule,MatDialogModule,MatIconModule,CommonModule,GenericSearchFilterPipe,FormsModule,MatFormField,MatInputModule,MatSelectModule,MatButtonModule],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss'
})



export class CurrencyComponent implements OnInit {
  displayedColumns: string[] = ['countryName', 'buyRate', 'sellRate', 'action'];
  searchText: string = '';
  currentDate: Date = new Date();
  displayedData: Currency[] = [];
  filteredData = new MatTableDataSource<Currency>([]);

  tenantId: string = '';
  currencies = [];
  countryId: string;


  constructor(
    private breakpointObserver: BreakpointObserver, 
    private currencyService: CurrencyService,
    private dialog:MatDialog,
    private updatecurrencyService: UpdatecurrencyService,
    private snackBar: MatSnackBar,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    debugger
    this.tenantId = sessionStorage.getItem('loggedInUserId') || ''; // Fetch tenantId from local storage
    if (this.tenantId) {
      this.getService();
    }

    this.dataService.dataUpdated$.subscribe((updated) =>{
      if(updated){
        this.getService();
      }
    });
  }



  getService(){
    this.currencyService.getCurrenciesByTenant(this.tenantId).subscribe((resp:any)=>{
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


  addCurrency()
  {
    this.dialog.open(AddcurrencyComponent,
    {
  disableClose: true,
    })
  }


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


// let createOrEditSiteUserDialog;
//         if (id === undefined || id <= 0) {
//             createOrEditSiteUserDialog = this._dialog.open(CreateSiteuserComponent);
//         } else {
//             createOrEditSiteUserDialog = this._dialog.open(EditSiteuserComponent, {
//                 data: id
//             });
//         }

//         createOrEditSiteUserDialog.afterClosed().subscribe(result => {
//             if (result) {
//                // this.refresh();
//                this.getgridFilter1()
//             }
//         });


// const ELEMENT_DATA: Exchange[] = [
//   { country: 'USD', code: 'US', currency_name: 'United States Dollar', buyRate: 58.3500, sellRate: 58.3500 },
//   { country: 'GBP', code: 'GB', currency_name: 'British Pound Sterling', buyRate: 64.1400, sellRate: 66.0600 },
//   { country: 'EUR', code: 'EU', currency_name: 'Euro', buyRate: 56.7400, sellRate: 58.1600 },
//   { country: 'KSA', code: 'SA', currency_name: 'Saudi Riyal', buyRate: 23.3113, sellRate: 22.9301 },
//   { country: 'UAE', code: 'AE', currency_name: 'United Arab Emirates Dirham', buyRate: 23.7988, sellRate: 23.4146 },
//   { country: 'OM', code: 'OM', currency_name: 'Omani Rial', buyRate: 225.463, sellRate: 223.93500 },
//   { country: 'AUD', code: 'AU', currency_name: 'Australian Dollar', buyRate: 37.1800, sellRate: 38.5100 },
//   { country: 'BHD', code: 'BH', currency_name: 'Bahraini Dinar', buyRate: 130.8500, sellRate: 157.3400 },
//   { country: 'CNY', code: 'CN', currency_name: 'Chinese Yuan', buyRate: 7.5926, sellRate: 8.3010 },
//   { country: 'AED', code: 'AE', currency_name: 'United Arab Emirates Dirham', buyRate: 13.5000, sellRate: 16.0400 },
//   { country: 'BND', code: 'BN', currency_name: 'Brunei Dollar', buyRate: 35.1700, sellRate: 41.1300 },
//   { country: 'CHF', code: 'CH', currency_name: 'Swiss Franc', buyRate: 58.5400, sellRate: 60.6100 },
//   { country: 'CAD', code: 'CA', currency_name: 'Canadian Dollar', buyRate: 41.7500, sellRate: 43.2100 },
//   { country: 'HKD', code: 'HK', currency_name: 'Hong Kong Dollar', buyRate: 7.3570, sellRate: 7.5344 },
//   { country: 'IDR', code: 'ID', currency_name: 'Indonesian Rupiah', buyRate: 0.0032, sellRate: 0.0039 },
// ];