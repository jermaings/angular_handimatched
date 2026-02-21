import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user';
import { User } from '../../services/auth';

@Component({
  selector: 'app-browse',
  imports: [FormsModule],
  templateUrl: './browse.html',
  styleUrl: './browse.css'
})
export class Browse {
  private readonly userService = inject(UserService);

  searchQuery = signal('');
  selectedInterest = signal('');

  allUsers = this.userService.getUsers();

  allInterests = computed(() => {
    const set = new Set<string>();
    this.allUsers.forEach(u => u.interests.forEach(i => set.add(i)));
    return Array.from(set).sort();
  });

  filteredUsers = computed(() => {
    const q = this.searchQuery().toLowerCase();
    const interest = this.selectedInterest();
    return this.allUsers.filter(u => {
      const matchesSearch = !q ||
        u.name.toLowerCase().includes(q) ||
        u.bio.toLowerCase().includes(q) ||
        u.location.toLowerCase().includes(q);
      const matchesInterest = !interest || u.interests.includes(interest);
      return matchesSearch && matchesInterest;
    });
  });

  likedUsers = signal<Set<number>>(new Set());

  toggleLike(userId: number): void {
    const current = new Set(this.likedUsers());
    if (current.has(userId)) {
      current.delete(userId);
    } else {
      current.add(userId);
    }
    this.likedUsers.set(current);
  }

  isLiked(userId: number): boolean {
    return this.likedUsers().has(userId);
  }
}
