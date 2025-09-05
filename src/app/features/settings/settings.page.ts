import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.css']
})
export class SettingsPage implements OnInit {
  languages = ['English', 'Spanish', 'French'];
  language = 'English';
  darkMode = false;
  notifications = true;
  fontSize = 16; // px
  pageZoom = 75; // percent
  brightness = 50; // percent

  ngOnInit(): void {
    try {
      const saved = localStorage.getItem('app.settings');
      if (saved) {
        const s = JSON.parse(saved);
        Object.assign(this, s);
      }
    } catch (e) {
      // ignore
    }
  }

  save() {
    localStorage.setItem('app.settings', JSON.stringify({
      language: this.language,
      darkMode: this.darkMode,
      notifications: this.notifications,
      fontSize: this.fontSize,
      pageZoom: this.pageZoom,
      brightness: this.brightness
    }));
    // small visual feedback could be added
    console.log('Settings saved');
  }

  clearCache() {
    // lightweight simulation of cache clearing
    localStorage.removeItem('app.cache');
    console.log('Cache cleared');
  }

  deleteAccount() {
    // placeholder: in real app you'd call an API
    if (confirm('Delete account? This action cannot be undone.')) {
      console.log('Account deleted (simulated)');
    }
  }
}
