import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoMaderaListarComponent } from './producto-madera-listar.component';

describe('ProductoMaderaListarComponent', () => {
  let component: ProductoMaderaListarComponent;
  let fixture: ComponentFixture<ProductoMaderaListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoMaderaListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoMaderaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
