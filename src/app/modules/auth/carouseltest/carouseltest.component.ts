import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-carouseltest',
  standalone: true,
  imports: [NgbModule, NgbCarouselModule,CommonModule],
  templateUrl: './carouseltest.component.html',
  styleUrl: './carouseltest.component.scss'
})

export class CarouseltestComponent {
  images = [
    {
      url: 'https://example.com/image1.jpg',
      title: 'First Slide',
      description: 'Description for first slide',
    },
    {
      url: 'https://example.com/image2.jpg',
      title: 'Second Slide',
      description: 'Description for second slide',
    },
  ];
}

