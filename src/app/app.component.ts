import { Component } from '@angular/core';
import { ProfileService } from './profileservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'handimatched';

  constructor(private profileService: ProfileService) {
  }

  
}
