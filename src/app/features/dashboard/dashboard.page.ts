import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Added for ngModel
import { SidebarComponent } from '../../shared/sidebar.component';
import { SidebarService } from '../../shared/sidebar.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.css'],
  imports: [CommonModule, FormsModule, SidebarComponent],
})
export class DashboardPageComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  currentDay!: string;
  currentDate!: string;
  currentMonth!: string;
  currentYear!: string;
  selectedPeriod: 'weekly' | 'monthly' | 'yearly' = 'weekly'; // ✅ Default

  private lineChart: Chart | null = null;
  private pieChart: Chart | null = null;
  private barChart: Chart | null = null;

  constructor(public sidebarSvc: SidebarService) {}

  ngOnInit() {
    const now = new Date();
    this.currentDay = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    }).format(now);
    this.currentDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(now);
    this.currentMonth = new Intl.DateTimeFormat('en-US', {
      month: 'long',
    }).format(now);
    this.currentYear = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
    }).format(now);
  }

  ngAfterViewInit() {
    this.renderLineChart();
    this.renderPieChart();
    this.renderBarChart();
  }

  // 🟢 Dummy data for different periods
  private dataSets = {
    weekly: [28, 12, 30, 17, 38, 10, 22],
    monthly: [150, 180, 120, 220, 260, 190, 240],
    yearly: [1200, 900, 1500, 1300, 1700, 1100, 1600],
  };

  renderBarChart() {
    const ctx = document.getElementById('devicesBarChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7'],
        datasets: [
          {
            label: 'Devices',
            data: this.dataSets[this.selectedPeriod],
            backgroundColor: (context) => {
              const index = context.dataIndex;
              return index === 4 ? '#E86D2C' : '#F7B695';
            },
            borderRadius: 10,
            borderSkipped: false,
            barThickness: 25,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.parsed.y}`,
            },
            backgroundColor: '#9bb069',
            titleColor: '#fff',
            bodyColor: '#fff',
            displayColors: false,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#555', font: { size: 12 } },
          },
          y: {
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: { color: '#888', stepSize: 15 },
          },
        },
      },
    });
  }

  // 🔄 Update chart data when dropdown changes
  onPeriodChange() {
    if (this.barChart) {
      this.barChart.data.datasets[0].data = this.dataSets[this.selectedPeriod];
      this.barChart.update();
    }
  }

  renderLineChart() {
    const ctx = document.getElementById(
      'activeAlarmsChart'
    ) as HTMLCanvasElement;
    if (!ctx) return;

    this.lineChart = new Chart(ctx, {
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
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
      },
    });
  }

  renderPieChart() {
    const ctx = document.getElementById('alarmsPieChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [
          'Active Devices',
          'Inactive Devices',
          'Unassigned Devices',
          'Faulty Devices',
          'Maintenance Mode',
        ],
        datasets: [
          {
            data: [21, 16, 15, 6, 5],
            backgroundColor: [
              '#D95F2A',
              '#E98750',
              '#F2A272',
              '#F6BDA1',
              '#FADAC8',
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right' },
        },
      },
    });
  }

  ngOnDestroy() {
    this.lineChart?.destroy();
    this.pieChart?.destroy();
    this.barChart?.destroy();
  }
}
