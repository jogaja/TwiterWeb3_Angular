import { ComponentFixture, TestBed } from '@angular/core/testing';

import { edit_profileComponent } from './edit-profile.component';

describe('edit_profileComponent', () => {
  let component: edit_profileComponent;
  let fixture: ComponentFixture<edit_profileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ edit_profileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(edit_profileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
