import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./devices.list.page').then(m => m.DeviceListPage) },
  { path: 'add', loadComponent: () => import('./devices.add.page').then(m => m.DeviceAddPage) }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class DevicesModule {}
