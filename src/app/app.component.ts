import { Component, inject, OnInit } from '@angular/core';
import { HousingService } from './housing.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule ,RouterModule],
  selector: 'app-root',
  template: `
    <main *ngIf="isLoading; else content">
      <p>Cargando datos...</p>
    </main>
    <ng-template #content>
      <a [routerLink]="['/']">
        <header class="brand-name">
          <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
        </header>
      </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </ng-template>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  housingService = inject(HousingService);
  isLoading = true;

  async ngOnInit() {
    await this.housingService.getHouses(); // Espera a que los datos se carguen
    this.isLoading = false; // Cuando termina, cambia el estado
  }
}
