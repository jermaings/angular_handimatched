import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface SocialEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  icon: string;
  attendees: number;
  maxAttendees: number;
  online: boolean;
}

@Component({
  selector: 'app-events',
  imports: [FormsModule],
  templateUrl: './events.html',
  styleUrl: './events.css'
})
export class Events {
  categoryFilter = signal('');
  modeFilter = signal('');

  events: SocialEvent[] = [
    {
      id: 1,
      title: 'Accessible Art Workshop',
      description: 'A hands-on art workshop designed for all abilities. Materials and adaptive tools provided.',
      date: '2026-03-05',
      time: '2:00 PM',
      location: 'San Francisco Community Center',
      category: 'Arts & Culture',
      icon: '🎨',
      attendees: 12,
      maxAttendees: 20,
      online: false
    },
    {
      id: 2,
      title: 'Virtual Coffee Social',
      description: 'Join us online for casual conversation and connection over your favourite coffee.',
      date: '2026-03-10',
      time: '10:00 AM',
      location: 'Zoom (link sent after RSVP)',
      category: 'Social',
      icon: '☕',
      attendees: 8,
      maxAttendees: 25,
      online: true
    },
    {
      id: 3,
      title: 'Adaptive Yoga Class',
      description: 'Chair yoga and adaptive poses for all mobility levels. Beginners welcome!',
      date: '2026-03-12',
      time: '9:00 AM',
      location: 'Wellness Studio, Chicago',
      category: 'Fitness',
      icon: '🧘',
      attendees: 15,
      maxAttendees: 15,
      online: false
    },
    {
      id: 4,
      title: 'Tech & Accessibility Meetup',
      description: 'Networking event for tech professionals and advocates in the accessibility space.',
      date: '2026-03-18',
      time: '6:00 PM',
      location: 'Seattle Tech Hub',
      category: 'Networking',
      icon: '💻',
      attendees: 30,
      maxAttendees: 50,
      online: false
    },
    {
      id: 5,
      title: 'Online Movie Night',
      description: 'Watch a captioned film together and discuss afterward. Subtitles and audio description available.',
      date: '2026-03-20',
      time: '7:00 PM',
      location: 'Virtual (Netflix Party)',
      category: 'Entertainment',
      icon: '🎬',
      attendees: 20,
      maxAttendees: 40,
      online: true
    },
    {
      id: 6,
      title: 'Accessible Nature Walk',
      description: 'A guided nature walk on paved, wheelchair-accessible trails in Golden Gate Park.',
      date: '2026-03-25',
      time: '10:30 AM',
      location: 'Golden Gate Park, SF',
      category: 'Outdoor',
      icon: '🌿',
      attendees: 10,
      maxAttendees: 20,
      online: false
    }
  ];

  categories = computed(() => {
    const set = new Set(this.events.map(e => e.category));
    return Array.from(set).sort();
  });

  filteredEvents = computed(() => {
    const cat = this.categoryFilter();
    const mode = this.modeFilter();
    return this.events.filter(e => {
      const matchesCat = !cat || e.category === cat;
      const matchesMode = !mode ||
        (mode === 'online' && e.online) ||
        (mode === 'in-person' && !e.online);
      return matchesCat && matchesMode;
    });
  });

  rsvpedEvents = signal<Set<number>>(new Set());

  toggleRsvp(eventId: number, isFull: boolean): void {
    if (isFull && !this.rsvpedEvents().has(eventId)) return;
    const current = new Set(this.rsvpedEvents());
    if (current.has(eventId)) {
      current.delete(eventId);
    } else {
      current.add(eventId);
    }
    this.rsvpedEvents.set(current);
  }

  isRsvped(eventId: number): boolean {
    return this.rsvpedEvents().has(eventId);
  }

  isFull(event: SocialEvent): boolean {
    return event.attendees >= event.maxAttendees;
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });
  }
}
