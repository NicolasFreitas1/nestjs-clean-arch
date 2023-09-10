import { SignInUseCase } from '@/users/application/use-cases/sign-in.usecase';

export class SignInDto implements SignInUseCase.Input {
  email: string;
  password: string;
}
