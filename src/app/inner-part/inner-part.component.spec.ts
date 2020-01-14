import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerPartComponent } from './inner-part.component';

describe('InnerPartComponent', () => {
  let component: InnerPartComponent;
  let fixture: ComponentFixture<InnerPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
