import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeviceCardComponent, Device } from './device-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-devices-list',
  standalone: true,
  imports: [RouterLink, DeviceCardComponent, CommonModule],
  templateUrl: './devices.list.page.html',
  styleUrls: ['./devices.list.page.css']
})
export class DeviceListPage {
  devices: Device[] = [
    { id: 'IN-001', icon: 'machine1', name: 'Incubator A', mac: '14:0C:B8:67:B7:87', location: 'Floor-2-1', status: 'Active', group: 'G1' },
    { id: 'FR-002', icon: 'machine3', name: 'Freezer A', mac: '14:4A:85:AD:B6:EA', location: 'Floor-3-2', status: 'Maintenance', group: 'G2' }
  ];

  onEdit(d: Device) { console.log('edit', d); }
  onRemove(d: Device) { console.log('remove', d); }
}
