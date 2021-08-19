import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ListingService } from '../listing.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  baseUrl_property = 'https://api.zoopla.co.uk/api/v1/property_listings.json?';
  baseUrl_crimes = 'https://data.police.uk/api/crimes-street/all-crime?';
  showLoader = false;
  showResult = false;
  loadPercent = 0;
  location;
  listings;
  searchResult;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private listingService: ListingService) { }

  ngOnInit() {
    this.baseUrl_property = this.baseUrl_property + 'api_key=' + environment.api_key; 

    this.loadSavedListing();
    return;

    this.showLoader = true;
    // this.baseUrl = this.baseUrl + '&page_size=20';
    if (localStorage.getItem("allListings") == null) {
      this.location = this.route.snapshot.queryParams['location'];
      this.http.get(this.baseUrl_property + '&area=' + this.location).subscribe(res => {
        console.log(res);
        this.listings = res['listing'];
        console.log(this.listings);
        this.searchResult = res;

        var count = 0;
        for(var i = 0; i < this.listings.length; i++) {
          var listing = this.listings[i];
          this.http.get(this.baseUrl_crimes + 'lat=' + listing.latitude + '&lng=' + listing.longitude).subscribe(result => {
            this.listings[count].crimeCount = Object.keys(result).length;
            count++;
            this.loadPercent = (count / this.listings.length) * 100; // Percentage fetched
            if (count == this.listings.length) {
              // Show results and hide loader only when crime counts have been fetched 
              this.showResult = true;
              this.showLoader = false;
              localStorage.setItem('allListings', JSON.stringify(this.listings));
            }
          });  
        }
        if (this.listings.length == 0) {
          this.snackBar.open('No result found for your search criteria!', 'OK', {duration: 3500});
          this.router.navigate(['']);
        }
      }, error => {
        this.snackBar.open('There was an error, please try again later!', 'OK', {duration: 3500});
        this.router.navigate(['']);
      });
    } 
    else {
      this.listings = JSON.parse(localStorage.getItem('allListings'));
      this.showResult = true;
      this.showLoader = false;
    }
  }

  showDetails(listing) {
    this.listingService.setListing(listing);
  }

  orderCrime() {
    this.listings.sort((a, b) => a.crimeCount - b.crimeCount);
  }

  orderPrice() {
    this.listings.sort((a, b) => a.price - b.price);
  }

  loadSavedListing() {
    this.http.get('assets/saved/london.json').subscribe(res => {
      console.log(res['listing']);
      this.listings = res['listing'];
      this.showResult = true;
    });
  }
}
