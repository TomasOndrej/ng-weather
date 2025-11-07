import { Injectable } from '@angular/core';
import { LocationStoreService } from './location-store.service';

@Injectable()
export class LocationService {
  constructor(private locationStore: LocationStoreService) {}

  addLocation(zipcode: string): void {
    this.locationStore.addLocation(zipcode);
  }

  removeLocation(zipcode: string): void {
    this.locationStore.removeLocation(zipcode);
  }
}