import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./dashboard.page').then(m => m.DashboardPageComponent) }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class DashboardModule {}
