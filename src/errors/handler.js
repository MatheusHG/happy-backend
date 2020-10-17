"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const errorHandle = (error, req, res, next) => {
    if (error instanceof yup_1.ValidationError) {
        let errors = {};
        error.inner.forEach(err => {
            errors[err.path] = err.errors;
        });
        return res.status(400).json({ message: 'Erro de Validação', errors });
    }
    console.error(error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
};
exports.default = errorHandle;
