import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColorGridComponent } from './color-grid/color-grid.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ColorGridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  constructor() {}
}
