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
        if (user.uid) {
          this.router.navigate(['journal']);
        }
    });
  }

}
