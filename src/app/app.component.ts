import {Component, HostListener} from '@angular/core';
import {UploadService} from "./service/upload-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mater';

  constructor() {
  }
}
