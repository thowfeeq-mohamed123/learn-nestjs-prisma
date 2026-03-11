import { IsNumber } from 'class-validator';

export class AssignUserRoleDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  roleId: number;
}
