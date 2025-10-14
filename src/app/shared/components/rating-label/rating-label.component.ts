import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-label.component.html',
  styleUrls: ['./rating-label.component.scss']
})
export class RatingLabelComponent {
  @Input() rating: number = 0;

  getRatingClass(): string {
    if (this.rating >= 7.5) return 'excellent';
    if (this.rating >= 5) return 'average';
    return 'bad';
  }

  getFormattedRating(): string {
    return this.rating ? this.rating.toFixed(1) : '–';
  }
}
