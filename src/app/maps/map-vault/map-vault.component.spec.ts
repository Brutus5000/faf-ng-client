impapport;
{
  async, ComponentFixture, TestBed;
}
from;
'@angular/core/testing';

import {MapVaultComponent} from './map-vault.component';

describe('MapVaultComponent', () => {
  let component: MapVaultComponent;
  let fixture: ComponentFixture<MapVaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapVaultComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapVaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
