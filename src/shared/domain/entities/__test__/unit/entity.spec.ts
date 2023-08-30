import { validate as uuidValidate } from 'uuid';
import { Entity } from '../../entity';

type StubPros = {
  prop1: string;
  prop2: number;
};

class StubEntity extends Entity<StubPros> {}

describe('Entity unit tests', () => {
  it('Should set props and id', () => {
    const props = {
      prop1: 'value1',
      prop2: 12,
    };

    const entity = new StubEntity(props);

    expect(entity.props).toStrictEqual(props);
    expect(entity.id).not.toBeNull();
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it('Should accept a valid uuid', () => {
    const props = {
      prop1: 'value1',
      prop2: 12,
    };
    const id = '6cbfa1ec-7a98-47af-b655-c6fe509cd95d';
    const entity = new StubEntity(props, id);

    expect(uuidValidate(entity.id)).toBeTruthy();
    expect(entity.id).toBe(id);
  });

  it('Should convert a entity to a Javascript object', () => {
    const props = {
      prop1: 'value1',
      prop2: 12,
    };
    const id = '6cbfa1ec-7a98-47af-b655-c6fe509cd95d';
    const entity = new StubEntity(props, id);

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    });
  });
});
