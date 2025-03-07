import { Component, inject, OnInit } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter/>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  housingService = inject(HousingService);
  private subscription!: Subscription;

  ngOnInit() {
    // Suscribirse para recibir datos cuando estén listos
    this.housingService.housingLocationList$.subscribe((data) => {
      this.housingLocationList = data;
      this.filteredLocationList = data; // Actualizar la lista filtrada también
    });

    // Asegurar que los datos se carguen (si aún no se han cargado)
    this.housingService.getHouses();
  }

  ngOnDestroy() {
    if (this.subscription) { // 🔹 Verificamos si subscription está inicializado
      this.subscription.unsubscribe();
    }
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
