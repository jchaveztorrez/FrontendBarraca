import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoMaderaEditarComponent } from './producto-madera-editar.component';

describe('ProductoMaderaEditarComponent', () => {
  let component: ProductoMaderaEditarComponent;
  let fixture: ComponentFixture<ProductoMaderaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoMaderaEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoMaderaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
