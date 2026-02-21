import { Injectable } from '@angular/core';
// import { Profile } from './profile.model';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './authentication/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../environments/enviornment';

const backendURL = environment.apiURL + "/profile/";

@Injectable({
    providedIn: 'root'
  })

  export class ProfileService {
   
    constructor(private http: HttpClient, private router: Router, private Auth: AuthService) {
    
    }
    testRouting(image: File) {
        const title = 'title';
        const sendImage =  new FormData();
        sendImage.append('title', title);
        sendImage.append('image', image, 'test' )
        this.http.patch<{message: string}>(backendURL, sendImage).subscribe(res => {
            console.log('response from backend', res.message);
        })

    }
  }