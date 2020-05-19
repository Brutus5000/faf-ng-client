import {Component, EventEmitter, Input, Output} from '@angular/core';
import {QueryCondition} from '../../faf-api/query-condition';
import {FilterItem, FilterTypes} from '../../faf-api/filter-types';
import {SelectItem} from 'primeng/api';

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
  expressionChange = new EventEmitter<FilterItem>();
  @Output()
  remove = new EventEmitter();

  selectedCriterion?: FilterTypes;
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
