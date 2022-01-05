import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { LabelIconTypeEnum } from '../../enum/label-icon-type.enum';
import { IconSizeEnum } from '../../icon/icons/icon.enum';
import { iconListMap } from '../../icon/icons/icons';
import { ControlValueAccessorModel } from '../../model/control-value-accessor.model';
import { LabelInputComponent } from '../label-input/label-input.component';

@Component({
  selector: 'pg-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LabelInputComponent),
      multi: true
    }
  ]
})
export class IconPickerComponent extends ControlValueAccessorModel<string>  implements OnInit {
  @Input() label: string = ''//'Pick Directory Icon';
  @Input() tooltip!: string;
  @Input() tooltipType!: LabelIconTypeEnum;
  @Input() tooltipPosition!:TooltipPosition;

  size = IconSizeEnum;
  openBrowser: boolean = true;

  icons!: string[];


  ngOnInit(): void {
    this.icons = Object.keys(iconListMap.icons);
    if (!this.value) {
      this.value = this.icons[0];
    }
  }

  toggleBrowser() {
    this.openBrowser = !this.openBrowser;
  }

  selectIcon(icon: string) {
    this.value = icon;
    this.onModelChange(this.value);
  }
}
