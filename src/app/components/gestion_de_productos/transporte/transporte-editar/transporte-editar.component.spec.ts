import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporteEditarComponent } from './transporte-editar.component';

describe('TransporteEditarComponent', () => {
  let component: TransporteEditarComponent;
  let fixture: ComponentFixture<TransporteEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransporteEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransporteEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
