import {PageImpl} from "./page-impl";
import {Lesson} from "./lesson";

export interface PageLesson {
  content?: Lesson[]
  page?: PageImpl
}
