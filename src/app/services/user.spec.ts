import { TestBed } from '@angular/core/testing';
import { UserService } from './user';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of users', () => {
    const users = service.getUsers();
    expect(users.length).toBeGreaterThan(0);
  });

  it('should find a user by id', () => {
    const user = service.getUserById(2);
    expect(user).toBeDefined();
    expect(user?.id).toBe(2);
  });

  it('should return undefined for unknown id', () => {
    const user = service.getUserById(999);
    expect(user).toBeUndefined();
  });
});
