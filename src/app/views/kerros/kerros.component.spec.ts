import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KerrosComponent } from './kerros.component';

describe('KerrosComponent', () => {
  let component: KerrosComponent;
  let fixture: ComponentFixture<KerrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KerrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KerrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO : kirjoita kunnon testit
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
