import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporteRegistrarComponent } from './transporte-registrar.component';

describe('TransporteRegistrarComponent', () => {
  let component: TransporteRegistrarComponent;
  let fixture: ComponentFixture<TransporteRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransporteRegistrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransporteRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
