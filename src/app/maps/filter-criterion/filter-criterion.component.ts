import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Contains, Is, NumberConditions, QueryCondition, StringConditions} from '../../faf-api/query-condition';
import {FilterCriterion} from '../../faf-api/filter-criterion';
import {SelectItem} from 'primeng/api';

export interface MapFilter {
  criterion: FilterCriterion;
  operator: QueryCondition;
  value: string;
}

@Component({
  selector: 'faf-filter-criterion',
  templateUrl: './filter-criterion.component.html',
  styleUrls: ['./filter-criterion.component.scss']
})
export class FilterCriterionComponent {
  static availableCriteria: FilterCriterion[] = [
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
  @Output()
  remove = new EventEmitter();

  criterion?: FilterCriterion;
  operator?: QueryCondition;
  value?: string;
  active = true;

  onUpdate(): void {
    if (this.criterion && this.operator && this.value
    ) {
      this.expressionChange.emit(this.active
        ? this.operator.buildFilterExpression(this.criterion.apiField, this.value)
        : '');
    }
  }

  getAvailableCriteria() {
    return FilterCriterionComponent.availableCriteria;
  }

  getAvailableOperators() {
    return this.criterion?.operators;
  }

  getAvailableValues(): SelectItem[] {
    return (this.criterion?.availableValues ?? []).map(v => {
        return {
          label: v.toString(),
          value: v
        };
      }
    );
  }

  onSelectedCriterion() {
    this.operator = this.criterion.defaultOperator;
    this.onUpdate();
  }

  onRemove() {
    this.remove.emit();
  }
}
