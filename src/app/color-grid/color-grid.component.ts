import { Component, computed, input } from '@angular/core';
import { ColorUtils } from '../../utils/color.utils';

@Component({
  selector: 'app-color-grid',
  imports: [],
  templateUrl: './color-grid.component.html',
  styleUrl: './color-grid.component.scss',
})
export class ColorGridComponent {
  protected size = input(10);

  protected cells = computed(() =>
    [...Array(this.size() ** 2)].map((_, index) =>
      ColorUtils.noGrayColorGenerator(index, 0)
    )
  );

  protected gridTemplateColumns = computed(() => `repeat(${this.size()}, 1fr)`);
}
