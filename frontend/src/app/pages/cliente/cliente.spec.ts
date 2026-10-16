import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cliente } from './cliente';

describe('Página de cliente', () => {
  let component: Cliente;
  let fixture: ComponentFixture<Cliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cliente],
    }).compileComponents();

    fixture = TestBed.createComponent(Cliente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
