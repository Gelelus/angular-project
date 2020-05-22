import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css']
})
export class FilterPanelComponent  {

  @Output() filterChange = new EventEmitter<{
    orderBy: string;
    searchString: string;
  }>(true);
  searchString = '';
  orderBy: string;

  constructor() { }

  onOrder(orderName: string){
    this.orderBy = orderName
    this.emit()
  }

  onSearch(){
    this.emit()
  }

  emit(){
    this.filterChange.emit({
      orderBy: this.orderBy,
      searchString: this.searchString,
    });
  }
}
