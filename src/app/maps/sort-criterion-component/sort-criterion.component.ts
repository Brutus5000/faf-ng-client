import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SortCriterion, SortOrder, SortSelection} from '../../faf-api/sort-criterion';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'faf-sort-criterion-component',
  templateUrl: './sort-criterion.component.html',
  styleUrls: ['./sort-criterion.component.scss']
})
export class SortCriterionComponent implements OnInit {
  directions: SelectItem[] = [
    {
      label: 'DESC',
      value: SortOrder.DESCENDING
    },
    {
      label: 'ASC',
      value: SortOrder.ASCENDING
    }
  ];

  @Input()
  availableSortCriteria: SortCriterion[];

  @Input()
  sortSelection: SortSelection;

  @Output()
  sortSelectionChange = new EventEmitter<SortSelection>();

  constructor() {
  }

  ngOnInit(): void {
    this.onUpdate();
  }

  onUpdate(): void {
    if (this.sortSelection && this.sortSelection.criterion && this.sortSelection.direction) {
      this.sortSelectionChange.emit(this.sortSelection);
    }
  }

}
