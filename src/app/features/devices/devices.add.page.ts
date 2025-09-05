import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-add',
  standalone: true,
  templateUrl: './devices.add.page.html',
  styleUrls: ['./devices.add.page.css']
})
export class DeviceAddPage {
  private router = inject(Router);

  onCancel() {
    this.router.navigate(['/devices']);
  }

  onAdd() {
    // TODO: wire real save; currently just navigate back to devices list
    this.router.navigate(['/devices']);
  }
}
