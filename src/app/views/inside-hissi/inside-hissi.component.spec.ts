import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideHissiComponent } from './inside-hissi.component';

describe('InsideHissiComponent', () => {
  let component: InsideHissiComponent;
  let fixture: ComponentFixture<InsideHissiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsideHissiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideHissiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO : kirjoita kunnon testit
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
