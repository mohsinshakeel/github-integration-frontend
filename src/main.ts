import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Register AG Grid modules globally
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

// Only register modules in browser environment
if (typeof window !== 'undefined') {
  ModuleRegistry.registerModules([AllCommunityModule]);
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
