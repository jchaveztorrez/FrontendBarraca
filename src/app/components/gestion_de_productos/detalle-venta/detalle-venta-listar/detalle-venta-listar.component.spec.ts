import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVentaListarComponent } from './detalle-venta-listar.component';

describe('DetalleVentaListarComponent', () => {
  let component: DetalleVentaListarComponent;
  let fixture: ComponentFixture<DetalleVentaListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleVentaListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleVentaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
