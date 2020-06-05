import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-disp-list',
  templateUrl: './disp-list.component.html',
  styleUrls: ['./disp-list.component.scss']
})
export class DispListComponent  {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}
}
