import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Register } from './register';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error when form is empty', () => {
    component.onSubmit();
    expect(component.error).toBe('Please fill in all fields.');
  });

  it('should show error when passwords do not match', () => {
    component.name = 'Test User';
    component.email = 'test@example.com';
    component.password = 'pass123';
    component.confirmPassword = 'different';
    component.onSubmit();
    expect(component.error).toBe('Passwords do not match.');
  });
});
