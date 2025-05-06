import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RomaneoListarComponent } from './romaneo-listar.component';

describe('RomaneoListarComponent', () => {
  let component: RomaneoListarComponent;
  let fixture: ComponentFixture<RomaneoListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RomaneoListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RomaneoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
