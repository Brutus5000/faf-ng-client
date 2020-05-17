import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NewsComponent} from './news/news.component';
import {MapGridComponent} from './maps/map-grid/map-grid.component';
import {JsonApiModule} from 'angular2-jsonapi';
import {LayoutModule} from '@angular/cdk/layout';
import {MapVaultComponent} from './maps/map-vault/map-vault.component';
import {MapSelectorComponent} from './maps/map-selector/map-selector.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FilterCriterionComponent} from './maps/filter-criterion/filter-criterion.component';
import {SortCriterionComponent} from './maps/sort-criterion-component/sort-criterion.component';
import {PaginatorModule} from 'primeng/paginator';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    MapGridComponent,
    MapVaultComponent,
    MapSelectorComponent,
    FilterCriterionComponent,
    SortCriterionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JsonApiModule,
    LayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    PaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
