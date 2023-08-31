import { Entity } from '@/shared/domain/entities/entity';
import { InMemoryRepository } from '../../in-memory.repository';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('In memory repository unit tests', () => {
  let sut: StubInMemoryRepository;

  beforeEach(() => {
    sut = new StubInMemoryRepository();
  });

  it('Should insert a new entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 });

    await sut.insert(entity);

    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON());
  });

  it('Should throw an error when entity not found', async () => {
    await expect(sut.findById('non existing item')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should be able to find an entity by id', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 });

    await sut.insert(entity);

    const result = await sut.findById(entity.id);

    expect(result.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('Should be able to find all entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 });

    await sut.insert(entity);

    const result = await sut.findAll();

    expect(result).toStrictEqual([entity]);
  });

  it('Should throw an error on update when entity not found', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 });

    await expect(sut.update(entity)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should be able to update an entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 });

    await sut.insert(entity);

    const entityUpdated = new StubEntity(
      { name: 'updated', price: 10 },
      entity.id,
    );

    await sut.update(entityUpdated);

    expect(sut.items[0].toJSON()).toStrictEqual(entityUpdated.toJSON());
  });

  it('Should throw an error on delete when entity not found', async () => {
    await expect(sut.delete('non existing item')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should be able to find an entity by id', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 });

    await sut.insert(entity);

    await sut.delete(entity.id);

    expect(sut.items).toHaveLength(0);
  });
});
