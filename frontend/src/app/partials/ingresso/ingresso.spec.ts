import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ingresso } from './ingresso';

describe('Ingresso', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
