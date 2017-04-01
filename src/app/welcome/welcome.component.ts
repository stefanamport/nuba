import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {

    this.loginService.getUserAsObservable().subscribe((user) => {

    	// Redirect if user is logged in
        if (user.uid && this.router.url === '/welcome') {
          this.router.navigate(['journal']);
        }

    });

  }

}
