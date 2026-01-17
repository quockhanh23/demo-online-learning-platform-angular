import {Component, OnInit} from '@angular/core';
import {PageNotification} from "../../model/pageNotification";
import {NotificationService} from "../../service/notification.service";
import {Notification} from "../../model/notification";

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.css']
})
export class NotificationPageComponent implements OnInit {

  currentPage?: number = 0;
  currentPageAddOne?: number = 1;
  previousPageNumber?: number = 1;
  currentNumber?: number = 2;
  nextPageNumber?: number = 3;
  pageNotification?: PageNotification
  notifications?: Notification[]
  idUserLogin?: any
  height = 'height: 300px'

  constructor(private notificationService: NotificationService) {
    this.idUserLogin = localStorage.getItem("idUser")
  }

  ngOnInit(): void {
    this.getAllNotificationPage(0, 10)
  }

  getAllNotificationPage(page: any, size: any) {
    this.notificationService.getAllNotificationPage(this.idUserLogin, page, size).subscribe(rs => {
      this.pageNotification = rs;
      if (this.pageNotification != null) {
        this.notifications = this.pageNotification?.content
        if (this.notifications != null) {
          if (this.notifications?.length > 3 && this.notifications?.length < 7) {
            let value = (40 * this.notifications?.length) + 300
            this.height = 'height: ' + value + 'px'
            console.log("this.height:" + this.height)
          } else {
            this.height = ''
          }

          for (let i = 0; i < this.notifications?.length; i++) {
            let content = this.notifications[i]?.content;
            if (content != null) {
              const lastSpaceIndex = content.lastIndexOf(' ');
              let lastValue = '<b>' + content.substring(lastSpaceIndex, content.length) + '</b>'
              content = content.substring(0, lastSpaceIndex)
              // @ts-ignore
              this.notifications[i]?.content = content + lastValue
            }
          }
        }
      }
    })
  }

  updateNotification(idNotification: any) {
    if (idNotification == null) return
    this.notificationService.updateNotification(idNotification).subscribe(() => {
      this.getAllNotificationPage(this.currentPage, 10);
    })
  }

  updateAllStatus() {
    let ids = []
    if (this.notifications != null) {
      for (let i = 0; i < this.notifications.length; i++) {
        ids.push(this.notifications[i].id)
      }
    }
    this.notificationService.updateAllStatus(ids).subscribe(() => {
      this.getAllNotificationPage(this.currentPage, 10)
    })
  }

  previousPage() {
    if (this.currentPage != null && this.currentPage > 0) {
      this.currentPage--;
      this.currentPageAddOne = this.currentPage + 1
      this.getAllNotificationPage(this.currentPage, 10);
      if (this.currentPage == 0 || this.currentPage == 1) {
        this.currentNumber = 2
        this.previousPageNumber = 1
        this.nextPageNumber = 3
      } else {
        this.currentNumber = this.currentPage + 1
        this.previousPageNumber = this.currentPage
        this.nextPageNumber = this.currentPage + 2
      }
    }
  }

  nextPage() {
    if (this.pageNotification?.content == null || this.pageNotification?.content.length == 0) return
    if (this.currentPage != null && (this.currentPage + 1)
      // @ts-ignore
      * this.pageNotification?.page?.number < this.pageNotification?.page?.totalElements) {
      this.currentPage++;
      this.currentPageAddOne = this.currentPage + 1
      this.getAllNotificationPage(this.currentPage, 10);
      this.currentNumber = this.currentPage + 1
      this.previousPageNumber = this.currentPage
      this.nextPageNumber = this.currentPage + 2
    }
  }
}
