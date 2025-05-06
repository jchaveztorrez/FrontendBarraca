import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioForestalRegistrarComponent } from './usuario-forestal-registrar.component';

describe('UsuarioForestalRegistrarComponent', () => {
  let component: UsuarioForestalRegistrarComponent;
  let fixture: ComponentFixture<UsuarioForestalRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioForestalRegistrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioForestalRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
