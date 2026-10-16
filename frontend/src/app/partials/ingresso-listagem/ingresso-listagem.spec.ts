import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngressoListagem } from './ingresso-listagem';

describe('Listagem de ingressos', () => {
  let component: IngressoListagem;
  let fixture: ComponentFixture<IngressoListagem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngressoListagem],
    }).compileComponents();

    fixture = TestBed.createComponent(IngressoListagem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('deve ser criada', () => {
    expect(component).toBeTruthy();
  });
});
