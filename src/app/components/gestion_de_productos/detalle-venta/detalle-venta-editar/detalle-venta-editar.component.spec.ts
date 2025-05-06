import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVentaEditarComponent } from './detalle-venta-editar.component';

describe('DetalleVentaEditarComponent', () => {
  let component: DetalleVentaEditarComponent;
  let fixture: ComponentFixture<DetalleVentaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleVentaEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleVentaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
