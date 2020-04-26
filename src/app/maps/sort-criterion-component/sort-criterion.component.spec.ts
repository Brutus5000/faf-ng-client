import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SortCriterionComponent} from './sort-criterion.component';

describe('SortCriterionComponentComponent', () => {
  let component: SortCriterionComponent;
  let fixture: ComponentFixture<SortCriterionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SortCriterionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortCriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
