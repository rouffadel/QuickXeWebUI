import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { BreakpointObserver } from '@angular/cdk/layout';
import { GenericSearchFilterPipe } from '../custom/generic-search-filter.pipe';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyService } from '../currency/currency.service';
import { Observable, map, startWith } from 'rxjs';

export interface Order {
  orderId: number;
  country: string;
  countryName: string;
  countryCode: string;
  currencyName: string;
  amount: number;
}

@Component({
  selector: 'app-assignorders',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatAutocompleteModule,
    GenericSearchFilterPipe,
    MatSelectModule,

  ],
  templateUrl: './assignorders.component.html',
  styleUrl: './assignorders.component.scss'
})
export class AssignordersComponent implements OnInit {

  currencies: any[] = [];

  // 🔹 FORM CONTROLS for Autocomplete
  currencyHaveControl = new FormControl('');
  currencyWantControl = new FormControl('');

  filteredCurrenciesHave!: Observable<any[]>;
  filteredCurrenciesWant!: Observable<any[]>;

  // 🔹 TABLE
  displayedColumns: string[] = ['orderId', 'country', 'amount'];
  displayedData: Order[] = [];
  filteredData = new MatTableDataSource<Order>([]);

  // 🔹 SEARCH
  searchText: string = '';

  // 🔹 MODAL
  @ViewChild('addModal') addModal!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  // 🔹 FORM FIELD
  amount: number | null = null;
  currentDate: Date = new Date();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.getCurrencies();
    this.updateFilteredData();
  }

  getCurrencies(): void {
    this.currencyService.getData().subscribe((resp: any) => {
      if (resp) {
        this.currencies = resp;
        this.setupFiltering();
      }
    });
  }

  private setupFiltering(): void {
    this.filteredCurrenciesHave = this.currencyHaveControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    this.filteredCurrenciesWant = this.currencyWantControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: any): any[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value?.countryName?.toLowerCase() || '';
    return this.currencies.filter(option =>
      option.countryName.toLowerCase().includes(filterValue) ||
      option.countryCode.toLowerCase().includes(filterValue) ||
      (option.currencyCode && option.currencyCode.toLowerCase().includes(filterValue))
    );
  }

  displayFn(currency: any): string {
    return currency && currency.countryName ? currency.countryName : '';
  }

  // 🔹 FILTER
  applyFilter(): void {
    const searchTerm = this.searchText?.trim().toLowerCase() || '';
    this.filteredData.data = this.displayedData.filter(item =>
      Object.values(item).some(value =>
        value?.toString().toLowerCase().includes(searchTerm)
      )
    );
  }

  updateFilteredData(): void {
    // Create a new array reference to ensure MatTableDataSource detects the change
    this.filteredData.data = [...this.displayedData];
  }

  // 🔹 OPEN MODAL
  openAddModal(): void {
    this.dialogRef = this.dialog.open(this.addModal, {
      maxHeight: '100vh',
      panelClass: 'right-side-dialog',
      disableClose: true
    });
  }

  // 🔹 SAVE FROM MODAL
  saveOrder(): void {
    const wantValue = this.currencyWantControl.value as any;

    const newOrder: Order = {
      orderId: this.displayedData.length + 1,
      country: wantValue?.countryName || 'NA',
      countryName: wantValue?.countryName || 'NA',
      countryCode: wantValue?.countryCode || 'NA',
      currencyName: wantValue?.currencyName || 'NA',
      amount: this.amount ?? 0
    };

    console.log('Adding new order:', newOrder);

    this.displayedData = [...this.displayedData, newOrder];
    this.updateFilteredData();

    this.dialogRef.close();
    this.resetForm();
  }

  resetForm(): void {
    this.currencyHaveControl.setValue('');
    this.currencyWantControl.setValue('');
    this.amount = null;
  }

  getCurrencyCode(countryCode: string): string {
    const codeMap: { [key: string]: string } = {
      'us': 'USD', 'au': 'AUD', 'ca': 'CAD', 'nz': 'NZD', 'sg': 'SGD',
      'gb': 'GBP', 'eu': 'EUR', 'in': 'INR'
    };
    return codeMap[countryCode?.toLowerCase()] || countryCode?.toUpperCase();
  }
}
