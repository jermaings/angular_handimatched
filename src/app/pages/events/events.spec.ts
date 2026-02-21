import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Events } from './events';

describe('Events', () => {
  let component: Events;
  let fixture: ComponentFixture<Events>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Events]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Events);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all events by default', () => {
    expect(component.filteredEvents().length).toBe(component.events.length);
  });

  it('should filter by category', () => {
    component.categoryFilter.set('Social');
    const results = component.filteredEvents();
    expect(results.every(e => e.category === 'Social')).toBe(true);
  });

  it('should filter online events', () => {
    component.modeFilter.set('online');
    const results = component.filteredEvents();
    expect(results.every(e => e.online)).toBe(true);
  });

  it('should toggle RSVP', () => {
    const eventId = 1;
    expect(component.isRsvped(eventId)).toBe(false);
    component.toggleRsvp(eventId, false);
    expect(component.isRsvped(eventId)).toBe(true);
    component.toggleRsvp(eventId, false);
    expect(component.isRsvped(eventId)).toBe(false);
  });

  it('should format date correctly', () => {
    const formatted = component.formatDate('2026-03-05');
    expect(formatted).toContain('2026');
  });
});
