import { SignUpUseCase } from '@/users/application/use-cases/sign-up.usecase';

export class SignUpDto implements SignUpUseCase.Input {
  name: string;
  email: string;
  password: string;
}
