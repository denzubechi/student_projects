class CustomError extends Error {
    constructor(message) {
      super(message);
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  
    serializeErrors() {
      return [{ message: this.message }];
    }
  }
  
  CustomError.prototype.statusCode = 0;
  
  class NotFoundError extends CustomError {
    constructor() {
      super('Route not found');
      Object.setPrototypeOf(this, NotFoundError.prototype);
    }
  
    serializeErrors() {
      return [{ message: 'Opps! Request Not Found😢.' }];
    }
  }
  
  module.exports = {
    NotFoundError,
  };
  