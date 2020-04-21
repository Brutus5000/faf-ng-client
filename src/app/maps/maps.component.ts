import {Component, OnInit} from '@angular/core';
import {DatastoreService} from '../datastore.service';
import {JsonApiQueryData} from 'angular2-jsonapi';
import {Map} from '../faf-api/map';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  public maps: Map[];

  public constructor(private datastore: DatastoreService) {
    console.log('loading MapsComponent');
    datastore.findAll(Map, {
      page: {size: 10, number: 1},
      include: 'latestVersion,latestVersion.statistics',
      filter: 'latestVersion.hidden==false'
    }).subscribe(
      (maps: JsonApiQueryData<Map>) => {
        this.maps = maps.getModels();
        console.log('read the maps');
      }
    );
    console.log('queried mapService');
  }

  ngOnInit(): void {
  }

}
