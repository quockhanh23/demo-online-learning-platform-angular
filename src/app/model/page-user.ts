import {PageImpl} from "./page-impl";
import {UserDTO} from "./user-dto";

export interface PageUser {
  content?: UserDTO[]
  page?: PageImpl
}
