export interface GitHubStatus {
  connected: boolean;
  lastConnected?: string;
  user?: {
    name: string;
    avatar: string;
  };
}

export interface GitHubData {
  [key: string]: any;
  id?: number;
  name?: string;
  code?: string;
  is_active?: boolean;
  is_billable?: boolean;
  is_fixed_fee?: boolean;
  bill_by?: string;
  budget?: number;
  budget_by?: string;
}

export const GITHUB_COLLECTIONS = [
  { value: 'harvest', label: 'Harvest' },
  { value: 'github', label: 'GitHub' },
  { value: 'jira', label: 'Jira' },
  { value: 'slack', label: 'Slack' }
];
