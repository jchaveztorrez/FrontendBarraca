import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaReciboListarComponent } from './factura-recibo-listar.component';

describe('FacturaReciboListarComponent', () => {
  let component: FacturaReciboListarComponent;
  let fixture: ComponentFixture<FacturaReciboListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturaReciboListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturaReciboListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
