import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeviceIconComponent } from './DeviceIcon/device-icon.component';

export interface Device {
  id: string;
  name: string;
  icon: string;
  group?: string;
  status?: string;
  mac?: string;
  location?: string;
  selected?: boolean;
}

@Component({
  selector: 'app-device-card',
  standalone: true,
  imports: [CommonModule, FormsModule, DeviceIconComponent],
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.css']
})
export class DeviceCardComponent {
  @Input() device!: Device;
  @Input() selectMode = false;
  @Input() selected = false;
  @Output() selectedChange = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<Device>();
  @Output() remove = new EventEmitter<Device>();

  onToggle() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }

  onEdit() {
    this.edit.emit(this.device);
  }

  onRemove() {
    this.remove.emit(this.device);
  }
}
