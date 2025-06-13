import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { GitHubStatus, GitHubData } from '../models/github.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  private readonly baseUrl = '/api';
  private statusSubject = new BehaviorSubject<GitHubStatus>({ 
    connected: false 
  });
  
  public status$ = this.statusSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkStatus();
  }

  checkStatus(): Observable<GitHubStatus> {
    // This would normally call the API, but we're mocking it
    return of({ connected: true });
  }

  getData(collection: string): Observable<GitHubData[]> {
    // This would normally call the API, but we're mocking it
    return of([]);
  }

  updateConnectionStatus(connected: boolean): void {
    // Update the status subject with the new connection state
    this.statusSubject.next({ 
      connected, 
      lastConnected: connected ? new Date().toISOString() : undefined 
    });
  }

  getAuthToken(): string | null {
    return localStorage.getItem('github_token');
  }
}





