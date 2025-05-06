import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RomaneoEditarComponent } from './romaneo-editar.component';

describe('RomaneoEditarComponent', () => {
  let component: RomaneoEditarComponent;
  let fixture: ComponentFixture<RomaneoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RomaneoEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RomaneoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
