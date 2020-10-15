import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandle: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    });

    return res.status(400).json({ message: 'Erro de Validação', errors });
  }

  console.error(error);

  return res.status(500).json({ message: 'Erro interno do servidor' });
};

export default errorHandle;