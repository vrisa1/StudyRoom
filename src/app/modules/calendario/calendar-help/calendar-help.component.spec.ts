import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarHelpComponent } from './calendar-help.component';

describe('CalendarHelpComponent', () => {
  let component: CalendarHelpComponent;
  let fixture: ComponentFixture<CalendarHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarHelpComponent]
    });
    fixture = TestBed.createComponent(CalendarHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
