import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contains, Is, NumberConditions, QueryCondition, StringConditions} from '../../faf-api/query-condition';

interface MapCriterion {
  nameKey: string;
  apiField: string;
  operators: QueryCondition[];
  defaultOperator: QueryCondition;
  availableValues: any[];
}

export interface MapFilter {
  criterion: MapCriterion;
  operator: QueryCondition;
  value: string;
}

@Component({
  selector: 'faf-filter-criterion',
  templateUrl: './filter-criterion.component.html',
  styleUrls: ['./filter-criterion.component.scss']
})
export class FilterCriterionComponent implements OnInit {
  static unselectedCriterion: MapCriterion = {
    nameKey: 'select',
    apiField: null,
    operators: [],
    defaultOperator: null,
    availableValues: null,
  };

  static unselectedQueryCondition: QueryCondition = {
    nameKey: '',
    buildFilterExpression(field: string, value: string) {
      return ``;
    }
  };

  static availableCriteria: MapCriterion[] = [
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

  @Input()
  index: number;
  @Output()
  expressionChange = new EventEmitter<string>();

  criterion = FilterCriterionComponent.unselectedCriterion;
  operator: QueryCondition = FilterCriterionComponent.unselectedQueryCondition;
  value: string;
  active = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  onUpdate(): void {
    if (this.criterion !== FilterCriterionComponent.unselectedCriterion
      && this.operator !== FilterCriterionComponent.unselectedQueryCondition
      && this.value
    ) {
      this.expressionChange.emit(this.active
        ? this.operator.buildFilterExpression(this.criterion.apiField, this.value)
        : '');
    }
  }

  getUnselectedCriterion() {
    return FilterCriterionComponent.unselectedCriterion;
  }

  getUnselectedOperator() {
    return FilterCriterionComponent.unselectedQueryCondition;
  }

  getAvailableCriteria() {
    return FilterCriterionComponent.availableCriteria;
  }

  getAvailableOperators() {
    return this.criterion.operators;
  }

  onSelectedCriterion() {
    this.operator = this.criterion.defaultOperator;
    this.onUpdate();
  }
}
