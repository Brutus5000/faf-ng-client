import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {FilterCriterionComponent} from '../filter-criterion/filter-criterion.component';
import {buildSortExpression, SortSelection} from '../../faf-api/sort-criterion';
import {FilterSelection} from '../../faf-api/filter-criterion';

@Component({
  selector: 'faf-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.scss']
})
export class MapSelectorComponent implements AfterViewInit {
  filters: FilterSelection[] = [];
  filterStrings: string[] = [];
  sortingString = null;
  showQuery = false;
  queryString: string = null;

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
    this.queryString = elideFilter;
    this.search.emit({filter: elideFilter, sorting: this.sortingString});
  }

  ngAfterViewInit(): void {
    this.addCriterion();
    this.onSearch();
  }

  onFilterChange(index: number, filterString: string) {
    this.filterStrings[index] = filterString;
  }

  onSortingChange(sortSelection: SortSelection) {
    this.sortingString = buildSortExpression(sortSelection);
  }

  onRemove(index: number) {
    this.filters.splice(index, 1);
    this.filterStrings.splice(index, 1);
  }

  addCriterion() {
    this.filters.push({
      criterion: FilterCriterionComponent.unselectedCriterion,
      operator: FilterCriterionComponent.unselectedQueryCondition,
      value: '',
    });
    this.filterStrings.push('');
  }
}
