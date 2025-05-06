import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRomaneoListarComponent } from './detalle-romaneo-listar.component';

describe('DetalleRomaneoListarComponent', () => {
  let component: DetalleRomaneoListarComponent;
  let fixture: ComponentFixture<DetalleRomaneoListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleRomaneoListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleRomaneoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
