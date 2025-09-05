import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceCardComponent } from '../devices/device-card.component';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [CommonModule, FormsModule, DeviceCardComponent],
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.css']
})
export class ReportsPage {
  devices = [
    { id: 'IN-001', name: 'Incubator A', icon: 'machine1', group: 'G1', status: 'Active', selected: false },
    { id: 'FR-002', name: 'Freezer A', icon: 'machine2', group: 'G2', status: 'Maintenance', selected: false },
    { id: 'MI-004', name: 'Microlab A', icon: 'machine1', group: 'G1', status: 'Active', selected: false },
    { id: 'OV-001', name: 'Oven A', icon: 'machine3', group: 'G3', status: 'Inactive', selected: false },
    { id: 'SE-003', name: 'SensorHub A', icon: 'machine2', group: 'G3', status: 'Active', selected: false }
  ];

  selectAll = false;

  constructor(private router: Router) {}

  toggleAll() {
    // when called from template change event, selectAll already reflects the checkbox state
    this.devices.forEach(d => d.selected = this.selectAll);
  }

  onDeviceChange() {
    // recompute master checkbox
    this.selectAll = this.devices.every(x => x.selected);
  }

  continue() {
    const selected = this.devices.filter(d => d.selected);
    // For now just log and navigate to a placeholder route or show an alert
    console.log('Selected for report:', selected);
    alert(`Preparing report for ${selected.length} devices`);
  }
}
