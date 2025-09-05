import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./groups.page').then(m => m.GroupsPage) },
  { path: 'add', loadComponent: () => import('./groups.add.page').then(m => m.GroupAddPage) }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class GroupsModule {}
