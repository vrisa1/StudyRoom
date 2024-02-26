import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskHelpComponent } from './task-help.component';

describe('TaskHelpComponent', () => {
  let component: TaskHelpComponent;
  let fixture: ComponentFixture<TaskHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskHelpComponent]
    });
    fixture = TestBed.createComponent(TaskHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
