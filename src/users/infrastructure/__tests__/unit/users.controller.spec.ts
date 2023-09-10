import { UserOutput } from '@/users/application/dtos/user-output';
import { GetUserUseCase } from '@/users/application/use-cases/get-user.usecase';
import { ListUsersUseCase } from '@/users/application/use-cases/list-users.usecase';
import { SignInUseCase } from '@/users/application/use-cases/sign-in.usecase';
import { SignUpUseCase } from '@/users/application/use-cases/sign-up.usecase';
import { UpdatePasswordUseCase } from '@/users/application/use-cases/update-password.usecase';
import { UpdateUserUseCase } from '@/users/application/use-cases/update-user.usecase';
import { SignInDto } from '../../dtos/sign-in.dto';
import { UpdatePasswordDto } from '../../dtos/update-password.dto';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { UsersController } from '../../users.controller';

describe('UsersController unit test', () => {
  let sut: UsersController;
  let id: string;
  let props: UserOutput;

  beforeEach(async () => {
    sut = new UsersController();
    id = 'b5dc9f3f-7ef4-44c8-b2e5-955e7119d044';
    props = {
      id,
      name: 'Nicolas',
      email: 'a@a.com',
      password: '1234',
      createdAt: new Date(),
    };
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create a user', async () => {
    const output: SignUpUseCase.Output = props;
    const mockSignUpUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };

    sut['signUpUseCase'] = mockSignUpUseCase as any;

    const input: SignUpUseCase.Input = {
      name: 'Nicolas',
      email: 'a@a.com',
      password: '1234',
    };
    const result = await sut.create(input);

    expect(output).toMatchObject(result);
    expect(mockSignUpUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should authenticate a user', async () => {
    const output: SignInUseCase.Output = props;
    const mockSignInUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['signInUseCase'] = mockSignInUseCase as any;
    const input: SignInDto = {
      email: 'a@a.com',
      password: '1234',
    };
    const result = await sut.login(input);
    expect(output).toMatchObject(result);
    expect(mockSignInUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should update a user', async () => {
    const output: UpdateUserUseCase.Output = props;
    const mockUpdateUserUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['updateUserUseCase'] = mockUpdateUserUseCase as any;
    const input: UpdateUserDto = {
      name: 'new name',
    };
    const result = await sut.update(id, input);
    expect(output).toMatchObject(result);
    expect(mockUpdateUserUseCase.execute).toHaveBeenCalledWith({
      id,
      ...input,
    });
  });

  it('should update a users password', async () => {
    const output: UpdatePasswordUseCase.Output = props;
    const mockUpdatePasswordUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['updatePasswordUseCase'] = mockUpdatePasswordUseCase as any;
    const input: UpdatePasswordDto = {
      password: 'new password',
      oldPassword: 'old password',
    };
    const result = await sut.updatePassword(id, input);
    expect(output).toMatchObject(result);
    expect(mockUpdatePasswordUseCase.execute).toHaveBeenCalledWith({
      id,
      ...input,
    });
  });

  it('should delete a user', async () => {
    const output = undefined;
    const mockDeleteUserUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['deleteUserUseCase'] = mockDeleteUserUseCase as any;
    const result = await sut.remove(id);
    expect(output).toStrictEqual(result);
    expect(mockDeleteUserUseCase.execute).toHaveBeenCalledWith({
      id,
    });
  });

  it('should gets a user', async () => {
    const output: GetUserUseCase.Output = props;
    const mockGetUserUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['getUserUseCase'] = mockGetUserUseCase as any;
    const result = await sut.findOne(id);
    expect(output).toStrictEqual(result);
    expect(mockGetUserUseCase.execute).toHaveBeenCalledWith({
      id,
    });
  });

  it('should list users', async () => {
    const output: ListUsersUseCase.Output = {
      items: [props],
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
      total: 1,
    };
    const mockListUsersUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['listUsersUseCase'] = mockListUsersUseCase as any;
    const searchParams = {
      page: 1,
      perPage: 1,
    };
    const result = await sut.search(searchParams);
    expect(output).toStrictEqual(result);
    expect(mockListUsersUseCase.execute).toHaveBeenCalledWith(searchParams);
  });
});
