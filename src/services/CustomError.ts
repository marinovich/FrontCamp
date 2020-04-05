import { CustomErrorType } from 'constants/index';

export class CustomError extends Error {
  public name: string;
  public type: string;
  public message: string;

  constructor(
    type: string = CustomErrorType.DEFAULT_ERROR,
    message?: string,
  ) {
    super(message);

    this.name = 'CustomError';
    this.type = type;
  }
}
