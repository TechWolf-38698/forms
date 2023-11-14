import { Component, OnInit } from '@angular/core';
import puppeteer from 'puppeteer';
import { MessageDto } from 'src/app/Dto/MessageDto';
import { DriveSetupService } from 'src/app/services/drive-setup.service';
@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.css'],
})
export class PickerComponent implements OnInit {
  token: string = localStorage.getItem('token') as string;
  newWindow: Window | any;
  constructor(private driveServ: DriveSetupService) {}
  async testing() {
    // window.open(
    //   'https://643d0b83eb3dc22f87598ce2--majestic-vacherin-820290.netlify.app'
    // );
    this.newWindow = window.open(
      `http://localhost:3000/#/wait?token=${this.token}`,
      '',
      'left=0,top=0,width=1080,height=1920,toolbar=0,scrollbars=0,status=0'
    );
    this.newWindow.focus();
  }

  ngOnInit(): void {
    this.driveServ.retrieveMappedObject().subscribe((receivedObj: any) => {
      // this.addToInbox(receivedObj);
      const { data, token } = receivedObj.token;
      const dd = JSON.parse(data);

      if (token == this.token) {
        if (dd.action == 'closed') {
          console.log(dd, 'closed');
          this.newWindow?.close();
        } else if (dd.action == 'picked') {
          console.log(dd, 'picked');
          this.newWindow?.close();
        }
      }
    });
  }
}
