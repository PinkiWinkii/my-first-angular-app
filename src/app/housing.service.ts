import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
  housingLocationList: HousingLocation[] = [];

  private apiUrl = environment.apiUrl;

  // BehaviorSubject para manejar cambios en la lista de casas
  private housingLocationListSubject = new BehaviorSubject<HousingLocation[]>([]);
  housingLocationList$ = this.housingLocationListSubject.asObservable();

  constructor() { 
    this.getHouses();
  }

  getAllHousingLocations(): HousingLocation[] {
    console.log('Casas cargadas:', this.housingLocationListSubject.value);
    
    return this.housingLocationListSubject.value;
  }

  getHousingLocationById(id: string): HousingLocation | undefined {
    console.log('Getting housing location by ID: ', this.housingLocationListSubject.value[0].id);
    
    return this.housingLocationListSubject.value.find(house => house.id === id);
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }

  async getHouses() {
    try {
      const response = await axios.get(`${this.apiUrl}/api/loaders`);
      this.housingLocationList = response.data;
      this.housingLocationListSubject.next(response.data);
      console.log('Casas cargadas:', this.housingLocationListSubject.value);
    } catch (error) {
      console.error('Error al obtener casas:', error);
      throw error;
    }
  }
}
