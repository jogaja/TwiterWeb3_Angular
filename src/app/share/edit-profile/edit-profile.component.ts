import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogData } from 'src/app/profile/profile.component';

declare let window: any;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class edit_profileComponent {

  @ViewChild('fileInput') fileInput!: ElementRef;
  public constructor(
    public dialogRef: MatDialogRef<edit_profileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) 
  {}

  public Close()
  {
    this.dialogRef.close();
  }
}
