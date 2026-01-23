import { Component, OnInit } from '@angular/core';
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
import { FuseConfirmationService } from '@fuse/services/confirmation';


import { DataService } from '../../../../services/data.service';
import { auto } from '@popperjs/core';


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
  selector: 'app-currency',
  standalone: true,
  imports: [MatTableModule, MatDialogModule, MatIconModule, CommonModule, GenericSearchFilterPipe, FormsModule, MatFormField, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss'
})



export class CurrencyComponent implements OnInit {
  displayedColumns: string[] = ['countryName', 'buyRate', 'sellRate'];
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
    private dialog: MatDialog,
    private updatecurrencyService: UpdatecurrencyService,
    private snackBar: MatSnackBar,
    private dataService: DataService,
    private _fuseConfirmationService: FuseConfirmationService
  ) { }

  ngOnInit(): void {
    // debugger
    this.tenantId = sessionStorage.getItem('loggedInUserId') || ''; // Fetch tenantId from local storage
    if (this.tenantId) {
      this.getService();
    }

    this.dataService.dataUpdated$.subscribe((updated) => {
      if (updated) {
        this.getService();
      }
    });
  }



  getService() {
    this.currencyService.getData().subscribe((resp: any) => {
      if (resp) {
        this.currencies = resp;
        // Filter out India for the Agent Dashboard table display
        this.displayedData = this.currencies.filter(c =>
          c.countryName && c.countryName.toLowerCase().trim() !== 'india' &&
          c.countryCode && c.countryCode.toLowerCase().trim() !== 'in'
        );
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
}