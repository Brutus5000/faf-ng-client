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
  sortingString = null;
  showQuery = false;
  queryString: string = null;

  @Output()
  search = new EventEmitter();

  constructor() {
  }

  onSearch() {
    const elideFilter = 'latestVersion.hidden==false'
      + this.filterItems
        .map(item => {
          if (item.criterion && item.operator && item.value) {
            return item.operator.buildFilterExpression(item.criterion.apiField, item.value);
          } else {
            return '';
          }
        })
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

  onFilterChange(index: number, filterItem: FilterSelection) {
    this.filterItems[index] = filterItem;
  }

  onSortingChange(sortSelection: SortSelection) {
    this.sortingString = buildSortExpression(sortSelection);
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
    this.filters.push({
      criterion: null,
      operator: null,
      value: null,
    });
  }
}
