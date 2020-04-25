import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QueryCondition, StringConditions} from '../../faf-api/query-condition';

interface MapCriterion {
  nameKey: string;
  apiField: string;
  operators: QueryCondition[];
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
    availableValues: null,
  };

  static unselectedQueryCondition: QueryCondition = {
    nameKey: 'select',
    buildFilterExpression(field: string, value: string) {
      return ``;
    }
  };

  static availableCriteria: MapCriterion[] = [
    {
      nameKey: 'name',
      apiField: 'displayName',
      operators: StringConditions,
      availableValues: null,
    }
  ];

  @Input()
  index: number;
  @Output()
  expressionChange = new EventEmitter<string>();

  criterion = FilterCriterionComponent.unselectedCriterion;
  operator: QueryCondition = FilterCriterionComponent.unselectedQueryCondition;
  value: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  onUpdate(): void {
    if (this.criterion !== FilterCriterionComponent.unselectedCriterion
      && this.operator !== FilterCriterionComponent.unselectedQueryCondition
      && this.value) {
      this.expressionChange.emit(this.operator.buildFilterExpression(this.criterion.apiField, this.value));
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
}
