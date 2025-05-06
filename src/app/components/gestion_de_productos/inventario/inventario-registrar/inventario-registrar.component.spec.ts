import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioRegistrarComponent } from './inventario-registrar.component';

describe('InventarioRegistrarComponent', () => {
  let component: InventarioRegistrarComponent;
  let fixture: ComponentFixture<InventarioRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioRegistrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
