import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUsuarioRolSucursalComponent } from './editar-usuario-rol-sucursal.component';

describe('EditarUsuarioRolSucursalComponent', () => {
  let component: EditarUsuarioRolSucursalComponent;
  let fixture: ComponentFixture<EditarUsuarioRolSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarUsuarioRolSucursalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarUsuarioRolSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
