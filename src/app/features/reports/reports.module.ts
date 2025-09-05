import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./reports.page').then(m => m.ReportsPage) }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ReportsModule {}
