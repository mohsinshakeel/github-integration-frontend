import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { GitHubService } from '../services/github.service';
import { GitHubData, GITHUB_COLLECTIONS } from '../models/github.interfaces';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, GridApi, ModuleRegistry, AllCommunityModule, RowSelectionOptions } from 'ag-grid-community';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Register AG Grid modules
if (typeof window !== 'undefined') {
  ModuleRegistry.registerModules([AllCommunityModule]);
}

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    AgGridModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  // Collection data
  collections = GITHUB_COLLECTIONS;
  selectedCollection = 'harvest';
  selectedEntity = 'projects';
  searchText = '';
  
  // Fix theme type - use 'legacy' to work with CSS files
  theme: 'legacy' | undefined = 'legacy';
  
  // Fix rowSelection type with the exact expected values
  rowSelection: RowSelectionOptions = {
    mode: 'multiRow',
    headerCheckbox: true
  };
  
  // Grid data
  rowData: GitHubData[] = [];
  columnDefs: ColDef[] = [
    { 
      width: 50,
      pinned: 'left',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      resizable: false
    },
    { 
      field: 'id', 
      headerName: 'Id', 
      sortable: true, 
      filter: true, 
      width: 80,
      resizable: true
    },
    { 
      field: 'name', 
      headerName: 'Name', 
      sortable: true, 
      filter: true, 
      minWidth: 150,
      flex: 1,
      resizable: true
    },
    { 
      field: 'code', 
      headerName: 'Code', 
      sortable: true, 
      filter: true, 
      width: 120,
      resizable: true
    },
    { 
      field: 'is_active', 
      headerName: 'Is_active', 
      sortable: true, 
      filter: true, 
      width: 120,
      cellRenderer: (params: any) => params.value ? 'Yes' : 'No',
      resizable: true
    },
    { 
      field: 'is_billable', 
      headerName: 'Is_billable', 
      sortable: true, 
      filter: true, 
      width: 120,
      cellRenderer: (params: any) => params.value ? 'Yes' : 'No',
      resizable: true
    },
    { 
      field: 'is_fixed_fee', 
      headerName: 'Is_fixed_fee', 
      sortable: true, 
      filter: true, 
      width: 120,
      cellRenderer: (params: any) => params.value ? 'Yes' : 'No',
      resizable: true
    },
    { 
      field: 'bill_by', 
      headerName: 'Bill_by', 
      sortable: true, 
      filter: true, 
      width: 120,
      resizable: true
    },
    { 
      field: 'budget', 
      headerName: 'Budget', 
      sortable: true, 
      filter: true, 
      width: 120,
      resizable: true
    },
    { 
      field: 'budget_by', 
      headerName: 'Budget_by', 
      sortable: true, 
      filter: true, 
      width: 120,
      resizable: true
    }
  ];
  
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 80,
    flex: 0
  };
  
  // No rows overlay template
  noRowsTemplate = `<span class="ag-overlay-no-rows-center">No data available</span>`;
  
  // Hardcoded data
  hardcodedData: GitHubData[] = [
    {
      id: 1,
      name: 'Project 1',
      code: 'PRJ-101',
      is_active: true,
      is_billable: true,
      is_fixed_fee: false,
      bill_by: 'Hours',
      budget: 5000,
      budget_by: 'Hours'
    },
    {
      id: 2,
      name: 'Project 2',
      code: 'PRJ-102',
      is_active: true,
      is_billable: false,
      is_fixed_fee: true,
      bill_by: 'Fixed',
      budget: 10000,
      budget_by: 'Money'
    },
    {
      id: 3,
      name: 'Project 3',
      code: 'PRJ-103',
      is_active: false,
      is_billable: true,
      is_fixed_fee: false,
      bill_by: 'Days',
      budget: 7500,
      budget_by: 'Days'
    },
    {
      id: 4,
      name: 'Project 4',
      code: 'PRJ-104',
      is_active: true,
      is_billable: true,
      is_fixed_fee: true,
      bill_by: 'Fixed',
      budget: 15000,
      budget_by: 'Money'
    },
    {
      id: 5,
      name: 'Project 5',
      code: 'PRJ-105',
      is_active: true,
      is_billable: true,
      is_fixed_fee: false,
      bill_by: 'Hours',
      budget: 8000,
      budget_by: 'Hours'
    }
  ];
  
  // Grid API
  private gridApi: GridApi | null = null;
  private searchTextSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  public isBrowser: boolean;

  constructor(
    private githubService: GitHubService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      return; // Skip initialization on server
    }

    // Initialize search debounce
    this.searchTextSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.applySearch();
    });
    
    // Load initial data immediately
    this.loadHardcodedData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onGridReady(params: GridReadyEvent): void {
    if (!this.isBrowser) return;
    
    this.gridApi = params.api;
    
    // Set the data immediately
    this.loadHardcodedData();
    
    // Ensure columns are visible and sized properly
    setTimeout(() => {
      // Use the new API structure - columnApi is now accessed through api
      params.api.sizeColumnsToFit();
      
      // For newer versions of AG Grid, use this instead of columnApi.autoSizeAllColumns()
      const allColumnIds: string[] = [];
      params.api.getColumns()?.forEach((column) => {
        allColumnIds.push(column.getId());
      });
      params.api.autoSizeColumns(allColumnIds);
    }, 100);
    
    // Apply search if exists
    if (this.searchText) {
      this.applySearch();
    }
  }

  onCollectionChange(): void {
    if (this.isBrowser) {
      this.loadHardcodedData();
    }
  }

  onSearchChange(): void {
    if (this.isBrowser) {
      this.searchTextSubject.next(this.searchText);
    }
  }

  selectAll(): void {
    if (this.isBrowser && this.gridApi) {
      this.gridApi.selectAll();
    }
  }

  deleteGrid(): void {
    if (!this.isBrowser || !this.gridApi) return;
    
    this.rowData = [];
    // Update for newer AG Grid versions
    this.gridApi.setGridOption('rowData', []);
  }

  newGrid(): void {
    if (this.isBrowser) {
      this.loadHardcodedData();
    }
  }

  newGlobalSearchGrid(): void {
    if (this.isBrowser) {
      this.loadHardcodedData();
    }
  }

  private loadHardcodedData(): void {
    if (!this.isBrowser) return;
    
    console.log('Loading hardcoded data');
    // Use hardcoded data
    this.rowData = [...this.hardcodedData];
    
    // Refresh the grid if API is available
    if (this.gridApi) {
      console.log('Setting grid data', this.rowData);
      // Update for newer AG Grid versions
      this.gridApi.setGridOption('rowData', this.rowData);
    }
  }

  private applySearch(): void {
    if (!this.isBrowser || !this.gridApi) return;
    
    // Update for newer AG Grid versions
    this.gridApi.setGridOption('quickFilterText', this.searchText);
  }
}
