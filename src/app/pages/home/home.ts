import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected readonly auth = inject(Auth);

  features = [
    {
      icon: '🤝',
      title: 'Inclusive Connections',
      description: 'Connect with people who understand your journey. Our platform is built with accessibility and inclusivity at its core.'
    },
    {
      icon: '📅',
      title: 'Social Events',
      description: 'Discover and join accessible social events in your area or online. Meeting people has never been easier.'
    },
    {
      icon: '💬',
      title: 'Safe Community',
      description: 'A welcoming, moderated community where everyone is respected and supported.'
    }
  ];

  stats = [
    { value: '10,000+', label: 'Members' },
    { value: '500+', label: 'Events Monthly' },
    { value: '50+', label: 'Cities' }
  ];
}
