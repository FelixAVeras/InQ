import { Component, OnInit } from '@angular/core';
import { TimeRange } from '../models/Aviavility';
import { AvailabilityService } from '../services/availability.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-professional-schedule',
  templateUrl: './professional-schedule.component.html',
  styleUrls: ['./professional-schedule.component.css']
})
export class ProfessionalScheduleComponent implements OnInit {
  weekdays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  
  schedule: { [key: number]: TimeRange[] } = {};
  
  loading:boolean = false;

  constructor(private availabilityService: AvailabilityService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loading = true;
    
    this.availabilityService.getAvailability().subscribe(data => {
      data.forEach(day => {
        this.schedule[day.weekday] = day.timeRanges;
      });

      this.loading = false;
    });
  }

  addTimeRange(day: number) {
    if (!this.schedule[day]) this.schedule[day] = [];
    this.schedule[day].push({ from: '', to: '' });
  }

  removeTimeRange(day: number, index: number) {
    this.schedule[day].splice(index, 1);
    if (this.schedule[day].length === 0) delete this.schedule[day];
  }

  saveDay(day: number) {
    const timeRanges = this.schedule[day].filter(t => t.from && t.to);
  
    if (!this.validateTimeRanges(timeRanges)) return;
  
    this.availabilityService.saveAvailability({ weekday: day, timeRanges }).subscribe(() => {
      this.snackBar.open('Disponibilidad guardada correctamente.', 'OK', { duration: 2000 });
    });
  }
  
  deleteDay(day: number) {
    this.availabilityService.deleteAvailability(day).subscribe(() => {
      delete this.schedule[day];
    });
  }

  validateTimeRanges(timeRanges: TimeRange[]): boolean {
    // 1. Check campos vacíos
    for (const range of timeRanges) {
      if (!range.from || !range.to) {
        this.snackBar.open('Completa todos los campos de hora.', 'Cerrar', { duration: 3000 });
        return false;
      }
  
      if (range.from >= range.to) {
        this.snackBar.open(`La hora de inicio debe ser menor a la de fin.`, 'Cerrar', { duration: 3000 });
        return false;
      }
    }
  
    // 2. Revisar superposiciones
    const sorted = [...timeRanges].sort((a, b) => a.from.localeCompare(b.from));
    for (let i = 0; i < sorted.length - 1; i++) {
      const current = sorted[i];
      const next = sorted[i + 1];
      if (current.to > next.from) {
        this.snackBar.open('Hay rangos de horario superpuestos.', 'Cerrar', { duration: 3000 });
        return false;
      }
    }
  
    return true;
  }
  
}
