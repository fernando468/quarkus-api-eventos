import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ingresso } from './ingresso';

describe('Página de ingresso', () => {
  let component: Ingresso;
  let fixture: ComponentFixture<Ingresso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ingresso],
    }).compileComponents();

    fixture = TestBed.createComponent(Ingresso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
