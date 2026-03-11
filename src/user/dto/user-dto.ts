import { RoleDTO } from 'src/role/dto/role.dto';
import { PostDTO } from '../../post/dto/post.dto';

export class UserDDTO {
  id: number;
  name: string;
  email: string;
  roles: RoleDTO[];
  posts: PostDTO[];
}

export class UsersDTO {
  users: UserDDTO[];
  total: number;
}
