import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVentaRegistrarComponent } from './detalle-venta-registrar.component';

describe('DetalleVentaRegistrarComponent', () => {
  let component: DetalleVentaRegistrarComponent;
  let fixture: ComponentFixture<DetalleVentaRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleVentaRegistrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleVentaRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
