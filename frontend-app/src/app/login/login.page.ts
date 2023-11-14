import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { UserService, User } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(public api: ApiService, public userService: UserService) {}

  user: User = {
    email: '',
    password: '',
  };

  async login() {
    await this.userService.login(this.user);
    window.location.reload();
    console.log('user:', this.user);

    // window.location.href = 'https://www.felixhk.com/Inbox/';
    // window.location.href = '/Inbox/';
  }

  ngOnInit() {}
}
