import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { TenantService } from './tenant.service';
import { FormsModule } from '@angular/forms';
import { GenericSearchFilterPipe } from '../custom/generic-search-filter.pipe';
import { MatInputModule } from '@angular/material/input';


export interface Tenant {
  contactName: string;
  email: string;
  contactNo: number;
  companyName: string;
}


// const TENANT_DATA: Tenant[] = [
//   { tenantName: 'XYZ', emailId: 'xyz@gmail.com', mobileNumber: 89893843434, companyName: 'ABC'},
//   { tenantName: 'PQR', emailId: 'pqr@gmail.com', mobileNumber: 93749837487, companyName: 'MNO'},
// ];

@Component({
  selector: 'app-tenant',
  standalone: true,
  imports: [MatTableModule,MatIconModule,CommonModule,FormsModule,GenericSearchFilterPipe,MatInputModule],
  templateUrl: './tenant.component.html',
  styleUrl: './tenant.component.scss'
})



export class TenantComponent implements OnInit{
  displayedColumns: string[] = ['contactName',  'email', 'contactNo', 'companyName'];
  searchText: string = '';
  displayedData: Tenant[] = [];
  filteredData = new MatTableDataSource<Tenant>([]);
  // dataSource = TENANT_DATA;
  currentDate: Date = new Date();
  // displayedData: any;

    constructor(private breakpointObserver: BreakpointObserver, private tenantService:TenantService) {
  
    }

    tenants=[];
    ngOnInit(): void {
      // debugger
      this.getService();
      // this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      //   if (result.matches) {
      //     // Mobile screen, show all rows
      //     this.displayedData = this.countries;
      //   } else {
      //     // Desktop screen, show only the first four rows
      //     this.displayedData = this.countries.slice(0, 4);
      //   }
      // });
  
    }
  

    // applyFilter() {
    //   const searchTerm = this.searchText.trim().toLowerCase();
    //   this.filteredData.data = this.displayedData.filter(item =>
    //     item.contactName?.toLowerCase().includes(searchTerm) ||
    //     item.email?.toLowerCase().includes(searchTerm) ||
    //     item.contactNo?.toString().includes(searchTerm) ||
    //     item.companyName?.toString().includes(searchTerm)
    //   );
    // }

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


    getService(){
      // debugger
      this.tenantService.getData().subscribe((resp:any)=>{
        if(resp){
         this.tenants = resp; 
        //  this.displayedData = this.countries.slice(0, 4);
        this.displayedData = this.tenants;
        }
        this.updateFilteredData();
      });
    }
}









// export class ExampleComponent implements OnInit{
//   displayedColumns: string[] = ['country',  'buyRate', 'sellRate'];
//   // dataSource = ELEMENT_DATA;
//   currentDate: Date = new Date();

//   displayedData: Exchange[] = [];

//   constructor(private breakpointObserver: BreakpointObserver) {}

//   ngOnInit(): void {
//     this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
//       if (result.matches) {
//         // Mobile screen, show all rows
//         this.displayedData = ELEMENT_DATA;
//       } else {
//         // Desktop screen, show only the first four rows
//         this.displayedData = ELEMENT_DATA.slice(0, 4);
//       }
//     });
//   }

// }

