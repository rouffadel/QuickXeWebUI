import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
// import { TenantService } from './tenant.service';
import { FormsModule } from '@angular/forms';
import { GenericSearchFilterPipe } from '../custom/generic-search-filter.pipe';
import { MatInputModule } from '@angular/material/input';


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
  imports: [MatTableModule,MatIconModule,CommonModule,FormsModule,GenericSearchFilterPipe,MatInputModule],
  templateUrl: './assignorders.component.html',
  styleUrl: './assignorders.component.scss'
})



export class AssignordersComponent implements OnInit{
  displayedColumns: string[] = ['orderId','country','amount'];
  searchText: string = '';
  displayedData: Order[] = [];
  filteredData = new MatTableDataSource<Order>([]);
  // dataSource = TENANT_DATA;
  currentDate: Date = new Date();
  // displayedData: any;

    constructor(private breakpointObserver: BreakpointObserver) {
  
    }

    orders=[];
    ngOnInit(): void {
      // debugger
      // this.getService();
  
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


    // getService(){
    //   // debugger
    //   this.tenantService.getData().subscribe((resp:any)=>{
    //     if(resp){
    //      this.tenants = resp; 
    //     //  this.displayedData = this.countries.slice(0, 4);
    //     this.displayedData = this.tenants;
    //     }
    //     this.updateFilteredData();
    //   });
    // }
}
