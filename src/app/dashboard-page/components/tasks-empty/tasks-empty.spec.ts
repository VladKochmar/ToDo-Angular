import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksEmpty } from './tasks-empty';

describe('TasksEmpty', () => {
  let component: TasksEmpty;
  let fixture: ComponentFixture<TasksEmpty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksEmpty],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksEmpty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
