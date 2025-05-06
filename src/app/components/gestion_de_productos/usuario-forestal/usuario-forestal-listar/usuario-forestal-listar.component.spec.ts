import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioForestalListarComponent } from './usuario-forestal-listar.component';

describe('UsuarioForestalListarComponent', () => {
  let component: UsuarioForestalListarComponent;
  let fixture: ComponentFixture<UsuarioForestalListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioForestalListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioForestalListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
