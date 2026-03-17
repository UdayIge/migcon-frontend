import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard.page').then((m) => m.DashboardComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class DashboardModule {}
