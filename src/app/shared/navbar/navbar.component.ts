import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GitHubService } from '../../github/services/github.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {
  isConnected = false;
  private destroy$ = new Subject<void>();

  constructor(
    private githubService: GitHubService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.githubService.status$
      .pipe(takeUntil(this.destroy$))
      .subscribe(status => {
        this.isConnected = status.connected;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
