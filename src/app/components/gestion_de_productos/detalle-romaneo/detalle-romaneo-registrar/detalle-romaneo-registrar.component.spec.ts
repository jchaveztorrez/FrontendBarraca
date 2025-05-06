import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRomaneoRegistrarComponent } from './detalle-romaneo-registrar.component';

describe('DetalleRomaneoRegistrarComponent', () => {
  let component: DetalleRomaneoRegistrarComponent;
  let fixture: ComponentFixture<DetalleRomaneoRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleRomaneoRegistrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleRomaneoRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
