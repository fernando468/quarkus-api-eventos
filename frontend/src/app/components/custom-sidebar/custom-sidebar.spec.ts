import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CustomSidebar } from './custom-sidebar';

describe('Menu lateral personalizado', () => {
  let component: CustomSidebar;
  let fixture: ComponentFixture<CustomSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSidebar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
