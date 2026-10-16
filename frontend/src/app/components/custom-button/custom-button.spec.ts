import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomButton } from './custom-button';

describe('Botão personalizado', () => {
  let component: CustomButton;
  let fixture: ComponentFixture<CustomButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomButton],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomButton);
    fixture.componentRef.setInput('title', 'Salvar');
    fixture.componentRef.setInput('onClick', () => {});
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
