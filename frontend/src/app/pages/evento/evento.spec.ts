import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Evento } from './evento';

describe('Página de evento', () => {
  let component: Evento;
  let fixture: ComponentFixture<Evento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Evento],
    }).compileComponents();

    fixture = TestBed.createComponent(Evento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
