import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-grid-view',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    AgGridModule
  ],
  template: `
    <div class="grid-container">
      <div class="header">
        <h2>Raw Data</h2>
        <div class="actions">
          <button mat-flat-button class="action-btn new-grid-btn">
            New Grid
          </button>
          <button mat-flat-button class="action-btn global-search-btn">
            New Global Search Grid
          </button>
        </div>
      </div>

      <div class="controls">
        <div class="control-group">
          <span class="label">Active Integrations:</span>
          <mat-form-field appearance="outline" class="custom-select">
            <mat-select [(ngModel)]="selectedIntegration" panelClass="custom-select-panel">
              <mat-option value="harvest">harvest</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="control-group">
          <span class="label">Entity:</span>
          <mat-form-field appearance="outline" class="custom-select">
            <mat-select [(ngModel)]="selectedEntity" panelClass="custom-select-panel">
              <mat-option value="projects">projects</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="control-group search">
          <span class="label">Search:</span>
          <div class="search-wrapper">
            <input type="text" [(ngModel)]="searchText" placeholder="Search..." class="search-input">
            <button mat-icon-button class="search-button">
              <mat-icon>search</mat-icon>
            </button>
          </div>
        </div>

        <button mat-flat-button class="delete-btn">Delete Grid</button>
      </div>

      <div class="select-all">
        <label class="select-all-label">
          <input type="checkbox" class="select-all-checkbox">
          Select All
        </label>
      </div>

      <div *ngIf="isBrowser" class="grid-wrapper">
        <ag-grid-angular
          class="ag-theme-alpine"
          [rowData]="rowData"
          [columnDefs]="columnDefs"
          [defaultColDef]="defaultColDef"
          [pagination]="true"
          [paginationPageSize]="10"
          [rowSelection]="'multiple'"
          [headerHeight]="48"
          [rowHeight]="48"
          [suppressMenuHide]="true"
          domLayout="normal"
        >
        </ag-grid-angular>
      </div>
    </div>
  `,
  styles: [`
    .grid-container {
      padding: 24px;
      background: white;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 16px;
    }

    .header h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 400;
      color: #1a1a1a;
    }

    .actions {
      display: flex;
      gap: 12px;
      margin: 0 auto;
      padding-right: 140px;
    }

    .action-btn {
      text-transform: none;
      font-weight: 400;
      background-color: #3f51b5;
      color: white;
      height: 36px;
      line-height: 36px;
      padding: 0 16px;
      border-radius: 4px;
      border: none;
    }

    .controls {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 20px;
    }

    .control-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .label {
      color: rgba(0, 0, 0, 0.54);
      font-size: 14px;
      font-weight: 400;
    }

    .control-group.search {
      flex: 1;
    }

    .search-wrapper {
      position: relative;
      width: 100%;
    }

    .search-input {
      width: 100%;
      height: 36px;
      border: 1px solid rgba(0, 0, 0, 0.12);
      border-radius: 4px;
      padding: 0 40px 0 12px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }

    .search-input:focus {
      border-color: #3f51b5;
    }

    .search-button {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      color: rgba(0, 0, 0, 0.54);
      width: 36px;
      height: 36px;
      line-height: 36px;
      padding: 0;
      min-width: 36px;
    }

    .delete-btn {
      margin-left: auto;
      background-color: #ff5722;
      color: white;
      height: 36px;
      line-height: 36px;
      padding: 0 16px;
      border-radius: 4px;
      border: none;
      font-weight: 400;
    }

    .select-all {
      margin-bottom: 12px;
    }

    .select-all-label {
      display: flex;
      align-items: center;
      gap: 8px;
      color: rgba(0, 0, 0, 0.87);
      font-weight: 400;
      cursor: pointer;
    }

    .select-all-checkbox {
      width: 18px;
      height: 18px;
      margin: 0;
    }

    .grid-wrapper {
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    }

    ag-grid-angular {
      width: 100%;
      height: 600px;
    }

    ::ng-deep {
      .custom-select {
        .mat-form-field-flex {
          padding: 0 8px !important;
          background: white;
        }

        .mat-form-field-outline {
          color: rgba(0, 0, 0, 0.12);
        }

        .mat-form-field-outline-thick {
          color: rgba(0, 0, 0, 0.12);
        }

        .mat-form-field-infix {
          padding: 0.5em 0;
          border-top: none;
        }
      }

      .ag-theme-alpine {
        --ag-header-height: 48px;
        --ag-row-height: 48px;
        --ag-header-foreground-color: rgba(0, 0, 0, 0.87);
        --ag-header-background-color: #fafafa;
        --ag-odd-row-background-color: #ffffff;
        --ag-row-border-color: #e0e0e0;
        --ag-cell-horizontal-padding: 16px;
        font-family: inherit;

        .ag-header-cell {
          padding: 0 16px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.87);
          border-right: 1px solid #e0e0e0;
          background-color: #fafafa;
        }

        .ag-header-cell:last-child {
          border-right: none;
        }

        .ag-header-cell-menu-button {
          opacity: 1;
          color: rgba(0, 0, 0, 0.54);
        }

        .ag-header-cell-menu-button:hover {
          color: rgba(0, 0, 0, 0.87);
        }

        .ag-cell {
          padding: 0 16px;
          line-height: 48px;
          border-right: 1px solid #e0e0e0;
          color: rgba(0, 0, 0, 0.87);
        }

        .ag-cell:last-child {
          border-right: none;
        }

        .ag-row {
          border-bottom: 1px solid #e0e0e0;
        }

        .ag-row-hover {
          background-color: #f5f5f5;
        }

        .ag-checkbox-input-wrapper {
          font-size: 18px;
          color: rgba(0, 0, 0, 0.54);
          width: 18px;
          height: 18px;
          border: 2px solid currentColor;
          border-radius: 2px;
          box-sizing: border-box;
        }

        .ag-checkbox-input-wrapper.ag-checked {
          background-color: #3f51b5;
          border-color: #3f51b5;
        }

        .ag-paging-panel {
          height: 48px;
          padding: 0 16px;
          border-top: 1px solid #e0e0e0;
          color: rgba(0, 0, 0, 0.87);
        }
      }
    }
  `]
})
export class GridViewComponent implements OnInit {
  selectedIntegration = 'harvest';
  selectedEntity = 'projects';
  searchText = '';
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  columnDefs: ColDef[] = [
    { 
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 48,
      pinned: 'left'
    },
    { field: 'id', headerName: 'Id', sortable: true, filter: true },
    { field: 'name', headerName: 'Name', sortable: true, filter: true },
    { field: 'code', headerName: 'Code', sortable: true, filter: true },
    { field: 'is_active', headerName: 'Is active', sortable: true, filter: true },
    { field: 'is_billable', headerName: 'Is billable', sortable: true, filter: true },
    { field: 'is_fixed_fee', headerName: 'Is fixed fee', sortable: true, filter: true },
    { field: 'bill_by', headerName: 'Bill by', sortable: true, filter: true },
    { field: 'budget', headerName: 'Budget', sortable: true, filter: true }
  ];

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
    filter: true,
    menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab']
  };

  rowData = [];

  ngOnInit() {
    if (this.isBrowser) {
      // Here you would typically load your data
      // For now, we'll leave it empty
    }
  }
} 
