import {Component} from '@angular/core';
import {FafMap} from '../../faf-api/FafMap';
import {DatastoreService} from '../../datastore.service';
import {JsonApiQueryData} from 'angular2-jsonapi';
import {PageChangeEvent} from '../../primeng/primeng-event-definitions';

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
  loadedMaps: FafMap[];

  onPaginationChange(event: PageChangeEvent) {
    console.log(`pagination changes: ${event}`);
    this.currentPage = event.page + 1;
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
    this.datastore.findAll(FafMap, {
      page: {size: this.pageSize, number: this.currentPage, totals: ''},
      include: 'latestVersion,latestVersion.statistics',
      filter: this.filter,
      sort: this.sorting,
    }).subscribe(
      (maps: JsonApiQueryData<FafMap>) => {
        this.loadedMaps = maps.getModels();
        this.totalElements = maps.getMeta().meta.page.totalRecords;
        console.log('read the maps');
      }
    );
    console.log('queried mapService');
  }

}
