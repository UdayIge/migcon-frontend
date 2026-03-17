// dashboard.component.ts
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  NgZone,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  activeNav = 'dashboard';
  tooltipX = 130;
  tooltipY = 30;
  tooltipValue = 16;

  deviceLegend = [
    { label: 'Active Devices',     value: 21, color: '#c0392b' },
    { label: 'Inactive Devices',   value: 16, color: '#e8571a' },
    { label: 'Unassigned Devices', value: 15, color: '#f07840' },
    { label: 'Faulty Devices',     value: 6,  color: '#f4a07a' },
    { label: 'Maintenance Mode',   value: 5,  color: '#fad4bc' },
  ];

  private charts: Chart[] = [];

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.buildAlarmsChart();
        this.buildPieChart();
        this.buildBarChart();
      }, 0);
    });
  }

  ngOnDestroy(): void {
    this.charts.forEach((c) => c.destroy());
  }

  setActive(tab: string): void {
    this.activeNav = tab;
    // Update button classes manually for standalone demo
    document.querySelectorAll('.nav-item').forEach((el) =>
      el.classList.remove('active')
    );
    const idx = ['dashboard', 'devices', 'groups', 'alarms', 'profile'].indexOf(tab);
    if (idx >= 0) {
      document.querySelectorAll('.nav-item')[idx]?.classList.add('active');
    }
  }

  /* ── Alarms Line Chart ── */
  private buildAlarmsChart(): void {
    const canvas = document.getElementById('alarmsChart') as HTMLCanvasElement;
    if (!canvas) return;

    const labels = Array.from({ length: 31 }, (_, i) => i + 1);
    const data = [
      8, 9, 10, 9, 11, 12, 11, 10, 9, 10,
      14, 13, 12, 14, 15, 16, 20, 24, 22, 18,
      16, 14, 12, 14, 13, 12, 11, 12, 13, 12, 11,
    ];

    const gradient = canvas.getContext('2d')!.createLinearGradient(0, 0, 0, 160);
    gradient.addColorStop(0, 'rgba(232, 87, 26, 0.28)');
    gradient.addColorStop(1, 'rgba(232, 87, 26, 0.00)');

    const chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            data,
            borderColor: '#e8571a',
            borderWidth: 2.5,
            fill: true,
            backgroundColor: gradient,
            tension: 0.45,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#7a9a3a',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false,
            external: (ctx) => {
              const tp = ctx.tooltip;
              if (tp.opacity === 0) return;
              this.ngZone.run(() => {
                this.tooltipX = tp.caretX;
                this.tooltipY = tp.caretY - 40;
                this.tooltipValue = tp.dataPoints[0]?.raw as number;
              });
            },
          },
        },
        scales: {
          x: {
            display: false,
            grid: { display: false },
          },
          y: {
            display: false,
            grid: {
              color: 'rgba(0,0,0,0.06)',
              drawTicks: false,
            },
          },
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
      },
    });

    this.charts.push(chart);
  }

  /* ── Pie Chart ── */
  private buildPieChart(): void {
    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
    if (!canvas) return;

    const chart = new Chart(canvas, {
      type: 'pie',
      data: {
        datasets: [
          {
            data: [21, 16, 15, 6, 5],
            backgroundColor: [
              '#c0392b',
              '#e8571a',
              '#f07840',
              '#f4a07a',
              '#fad4bc',
            ],
            borderWidth: 2,
            borderColor: '#fff',
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
        cutout: 0,
      },
    });

    this.charts.push(chart);
  }

  /* ── Bar Chart ── */
  private buildBarChart(): void {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    if (!canvas) return;

    const values = [23, 8, 26, 17, 38, 6, 22];
    const highlight = 4; // G5 index

    const chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7'],
        datasets: [
          {
            data: values,
            backgroundColor: values.map((_, i) =>
              i === highlight ? '#e8571a' : '#fad4bc'
            ),
            borderRadius: 6,
            borderSkipped: false,
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
              label: (ctx) => ` ${ctx.parsed.y}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: '#b0a090',
              font: { size: 11, weight: 500 },
            },
            border: { display: false },
          },
          y: {
            grid: {
              color: 'rgba(0,0,0,0.06)',
              drawTicks: false,
            },
            border: { display: false, dash: [4, 4] },
            ticks: {
              color: '#b0a090',
              font: { size: 10 },
              stepSize: 15,
              padding: 4,
            },
            min: 0,
            max: 45,
          },
        },
      },
      plugins: [
        {
          id: 'barTooltipLabel',
          afterDraw(chart) {
            const meta = chart.getDatasetMeta(0);
            const ctx2 = chart.ctx;
            meta.data.forEach((bar, i) => {
              if (i !== highlight) return;
              const val = (chart.data.datasets[0].data[i] as number).toString();
              const x = bar.x;
              const y = bar.y - 14;
              ctx2.save();
              ctx2.fillStyle = '#7a9a3a';
              ctx2.beginPath();
              const w = 32, h = 22, r = 6;
              ctx2.roundRect(x - w / 2, y - h, w, h, r);
              ctx2.fill();
              ctx2.fillStyle = '#fff';
              ctx2.font = 'bold 12px Nunito, sans-serif';
              ctx2.textAlign = 'center';
              ctx2.textBaseline = 'middle';
              ctx2.fillText(val, x, y - h / 2);
              ctx2.restore();
            });
          },
        },
      ],
    });

    this.charts.push(chart);
  }
}