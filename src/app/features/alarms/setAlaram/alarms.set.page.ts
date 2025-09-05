import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alarms-set',
  standalone: true,
  templateUrl: './alarms.set.page.html',
  styleUrls: ['./alarms.set.page.css']
})
export class AlarmSetPage {
  private router = inject(Router);

  onCancel() { this.router.navigate(['/alarms']); }
  onSave() { this.router.navigate(['/alarms']); }
}
