import { UsersDTO, UserDDTO } from './dto/user-dto';

export class UserMap {
  static toDTO(user: any): UserDDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roles:
        user.userRoles?.map((userRole) => ({
          name: userRole?.role?.name,
        })) || [],
      posts:
        user.posts?.map((post) => ({
          title: post.title,
          description: post.description,
        })) || [],
    };
  }

  static toDTOList(users: any[], total: number): UsersDTO {
    return {
      users: users.map((user) => this.toDTO(user)),
      total,
    };
  }
}
