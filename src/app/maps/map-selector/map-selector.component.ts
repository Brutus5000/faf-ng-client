import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {SortCriterion, SortOrder, SortSelection} from '../../faf-api/sort-criterion';
import {buildFilterExpression, FilterCriterion, FilterSelection} from '../../faf-api/filter-types';
import {MapFilterCriteria, MapSortCriteria} from '../../faf-api/map.service';

@Component({
  selector: 'faf-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.scss']
})
export class MapSelectorComponent implements AfterViewInit {
  availableFilterCriteria: FilterCriterion[] = [
    MapFilterCriteria.NAME,
    MapFilterCriteria.MAX_PLAYERS,
    MapFilterCriteria.WIDTH,
    MapFilterCriteria.HEIGHT,
  ];

  availableSortCriteria: SortCriterion[] = MapSortCriteria.ALL;

  filters: FilterSelection[] = [];
  sorting: SortSelection = {
    criterion: MapSortCriteria.DOWNLOADS,
    direction: SortOrder.DESCENDING
  };
  showQuery = false;
  queryString: string = null;

  @Output()
  search = new EventEmitter();

  constructor() {
  }

  onSearch() {
    this.queryString = buildFilterExpression(this.filters);
    this.search.emit({filter: this.filters, sorting: this.sorting});
  }

  ngAfterViewInit(): void {
    this.addCriterion();
    this.onSearch();
  }

  onRemove(index: number) {
    this.filters.splice(index, 1);
  }

  addCriterion() {
    this.filters.push({
      criterion: null,
      operator: null,
      value: null,
    });
  }
}
