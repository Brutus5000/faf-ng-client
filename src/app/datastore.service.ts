import {Injectable} from '@angular/core';
import {DatastoreConfig, JsonApiDatastore, JsonApiDatastoreConfig} from 'angular2-jsonapi';
import {HttpClient} from '@angular/common/http';
import {FMap, MapVersion, MapVersionStatistics} from './faf-api/FMap';

const config: DatastoreConfig = {
  baseUrl: 'https://api.faforever.com/data',
  models: {
    map: FMap,
    mapVersion: MapVersion,
    mapVersionStatistics: MapVersionStatistics,
  }
};

@Injectable({
  providedIn: 'root'
})
@JsonApiDatastoreConfig(config)
export class DatastoreService extends JsonApiDatastore {

  constructor(http: HttpClient) {
    super(http);
  }
}
