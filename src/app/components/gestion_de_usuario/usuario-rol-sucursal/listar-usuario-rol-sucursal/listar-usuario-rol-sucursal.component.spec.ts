import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarUsuarioRolSucursalComponent } from './listar-usuario-rol-sucursal.component';

describe('ListarUsuarioRolSucursalComponent', () => {
  let component: ListarUsuarioRolSucursalComponent;
  let fixture: ComponentFixture<ListarUsuarioRolSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarUsuarioRolSucursalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarUsuarioRolSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
