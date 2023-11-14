import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {

  constructor(public api: ApiService, public userService: UserService) { }

  user: User = {
    email: '',
    password: '',
  }

  createUser() {
    this.userService.createUser(this.user)
  }

  ngOnInit() {
  }

}
