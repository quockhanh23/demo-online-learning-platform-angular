import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../../service/notification.service";
import {PageNotification} from "../../../model/pageNotification";
import {Notification} from "../../../model/notification";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  idUser?: any
  username?: any
  token?: any
  count: any
  role?: any
  isAdmin = false;
  page?: PageNotification
  notifications?: Notification[]
  countNotification = 0;
  ids: string[] = [];

  constructor(private notificationService: NotificationService) {
    this.idUser = localStorage.getItem("idUser")
    this.username = localStorage.getItem("username")
    this.token = localStorage.getItem("token")
    this.role = localStorage.getItem("roles")
  }

  ngOnInit(): void {
    this.checkAdmin();
    this.getAllNotificationPage(0, 10)
  }

  checkAdmin() {
    if (this.role != null) {
      let index = this.role?.indexOf("ADMIN")
      console.log("index:" + index)
      if (index > 0) this.isAdmin = true;
    }
  }

  logout() {
    localStorage.clear()
  }

  getAllNotificationPage(page: any, size: any) {
    if (this.idUser == null) return
    this.notificationService.getAllNotificationPage(this.idUser, page, size).subscribe(rs => {
      this.page = rs;
      let count = 0;
      if (this.page?.content != null) {
        this.notifications = this.page?.content
        for (let i = 0; i < this.notifications.length; i++) {
          const id = this.notifications[i].id;
          if (id) {
            this.ids.push(id);
          }
          if (this.notifications[i].status == 'ACTIVE') {
            count = count + 1;
          }
        }
      }
      console.log("count = " + count)
      this.countNotification = count;
    })
  }

  updateNotification(idNotification: any) {
    this.notificationService.updateNotification(idNotification).subscribe(() => {
      this.getAllNotificationPage(0, 10)
    })
  }

  updateAllStatus() {
    if (this.ids != []) {
      this.notificationService.updateAllStatus(this.ids).subscribe(() => {
        this.getAllNotificationPage(0, 10)
      })
    }
  }
}
