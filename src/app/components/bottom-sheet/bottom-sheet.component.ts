import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { BottomSheetService } from 'src/app/core/utils/bottomSheet.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { DispListComponent } from './disp-list/disp-list.component';
@UntilDestroy()
@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
})
export class BottomSheetComponent implements OnInit, OnDestroy {
  public messages$: Observable<string[]>;

  constructor(public service: BottomSheetService, private bottomSheet: MatBottomSheet) {
    this.service.messages$.pipe(untilDestroyed(this)).subscribe((messages) => {
      debugger;
      this.bottomSheet.open(DispListComponent, { data: { messages } });
    });
  }
  public ngOnInit(): void {}
  public ngOnDestroy(): void {}
}
