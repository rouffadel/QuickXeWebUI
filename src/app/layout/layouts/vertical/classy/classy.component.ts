import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FuseFullscreenComponent } from '@fuse/components/fullscreen';
import { FuseLoadingBarComponent } from '@fuse/components/loading-bar';
import {
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { Navigation } from 'app/core/navigation/navigation.types';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { LanguagesComponent } from 'app/layout/common/languages/languages.component';
import { MessagesComponent } from 'app/layout/common/messages/messages.component';
import { NotificationsComponent } from 'app/layout/common/notifications/notifications.component';
import { QuickChatComponent } from 'app/layout/common/quick-chat/quick-chat.component';
import { SearchComponent } from 'app/layout/common/search/search.component';
import { ShortcutsComponent } from 'app/layout/common/shortcuts/shortcuts.component';
import { UserComponent } from 'app/layout/common/user/user.component';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        FuseLoadingBarComponent,
        FuseVerticalNavigationComponent,
        NotificationsComponent,
        UserComponent,
        MatIconModule,
        MatButtonModule,
        LanguagesComponent,
        FuseFullscreenComponent,
        SearchComponent,
        ShortcutsComponent,
        MessagesComponent,
        RouterOutlet,
        QuickChatComponent,
        CommonModule,
        MatTooltipModule,

    ],
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    navigation: Navigation;
    user: User;
    navigationAppearance: 'default' | 'dense' = 'dense';
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    currentDate: Date = new Date();    

    currentLocation: string = '';   

    navigationMenu: any;


    getAddressComponent(components: any[], type: string): string {
        const component = components.find((comp) => comp.types.includes(type));
        return component ? component.long_name : '';
      }
      
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.reverseGeocode(latitude, longitude);
          },
          (error) => {
            console.error('Geolocation error:', error);
            this.currentLocation = 'Unable to fetch location';
          }
        );
      } else {
        this.currentLocation = 'Geolocation not supported by your browser';
      }
    }
    currentLocationArea
    areaName
    reverseGeocode(latitude: number, longitude: number) {
      const apiKey = 'AIzaSyBYaGP-SpblbASv3JbavMYdhC9VvGc9qFU'; // Replace with your Google Maps API key
    //   const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    const apiUrl = `/api/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  
      this.http.get(apiUrl).subscribe((response: any) => {
        if (response.status === 'OK' && response.results.length > 0) {
            this.currentLocation = response.results[0].formatted_address;
 
            const addressComponents = response.results[0].address_components;

            // Extract required details
            this.areaName = this.getAddressComponent(addressComponents, 'sublocality_level_1');
            const postalCode = this.getAddressComponent(addressComponents, 'postal_code');
            const city = this.getAddressComponent(addressComponents, 'locality');
            const state = this.getAddressComponent(addressComponents, 'administrative_area_level_1');
            const country = this.getAddressComponent(addressComponents, 'country');
        
            // // Display formatted address
            this.currentLocationArea = this.areaName || 'Unable to fetch area name';
            // this.currentLocation = `${city}, ${state}, ${country}, ${postalCode}`.trim().replace(/^, |, , /g, '');
        } else {
          this.currentLocation = 'Unable to fetch location details';
        }
      });
      console.log("Current Location",this.currentLocation)
    }
    roleName: string
    isAdmin: boolean

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _userService: UserService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        private http: HttpClient
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
      debugger

        // Subscribe to navigation data
        this.roleName = localStorage.getItem('loggedInUserRole') ?? '';

        console.log("USER ROLE",this.roleName)

        if(this.roleName=="Admin")
        {
          this.isAdmin=true
        }
        else if(this.roleName!="Admin")
        {
          this.isAdmin=false
        }

        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                this.navigation = navigation;
            });

        // Subscribe to the user service
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });

        this.updateTime();

        this.getUserLocation();

    }


    updateTime() {
        setInterval(() => {
          this.currentDate = new Date();
        }, 1000); // Update every second
      }


    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();

            
        }
    }
}

