import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SortCriterion, SortOrder, SortSelection} from '../../faf-api/sort-criterion';
import {MapSortCriteria} from '../../faf-api/map.service';

@Component({
  selector: 'faf-sort-criterion-component',
  templateUrl: './sort-criterion.component.html',
  styleUrls: ['./sort-criterion.component.scss']
})
export class SortCriterionComponent implements OnInit {
  SortOrder = SortOrder;

  @Output()
  sortSelectionChange = new EventEmitter<SortSelection>();

  sortCriteria: SortCriterion[] = MapSortCriteria.ALL;

  criterion: SortCriterion = MapSortCriteria.DOWNLOADS;
  direction = SortOrder.DESCENDING;

  constructor() {
  }

  ngOnInit(): void {
    this.onUpdate();
  }

  onUpdate(): void {
    this.sortSelectionChange.emit({
      criterion: this.criterion,
      direction: this.direction
    });
  }

}
