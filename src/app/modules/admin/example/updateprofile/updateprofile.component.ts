import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink, UrlSegment } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { DataService } from '../../../../services/data.service';
import { UpdateprofileService } from './updateprofile.service';
import { environment } from 'environments/environments';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-updateprofile',
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
    MatSelectModule,    
  ], 
  templateUrl: './updateprofile.component.html',
  styleUrl: './updateprofile.component.scss'
})


export class UpdateprofileComponent implements OnInit{
  form: FormGroup;
  contactName: string;
  username: string;
  contactNo: string;
  companyName: string;
  country: string;
  state: string;
  district: string;
  location: string;
  Id: any;
  // data: any;
  userData: any = {};
  selectedValue: string;

  currentLocation: string = '';  
  latitude: number | null = null;
  longitude: number | null = null;  

  areaName

  apiKey
  constructor(private http: HttpClient, private fb: FormBuilder, private dataService: DataService, private updateprofileService: UpdateprofileService, private snackBar: MatSnackBar, private _router: Router) { 
    this.apiKey = environment.googleMapApiKey
  }


  getUserLocationByData() {
    if (!navigator.geolocation) {
      this.currentLocation = 'Geolocation not supported by your browser';
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        this.latitude = this.userData.latitude;
        this.longitude = this.userData.longitude;
        this.reverseGeocode(this.userData.latitude, this.userData.longitude);
      },
      () => (this.currentLocation = 'Unable to fetch location')
    );
  }

  getUserLocation() {
    if (!navigator.geolocation) {
      this.currentLocation = 'Geolocation not supported by your browser';
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        this.latitude = coords.latitude;
        this.longitude = coords.longitude;
        this.reverseGeocode(coords.latitude, coords.longitude);
      },
      () => (this.currentLocation = 'Unable to fetch location')
    );
  }

  reverseGeocode(latitude: number, longitude: number) {
    const apiUrl = `/api/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.apiKey}`;
    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        if (response.status === 'OK' && response.results.length > 0) {
          const components = response.results[0].address_components;
          this.currentLocation = response.results[0].formatted_address;
          this.areaName = this.getAddressComponent(components, 'sublocality_level_1') || 'Unknown area';
        } else {
          this.currentLocation = 'Unable to fetch location details';
        }
      },
      () => (this.currentLocation = 'Error fetching location')
    );
  }

  getAddressComponent(components: any[], type: string): string {
    return components.find(comp => comp.types.includes(type))?.long_name || '';
  }

  
  ngOnInit() {
    debugger
    this.username = sessionStorage.getItem('userName') || '';
    this.Id = sessionStorage.getItem('loggedInUserId') || '';


    if (history.state.userData) {
      this.userData = history.state.userData;
    } else {
      // Handle the case where no data was passed (e.g., redirect back)
      this._router.navigate(['/']);
    }

    this.contactName = this.userData.contactName;
    this.contactNo = this.userData.contactNo;
    this.companyName = this.userData.companyName;
    this.country = this.userData.country;
    this.state = this.userData.state;
    this.district = this.userData.district;
    this.latitude = this.userData.latitude;
    this.longitude = this.userData.longitude;

    if (this.latitude == null || this.longitude == null){
      this.getUserLocation();
    }
    else {
      this.getUserLocationByData();
    }
  }

  updateUserDetails() {
    debugger;
    const Id = this.Id.toString()
    const userdata = {
      // Id : this.Id.toString(),
      contactName: this.contactName,
      contactNo: this.contactNo,
      companyName: this.companyName,
      country: this.country,
      state: this.state,
      district: this.district,
      latitude: this.latitude,
      longitude: this.longitude
    };

    // Call update service
    this.updateprofileService.updateUserDetails(Id, userdata).subscribe((response) => {
      debugger

    if(response.status=="OK"){
      console.log('Profile details updated:', response);
      // Show Snackbar Notification
      this.snackBar.open('Profile Details Updated!', 'Close', {
      duration: 3000, // Time in milliseconds
      verticalPosition: 'top', // Position (top/bottom)
      horizontalPosition: 'right', // Position (start/center/end/right/left)
      panelClass: ['snackbar-success'] // Custom styling
    });
  }
    });
  }
}

