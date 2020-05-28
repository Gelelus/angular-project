import { Directive, HostListener, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @Input() appDropdown: HTMLUListElement;
  @HostBinding('class.open') isOpen = false;

  constructor() {}

  @HostListener('click') mouseclick(eventData: Event) {
    this.isOpen = !this.isOpen;
  }
}
