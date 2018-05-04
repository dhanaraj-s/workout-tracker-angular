import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartworkoutComponent } from './startworkout.component';

describe('StartworkoutComponent', () => {
  let component: StartworkoutComponent;
  let fixture: ComponentFixture<StartworkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartworkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartworkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
