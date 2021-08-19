import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MatButtonModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule, MatCardModule, MatSnackBarModule, MatTabsModule, MatAutocompleteModule } from '@angular/material';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultsComponent } from './results/results.component';
import { DetailComponent } from './detail/detail.component';

const appRoutes = [ 
  { path: '', component: SearchComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'detail', component: DetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    ResultsComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSnackBarModule,
    MatTabsModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
