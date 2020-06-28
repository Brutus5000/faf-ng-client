import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FilterCriterion, FilterSelection} from '../../faf-api/filter-types';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'faf-filter-criterion',
  templateUrl: './filter-criterion.component.html',
  styleUrls: ['./filter-criterion.component.scss']
})
export class FilterCriterionComponent {
  @Input()
  availableCriteria: FilterCriterion[];
  @Input()
  filter: FilterSelection;
  @Output()
  filterChange = new EventEmitter<FilterSelection>();

  @Output()
  expressionChange = new EventEmitter<FilterSelection>();
  @Output()
  remove = new EventEmitter();

  active = true;

  onUpdate(): void {
    if (this.filter && this.filter.criterion && this.filter.operator && this.filter.value) {
      this.filterChange.emit(this.filter);
    }
  }

  getAvailableOperators() {
    return this.filter?.criterion?.operators;
  }

  private toSelectItem(v: string): SelectItem {
    return {
      label: v.toString(),
      value: v
    };
  }

  getAvailableValues(): SelectItem[] {
    return (this.filter?.criterion?.availableValues ?? []).map(this.toSelectItem);
  }

  onSelectedCriterion() {
    this.filter.operator = this.filter.criterion.defaultOperator;
    this.onUpdate();
  }

  onRemove() {
    this.remove.emit();
  }
}
