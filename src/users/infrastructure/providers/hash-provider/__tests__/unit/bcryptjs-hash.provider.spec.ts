import { BcryptjsHashProvider } from '../../bcryptjs-hash.provider';

describe('BcryptjsHashProvider unit test', () => {
  let sut: BcryptjsHashProvider;

  beforeEach(() => {
    sut = new BcryptjsHashProvider();
  });

  it('should return a encrypted password', async () => {
    const password = 'test-password';

    const hash = await sut.generateHash(password);

    expect(hash).toBeDefined();
  });

  it('should return false on invalid password and hash comparison', async () => {
    const password = 'test-password';

    const hash = await sut.generateHash(password);

    const result = await sut.compareHash('fake-password', hash);
    expect(result).toBeFalsy();
  });

  it('should return true on valid password and hash comparison', async () => {
    const password = 'test-password';

    const hash = await sut.generateHash(password);

    const result = await sut.compareHash(password, hash);
    expect(result).toBeTruthy();
  });
});
