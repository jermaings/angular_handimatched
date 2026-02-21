import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  protected readonly auth = inject(Auth);
  editing = signal(false);

  editName = '';
  editBio = '';
  editLocation = '';
  editAge = 0;
  editInterests = '';
  saveSuccess = false;

  startEdit(): void {
    const user = this.auth.currentUser();
    if (user) {
      this.editName = user.name;
      this.editBio = user.bio;
      this.editLocation = user.location;
      this.editAge = user.age;
      this.editInterests = user.interests.join(', ');
    }
    this.editing.set(true);
  }

  cancelEdit(): void {
    this.editing.set(false);
  }

  saveProfile(): void {
    const user = this.auth.currentUser();
    if (user) {
      const updated = {
        ...user,
        name: this.editName || user.name,
        bio: this.editBio,
        location: this.editLocation,
        age: this.editAge,
        interests: this.editInterests.split(',').map(i => i.trim()).filter(Boolean)
      };
      // Update via service
      this.auth.updateUser(updated);
    }
    this.editing.set(false);
    this.saveSuccess = true;
    setTimeout(() => this.saveSuccess = false, 3000);
  }
}
