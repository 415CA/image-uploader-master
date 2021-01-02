export class BadRequestError extends Error {
  constructor(error) {
    this.data = { error };
    this.statusCode = 400;
  }
}