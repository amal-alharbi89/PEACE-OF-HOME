import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  listing;

  constructor(private router: Router) { }

  setListing(data) {
    this.listing = data;
    localStorage.setItem('listing', JSON.stringify(data));
    this.router.navigate(['detail']);
  }
}
