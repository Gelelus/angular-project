import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';
import { PaginationComponent } from './pagination/pagination.component';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    DropdownDirective,
    PaginationComponent,
    FilterPanelComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    LoadingSpinnerComponent,
    DropdownDirective,
    PaginationComponent,
    CommonModule,
    FilterPanelComponent,
  ],
})
export class SharedModule {}
