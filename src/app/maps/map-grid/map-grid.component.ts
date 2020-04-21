import {Component, Input, OnInit} from '@angular/core';
import {FMap} from '../../faf-api/FMap';

@Component({
  selector: 'faf-map-grid',
  templateUrl: './map-grid.component.html',
  styleUrls: ['./map-grid.component.scss']
})
export class MapGridComponent implements OnInit {
  @Input()
  public maps: FMap[];

  public constructor() {
  }

  ngOnInit(): void {
  }

}
