import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersByCategoryComponent } from './users-by-category.component';

describe('UsersByCategoryComponent', () => {
  let component: UsersByCategoryComponent;
  let fixture: ComponentFixture<UsersByCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersByCategoryComponent]
    });
    fixture = TestBed.createComponent(UsersByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
