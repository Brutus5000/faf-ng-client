import {Component, OnInit} from '@angular/core';
import {FMap} from '../../faf-api/FMap';
import {DatastoreService} from '../../datastore.service';
import {JsonApiQueryData} from 'angular2-jsonapi';

@Component({
  selector: 'faf-map-vault',
  templateUrl: './map-vault.component.html',
  styleUrls: ['./map-vault.component.scss']
})
export class MapVaultComponent implements OnInit {
  pageSize = 10;
  currentPage = 0;
  totalElements = 0;
  filter = 'latestVersion.hidden==false';
  loadedMaps: FMap[];

  onPaginationChange(page: number) {
    console.log(`pagination changes: ${page}`);
    this.currentPage = page;
    this.queryMaps();
  }

  public constructor(private datastore: DatastoreService) {
    console.log('loading MapsComponent');
  }

  applyFilter(filter: string) {
    console.log(`applying filter: ${JSON.stringify(filter)}`);

    this.filter = filter;
    this.currentPage = 0;
    this.queryMaps();
  }

  ngOnInit(): void {
  }

  private queryMaps() {
    this.datastore.findAll(FMap, {
      page: {size: this.pageSize, number: this.currentPage + 1, totals: ''},
      include: 'latestVersion,latestVersion.statistics',
      filter: this.filter,
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
