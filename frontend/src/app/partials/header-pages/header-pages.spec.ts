import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderPages } from './header-pages';

describe('Cabeçalho das páginas', () => {
  let component: HeaderPages;
  let fixture: ComponentFixture<HeaderPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPages],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderPages);
    fixture.componentRef.setInput('title', 'Clientes');
    fixture.componentRef.setInput('onClick', () => {});
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
