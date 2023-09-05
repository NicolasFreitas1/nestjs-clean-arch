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

  it('Should no filter when filter object is null', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    await sut.insert(entity);

    const result = await sut.findAll();

    const spyFilter = jest.spyOn(result, 'filter');
    const itemsFiltered = await sut['applyFilter'](result, null);

    expect(spyFilter).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(result);
  });

  it('Should filter name field using filter param', async () => {
    const items = [
      new UserEntity(UserDataBuilder({ name: 'Test' })),
      new UserEntity(UserDataBuilder({ name: 'TEST' })),
      new UserEntity(UserDataBuilder({ name: 'fake' })),
    ];

    const spyFilter = jest.spyOn(items, 'filter');
    const itemsFiltered = await sut['applyFilter'](items, 'test');

    expect(spyFilter).toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
  });

  it('Should sort by createdAt when sort param is null', async () => {
    const createdAt = new Date();
    const items = [
      new UserEntity(UserDataBuilder({ name: 'Test', createdAt })),
      new UserEntity(
        UserDataBuilder({
          name: 'TEST',
          createdAt: new Date(createdAt.getTime() + 1),
        }),
      ),
      new UserEntity(
        UserDataBuilder({
          name: 'fake',
          createdAt: new Date(createdAt.getTime() + 2),
        }),
      ),
    ];

    const itemsSorted = await sut['applySort'](items, null, null);

    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
  });

  it('Should sort by name', async () => {
    const items = [
      new UserEntity(UserDataBuilder({ name: 'c' })),
      new UserEntity(UserDataBuilder({ name: 'd' })),
      new UserEntity(UserDataBuilder({ name: 'a' })),
    ];

    const itemsSorted = await sut['applySort'](items, 'name', 'asc');

    expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]]);
  });
});
