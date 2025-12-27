import {PageImpl} from "./page-impl";
import {Notification} from "./notification";

export interface PageNotification {
  content?: Notification[]
  page?: PageImpl
}
