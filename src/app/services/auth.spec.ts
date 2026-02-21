import { TestBed } from '@angular/core/testing';
import { Auth } from './auth';

describe('Auth', () => {
  let service: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be logged in initially', () => {
    expect(service.isLoggedIn()).toBe(false);
    expect(service.currentUser()).toBeNull();
  });

  it('should login with valid credentials', () => {
    const result = service.login('test@example.com', 'password123');
    expect(result).toBe(true);
    expect(service.isLoggedIn()).toBe(true);
    expect(service.currentUser()?.email).toBe('test@example.com');
  });

  it('should not login with empty credentials', () => {
    const result = service.login('', '');
    expect(result).toBe(false);
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should register a new user', () => {
    const result = service.register('Jane Doe', 'jane@example.com', 'pass123');
    expect(result).toBe(true);
    expect(service.isLoggedIn()).toBe(true);
    expect(service.currentUser()?.name).toBe('Jane Doe');
  });

  it('should logout the user', () => {
    service.login('test@example.com', 'password123');
    service.logout();
    expect(service.isLoggedIn()).toBe(false);
    expect(service.currentUser()).toBeNull();
  });

  it('should update user profile', () => {
    service.login('test@example.com', 'password123');
    const user = service.currentUser()!;
    const updated = { ...user, name: 'Updated Name', bio: 'New bio' };
    service.updateUser(updated);
    expect(service.currentUser()?.name).toBe('Updated Name');
    expect(service.currentUser()?.bio).toBe('New bio');
  });
});
