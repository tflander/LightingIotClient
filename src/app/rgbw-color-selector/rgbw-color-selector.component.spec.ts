import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgbwColorSelectorComponent } from './rgbw-color-selector.component';

describe('RgbwColorSelectorComponent', () => {
  let component: RgbwColorSelectorComponent;
  let fixture: ComponentFixture<RgbwColorSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RgbwColorSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RgbwColorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO: messages component doesn't belong in this module.  Need to route through parent
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
