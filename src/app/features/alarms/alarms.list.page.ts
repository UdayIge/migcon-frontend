import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-alarms-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './alarms.list.page.html'
})
export class AlarmListPage {}
