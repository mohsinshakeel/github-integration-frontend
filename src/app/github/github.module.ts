import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GitHubRoutingModule } from './github-routing.module';

@NgModule({
  imports: [
    CommonModule,
    GitHubRoutingModule
  ]
})
export class GithubModule { }
