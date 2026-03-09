import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss']
})
export class HeroBannerComponent {
  smallBanners = [
    { emoji: '🥛', title: 'Dairy & Eggs',    subtitle: 'Farm-fresh daily',    bg: 'linear-gradient(135deg,#FFF3E0,#FFE0B2)' },
    { emoji: '🍿', title: 'Snacks & Drinks', subtitle: 'Up to 25% off',       bg: 'linear-gradient(135deg,#E8EAF6,#C5CAE9)' },
    { emoji: '🥐', title: 'Bakery Fresh',    subtitle: 'Baked this morning',  bg: 'linear-gradient(135deg,#FCE4EC,#F8BBD0)' },
    { emoji: '🧴', title: 'Personal Care',   subtitle: 'Top brands',          bg: 'linear-gradient(135deg,#F3E5F5,#E1BEE7)' },
  ];
}
