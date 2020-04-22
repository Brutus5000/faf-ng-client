import {Component, Input, OnInit} from '@angular/core';
import {FMap} from '../../faf-api/FMap';
import {faDownload, faGamepad, faRulerCombined, faUsers} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'faf-map-grid',
  templateUrl: './map-grid.component.html',
  styleUrls: ['./map-grid.component.scss']
})
export class MapGridComponent implements OnInit {
  @Input()
  public maps: FMap[];

  faGamepad = faGamepad;
  faDownload = faDownload;
  faRulerCombined = faRulerCombined;
  faUsers = faUsers;

  public constructor() {
  }

  ngOnInit(): void {
  }

}
