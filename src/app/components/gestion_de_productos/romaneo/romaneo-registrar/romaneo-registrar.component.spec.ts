import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RomaneoRegistrarComponent } from './romaneo-registrar.component';

describe('RomaneoRegistrarComponent', () => {
  let component: RomaneoRegistrarComponent;
  let fixture: ComponentFixture<RomaneoRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RomaneoRegistrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RomaneoRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
