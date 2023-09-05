import { InvalidPasswordError } from '@/shared/application/errors/invalid-password-error';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UserOutput, UserOutputMapper } from '../dtos/user-output';

export namespace UpdatePasswordUseCase {
  export type Input = {
    id: string;
    password: string;
    oldPassword: string;
  };

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      const { id, password, oldPassword } = input;

      const user = await this.userRepository.findById(id);

      if (!password || !oldPassword) {
        throw new InvalidPasswordError(
          'Old password and new password is required',
        );
      }

      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!checkOldPassword) {
        throw new InvalidPasswordError('Old password does not match');
      }

      const hashedPassword = await this.hashProvider.generateHash(password);

      user.updatePassword(hashedPassword);

      await this.userRepository.update(user);

      return UserOutputMapper.toOutput(user);
    }
  }
}
