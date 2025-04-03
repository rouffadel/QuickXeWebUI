import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { TenantService } from './tenant.service';
import { FormsModule } from '@angular/forms';
import { GenericSearchFilterPipe } from '../custom/generic-search-filter.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddtenantComponent } from './addtenant/addtenant.component';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from 'app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { auto } from '@popperjs/core';




export interface Tenant {
  contactName: string;
  email: string;
  contactNo: number;
  companyName: string;
  // emailStatus: boolean;
  isActive: string;
  createDate: string;
  activationDate: string;
}


// const TENANT_DATA: Tenant[] = [
//   { tenantName: 'XYZ', emailId: 'xyz@gmail.com', mobileNumber: 89893843434, companyName: 'ABC'},
//   { tenantName: 'PQR', emailId: 'pqr@gmail.com', mobileNumber: 93749837487, companyName: 'MNO'},
// ];

@Component({
  selector: 'app-tenant',
  standalone: true,
  imports: [MatTableModule,MatIconModule,CommonModule,FormsModule,GenericSearchFilterPipe,MatInputModule,MatDialogModule,MatButtonModule,MatSelectModule,MatOptionModule,MatTooltip,MatTooltipModule],
  templateUrl: './tenant.component.html',
  styleUrl: './tenant.component.scss'
})



export class TenantComponent implements OnInit{
  displayedColumns: string[] = ['contactName',  'email', 'contactNo', 'companyName','createDate', 'activationDate', 'isActive'];
  searchText: string = '';
  displayedData: Tenant[] = [];
  filteredData = new MatTableDataSource<Tenant>([]);
  // dataSource = TENANT_DATA;
  currentDate: Date = new Date();
  // displayedData: any;

  selectedFilter: string = "All";

  resendEmailToolTip: string = 'Resend Email';   


    constructor(private breakpointObserver: BreakpointObserver, private tenantService:TenantService, private dialog:MatDialog, private dataService:DataService, private snackBar: MatSnackBar,     private _fuseConfirmationService: FuseConfirmationService
    ) {
    }

    tenants=[];
    ngOnInit(): void {
      // debugger
      this.getService();
  
      this.dataService.dataUpdated$.subscribe((updated) =>{
        if(updated){
          this.getService();
        }
      });

    }
  

    // applyFilter() {
    //   const searchTerm = this.searchText?.trim().toLowerCase() || '';
    
    //   this.filteredData.data = this.displayedData.filter(item =>
    //     Object.values(item).some(value =>
    //       value?.toString().toLowerCase().includes(searchTerm)
    //     )
    //   );
    // }
    
