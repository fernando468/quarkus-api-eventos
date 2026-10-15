import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventoListagem } from './evento-listagem';

describe('EventoListagem', () => {
  let component: EventoListagem;
  let fixture: ComponentFixture<EventoListagem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoListagem],
    }).compileComponents();

    fixture = TestBed.createComponent(EventoListagem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
