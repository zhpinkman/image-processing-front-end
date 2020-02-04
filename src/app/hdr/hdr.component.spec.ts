import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HdrComponent } from './hdr.component';

describe('HdrComponent', () => {
  let component: HdrComponent;
  let fixture: ComponentFixture<HdrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HdrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HdrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
