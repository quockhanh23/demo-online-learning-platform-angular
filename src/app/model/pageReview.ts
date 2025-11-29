import {PageImpl} from "./page-impl";
import {Review} from "./review";

export interface PageReview {
  content?: Review[]
  page?: PageImpl
}
