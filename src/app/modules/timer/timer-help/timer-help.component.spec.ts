import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerHelpComponent } from './timer-help.component';

describe('TimerHelpComponent', () => {
  let component: TimerHelpComponent;
  let fixture: ComponentFixture<TimerHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimerHelpComponent]
    });
    fixture = TestBed.createComponent(TimerHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
