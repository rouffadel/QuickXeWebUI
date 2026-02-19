import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environments';

export interface BookExchange {
  id?: string;
  bookName: string;
  author: string;
  isbn: string;
  condition: string;
  estimatedPrice: number;
  description: string;
}

export interface ExchangeTransaction {
  id?: string;
  userId: string;
  exchangeType: string; // 'currency' or 'book'
  exchangeData: any;
  location: string;
  latitude: number;
  longitude: number;
  postalCode: string;
  city: string;
  areaName: string;
  transactionDate: Date;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExchangecurrencyService {
  private apiUrl = environment.apiUrl || '/api';
  private exchangeData$ = new BehaviorSubject<ExchangeTransaction | null>(null);

  constructor(private http: HttpClient) { }

  /**
   * Get all exchange transactions
   */
  getExchangeTransactions(): Observable<ExchangeTransaction[]> {
    return this.http.get<ExchangeTransaction[]>(`${this.apiUrl}/exchange/transactions`);
  }

  /**
   * Get exchange transaction by ID
   */
  getExchangeTransaction(id: string): Observable<ExchangeTransaction> {
    return this.http.get<ExchangeTransaction>(`${this.apiUrl}/exchange/transactions/${id}`);
  }

  /**
   * Create new exchange transaction
   */
  createExchangeTransaction(transaction: ExchangeTransaction): Observable<any> {
    return this.http.post(`${this.apiUrl}/exchange/transactions`, transaction);
  }

  /**
   * Update exchange transaction
   */
  updateExchangeTransaction(id: string, transaction: ExchangeTransaction): Observable<any> {
    return this.http.put(`${this.apiUrl}/exchange/transactions/${id}`, transaction);
  }

  /**
   * Delete exchange transaction
   */
  deleteExchangeTransaction(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/exchange/transactions/${id}`);
  }

  /**
   * Get book exchange data by ISBN
   */
  getBookExchangeData(isbn: string): Observable<BookExchange> {
    return this.http.get<BookExchange>(`${this.apiUrl}/exchange/books/${isbn}`);
  }

  /**
   * Get all available books for exchange
   */
  getAvailableBooks(): Observable<BookExchange[]> {
    return this.http.get<BookExchange[]>(`${this.apiUrl}/exchange/books`);
  }

  /**
   * Save book exchange data
   */
  saveBookExchangeData(book: BookExchange): Observable<any> {
    return this.http.post(`${this.apiUrl}/exchange/books`, book);
  }

  /**
   * Get exchange data observable
   */
  getExchangeData(): Observable<ExchangeTransaction | null> {
    return this.exchangeData$.asObservable();
  }

  /**
   * Set exchange data
   */
  setExchangeData(data: ExchangeTransaction): void {
    this.exchangeData$.next(data);
  }

  /**
   * Get currency rates
   */
  getCurrencyRates(): Observable<any> {
    return this.http.get(`${this.apiUrl}/exchange/currency-rates`);
  }

  /**
   * Convert currency
   */
  convertCurrency(fromCurrency: string, toCurrency: string, amount: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/exchange/convert`, {
      params: {
        from: fromCurrency,
        to: toCurrency,
        amount: amount.toString()
      }
    });
  }
}
