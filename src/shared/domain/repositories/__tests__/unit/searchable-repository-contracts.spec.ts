import { SearchParams } from '../../searchable-repository-contracts';

describe('Searchable Repository', () => {
  describe('SearchParams tests', () => {
    it('page prop', () => {
      const sut = new SearchParams();

      expect(sut.page).toBe(1);

      const params = [
        {
          page: null as any,
          expected: 1,
        },
        {
          page: undefined as any,
          expected: 1,
        },
        {
          page: '' as any,
          expected: 1,
        },
        {
          page: 'test' as any,
          expected: 1,
        },
        {
          page: 0,
          expected: 1,
        },
        {
          page: -1,
          expected: 1,
        },
        {
          page: 5.5,
          expected: 1,
        },
        {
          page: true,
          expected: 1,
        },
        {
          page: {},
          expected: 1,
        },
        {
          page: 5,
          expected: 5,
        },
      ];

      params.forEach((param) => {
        expect(new SearchParams({ page: param.page }).page).toEqual(
          param.expected,
        );
      });
    });

    it('perPage prop', () => {
      const sut = new SearchParams();

      expect(sut.perPage).toBe(15);

      const params = [
        {
          perPage: null as any,
          expected: 15,
        },
        {
          perPage: undefined as any,
          expected: 15,
        },
        {
          perPage: '' as any,
          expected: 15,
        },
        {
          perPage: 'test' as any,
          expected: 15,
        },
        {
          perPage: 0,
          expected: 15,
        },
        {
          perPage: -1,
          expected: 15,
        },
        {
          perPage: 5.5,
          expected: 15,
        },
        {
          perPage: true,
          expected: 15,
        },
        {
          perPage: {},
          expected: 15,
        },
        {
          perPage: 50,
          expected: 50,
        },
      ];

      params.forEach((param) => {
        expect(new SearchParams({ perPage: param.perPage }).perPage).toEqual(
          param.expected,
        );
      });
    });

    it('sort prop', () => {
      const sut = new SearchParams();

      expect(sut.sort).toBeNull();

      const params = [
        {
          sort: null as any,
          expected: null,
        },
        {
          sort: undefined as any,
          expected: null,
        },
        {
          sort: '' as any,
          expected: null,
        },
        {
          sort: 'test',
          expected: 'test',
        },
        {
          sort: 0,
          expected: '0',
        },
        {
          sort: -1,
          expected: '-1',
        },
        {
          sort: 5.5,
          expected: '5.5',
        },
        {
          sort: true,
          expected: 'true',
        },
        {
          sort: {},
          expected: '[object Object]',
        },
        {
          sort: 50,
          expected: '50',
        },
      ];

      params.forEach((param) => {
        expect(new SearchParams({ sort: param.sort }).sort).toEqual(
          param.expected,
        );
      });
    });

    it('sortDir prop', () => {
      let sut = new SearchParams();
      expect(sut.sortDir).toBeNull();

      sut = new SearchParams({ sort: null });
      expect(sut.sortDir).toBeNull();

      sut = new SearchParams({ sort: undefined });
      expect(sut.sortDir).toBeNull();

      sut = new SearchParams({ sort: '' });
      expect(sut.sortDir).toBeNull();

      const params = [
        {
          sortDir: null as any,
          expected: 'desc',
        },
        {
          sortDir: undefined as any,
          expected: 'desc',
        },
        {
          sortDir: '' as any,
          expected: 'desc',
        },
        {
          sortDir: 'test',
          expected: 'desc',
        },
        {
          sortDir: 0,
          expected: 'desc',
        },
        {
          sortDir: 'desc',
          expected: 'desc',
        },
        {
          sortDir: 'asc',
          expected: 'asc',
        },
        {
          sortDir: 'ASC',
          expected: 'asc',
        },
        {
          sortDir: 'DESC',
          expected: 'DESC',
        },
      ];

      params.forEach((param) => {
        expect(
          new SearchParams({ sort: 'field', sortDir: param.sortDir }).sortDir,
        ).toEqual(param.expected);
      });
    });
  });

  it('filter prop', () => {
    const sut = new SearchParams();

    expect(sut.filter).toBeNull();

    const params = [
      {
        filter: null as any,
        expected: null,
      },
      {
        filter: undefined as any,
        expected: null,
      },
      {
        filter: '' as any,
        expected: null,
      },
      {
        filter: 'test',
        expected: 'test',
      },
      {
        filter: 0,
        expected: '0',
      },
      {
        filter: -1,
        expected: '-1',
      },
      {
        filter: 5.5,
        expected: '5.5',
      },
      {
        filter: true,
        expected: 'true',
      },
      {
        filter: {},
        expected: '[object Object]',
      },
      {
        filter: 50,
        expected: '50',
      },
    ];

    params.forEach((param) => {
      expect(new SearchParams({ filter: param.filter }).filter).toEqual(
        param.expected,
      );
    });
  });
});
