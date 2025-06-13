import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { GitHubStatus, GitHubData } from '../models/github.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MockGitHubService {
  private statusSubject = of<GitHubStatus>({ connected: true });

  public status$ = this.statusSubject;

  constructor() {}

  checkStatus(): Observable<GitHubStatus> {
    return this.statusSubject;
  }

  getData(collection: string): Observable<GitHubData[]> {
    // Return mock data based on collection with a delay to simulate API call
    return of(this.createMockData(collection)).pipe(delay(500));
  }

  private createMockData(collection: string): GitHubData[] {
    if (collection === 'harvest') {
      return Array(20).fill(0).map((_, i) => ({
        id: i + 1,
        name: `Project ${i + 1}`,
        code: `PRJ-${i + 100}`,
        is_active: Math.random() > 0.3,
        is_billable: Math.random() > 0.4,
        is_fixed_fee: Math.random() > 0.5,
        bill_by: ['Hours', 'Days', 'Fixed'][Math.floor(Math.random() * 3)],
        budget: Math.floor(Math.random() * 10000),
        budget_by: ['Hours', 'Days', 'Money'][Math.floor(Math.random() * 3)]
      }));
    } else {
      return Array(20).fill(0).map((_, i) => ({
        id: i + 1,
        name: `Repository ${i + 1}`,
        full_name: `user/repo-${i + 1}`,
        private: Math.random() > 0.5,
        html_url: `https://github.com/user/repo-${i + 1}`,
        description: `This is a description for repository ${i + 1}`,
        fork: Math.random() > 0.7,
        created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        updated_at: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
        stargazers_count: Math.floor(Math.random() * 1000),
        watchers_count: Math.floor(Math.random() * 100),
        language: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#'][Math.floor(Math.random() * 5)]
      }));
    }
  }
}




