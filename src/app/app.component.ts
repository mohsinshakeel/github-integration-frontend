import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HeaderComponent } from './shared/header/header.component';
import { GitHubService } from './github/services/github.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header [isConnected]="isConnected"></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
    main {
      height: calc(100vh - 64px);
      overflow: auto;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  isConnected = true;
  private destroy$ = new Subject<void>();
  
  constructor(private githubService: GitHubService) {}
  
  ngOnInit(): void {
    this.githubService.status$
      .pipe(takeUntil(this.destroy$))
      .subscribe(status => {
        this.isConnected = status.connected;
      });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
