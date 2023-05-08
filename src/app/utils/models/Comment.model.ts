import { User } from './User.model';

export interface Comment {
  comment: string;
  owner: User;
}