    applyFilter() {
      const searchTerm = this.searchText?.trim().toLowerCase() || '';
    
      this.filteredData.data = this.displayedData.filter(item => {
        // Check if the item matches the selected dropdown filter
        const statusMatch =
          this.selectedFilter === 'All' || item.isActive === this.selectedFilter;
    
        // Check if the item matches the search text
        const searchMatch = Object.values(item).some(value =>
          value?.toString().toLowerCase().includes(searchTerm)
        );
    
        return statusMatch && searchMatch;
      });
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

    addTenant()
      {
        this.dialog.open(AddtenantComponent,this.dialogBoxSettings
      //   {
      // disableClose: true,
      //   })
        )
      }

      // getEmailCodeByEmail(email: string) {
      //   debugger
      //   // const email = this.addTenantForm.value.email;
      //   this.tenantService.getEmailCodeByEmail(email).subscribe(
      //     (result: any) => {
      //       if (result && result.data) {

      //         const confirmation = this._fuseConfirmationService.open({
      //           title: `Resend Email to ${email}`,
      //           message: 'Are you sure you want to resend email?',
      //           actions: {
      //               confirm: {
      //                   label: 'Yes'
      //               }
      //           }
      //       });
            
      //       // Subscribe to the confirmation dialog closed action
      //       confirmation.afterClosed().subscribe((result) => {
            
      //           // If the confirm button pressed...
            
      //           if (result === 'confirmed') {
              
      //                 // Show Snackbar Notification
      //                 this.snackBar.open('Email Resend Successfully!', 'Close', {
      //                 duration: 3000, // Time in milliseconds
      //                 verticalPosition: 'top', // Position (top/bottom)
      //                 horizontalPosition: 'right', // Position (start/center/end/right/left)
      //                 panelClass: ['snackbar-success'] // Custom styling
      //                 });
    
      //       } else {
      //         console.log("No EmailCode received from API.");
      //       }
      //     },
    
      //     (error) => {
      //       console.error('Error:', error);
      //     }
      //   );
      // }

      // deleteCurrency(countryId: string): void {
      //   const confirmation = this._fuseConfirmationService.open({
      //     title: 'Delete Currency',
      //     message: 'Are you sure you want to delete this currency?',
      //     actions: {
      //         confirm: {
      //             label: 'Delete'
      //         }
      //     }
      // });
      
      // // Subscribe to the confirmation dialog closed action
      // confirmation.afterClosed().subscribe((result) => {
      
      //     // If the confirm button pressed...
      
      //     if (result === 'confirmed') {
      
      //         // Delete the currency
      //      this.currencyService.deleteCurrencyByCountryId(countryId).subscribe(() => {
      //       console.log('Deleted Successfully.');
      //           // Show Snackbar Notification
      //           this.snackBar.open('Currency Deleted!', 'Close', {
      //           duration: 3000, // Time in milliseconds
      //           verticalPosition: 'top', // Position (top/bottom)
      //           horizontalPosition: 'right', // Position (start/center/end/right/left)
      //           panelClass: ['snackbar-success'] // Custom styling
      //           });
      //           this.getService();
      //     }, (error) => {
      //       console.log('Failed to delete');
      //     });
      //     }
      // });

      // }

      getEmailCodeByEmail(email: string) {
        debugger;
        const confirmation = this._fuseConfirmationService.open({
          title: `Resend Email to ${email}`,
          message: 
              'Are you sure you want to resend email?',
          actions: {
            confirm: {
              label: 'Yes',
          },
          cancel: {
            show: true,
            label: 'No',
        },
              // confirm: { label: 'Yes' }
          },
      });

      confirmation.afterClosed().subscribe((result) => {
      
        // If the confirm button pressed...
    
        if (result === 'confirmed') {
    
            // Delete the currency
         this.tenantService.getEmailCodeByEmail(email).subscribe(() => {
          // console.log('Deleted Successfully.');
              // Show Snackbar Notification
              this.snackBar.open('Email Resend Successfully!', 'Close', {
              duration: 3000, // Time in milliseconds
              verticalPosition: 'top', // Position (top/bottom)
              horizontalPosition: 'right', // Position (start/center/end/right/left)
              panelClass: ['snackbar-success'] // Custom styling
              });
              this.getService();
        }, (error) => {
          console.error('Error:', error);
        });
        }
    });
  }
    
        // this.tenantService.getEmailCodeByEmail(email).subscribe({
  
        //                     this.snackBar.open('Email Resend Successfully!', 'Close', {
        //                         duration: 3000,
        //                         verticalPosition: 'top',
        //                         horizontalPosition: 'right',
        //                         panelClass: ['snackbar-success']
        //                     });
        //                 }
        //             });
        //         } else {
        //             console.log("No EmailCode received from API.");
        //         }
        //     },
        //     error: (error) => {
        //         console.error('Error:', error);
        //     }
    


    //   resendEmail(email: string): void {
    //     debugger

    //     this.updatecurrencyService.getCurrencyByCountryId(countryId).subscribe((resp: any) => {
    //       if (resp) {
    //             this.snackBar.open('Agent Registered!', '✖', {
    //               duration: 3000, // Time in milliseconds
    //               verticalPosition: 'top', // Position (top/bottom)
    //               horizontalPosition: 'right', // Position (start/center/end/right/left)
    //               panelClass: ['snackbar-success'] // Custom styling
    //           });
    //       }
    //     });
    // }


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

    getService() {
      this.tenantService.getData().subscribe((resp: any) => {
        if (resp) {
          this.tenants = resp.map((tenant: any) => ({
            ...tenant,
            // emailStatus: tenant.emailStatus ? "Succeed" : "Failed" // Convert boolean to string
            createDate: tenant.createDate.substring(0, 10)

          }));
          
          this.displayedData = this.tenants;
        }
        this.updateFilteredData();
      });
    }
    
}


