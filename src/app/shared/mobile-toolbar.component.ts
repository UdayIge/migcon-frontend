import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mobile-toolbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mobile-toolbar.component.html',
  styleUrls: ['./mobile-toolbar.component.css']
})
export class MobileToolbarComponent {}
