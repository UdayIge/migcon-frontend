import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar.component';
import { SidebarService } from '../../shared/sidebar.service';
import { CommonModule } from '@angular/common';
import { Chart, ChartType, registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.css'],
  imports: [CommonModule, SidebarComponent]
})
export class DashboardPageComponent implements OnInit, AfterViewInit, OnDestroy {
  currentDay!: string;
  currentDate!: string;
  currentMonth!: string;
  currentYear!: string;
  private chart: Chart | null = null; // hold chart reference
  ngOnInit() {
    const now = new Date();

    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    this.currentDay = new Intl.DateTimeFormat('en-US', options).format(now);

    const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    this.currentDate = new Intl.DateTimeFormat('en-US', dateOptions).format(now);

    const monthOptions: Intl.DateTimeFormatOptions = { month: 'long' };
    this.currentMonth = new Intl.DateTimeFormat('en-US', monthOptions).format(now);

    const yearOptions: Intl.DateTimeFormatOptions = { year: 'numeric' };
    this.currentYear = new Intl.DateTimeFormat('en-US', yearOptions).format(now);
  }

   constructor(public sidebarSvc: SidebarService) {}
  ngAfterViewInit() {
    this.createDeviceStatusChart();
  }
createDeviceStatusChart() {
    const ctx = document.getElementById('alarmsChart') as HTMLCanvasElement;

    if (!ctx) return;

    new Chart(ctx, {
      type: 'pie' as ChartType,
      data: {
        labels: [
          'Active Devices',
          'Inactive Devices',
          'Unassigned Devices',
          'Faulty Devices',
          'Maintenance Mode'
        ],
        datasets: [{
          data: [21, 16, 15, 6, 5],
          backgroundColor: [
            '#D95F2A', // Active
            '#E98750', // Inactive
            '#F2A272', // Unassigned
            '#F6BDA1', // Faulty
            '#FADAC8'  // Maintenance
          ],
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              font: {
                family: 'Inter, sans-serif',
                size: 14
              },
              color: '#2C2C2C'
            }
          },
          title: {
            display: true,
            text: 'Device Status Distribution',
            color: '#1C1C1C',
            font: {
              size: 18,
              weight: 600,
              family: 'Inter, sans-serif'
            },
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });
  }


  renderChart() {
    // Destroy previous instance if it exists
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('alarmsChart', {
      type: 'line',
      data: {
        labels: ['03', '10', '17', '24', '31'],
        datasets: [
          {
            label: 'Active Alarms',
            data: [8, 16, 25, 18, 13],
            borderColor: '#fe844b',
            backgroundColor: 'rgba(255,102,0,0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#FF6600',
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#333',
            titleColor: '#fff',
            bodyColor: '#fff',
            displayColors: false,
            callbacks: {
              label: (context) => ` ${context.parsed.y} Active`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#555' }
          },
          y: {
            ticks: { display: false },
            grid: { color: 'rgba(0,0,0,0.05)' }
          }
        }
      }
    });
  }

  ngOnDestroy() {
    // Clean up when component unloads
    if (this.chart) {
      this.chart.destroy();
    }
  }


}
