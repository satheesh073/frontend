import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NmrComponent } from './nmr.component';

describe('NmrComponent', () => {
  let component: NmrComponent;
  let fixture: ComponentFixture<NmrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NmrComponent]
    });
    fixture = TestBed.createComponent(NmrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
