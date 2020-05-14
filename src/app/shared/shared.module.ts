import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    DropdownDirective,
    PaginationComponent,
  ],
  imports: [CommonModule],
  exports: [
    LoadingSpinnerComponent,
    DropdownDirective,
    PaginationComponent,
    CommonModule,
  ],
})
export class SharedModule {}
