import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QueryCondition} from '../../faf-api/query-condition';
import {FilterCriterion} from '../../faf-api/filter-criterion';
import {MapFilterCriteria} from '../../faf-api/map.service';

@Component({
  selector: 'faf-filter-criterion',
  templateUrl: './filter-criterion.component.html',
  styleUrls: ['./filter-criterion.component.scss']
})
export class FilterCriterionComponent implements OnInit {
  static unselectedCriterion: FilterCriterion = {
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

  static availableCriteria: FilterCriterion[] = [
    MapFilterCriteria.NAME,
    MapFilterCriteria.MAX_PLAYERS,
    MapFilterCriteria.WIDTH,
    MapFilterCriteria.HEIGHT,
  ];

  @Input()
  index: number;
  @Output()
  expressionChange = new EventEmitter<string>();
  @Output()
  remove = new EventEmitter();

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

  onRemove() {
    this.remove.emit();
  }
}
