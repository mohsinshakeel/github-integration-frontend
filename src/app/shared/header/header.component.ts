import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <mat-toolbar color="primary">
      <span class="title">GitHub Integration Dashboard</span>
      <div class="spacer"></div>
      <a mat-button routerLink="/github/connect" routerLinkActive="active">
        <mat-icon>link</mat-icon>
        Connect
        <mat-icon [class.connected]="isConnected" [class.disconnected]="!isConnected">
          {{isConnected ? 'check_circle' : 'cancel'}}
        </mat-icon>
      </a>
      <a mat-button routerLink="/github/view" routerLinkActive="active">
        <mat-icon>table_chart</mat-icon>
        View Data
      </a>
    </mat-toolbar>
  `,
  styles: [`
    .title {
      font-size: 20px;
      font-weight: 500;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .connected {
      margin-left: 4px;
      font-size: 16px;
      height: 16px;
      width: 16px;
      color: #4caf50;
    }
    .disconnected {
      margin-left: 4px;
      font-size: 16px;
      height: 16px;
      width: 16px;
      color: #f44336;
    }
    a.active {
      background-color: rgba(255, 255, 255, 0.15);
    }
  `]
})
export class HeaderComponent {
  @Input() isConnected = false;
}
