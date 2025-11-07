import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export const LOCATIONS: string = "locations";

@Injectable()
export class LocationStoreService {
  private locationsSubject = new BehaviorSubject<string[]>([]);
  public locations$: Observable<string[]> = this.locationsSubject.asObservable();

  constructor() {
    const locString = localStorage.getItem(LOCATIONS);
      if (locString) {
        const locations = JSON.parse(locString);
        this.locationsSubject.next(locations);
      }
  }

  addLocation(zipcode: string): void {
    const currentLocations = this.locationsSubject.value;

    if (!currentLocations.includes(zipcode)) {
      const newLocations = [...currentLocations, zipcode];
      this.locationsSubject.next(newLocations);
      localStorage.setItem(LOCATIONS, JSON.stringify(newLocations));
    }
  }

  removeLocation(zipcode: string): void {
    const currentLocations = this.locationsSubject.value;
    const index = currentLocations.indexOf(zipcode);

    if (index !== -1) {
      const newLocations = currentLocations.filter(loc => loc !== zipcode);
      this.locationsSubject.next(newLocations);
      localStorage.setItem(LOCATIONS, JSON.stringify(newLocations));
    }
  }
}