import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioListarComponent } from './inventario-listar.component';

describe('InventarioListarComponent', () => {
  let component: InventarioListarComponent;
  let fixture: ComponentFixture<InventarioListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
