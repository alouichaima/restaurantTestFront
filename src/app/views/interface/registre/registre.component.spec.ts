import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistreComponent } from './registre.component';
import { AuthService } from 'src/app/__services/auth.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegistreComponent', () => {
  let component: RegistreComponent;
  let fixture: ComponentFixture<RegistreComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistreComponent],
      imports: [HttpClientTestingModule],
      providers: [AuthService],
      schemas: [NO_ERRORS_SCHEMA], // Ignore unknown elements in the template
    }).compileComponents();

    fixture = TestBed.createComponent(RegistreComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call register method and handle success response', () => {
    const mockResponse = { message: 'User registered successfully' };
    component.form = { username: 'testuser', email: 'test@example.com', password: 'password123' };

    spyOn(authService, 'register').and.returnValue(of(mockResponse));

    component.onSubmit();

    expect(component.isSuccessful).toBeTrue();
    expect(component.isSignUpFailed).toBeFalse();
    expect(component.errorMessage).toBe('');
  });

  it('should handle error when registration fails', () => {
    const mockError = { error: { message: 'Invalid input' } };
    component.form = { username: 'testuser', email: 'test@example.com', password: 'password123' };

    spyOn(authService, 'register').and.returnValue(throwError(() => mockError));

    component.onSubmit();

    expect(component.isSuccessful).toBeFalse();
    expect(component.isSignUpFailed).toBeTrue();
    expect(component.errorMessage).toBe('Invalid input');
  });
});
