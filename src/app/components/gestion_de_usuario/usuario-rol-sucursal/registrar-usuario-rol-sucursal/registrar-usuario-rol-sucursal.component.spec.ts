import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarUsuarioRolSucursalComponent } from './registrar-usuario-rol-sucursal.component';

describe('RegistrarUsuarioRolSucursalComponent', () => {
  let component: RegistrarUsuarioRolSucursalComponent;
  let fixture: ComponentFixture<RegistrarUsuarioRolSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarUsuarioRolSucursalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarUsuarioRolSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
