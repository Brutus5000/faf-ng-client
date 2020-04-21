import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'faf-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.scss']
})
export class MapSelectorComponent implements OnInit {

  mapName: string = null;

  @Output()
  search = new EventEmitter();

  constructor() {
  }

  onSearch() {
    this.search.emit('latestVersion.hidden==false' + (this.mapName ? ';displayName==' + this.mapName : ''));
  }

  ngOnInit(): void {
  }

}
