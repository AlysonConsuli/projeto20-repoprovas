import { unprocessableEntityError } from "./errorHandlingMiddleware.js";
export var validateSchema = function (schema) {
    return function (req, res, next) {
        var error = schema.validate(req.body, { abortEarly: false }).error;
        if (error) {
            throw unprocessableEntityError(error.details.map(function (error) { return error.message; }));
        }
        next();
    };
};
