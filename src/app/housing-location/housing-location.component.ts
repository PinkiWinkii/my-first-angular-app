import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HousingLocation } from '../housinglocation';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="getHouseImage(housingLocation.photo)"
        alt="Exterior photo of {{ housingLocation.name }}"
        crossorigin
      />
      <h2 class="listing-heading">{{ housingLocation.name }}</h2>
      <p class="listing-location">{{ housingLocation.city }}, {{ housingLocation.state }}</p>
      <a [routerLink]="['/details', housingLocation.id]">View Details</a>
    </section>
  `,
  styleUrls: ['./housing-location.component.css'],
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;

  getHouseImage(photoPath: string): string {
    const baseUrl = environment.imgUrl; // Usa la URL base de environment.ts
    return `${baseUrl}/${photoPath}`;
  }
}
