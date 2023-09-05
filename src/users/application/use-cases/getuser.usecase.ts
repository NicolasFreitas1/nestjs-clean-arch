import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UserOutput } from '../dtos/user-output';

export namespace GetUserUseCase {
  export type Input = {
    id: string;
  };

  export type Output = UserOutput;

  export class UseCase {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const { id } = input;

      const user = await this.userRepository.findById(id);

      return user.toJSON();
    }
  }
}
