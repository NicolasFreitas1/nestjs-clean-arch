import { HashProvider } from '@/shared/application/providers/hash-provider';
import { Module } from '@nestjs/common';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.usecase';
import { GetUserUseCase } from '../application/use-cases/get-user.usecase';
import { ListUsersUseCase } from '../application/use-cases/list-users.usecase';
import { SignInUseCase } from '../application/use-cases/sign-in.usecase';
import { SignUpUseCase } from '../application/use-cases/sign-up.usecase';
import { UpdatePasswordUseCase } from '../application/use-cases/update-password.usecase';
import { UpdateUserUseCase } from '../application/use-cases/update-user.usecase';
import { UserRepository } from '../domain/repositories/user.repository';
import { UserInMemoryRepository } from './database/in-memory/repositories/user-in-memory.repository';
import { BcryptjsHashProvider } from './providers/hash-provider/bcryptjs-hash.provider';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserInMemoryRepository,
    },
    {
      provide: 'HashProvider',
      useClass: BcryptjsHashProvider,
    },
    {
      provide: SignUpUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new SignUpUseCase.UseCase(userRepository, hashProvider);
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: SignInUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new SignInUseCase.UseCase(userRepository, hashProvider);
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: GetUserUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new GetUserUseCase.UseCase(userRepository);
      },
      inject: ['UserRepository'],
    },
    {
      provide: ListUsersUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new ListUsersUseCase.UseCase(userRepository);
      },
      inject: ['UserRepository'],
    },
    {
      provide: UpdateUserUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new UpdateUserUseCase.UseCase(userRepository);
      },
      inject: ['UserRepository'],
    },
    {
      provide: UpdatePasswordUseCase.UseCase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new UpdatePasswordUseCase.UseCase(userRepository, hashProvider);
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: DeleteUserUseCase.UseCase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new DeleteUserUseCase.UseCase(userRepository);
      },
      inject: ['UserRepository'],
    },
  ],
})
export class UsersModule {}
