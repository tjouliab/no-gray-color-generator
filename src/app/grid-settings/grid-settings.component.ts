import { Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { DEFAULT_GRID_SETTINGS, GridSettings } from '../grid-settings.model';
import { combineLatest, debounceTime } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

const DEBOUNCE_MS = 300;

@Component({
  selector: 'app-grid-settings',
  imports: [MatSliderModule, FormsModule],
  templateUrl: './grid-settings.component.html',
  styleUrl: './grid-settings.component.scss',
})
export class GridSettingsComponent {
  readonly settings = output<GridSettings>();

  protected readonly grayScale = model<number>(DEFAULT_GRID_SETTINGS.grayScale);
  protected readonly gridSize = model<number>(DEFAULT_GRID_SETTINGS.gridSize);

  constructor() {
    const gray$ = toObservable(this.grayScale);
    const size$ = toObservable(this.gridSize);

    combineLatest([gray$, size$])
      .pipe(takeUntilDestroyed(), debounceTime(DEBOUNCE_MS))
      .subscribe(([grayScale, gridSize]) => {
        this.settings.emit({ grayScale, gridSize });
      });
  }
}
