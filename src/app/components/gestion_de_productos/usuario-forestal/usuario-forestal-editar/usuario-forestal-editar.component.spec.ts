import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioForestalEditarComponent } from './usuario-forestal-editar.component';

describe('UsuarioForestalEditarComponent', () => {
  let component: UsuarioForestalEditarComponent;
  let fixture: ComponentFixture<UsuarioForestalEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioForestalEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioForestalEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
