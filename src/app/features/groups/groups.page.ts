import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './groups.page.html'
})
export class GroupsPage {
  groups = [
    { id: 'G1', name: 'Group 1', location: 'Floor-1' },
    { id: 'G2', name: 'Group 2', location: 'Floor-2' }
  ];

  constructor(private router: Router) {}

  add() { this.router.navigate(['groups', 'add']); }
}
