import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() itemsNumber: number;
  @Output() changePage = new EventEmitter<{
    startItem: number;
    previousPage: number;
    limit: number
  }>(true);
  @Input() initialPage = 1;
  @Input() pageSize = 10;
  @Input() maxPages = 5;
  private previousPage = -1;

  pager: any = {};

  ngOnInit() {
    
    if (this.itemsNumber) {
      this.setPage(this.initialPage);
    }
  }

  setPage(page: number) {
    if (this.previousPage === page) {
      return;
    }

    this.pager = this.paginate(
      this.itemsNumber,
      page,
      this.pageSize,
      this.maxPages
    );

    this.changePage.emit({
      startItem: this.pager.startIndex,
      previousPage: this.previousPage,
      limit: this.pageSize
    });
    this.previousPage = page;
  }

  paginate(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 10,
    maxPages: number = 10
  ) {
    
    let totalPages = Math.ceil(totalItems / pageSize);

    
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= maxPages) {
    
      startPage = 1;
      endPage = totalPages;
    } else {
   
      let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
     
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
     
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {

        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => startPage + i
    );

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }
}
