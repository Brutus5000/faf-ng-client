import {Component} from '@angular/core';
import {FMap} from '../../faf-api/FMap';
import {DatastoreService} from '../../datastore.service';
import {JsonApiQueryData} from 'angular2-jsonapi';

@Component({
  selector: 'faf-map-vault',
  templateUrl: './map-vault.component.html',
  styleUrls: ['./map-vault.component.scss']
})
export class MapVaultComponent {
  pageSize = 25;
  currentPage = 1;
  totalElements = 0;
  filter = 'latestVersion.hidden==false';
  sorting = null;
  loadedMaps: FMap[];

  onPaginationChange(page: number) {
    console.log(`pagination changes: ${page}`);
    this.currentPage = page;
    this.queryMaps();
  }

  public constructor(private datastore: DatastoreService) {
    console.log('loading MapsComponent');
  }

  applyFilter(result: any) {
    console.log(`applying filter: ${JSON.stringify(result)}`);

    this.filter = result.filter;
    this.sorting = result.sorting;
    this.currentPage = 1;
    this.queryMaps();
  }

  private queryMaps() {
    this.datastore.findAll(FMap, {
      page: {size: this.pageSize, number: this.currentPage, totals: ''},
      include: 'latestVersion,latestVersion.statistics',
      filter: this.filter,
      sort: this.sorting,
    }).subscribe(
      (maps: JsonApiQueryData<FMap>) => {
        this.loadedMaps = maps.getModels();
        this.totalElements = maps.getMeta().meta.page.totalRecords;
        console.log('read the maps');
      }
    );
    console.log('queried mapService');
  }

}
