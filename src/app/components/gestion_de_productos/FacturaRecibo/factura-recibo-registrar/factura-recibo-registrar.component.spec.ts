import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaReciboRegistrarComponent } from './factura-recibo-registrar.component';

describe('FacturaReciboRegistrarComponent', () => {
  let component: FacturaReciboRegistrarComponent;
  let fixture: ComponentFixture<FacturaReciboRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturaReciboRegistrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturaReciboRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
