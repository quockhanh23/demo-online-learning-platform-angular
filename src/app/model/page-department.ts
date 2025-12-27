import {Department} from "./department";
import {PageImpl} from "./page-impl";

export interface PageDepartment {
  content?: Department[]
  page?: PageImpl;
}
