import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { GitHubService } from './github/services/github.service';
import { MockGitHubService } from './github/services/mock-github.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations(),
    // Use MockGitHubService for development
    { provide: GitHubService, useClass: MockGitHubService }
  ]
};
