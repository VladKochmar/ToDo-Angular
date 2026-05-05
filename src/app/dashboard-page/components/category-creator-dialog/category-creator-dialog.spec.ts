import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCreatorDialog } from './category-creator-dialog';

describe('CategoryCreatorDialog', () => {
  let component: CategoryCreatorDialog;
  let fixture: ComponentFixture<CategoryCreatorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryCreatorDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryCreatorDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
