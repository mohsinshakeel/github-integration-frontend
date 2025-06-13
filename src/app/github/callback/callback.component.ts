import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GitHubService } from '../services/github.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="callback-container">
      <mat-spinner></mat-spinner>
      <p>Processing GitHub authentication...</p>
    </div>
  `,
  styles: [`
    .callback-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      gap: 20px;
    }
  `]
})
export class CallbackComponent implements OnInit {
  constructor(
    private githubService: GitHubService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Extract token from URL query parameters
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const integrationId = params['integrationId'];
      const synced = params['synced'];
      
      console.log('Received callback with token:', token ? 'Token present' : 'No token');
      
      if (token) {
        try {
          // Store token in localStorage
          window.localStorage.setItem('github_token', token);
          console.log('Token saved to localStorage');
          
          // Update connection status in the service if the method exists
          if (typeof this.githubService.updateConnectionStatus === 'function') {
            this.githubService.updateConnectionStatus(true);
          } else {
            console.log('updateConnectionStatus method not available, using statusSubject directly');
            // Try to access the statusSubject directly if available
            if (this.githubService['statusSubject'] && 
                typeof this.githubService['statusSubject'].next === 'function') {
              this.githubService['statusSubject'].next({ 
                connected: true, 
                lastConnected: new Date().toISOString() 
              });
            }
          }
        } catch (error) {
          console.error('Error saving token to localStorage:', error);
        }
      }
      
      // Continue with existing redirect
      setTimeout(() => {
        this.router.navigate(['/github/connect']);
      }, 2000);
    });
  }
}






