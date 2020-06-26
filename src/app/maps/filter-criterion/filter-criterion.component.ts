import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contains, Is, NumberConditions, QueryCondition, StringConditions} from '../../faf-api/query-condition';
import {FilterCriterion} from '../../faf-api/filter-criterion';

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
  @Input()
  availableCriteria: FilterTypes[];
  @Input()
  index: number;
  @Output()
  expressionChange = new EventEmitter<string>();
  @Output()
  remove = new EventEmitter();

  selectedCriterion?: FilterCriterion;
  selectedOperator?: QueryCondition;
  value?: string;
  active = true;

  onUpdate(): void {
    this.expressionChange.emit({
      criterion: this.selectedCriterion,
      operator: this.selectedOperator,
      value: this.value
    });
  }

  getAvailableOperators() {
    return this.selectedCriterion?.operators;
  }

  private toSelectItem(v: string): SelectItem {
    return {
      label: v.toString(),
      value: v
    };
  }

  getAvailableValues(): SelectItem[] {
    return (this.selectedCriterion?.availableValues ?? []).map(this.toSelectItem);
  }

  onSelectedCriterion() {
    this.selectedOperator = this.selectedCriterion.defaultOperator;
    this.onUpdate();
  }

  onRemove() {
    this.remove.emit();
  }
}
