export class NotFoundError extends Error {}

export class EntityValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EntityValidationError';
  }
}