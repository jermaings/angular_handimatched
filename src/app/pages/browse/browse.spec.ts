import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Browse } from './browse';

describe('Browse', () => {
  let component: Browse;
  let fixture: ComponentFixture<Browse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Browse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Browse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show all users initially', () => {
    expect(component.filteredUsers().length).toBeGreaterThan(0);
    expect(component.filteredUsers().length).toBe(component.allUsers.length);
  });

  it('should filter users by search query', () => {
    component.searchQuery.set('jamie');
    const results = component.filteredUsers();
    expect(results.every(u => u.name.toLowerCase().includes('jamie') || u.bio.toLowerCase().includes('jamie'))).toBe(true);
  });

  it('should toggle like', () => {
    const userId = 2;
    expect(component.isLiked(userId)).toBe(false);
    component.toggleLike(userId);
    expect(component.isLiked(userId)).toBe(true);
    component.toggleLike(userId);
    expect(component.isLiked(userId)).toBe(false);
  });
});
