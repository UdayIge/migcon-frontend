import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-add-page',
  standalone: true,
  templateUrl: './groups.add.page.html',
  styleUrls: ['./groups.add.page.css']
})
export class GroupAddPage {
  private router = inject(Router);

  onCancel() { this.router.navigate(['/groups']); }
  onAdd() { this.router.navigate(['/groups']); }
}
