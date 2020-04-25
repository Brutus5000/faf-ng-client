import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FilterCriterionComponent, MapFilter} from '../filter-criterion/filter-criterion.component';

@Component({
  selector: 'faf-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.scss']
})
export class MapSelectorComponent implements OnInit {
  filters: MapFilter[] = [];
  filterStrings: string[] = [];

  showQuery = false;
  mapName: string = null;
  orderBy: string;
  orderByDirection: string;

  @Output()
  search = new EventEmitter();

  constructor() {
  }

  onSearch() {
    const elideFilter = 'latestVersion.hidden==false'
      + this.filterStrings
        .map(filterString => ';' + filterString)
        .join('');
    this.mapName = elideFilter;
    this.search.emit(elideFilter);
  }

  ngOnInit(): void {
    this.filters.push({
      criterion: FilterCriterionComponent.unselectedCriterion,
      operator: FilterCriterionComponent.unselectedQueryCondition,
      value: '',
    });
    this.filterStrings.push('');
  }

  onChangedExpression(index: number, filterString: string) {
    this.filterStrings[index] = filterString;
  }
}
