import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { GenericSearchFilterPipe } from '../custom/generic-search-filter.pipe';
import { CurrencyService } from '../currency/currency.service';


export interface Order {
  orderId: number;
  name: string;
  amount: number;
  location: string;
  city: string;
  fromCurrency: string;
  toCurrency: string;
  email: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
}


@Component({
  selector: 'app-myorders',
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule, FormsModule, GenericSearchFilterPipe, MatInputModule],
  templateUrl: './myorders.component.html',
  styleUrl: './myorders.component.scss'
})


export class MyordersComponent implements OnInit {
  displayedColumns: string[] = ['orderId', 'name', 'country', 'amount', 'city'];
  searchText: string = '';
  displayedData: Order[] = [];
  filteredData = new MatTableDataSource<Order>([]);
  currentDate: Date = new Date();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private currencyService: CurrencyService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    const role = sessionStorage.getItem('loggedInUserRole');

    this.route.queryParams.subscribe(params => {
      const showData = params['showData'] === 'true';

      if (role === 'Admin') {
        if (showData) {
          this.getOrders();
        } else {
          this.displayedData = [];
          this.updateFilteredData();
        }
      } else {
        // For other roles like Agent, stay with headers only as previously requested
        this.displayedData = [];
        this.updateFilteredData();
      }
    });
  }


  getOrders() {
    this.currencyService.getExchangeOrders().subscribe({
      next: (resp: any[]) => {
        if (resp) {
          this.displayedData = resp.map(order => ({
            orderId: order.id,
            name: order.name,
            amount: order.amount,
            location: order.location || 'N/A',
            city: order.city || 'N/A',
            fromCurrency: order.fromCurrency,
            toCurrency: order.toCurrency,
            email: order.email,
            phoneNumber: order.phoneNumber,
            status: order.status,
            createdAt: order.createdAt
          }));
          this.updateFilteredData();
        }
      },
      error: (err) => console.error('Error fetching orders:', err)
    });
  }


  applyFilter() {
    const searchTerm = this.searchText?.trim().toLowerCase() || '';

    this.filteredData.data = this.displayedData.filter(item =>
      Object.values(item).some(value =>
        value?.toString().toLowerCase().includes(searchTerm)
      )
    );
  }


  updateFilteredData() {
    this.filteredData.data = this.displayedData;
  }
}
