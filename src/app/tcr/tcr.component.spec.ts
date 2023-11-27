import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TcrComponent } from './tcr.component';

describe('TcrComponent', () => {
  let component: TcrComponent;
  let fixture: ComponentFixture<TcrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TcrComponent]
    });
    fixture = TestBed.createComponent(TcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
