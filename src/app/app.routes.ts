import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'dashboard' },
	{ path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
	{ path: 'devices', loadChildren: () => import('./features/devices/devices.module').then(m => m.DevicesModule) },
	{ path: 'groups', loadChildren: () => import('./features/groups/groups.module').then(m => m.GroupsModule) },
	{ path: 'alarms', loadChildren: () => import('./features/alarms/alarms.module').then(m => m.AlarmsModule) },
	{ path: 'reports', loadChildren: () => import('./features/reports/reports.module').then(m => m.ReportsModule) },
	{ path: 'settings', loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule) },
	{ path: 'profile', loadChildren: () => import('./features/user/user.module').then(m => m.UserModule) },
	// Auth pages as lightweight standalone lazy components
	{ path: 'login', loadComponent: () => import('./features/auth/login.component').then(c => c.LoginComponent) },
	{ path: 'signup', loadComponent: () => import('./features/auth/signup.component').then(c => c.SignupComponent) },
	{ path: '**', redirectTo: 'dashboard' }
];
