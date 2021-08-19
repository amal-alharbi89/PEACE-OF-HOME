import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  listing;

  constructor(private listingService: ListingService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    if (this.listingService.listing) {
      this.listing = this.listingService.listing;
    }
    else if (localStorage.getItem('listing') != null) {
      this.listing = JSON.parse(localStorage.getItem('listing'));
    }
    else {
      this.snackBar.open('There was an error, try searching again!', 'OK', {duration: 3500});
      this.router.navigate(['/']);
    }
    console.log(this.listing);
  }

}
