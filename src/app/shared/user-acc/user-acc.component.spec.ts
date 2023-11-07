import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccComponent } from './user-acc.component';

describe('UserAccComponent', () => {
  let component: UserAccComponent;
  let fixture: ComponentFixture<UserAccComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAccComponent]
    });
    fixture = TestBed.createComponent(UserAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
