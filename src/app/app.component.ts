import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColorGridComponent } from './color-grid/color-grid.component';
import { GridSettingsComponent } from './grid-settings/grid-settings.component';
import { DEFAULT_GRID_SETTINGS, GridSettings } from './grid-settings.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ColorGridComponent, GridSettingsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  readonly settings = signal<GridSettings>(DEFAULT_GRID_SETTINGS);

  gridSettingsEvent($event: GridSettings): void {
    this.settings.set($event);
  }
}
