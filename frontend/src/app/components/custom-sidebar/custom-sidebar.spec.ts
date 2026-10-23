import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao-service';
import { CustomSidebar } from './custom-sidebar';

@Component({
  imports: [CustomSidebar],
  template:
    '<app-custom-sidebar><span class="projected-content">Conteúdo</span></app-custom-sidebar>',
})
class CustomSidebarHost {}

describe('Menu lateral personalizado', () => {
  let component: CustomSidebar;
  let fixture: ComponentFixture<CustomSidebar>;
  const autenticacaoService = {
    authenticated: signal(false),
    admin: signal(false),
    logout: vi.fn(),
  };

  beforeEach(async () => {
    autenticacaoService.authenticated.set(false);
    autenticacaoService.admin.set(false);
    await TestBed.configureTestingModule({
      imports: [CustomSidebar],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: AutenticacaoService, useValue: autenticacaoService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve manter o conteúdo projetado ao autenticar', () => {
    const hostFixture = TestBed.createComponent(CustomSidebarHost);
    hostFixture.detectChanges();

    expect(hostFixture.nativeElement.querySelector('.projected-content')).toBeTruthy();
    expect(hostFixture.nativeElement.querySelector('mat-drawer h2')).toBeFalsy();

    autenticacaoService.authenticated.set(true);
    hostFixture.detectChanges();

    expect(hostFixture.nativeElement.querySelector('.projected-content')).toBeTruthy();
    expect(hostFixture.nativeElement.querySelector('mat-drawer h2')).toBeTruthy();
  });
});
