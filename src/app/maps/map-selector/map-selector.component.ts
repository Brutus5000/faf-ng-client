import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {MapFilter} from '../filter-criterion/filter-criterion.component';

@Component({
  selector: 'faf-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.scss']
})
export class MapSelectorComponent implements AfterViewInit {
  filters: MapFilter[] = [];
  filterStrings: string[] = [];
  sortingString = null;
  showQuery = false;
  mapName: string = null;

  @Output()
  search = new EventEmitter();

  constructor() {
  }

  onSearch() {
    const elideFilter = 'latestVersion.hidden==false'
      + this.filterStrings
        .filter(filterString => filterString.length > 0)
        .map(filterString => ';' + filterString)
        .join('');
    this.mapName = elideFilter;
    this.search.emit({filter: elideFilter, sorting: this.sortingString});
  }

  ngAfterViewInit(): void {
    this.addCriterion();
    this.onSearch();
  }

  onFilterChange(index: number, filterString: string) {
    this.filterStrings[index] = filterString;
  }

  onSortingChange(sortingString: string) {
    this.sortingString = sortingString;
  }

  onRemove(index: number) {
    this.filters.splice(index, 1);
    this.filterStrings.splice(index, 1);
  }

  addCriterion() {
    this.filters.push({
      criterion: null,
      operator: null,
      value: null,
    });
    this.filterStrings.push('');
  }
}
