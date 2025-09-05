import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css']
})
export class ProfilePage implements OnInit {
  name = 'John Doe';
  email = 'john@example.com';
  location = 'Office';

  ngOnInit() {
    const raw = localStorage.getItem('profile');
    if (raw) {
      try { const obj = JSON.parse(raw); this.name = obj.name || this.name; this.email = obj.email || this.email; this.location = obj.location || this.location; } catch { }
    }
  }

  save() {
    const data = { name: this.name, email: this.email, location: this.location };
    localStorage.setItem('profile', JSON.stringify(data));
    // lightweight feedback; in a real app use a toast service
    alert('Profile saved');
  }

  cancel() {
    // restore saved values
    const raw = localStorage.getItem('profile');
    if (raw) {
      try { const obj = JSON.parse(raw); this.name = obj.name || this.name; this.email = obj.email || this.email; this.location = obj.location || this.location; } catch { }
    }
  }
}
