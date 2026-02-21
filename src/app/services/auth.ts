import { Injectable, signal } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  interests: string[];
  location: string;
  age: number;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private currentUserSignal = signal<User | null>(null);
  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isLoggedIn = signal(false);

  login(email: string, password: string): boolean {
    if (email && password) {
      const user: User = {
        id: 1,
        name: 'Alex Johnson',
        email: email,
        avatar: 'https://i.pravatar.cc/150?img=1',
        bio: 'Love outdoor activities and meeting new people!',
        interests: ['Hiking', 'Photography', 'Cooking'],
        location: 'San Francisco, CA',
        age: 28
      };
      this.currentUserSignal.set(user);
      this.isLoggedIn.set(true);
      return true;
    }
    return false;
  }

  register(name: string, email: string, password: string): boolean {
    if (name && email && password) {
      const user: User = {
        id: Date.now(),
        name: name,
        email: email,
        avatar: 'https://i.pravatar.cc/150?img=5',
        bio: 'New to HandiMatched!',
        interests: [],
        location: '',
        age: 25
      };
      this.currentUserSignal.set(user);
      this.isLoggedIn.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUserSignal.set(null);
    this.isLoggedIn.set(false);
  }

  updateUser(user: User): void {
    this.currentUserSignal.set(user);
  }
}
