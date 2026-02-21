import { Injectable } from '@angular/core';
import { User } from './auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    {
      id: 2,
      name: 'Jamie Rivera',
      email: 'jamie@example.com',
      avatar: 'https://i.pravatar.cc/150?img=2',
      bio: 'Wheelchair user who loves art, music and connecting with others.',
      interests: ['Art', 'Music', 'Movies'],
      location: 'Los Angeles, CA',
      age: 32
    },
    {
      id: 3,
      name: 'Morgan Lee',
      email: 'morgan@example.com',
      avatar: 'https://i.pravatar.cc/150?img=3',
      bio: 'Sign language enthusiast and coffee lover.',
      interests: ['Coffee', 'Reading', 'Sign Language'],
      location: 'Chicago, IL',
      age: 26
    },
    {
      id: 4,
      name: 'Sam Taylor',
      email: 'sam@example.com',
      avatar: 'https://i.pravatar.cc/150?img=4',
      bio: 'Adaptive athlete and motivational speaker.',
      interests: ['Sports', 'Fitness', 'Speaking'],
      location: 'Austin, TX',
      age: 34
    },
    {
      id: 5,
      name: 'Casey Mitchell',
      email: 'casey@example.com',
      avatar: 'https://i.pravatar.cc/150?img=6',
      bio: 'Tech enthusiast who loves accessibility-focused projects.',
      interests: ['Technology', 'Accessibility', 'Gaming'],
      location: 'Seattle, WA',
      age: 29
    },
    {
      id: 6,
      name: 'Drew Williams',
      email: 'drew@example.com',
      avatar: 'https://i.pravatar.cc/150?img=7',
      bio: 'Nature photographer with hearing impairment. Every picture tells a story.',
      interests: ['Photography', 'Nature', 'Travel'],
      location: 'Denver, CO',
      age: 31
    },
    {
      id: 7,
      name: 'Jordan Brooks',
      email: 'jordan@example.com',
      avatar: 'https://i.pravatar.cc/150?img=8',
      bio: 'Passionate chef adapting recipes to make cooking accessible for everyone.',
      interests: ['Cooking', 'Food', 'Community'],
      location: 'New York, NY',
      age: 27
    }
  ];

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }
}
