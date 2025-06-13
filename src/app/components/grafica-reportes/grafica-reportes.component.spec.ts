import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaReportesComponent } from './grafica-reportes.component';

describe('GraficaReportesComponent', () => {
  let component: GraficaReportesComponent;
  let fixture: ComponentFixture<GraficaReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficaReportesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficaReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
