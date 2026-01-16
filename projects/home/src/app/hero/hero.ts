import { Component } from '@angular/core';
import { Cards } from '../cards/cards';
import { AlertBanner, Footer } from '../../../../shared-ui/src/public-api';
import { cardsData } from '../data';

@Component({
  selector: 'app-hero',
  imports: [Cards, AlertBanner, Footer],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  cards = cardsData;
}
