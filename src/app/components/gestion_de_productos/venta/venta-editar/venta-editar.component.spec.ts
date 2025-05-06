import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaEditarComponent } from './venta-editar.component';

describe('VentaEditarComponent', () => {
  let component: VentaEditarComponent;
  let fixture: ComponentFixture<VentaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
