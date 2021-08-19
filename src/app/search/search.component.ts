import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  baseUrl_suggestions = 'https://api.zoopla.co.uk/api/v1/geo_autocomplete.json?search_type=listings';
  searchForm;
  listings;
  suggestions;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.baseUrl_suggestions = this.baseUrl_suggestions + '&api_key=' + environment.api_key;

    this.searchForm = this.fb.group({
      location: ['', [Validators.required]]
    });

    this.searchForm.get('location').valueChanges.pipe(
      debounceTime(500),
      tap(val => { })
    ).subscribe(data => { this.getSuggestions(data) }); 
  }

  onSearch(event) {
    var userInput = event.target[0].value;
    localStorage.removeItem('allListings');
    this.router.navigate(['/results'], {queryParams: {location: userInput} });
  }

  getSuggestions(location) {
    console.log('Autocomplete suggestions called. Commented to reduce API calls for now');
    // this.http.get(this.baseUrl_suggestions + '&search_term=' + location).subscribe(res => {
    //   console.log(res['suggestions']);
    //   this.suggestions = res['suggestions'];
    // });
  }
}
