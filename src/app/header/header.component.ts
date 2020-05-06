import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  onCollapse(divCollapse: HTMLDivElement) {
    divCollapse.classList.toggle('collapse');
  }
}