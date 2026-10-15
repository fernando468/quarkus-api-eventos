import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomInput } from './custom-input';

describe('CustomInput', () => {
  let component: CustomInput;
  let fixture: ComponentFixture<CustomInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomInput],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomInput);
    fixture.componentRef.setInput('form', new FormGroup({ nome: new FormControl('') }));
    fixture.componentRef.setInput('name', 'nome');
    fixture.componentRef.setInput('label', 'Nome');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
