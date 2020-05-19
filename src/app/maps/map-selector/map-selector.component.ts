import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {FilterItem, FilterTypes} from '../../faf-api/filter-types';
import {Contains, Is, NumberConditions, StringConditions} from '../../faf-api/query-condition';

@Component({
  selector: 'faf-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.scss']
})
export class MapSelectorComponent implements AfterViewInit {
  availableCriteria: FilterTypes[] = [
    {
      nameKey: 'Name',
      apiField: 'displayName',
      operators: StringConditions,
      defaultOperator: Contains,
      availableValues: null,
    },
    {
      nameKey: 'Max. Players',
      apiField: 'latestVersion.maxPlayers',
      operators: NumberConditions,
      defaultOperator: Is,
      availableValues: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    },
    {
      nameKey: 'Width',
      apiField: 'latestVersion.width',
      operators: NumberConditions,
      defaultOperator: Is,
      availableValues: [256, 512, 1024, 2048],
    },
    {
      nameKey: 'Height',
      apiField: 'latestVersion.height',
      operators: NumberConditions,
      defaultOperator: Is,
      availableValues: [256, 512, 1024, 2048],
    },
  ];


  filters: FilterItem[] = [];
  filterItems: FilterItem[] = [];
  sortingString = null;
  showQuery = false;
  mapName: string = null;

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

    this.mapName = elideFilter;
    this.search.emit({filter: elideFilter, sorting: this.sortingString});
  }

  ngAfterViewInit(): void {
    this.addCriterion();
    this.onSearch();
  }

  onFilterChange(index: number, filterItem: FilterItem) {
    this.filterItems[index] = filterItem;
  }

  onSortingChange(sortingString: string) {
    this.sortingString = sortingString;
  }

  onRemove(index: number) {
    this.filters.splice(index, 1);
    this.filterItems.splice(index, 1);
  }

  addCriterion() {
    this.filters.push({
      criterion: null,
      operator: null,
      value: null,
    });
    this.filterItems.push({
      criterion: null,
      operator: null,
      value: null,
    });
  }
}
