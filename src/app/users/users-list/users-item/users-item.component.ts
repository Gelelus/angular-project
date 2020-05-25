import { Component, Input } from '@angular/core';
import { SimpleUser } from '../../simple-user.model';

@Component({
  selector: 'app-users-item',
  templateUrl: './users-item.component.html',
  styleUrls: ['./users-item.component.css'],
})
export class UsersItemComponent {
  @Input() user: SimpleUser;
}
