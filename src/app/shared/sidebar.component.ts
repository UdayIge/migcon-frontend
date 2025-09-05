import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarService } from './sidebar.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(public sidebarSvc: SidebarService) {}
}
// Note: template contains both desktop aside and mobile overlay; service controls mobile visibility
