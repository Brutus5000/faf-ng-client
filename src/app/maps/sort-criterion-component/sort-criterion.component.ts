import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {buildSortExpression, SortCriterion, SortOrder} from '../../faf-api/sort-criterion';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'faf-sort-criterion-component',
  templateUrl: './sort-criterion.component.html',
  styleUrls: ['./sort-criterion.component.scss']
})
export class SortCriterionComponent implements OnInit {
  SortOrder = SortOrder;

  @Output()
  expressionChange = new EventEmitter<string>();

  sortCriteria: SortCriterion[] = [
    {
      nameKey: 'Name',
      apiField: 'displayName'
    },
    {
      nameKey: 'Downloads',
      apiField: 'latestVersion.statistics.downloads'
    },
    {
      nameKey: 'Games played',
      apiField: 'latestVersion.statistics.plays'
    },
    {
      nameKey: 'Last update',
      apiField: 'latestVersion.updateTime'
    },
  ];

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

  criterion: SortCriterion = this.sortCriteria[2];
  direction = SortOrder.DESCENDING;

  constructor() {
  }

  ngOnInit(): void {
    this.onUpdate();
  }

  onUpdate(): void {
    const expression = buildSortExpression(this.criterion, this.direction);
    this.expressionChange.emit(expression);
  }


}
