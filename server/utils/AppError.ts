interface IAppError {
  message: string;
  statusCode: number;
  status: string;
}

class AppError implements IAppError {
  public message: string;
  public statusCode: number;
  public status: string;

  constructor(message: string, statusCode: number, status: string) {
    this.message = message;
    this.statusCode = statusCode;
    this.status = status;
  }
}

export default AppError;
