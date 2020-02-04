import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorizeComponent } from './colorize.component';

describe('ColorizeComponent', () => {
  let component: ColorizeComponent;
  let fixture: ComponentFixture<ColorizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
