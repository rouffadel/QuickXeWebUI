import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ExampleService } from './example.service';
import { GenericSearchFilterPipe } from './custom/generic-search-filter.pipe';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { countries } from 'app/mock-api/apps/contacts/data';

export interface Exchange {
  country: string;
  countryName: string;
  countryCode: string;
  currencyName: string;
  buyRate: number;
  sellRate: number;
  // action: string;
}

export interface Food {
  value: string;
  viewValue: string;
}

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

@Component({
  standalone: true,
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
  imports: [MatTableModule,MatIconModule,CommonModule,GenericSearchFilterPipe,FormsModule,MatFormField,MatInputModule,MatSelectModule],
})


export class ExampleComponent implements OnInit {
  displayedColumns: string[] = ['country', 'buyRate', 'sellRate'];
  searchText: string = '';
  currentDate: Date = new Date();
  displayedData: Exchange[] = [];
  filteredData = new MatTableDataSource<Exchange>([]);


  countries: Exchange[] = [];
  

  defaultCountries: Exchange[] = [];

  selectedValue: string;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  remainingCountries: Exchange[] = [];


  constructor(
    private breakpointObserver: BreakpointObserver, 
    private exampleService: ExampleService
  ) {}

  ngOnInit(): void {
    this.getService();
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        // Mobile screen, show all rows
        this.displayedData = this.countries;
      } else {
        // Desktop screen, show only the first four rows
        this.displayedData = this.countries.slice(0, 4);
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

  getService() {
    this.exampleService.getData().subscribe((resp: Exchange[]) => {
      if (resp) {
        this.countries = resp;
        this.displayedData = this.countries.slice(0, 4);
        this.updateFilteredData();
      }
    });
  }
}

