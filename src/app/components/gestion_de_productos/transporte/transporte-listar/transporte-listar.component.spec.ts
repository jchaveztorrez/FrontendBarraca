import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporteListarComponent } from './transporte-listar.component';

describe('TransporteListarComponent', () => {
  let component: TransporteListarComponent;
  let fixture: ComponentFixture<TransporteListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransporteListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransporteListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
