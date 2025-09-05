import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./settings.page').then(m => m.SettingsPage) }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class SettingsModule {}
