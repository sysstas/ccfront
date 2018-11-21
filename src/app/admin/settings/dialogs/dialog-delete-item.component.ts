import {Component, Inject, OnInit} from '@angular/core';
import { ApiService } from '../../../api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Observable} from 'rxjs';
import {consts} from '../../../cosntants';
import {NGXLogger} from 'ngx-logger';
import {SettingsService} from '../../../services/settings.service';

@Component({
  selector: 'app-dialog-delete-item',
  templateUrl: './dialog-delete-item.component.html',
  styleUrls: ['./dialog-delete-item.component.css']
})
export class DialogDeleteItemComponent implements OnInit {

  constructor(
    private logger: NGXLogger,
    public api: ApiService,
    public service: SettingsService,
    public dialogRef: MatDialogRef<DialogDeleteItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onCloseButtonClick(): void {
    this.dialogRef.close();
  }
  deleteItem(data) {
    this.service.deleteItem(data)
      .subscribe(() => {
        this.logger.debug('deleted');
        this.dialogRef.close(true);
      });
  }

}






