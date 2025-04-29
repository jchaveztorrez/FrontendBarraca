import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRolSucursalComponent } from './usuario-rol-sucursal.component';

describe('UsuarioRolSucursalComponent', () => {
  let component: UsuarioRolSucursalComponent;
  let fixture: ComponentFixture<UsuarioRolSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioRolSucursalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioRolSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
