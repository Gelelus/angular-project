import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css'],
})
export class FilterPanelComponent {
  @Output() filterChange = new EventEmitter<{
    orderBy: string;
    searchString: string;
    order: number;
  }>(true);
  searchString = '';
  orderBy: string;
  order: number;

  constructor() {}

  onOrderBy(orderName: string) {
    this.orderBy = orderName;
    this.emit();
  }
  onOrder(order: number) {
    this.order = order;
    this.emit();
  }

  onSearch() {
    this.emit();
  }

  emit() {
    this.filterChange.emit({
      orderBy: this.orderBy,
      order: this.order,
      searchString: this.searchString,
    });
  }
}
