import { Component, OnInit, Input } from '@angular/core';
import { SimpleUser } from '../../simple-user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users-item',
  templateUrl: './users-item.component.html',
  styleUrls: ['./users-item.component.css'],
})
export class UsersItemComponent implements OnInit {
  @Input() user: SimpleUser;
  serverUrl = environment.DataBaseUrl;

  constructor() {}

  ngOnInit(): void {}
}
