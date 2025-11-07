import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConditionsAndZip } from '../../conditions-and-zip.type';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  @Input() title: string;
  @Input() active: boolean = false;
  @Output() tabActivated = new EventEmitter<TabComponent>();
  @Output() tabClosed = new EventEmitter<void>();

  activateTab(): void {
    this.tabActivated.emit();
  }

  closeTab(): void {
    this.tabClosed.emit();
  }
}