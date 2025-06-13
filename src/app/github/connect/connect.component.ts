import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { GitHubService } from '../services/github.service';

interface GitHubUserData {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
    HttpClientModule
  ]
})
export class ConnectComponent implements OnInit {
  status = { 
    connected: false,
    connectedAt: '',
    syncType: 'full',
    userData: null as GitHubUserData | null
  };
  loading = false;
  isExpanded = true;

  constructor(
    private githubService: GitHubService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Check if GitHub token exists in localStorage
    this.checkTokenAndUpdateStatus();
  }

  checkTokenAndUpdateStatus(): void {
    const token = localStorage.getItem('github_token');
    const userData = localStorage.getItem('github_user_data');
    
    if (token) {
      // Token exists, update status to connected
      this.status.connected = true;
      
      // If we have user data, parse and use it
      if (userData) {
        try {
          this.status.userData = JSON.parse(userData);
          this.status.connectedAt = this.status.userData?.created_at || new Date().toISOString();
        } catch (e) {
          console.error('Error parsing GitHub user data:', e);
          // If parsing fails, fetch fresh data
          this.fetchGitHubUserData(token);
        }
      } else {
        // No user data, fetch it from GitHub API
        this.fetchGitHubUserData(token);
      }
      
      this.cdr.markForCheck();
    } else {
      // No token, update status to disconnected
      this.status.connected = false;
      this.status.userData = null;
      this.cdr.markForCheck();
    }
  }

  fetchGitHubUserData(token: string): void {
    this.loading = true;
    this.cdr.markForCheck();
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    this.http.get<GitHubUserData>('https://api.github.com/user', { headers })
      .subscribe({
        next: (userData) => {
          // Store user data in localStorage
          localStorage.setItem('github_user_data', JSON.stringify(userData));
          
          // Update component state
          this.status.userData = userData;
          this.status.connectedAt = userData.created_at || new Date().toISOString();
          this.loading = false;
          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Error fetching GitHub user data:', error);
          this.loading = false;
          
          // If API call fails, token might be invalid
          if (error.status === 401) {
            this.disconnectGitHub();
            this.snackBar.open('GitHub token is invalid or expired', 'Close', {
              duration: 5000
            });
          }
          
          this.cdr.markForCheck();
        }
      });
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
    this.cdr.markForCheck();
  }

  connectToGitHub(): void {
    // Redirect to the GitHub OAuth endpoint
    window.location.href = 'http://localhost:3000/api/github/auth/github';
  }

  disconnectGitHub(): void {
    try {
      // Remove GitHub token and user data from localStorage
      localStorage.removeItem('github_token');
      localStorage.removeItem('github_user_data');
      
      // Update connection status
      this.status.connected = false;
      this.status.userData = null;
      
      // Update connection status in the service
      if (typeof this.githubService.updateConnectionStatus === 'function') {
        this.githubService.updateConnectionStatus(false);
      } else if (this.githubService['statusSubject'] && 
                typeof this.githubService['statusSubject'].next === 'function') {
        this.githubService['statusSubject'].next({ 
          connected: false
        });
      }
      
      // Show success message
      this.snackBar.open('GitHub connection removed successfully', 'Close', {
        duration: 3000
      });
      
      // Update UI
      this.cdr.markForCheck();
    } catch (error) {
      console.error('Error removing GitHub token:', error);
      this.snackBar.open('Failed to remove GitHub connection', 'Close', {
        duration: 3000
      });
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}


