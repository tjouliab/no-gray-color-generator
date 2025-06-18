import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ColorUtils } from '../../utils/color.utils';

@Component({
  selector: 'app-color-grid',
  imports: [],
  templateUrl: './color-grid.component.html',
  styleUrl: './color-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorGridComponent {
  readonly gridSize = input.required<number>();
  readonly grayScale = input.required<number>();

  protected cells = computed<string[]>(() =>
    [...Array(this.gridSize() ** 2)].map((_, index) =>
      ColorUtils.noGrayColorGenerator(index, this.grayScale())
    )
  );

  protected gridTemplateColumns = computed<string>(
    () => `repeat(${this.gridSize()}, 1fr)`
  );
}
