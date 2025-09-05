import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentDate: Date = new Date();

  constructor(public sidebarSvc: SidebarService) {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }
}
