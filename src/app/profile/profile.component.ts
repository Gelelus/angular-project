import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  imgAvatarUrl: string = 'http://localhost:8080/img/avatars/avatar.png';
  firstName: string = 'test';
  secondName: string = 'test';
  date: string = 'test';
  email: string = 'test';
  phoneNumber: string = 'test';
  registratedDate: string = 'February 06, 2022'
  fullname = this.firstName + ' ' + this.secondName;

  ngOnInit() {}
}
