import {Component} from '@angular/core';
import {MatTableModule} from '@angular/material/table';

export interface Exchange {
  country: string;
  buyRate: number;
  sellRate: number;
}

const ELEMENT_DATA: Exchange[] = [
  {country: 'USD', buyRate: 58.3500, sellRate: 58.3500},
  {country: 'AUD', buyRate: 37.1800, sellRate: 38.5100},
  {country: 'BHD', buyRate: 130.8500, sellRate: 157.3400},
  {country: 'CNY', buyRate: 7.5926, sellRate: 8.3010},
  {country: 'EUR', buyRate: 56.7400, sellRate: 58.1600},
  {country: 'GBP', buyRate: 64.1400, sellRate: 66.0600},
  {country: 'AED', buyRate: 13.5000, sellRate: 16.0400},
  {country: 'BND', buyRate: 35.1700, sellRate: 41.1300},
  {country: 'CHF', buyRate: 58.5400, sellRate: 60.6100},
  {country: 'CAD', buyRate: 41.7500, sellRate: 43.2100},
  {country: 'HKD', buyRate: 7.3570, sellRate: 7.5344},
  {country: 'IDR', buyRate: 0.0032, sellRate: 0.0039},
];

@Component({
  standalone: true,
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
  imports: [MatTableModule],
})
export class ExampleComponent {
  displayedColumns: string[] = ['country', 'buyRate', 'sellRate'];
  dataSource = ELEMENT_DATA;
}
