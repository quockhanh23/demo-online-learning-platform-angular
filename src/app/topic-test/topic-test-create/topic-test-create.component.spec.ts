import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TopicTestCreateComponent} from './topic-test-create.component';

describe('TopicTestCreateComponent', () => {
  let component: TopicTestCreateComponent;
  let fixture: ComponentFixture<TopicTestCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicTestCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicTestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
