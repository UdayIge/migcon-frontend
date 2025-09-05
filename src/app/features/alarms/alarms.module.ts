import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./alarms.list.page').then(m => m.AlarmListPage) },
  { path: 'set', loadComponent: () => import('./setAlaram/alarms.set.page').then(m => m.AlarmSetPage) }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class AlarmsModule {}
