import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ExchangecurrencyService, BookExchange, ExchangeTransaction } from './exchangecurrency.service';
import { environment } from 'environments/environments';

interface CurrencyExchange {
  country: string;
  countryName: string;
  countryCode: string;
  currencyName: string;
  buyRate: number;
  sellRate: number;
}

@Component({
  selector: 'app-exchangecurrency',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    CommonModule,
  ],
  templateUrl: './exchangecurrency.component.html',
  styleUrl: './exchangecurrency.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ExchangecurrencyComponent implements OnInit {
  // Forms
  currencyExchangeForm: FormGroup;
  bookExchangeForm: FormGroup;

  // Location properties
  currentLocation: string = '';
  latitude: number | null = null;
  longitude: number | null = null;
  postalCode: string = '';
  city: string = '';
  areaName: string = '';

  // Currency Exchange properties
  currencies: CurrencyExchange[] = [];
  selectedFromCurrency: CurrencyExchange | null = null;
  selectedToCurrency: CurrencyExchange | null = null;
  exchangeAmount: number = 1;
  convertedAmount: number = 0;
  exchangeRate: number = 0;

  // Book Exchange properties
  availableBooks: BookExchange[] = [];
  selectedBook: BookExchange | null = null;
  bookISBN: string = '';
  bookSearchResults: BookExchange[] = [];

  // UI properties
  apiKey: string;
  userId: string;
  userName: string;
  isLoading: boolean = false;
  selectedTabIndex: number = 0;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private exchangeService: ExchangecurrencyService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.apiKey = environment.googleMapApiKey;
    this.initializeForms();
  }

  /**
   * Initialize reactive forms
   */
  private initializeForms(): void {
    this.currencyExchangeForm = this.fb.group({
      fromCurrency: ['', Validators.required],
      toCurrency: ['', Validators.required],
      amount: [1, [Validators.required, Validators.min(0.01)]],
      convertedAmount: [{ value: '', disabled: true }],
    });

    this.bookExchangeForm = this.fb.group({
      bookISBN: [''],
      bookName: ['', Validators.required],
      author: ['', Validators.required],
      condition: ['good', Validators.required],
      estimatedPrice: [0, [Validators.required, Validators.min(0)]],
      description: [''],
    });
  }

  /**
   * Angular lifecycle hook - On init
   */
  ngOnInit(): void {
    this.userId = sessionStorage.getItem('loggedInUserId') || '';
    this.userName = sessionStorage.getItem('userName') || '';

    // Initialize live location
    this.initializeLiveLocation();

    // Load exchange data
    this.loadCurrencies();
    this.loadAvailableBooks();
  }

  /**
   * Initialize and get live location
   */
  private initializeLiveLocation(): void {
    if (!navigator.geolocation) {
      this.currentLocation = 'Geolocation not supported by your browser';
      this.snackBar.open('Geolocation not supported', 'Close', { duration: 3000 });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log('Current location:', { lat: this.latitude, lng: this.longitude });
        this.reverseGeocodeLocation(this.latitude, this.longitude);
      },
      (error) => {
        console.error('Geolocation error:', error);
        this.currentLocation = 'Unable to fetch location';
        this.snackBar.open('Unable to fetch your location', 'Close', { duration: 3000 });
      }
    );
  }

  /**
   * Reverse geocode coordinates to get location details
   */
  private reverseGeocodeLocation(latitude: number, longitude: number): void {
    const apiUrl = `/api/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.apiKey}`;
    
    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        if (response.status === 'OK' && response.results.length > 0) {
          const components = response.results[0].address_components;
          this.currentLocation = response.results[0].formatted_address;
          
          // Extract location details
          this.postalCode = this.getAddressComponent(components, 'postal_code') || '';
          this.city = this.getAddressComponent(components, 'locality') || '';
          this.areaName = this.getAddressComponent(components, 'sublocality_level_1') || '';

          console.log('Location details:', {
            address: this.currentLocation,
            city: this.city,
            postalCode: this.postalCode,
            area: this.areaName,
          });
        } else {
          this.currentLocation = 'Unable to map location details';
        }
      },
      (error) => {
        console.error('Reverse geocoding error:', error);
        this.currentLocation = 'Error fetching location details';
      }
    );
  }

  /**
   * Extract address component by type
   */
  private getAddressComponent(components: any[], type: string): string {
    return components.find((comp) => comp.types.includes(type))?.long_name || '';
  }

  /**
   * Load available currencies
   */
  private loadCurrencies(): void {
    this.exchangeService.getCurrencyRates().subscribe(
      (data: any) => {
        this.currencies = data.currencies || [];
        console.log('Currencies loaded:', this.currencies.length);
      },
      (error) => {
        console.error('Error loading currencies:', error);
        this.snackBar.open('Error loading currencies', 'Close', { duration: 3000 });
      }
    );
  }

  /**
   * Load available books for exchange
   */
  private loadAvailableBooks(): void {
    this.exchangeService.getAvailableBooks().subscribe(
      (books: BookExchange[]) => {
        this.availableBooks = books;
        console.log('Available books loaded:', books.length);
      },
      (error) => {
        console.error('Error loading books:', error);
      }
    );
  }

  /**
   * Search for book by ISBN
   */
  searchBookByISBN(): void {
    if (!this.bookISBN.trim()) {
      this.snackBar.open('Please enter ISBN', 'Close', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    this.exchangeService.getBookExchangeData(this.bookISBN).subscribe(
      (book: BookExchange) => {
        this.selectedBook = book;
        // Auto-fill form
        this.bookExchangeForm.patchValue({
          bookName: book.bookName,
          author: book.author,
          condition: book.condition,
          estimatedPrice: book.estimatedPrice,
          description: book.description,
        });
        this.isLoading = false;
        this.snackBar.open('Book found! Form auto-filled', 'Close', { duration: 3000 });
      },
      (error) => {
        this.isLoading = false;
        console.error('Error searching book:', error);
        this.snackBar.open('Book not found', 'Close', { duration: 3000 });
      }
    );
  }

  /**
   * Handle currency exchange calculation
   */
  onCurrencySelectChange(): void {
    if (this.selectedFromCurrency && this.selectedToCurrency) {
      this.calculateExchangeRate();
    }
  }

  /**
   * Calculate exchange rate and converted amount
   */
  private calculateExchangeRate(): void {
    if (!this.selectedFromCurrency || !this.selectedToCurrency || !this.exchangeAmount) {
      return;
    }

    this.exchangeService
      .convertCurrency(
        this.selectedFromCurrency.currencyName,
        this.selectedToCurrency.currencyName,
        this.exchangeAmount
      )
      .subscribe(
        (response: any) => {
          this.exchangeRate = response.rate || 1;
          this.convertedAmount = this.exchangeAmount * this.exchangeRate;
          console.log('Exchange rate:', this.exchangeRate);
        },
        (error) => {
          console.error('Error calculating exchange rate:', error);
        }
      );
  }

  /**
   * Handle exchange amount change
   */
  onAmountChange(): void {
    this.calculateExchangeRate();
  }

  /**
   * Save currency exchange transaction
   */
  saveCurrencyExchange(): void {
    if (!this.currencyExchangeForm.valid || !this.selectedFromCurrency || !this.selectedToCurrency) {
      this.snackBar.open('Please fill all required fields', 'Close', { duration: 3000 });
      return;
    }

    if (!this.latitude || !this.longitude) {
      this.snackBar.open('Location not available. Please enable geolocation', 'Close', { duration: 3000 });
      return;
    }

    const transaction: ExchangeTransaction = {
      userId: this.userId,
      exchangeType: 'currency',
      exchangeData: {
        fromCurrency: this.selectedFromCurrency.currencyName,
        toCurrency: this.selectedToCurrency.currencyName,
        fromAmount: this.exchangeAmount,
        toAmount: this.convertedAmount,
        rate: this.exchangeRate,
      },
      location: this.currentLocation,
      latitude: this.latitude,
      longitude: this.longitude,
      postalCode: this.postalCode,
      city: this.city,
      areaName: this.areaName,
      transactionDate: new Date(),
      status: 'completed',
    };

    this.isLoading = true;
    this.exchangeService.createExchangeTransaction(transaction).subscribe(
      (response: any) => {
        this.isLoading = false;
        console.log('Currency exchange saved:', response);
        this.snackBar.open('Currency exchange saved successfully!', 'Close', { duration: 3000 });
        this.currencyExchangeForm.reset();
        this.convertedAmount = 0;
      },
      (error) => {
        this.isLoading = false;
        console.error('Error saving currency exchange:', error);
        this.snackBar.open('Error saving currency exchange', 'Close', { duration: 3000 });
      }
    );
  }

  /**
   * Save book exchange transaction
   */
  saveBookExchange(): void {
    if (!this.bookExchangeForm.valid) {
      this.snackBar.open('Please fill all required fields', 'Close', { duration: 3000 });
      return;
    }

    if (!this.latitude || !this.longitude) {
      this.snackBar.open('Location not available. Please enable geolocation', 'Close', { duration: 3000 });
      return;
    }

    const bookData: BookExchange = this.bookExchangeForm.value;
    if (this.bookISBN) {
      bookData.isbn = this.bookISBN;
    }

    const transaction: ExchangeTransaction = {
      userId: this.userId,
      exchangeType: 'book',
      exchangeData: bookData,
      location: this.currentLocation,
      latitude: this.latitude,
      longitude: this.longitude,
      postalCode: this.postalCode,
      city: this.city,
      areaName: this.areaName,
      transactionDate: new Date(),
      status: 'completed',
    };

    this.isLoading = true;
    this.exchangeService.createExchangeTransaction(transaction).subscribe(
      (response: any) => {
        this.isLoading = false;
        console.log('Book exchange saved:', response);
        this.snackBar.open('Book exchange saved successfully!', 'Close', { duration: 3000 });
        this.bookExchangeForm.reset();
        this.selectedBook = null;
        this.bookISBN = '';
      },
      (error) => {
        this.isLoading = false;
        console.error('Error saving book exchange:', error);
        this.snackBar.open('Error saving book exchange', 'Close', { duration: 3000 });
      }
    );
  }

  /**
   * Refresh location
   */
  refreshLocation(): void {
    this.initializeLiveLocation();
  }

  /**
   * TrackBy function for currency list
   */
  trackByCurrency(index: number, currency: CurrencyExchange): string {
    return currency.currencyName;
  }
}
