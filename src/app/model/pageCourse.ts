import {PageImpl} from "./page-impl";
import {Course} from "./course";

export interface PageCourse {
  content?: Course[]
  page?: PageImpl
}
