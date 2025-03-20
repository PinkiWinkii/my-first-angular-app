import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-house',
  templateUrl: './create-house.component.html',
  styleUrls: ['./create-house.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CreateHouseComponent {
  housingLocation: HousingLocation = {
    id: '',
    name: '',
    city: '',
    state: '',
    photo: '',
    availableUnits: 0,
    wifi: false,
    laundry: false,
  };

  constructor(private housingService: HousingService, private router: Router) {}

  async onSubmit() {
    try {
      await this.housingService.saveHousing(this.housingLocation);
      this.router.navigate(['/']); // Redirige al home después de crear
    } catch (error) {
      console.error('Error al crear la casa:', error);
      // Puedes mostrar un mensaje de error al usuario aquí
    }
  }
}