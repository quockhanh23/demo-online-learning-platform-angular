import {Role} from "./role";
import {Course} from "./course";

export interface User {
  id?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  createdDate?: string;
  updatedDate?: string;
  status?: string;
  education?: string;
  avatar?: string;
  roles?: Role[];
  courses?: Course[];
}
