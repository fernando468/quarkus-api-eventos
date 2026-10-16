import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomAutocomplete } from './custom-autocomplete';

type TestObject = {
  id: number;
  name: string;
};

describe('Autocomplete personalizado', () => {
  let fixture: ComponentFixture<CustomAutocomplete<TestObject>>;
  let component: CustomAutocomplete<TestObject>;

  const options = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomAutocomplete],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomAutocomplete<TestObject>);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'form',
      new FormGroup({ cliente: new FormControl<unknown>(null) }),
    );
    fixture.componentRef.setInput('name', 'cliente');
    fixture.componentRef.setInput('label', 'Cliente');
    fixture.componentRef.setInput('placeholder', 'Busque');
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('displayWith', (value: unknown) =>
      value && typeof value === 'object' && 'name' in value ? String(value.name) : '',
    );
    fixture.componentRef.setInput(
      'filterFn',
      (option: object, searchTerm: string) =>
        'name' in option &&
        typeof option.name === 'string' &&
        option.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    fixture.componentRef.setInput('openOnFocus', false);
    fixture.detectChanges();
  });

  it('não deve exibir opções antes de iniciar a busca quando abrir ao focar estiver desativado', () => {
    let filteredOptions: object[] = [];
    component.filteredOptions.subscribe((values) => (filteredOptions = values));

    expect(filteredOptions).toEqual([]);
  });

  it('deve filtrar as opções após informar um termo de busca', () => {
    let filteredOptions: object[] = [];
    component.filteredOptions.subscribe((values) => (filteredOptions = values));

    component.control().setValue('ali');

    expect(filteredOptions).toEqual([options[0]]);
  });
});
