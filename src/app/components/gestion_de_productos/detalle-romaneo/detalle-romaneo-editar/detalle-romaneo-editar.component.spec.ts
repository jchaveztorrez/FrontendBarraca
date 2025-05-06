import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRomaneoEditarComponent } from './detalle-romaneo-editar.component';

describe('DetalleRomaneoEditarComponent', () => {
  let component: DetalleRomaneoEditarComponent;
  let fixture: ComponentFixture<DetalleRomaneoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleRomaneoEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleRomaneoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
