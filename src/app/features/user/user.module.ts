import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./profile.page').then(m => m.ProfilePage) }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class UserModule {}
