import {Injectable} from '@angular/core';
import {DatastoreService} from '../datastore.service';
import {FafMap} from './FafMap';
import {buildFilterExpression, FilterSelection} from './filter-types';
import {buildSortExpression, SortSelection} from './sort-criterion';
import {Observable} from 'rxjs';
import {JsonApiQueryData} from 'angular2-jsonapi/models/json-api-query-data';
import {BooleanCondition, Contains, Is, NumberConditions, StringConditions} from './query-condition';


export class MapFilterCriteria {
  // Not intended to be available for manual selection
  static HIDDEN = {
    nameKey: 'Name',
    apiField: 'displayName',
    operators: BooleanCondition,
    defaultOperator: Is,
    availableValues: [true, false],
  };

  static NAME = {
    nameKey: 'Name',
    apiField: 'displayName',
    operators: StringConditions,
    defaultOperator: Contains,
    availableValues: null,
  };

  static MAX_PLAYERS = {
    nameKey: 'Max. Players',
    apiField: 'latestVersion.maxPlayers',
    operators: NumberConditions,
    defaultOperator: Is,
    availableValues: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  };

  static WIDTH = {
    nameKey: 'Width',
    apiField: 'latestVersion.width',
    operators: NumberConditions,
    defaultOperator: Is,
    availableValues: [256, 512, 1024, 2048],
  };

  static HEIGHT = {
    nameKey: 'Height',
    apiField: 'latestVersion.height',
    operators: NumberConditions,
    defaultOperator: Is,
    availableValues: [256, 512, 1024, 2048],
  };
}

export class MapSortCriteria {
  static NAME = {
    nameKey: 'Name',
    apiField: 'displayName'
  };

  static DOWNLOADS = {
    nameKey: 'Downloads',
    apiField: 'latestVersion.statistics.downloads'
  };

  static GAMES_PLAYER = {
    nameKey: 'Games played',
    apiField: 'latestVersion.statistics.plays'
  };

  static LAST_UPDATE = {
    nameKey: 'Last update',
    apiField: 'latestVersion.updateTime'
  };

  static ALL = [
    MapSortCriteria.NAME,
    MapSortCriteria.DOWNLOADS,
    MapSortCriteria.GAMES_PLAYER,
    MapSortCriteria.LAST_UPDATE
  ];
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private datastore: DatastoreService) {
  }

  static HIDDEN_SELECTION: FilterSelection = {
    criterion: MapFilterCriteria.HIDDEN,
    operator: Is,
    value: 'true'
  };

  public query(filters: FilterSelection[],
               sorting: SortSelection[],
               include: string,
               pageSize: number,
               currentPage: number,
               showHidden: boolean = false): Observable<JsonApiQueryData<FafMap>> {
    console.log('Query maps');

    if (showHidden) {
      filters = [MapService.HIDDEN_SELECTION].concat(filters);
    }

    const filterExpression = buildFilterExpression(filters);
    const sortExpression = buildSortExpression(sorting);

    const params: any = {
      page: {size: pageSize, number: currentPage, totals: ''},
      include,
    };

    if (filterExpression) {
      params.filter = filterExpression;
    }

    if (sortExpression) {
      params.sort = sortExpression;
    }

    return this.datastore.findAll(FafMap, params);
  }
}
