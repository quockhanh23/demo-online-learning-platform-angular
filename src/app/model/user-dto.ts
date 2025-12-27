import {Role} from "./role";

export interface UserDTO {

  id?: string;
  username?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  createdDate?: string;
  updatedDate?: string;
  status?: string;
  education?: string;
  avatar?: string;
  roles?: Role[];
  role?: string
  online?: boolean
}
