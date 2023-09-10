import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';
import { ListUsersUseCase } from '@/users/application/use-cases/list-users.usecase';

export class ListUsersDto implements ListUsersUseCase.Input {
  page?: number;
  perPage?: number;
  sort?: string;
  sortDir?: SortDirection;
  filter?: string;
}
