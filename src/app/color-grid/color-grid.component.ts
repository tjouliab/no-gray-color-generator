import { Component, input } from '@angular/core';

@Component({
  selector: 'app-color-grid',
  imports: [],
  templateUrl: './color-grid.component.html',
  styleUrl: './color-grid.component.scss'
})
export class ColorGridComponent {
  protected size = input(100);

  
}
