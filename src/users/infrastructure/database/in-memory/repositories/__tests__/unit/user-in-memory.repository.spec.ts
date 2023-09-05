import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserInMemoryRepository } from '../../user-in-memory.repository';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { ConflictError } from '@/shared/domain/errors/conflict-error';

describe('User In memory repository unit tests', () => {
  let sut: UserInMemoryRepository;

  beforeEach(() => {
    sut = new UserInMemoryRepository();
  });

  it('Should throw an error when not found - findByEmail', async () => {
    await expect(sut.findByEmail('email@email.com')).rejects.toThrow(
      new NotFoundError('User not found using email: email@email.com'),
    );
  });

  it('Should find a entity by email - findByEmail', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    await sut.insert(entity);

    const result = await sut.findByEmail(entity.email);
    expect(result.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('Should throw an error when found a existent email - emailExists', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    await sut.insert(entity);

    await expect(sut.emailExists(entity.email)).rejects.toThrow(
      new ConflictError('Email already exists'),
    );
  });

  it('Should throw an error when found a existent email - emailExists', async () => {
    expect.assertions(0);
    await expect(sut.emailExists('email@emial.com'));
  });
});
