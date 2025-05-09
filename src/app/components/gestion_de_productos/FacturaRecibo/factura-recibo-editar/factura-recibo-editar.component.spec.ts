import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaReciboEditarComponent } from './factura-recibo-editar.component';

describe('FacturaReciboEditarComponent', () => {
  let component: FacturaReciboEditarComponent;
  let fixture: ComponentFixture<FacturaReciboEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturaReciboEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturaReciboEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
