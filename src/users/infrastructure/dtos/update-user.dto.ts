import { UpdateUserUseCase } from '@/users/application/use-cases/update-user.usecase';

export class UpdateUserDto implements Omit<UpdateUserUseCase.Input, `id`> {
  name: string;
}
