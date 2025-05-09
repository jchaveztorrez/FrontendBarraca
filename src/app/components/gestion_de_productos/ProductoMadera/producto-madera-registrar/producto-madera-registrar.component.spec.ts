import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoMaderaRegistrarComponent } from './producto-madera-registrar.component';

describe('ProductoMaderaRegistrarComponent', () => {
  let component: ProductoMaderaRegistrarComponent;
  let fixture: ComponentFixture<ProductoMaderaRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoMaderaRegistrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoMaderaRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
