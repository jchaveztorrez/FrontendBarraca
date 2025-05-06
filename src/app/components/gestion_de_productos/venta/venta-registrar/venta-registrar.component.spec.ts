import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaRegistrarComponent } from './venta-registrar.component';

describe('VentaRegistrarComponent', () => {
  let component: VentaRegistrarComponent;
  let fixture: ComponentFixture<VentaRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaRegistrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
