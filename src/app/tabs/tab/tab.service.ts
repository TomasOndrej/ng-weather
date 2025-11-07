import { Injectable } from '@angular/core';

@Injectable()
export class TabService {
    activeTabIndex: number = 0;

    setActiveTab(index: number): void {
        this.activeTabIndex = index;
    }
}