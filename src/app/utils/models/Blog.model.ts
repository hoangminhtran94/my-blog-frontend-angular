import { User } from './User.model';

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  owner: User;
  updated_at: string;
  tags: string[];
}
